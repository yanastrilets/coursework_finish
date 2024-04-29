import React, { useEffect } from "react";
import './BookingBlock.css';
import { useGetApartmentByIdQuery, useGetApartmentsQuery } from "../../store/api/api";
import { format } from 'date-fns';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import {Link} from "react-router-dom";


export const BookingBlock = ({ booking }) => {
    useEffect(() => {
        console.log(booking);
    }, [booking]);

    // Форматуємо дати для відображення
    const formattedCheckIn = format(new Date(booking.check_in), 'dd/MM/yyyy');
    const formattedCheckOut = format(new Date(booking.check_out), 'dd/MM/yyyy');
    const [value, setValue] = React.useState(0);
    let isFinished = false;
    if(new Date(booking.check_in) <= new Date()){
        isFinished = true;
    }
    return (
        <div className='booking-block'>
            <div className='booking-header-block'>
                <span className='booking-period'>
                    {`Booking ${formattedCheckIn} - ${formattedCheckOut}`}
                </span>
                <div className='price-rate'>
                    {
                        isFinished && <Rating
                            name="simple-controlled"
                            value={value}
                            size='large'
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                        />
                    }

                    { !isFinished && <div className='booking-refund'>

                        <span className='refund'>Reject booking</span>
                    </div>}
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
                        <span className='total-price'>{`Total: $${booking.price}`}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}