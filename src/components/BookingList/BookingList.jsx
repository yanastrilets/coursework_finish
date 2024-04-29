import React, {useEffect} from "react";
import './BookingList.css';
import {Link} from "react-router-dom";
import {BookingBlock} from "../BookingBlock/BookingBlock";

export const BookingList = ({data}) => {
    useEffect(() => {
        console.log(data)
    }, [data]);
    return (
        <div className='booking-list-component'>
            {data.map((booking) => (

                    <BookingBlock
                        booking={booking}
                    />

            ))}
        </div>
    );
}

