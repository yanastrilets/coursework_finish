import React, {useEffect, useState} from "react";
import './BookingBlock.css';
import {
    useCreateRefundMutation,
    useGetApartmentByIdQuery,
    useGetApartmentsQuery,
    useGetReviewQuery, useUpdateBookingStatusMutation
} from "../../store/api/api";
import {format} from 'date-fns';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import {Link} from "react-router-dom";


export const BookingBlock = ({booking}) => {
    useEffect(() => {
        console.log(booking);
    }, [booking]);

    // Форматуємо дати для відображення
    const formattedCheckIn = format(new Date(booking.check_in), 'dd/MM/yyyy');
    const formattedCheckOut = format(new Date(booking.check_out), 'dd/MM/yyyy');

    const [isRejected, setIsRejected] = useState(booking.status === 3);
    const [isFinished, setIsFinished] = useState(new Date(booking.check_in) <= new Date() && booking.status !== 3);
    const {data: review, isLoading: isLoadingReviews, isError: isErrorReviews} = useGetReviewQuery(booking.id);
    const [value, setValue] = React.useState(0);
    const [createRefund, { isLoading: isRefunding, isSuccess: refundSuccess }] = useCreateRefundMutation();
    const [updateBookingStatus, { isLoading: isUpdating, isSuccess: updateSuccess }] = useUpdateBookingStatusMutation();

    if(isLoadingReviews) return <div>is load</div>
    const price = Number(booking.price) || 0;
    const handleRefund = () => {
        if (isFinished) {
            alert("Booking cannot be refunded before it starts.");
            return;
        }
        try {
            // Створення відшкодування
            createRefund({
                bookingId: booking.id,
                sum: price * 0.95, // assuming a 95% refund rate
                created_at: new Date() // current date as refund date
            }).unwrap();

            // Оновлення статусу бронювання на "Rejected"
            updateBookingStatus({ id: booking.id }).unwrap()
                .then(response => {
                    alert("Booking status updated successfully!");
                    console.log(response);
                })
                .catch(error => {
                    console.error("Error updating booking status:", error);
                    alert("Failed to update the booking status.");
                });

            alert("Booking has been rejected and refund has been initiated.");
            setIsRejected(true); // Оновлення локального стану на відхилено
        } catch (error) {
            console.error("Failed to process refund or update booking status:", error);
            alert("Failed to process the refund or update the booking status.");
        }
    };
    return (
        <div className='booking-block'>
            <div className='booking-header-block'>
                <span className='booking-period'>
                    {`Booking ${formattedCheckIn} - ${formattedCheckOut}`}
                </span>
                <div className='price-rate'>
                    {
                        (isFinished  ) &&  <Rating
                            name="simple-controlled"
                            value={review?.review}
                            size='large'
                            disabled={review?.review}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                        />
                    }

                    {/*{booking.status !== 3 &&!isFinished && <div onClick={handleRefund} className='booking-refund'>*/}

                    {/*    <span className='refund'>Reject booking</span>*/}
                    {/*</div>}*/}
                    {/*{booking.status === 3 && <span style={{color: '#3252df', marginLeft: 500}} className='refund-text'>Rejected</span>}*/}

                    {(!isRejected ) && !isFinished && (
                        <div onClick={handleRefund} className='booking-refund'>
                            <span className='refund'>Reject booking</span>
                        </div>
                    )}
                    {(isRejected) && (
                        <span style={{ color: '#3252df', marginLeft: 500 }} className='refund-text'>Rejected</span>
                    )}

                </div>
                {/*<hr className='hr-under-filters' style={{marginBottom: 20, marginTop: 10}}/>*/}
            </div>
            <div className='booking-info-block'>
                <div className='booking-dates'>
                    {/*<span className='dates'>{`${formattedCheckIn} - ${formattedCheckOut}`}</span>*/}
                </div>
            </div>
            <div className='booking-details'>
                <div className='booking-info-house'>
                    <span className='booking-house'>{booking.apartment.house_name}</span>
                    <span
                        className='booking-location'>{booking.apartment.address.country + ', ' + booking.apartment.address.city}</span>
                    <span
                        className='booking-tenant'>{`Tenant: ${booking.tenant.person.surname} ${booking.tenant.person.name}`}</span>
                </div>
                <div className='total-price-container'>
                    <div className='booking-price'>
                        <span className='total-price'>{`Total: $${price.toFixed(1)}`}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}