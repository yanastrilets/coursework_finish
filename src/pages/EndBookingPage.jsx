import React from "react";
import {MainHeader} from "../components/mainHeader";
import {Link} from "react-router-dom";
import './EndBooking.css'

export const EndBookingPage = () => {
    return (
        <div>
            <MainHeader/>
            <div className='booking-finish'>
                <div className='booking-finish-header'>
                    Booking successfully finished!
                </div>
                <div className='booking-finish-text'>
                    You can view your bookings in your profile.
                </div>
                <div className='booking-finish-text'>
                    Come back to make new reservations and create emotions!
                </div>
                <div className='booking-finish-buttons'>
                    <div className='booking-go-to-profile'>
                        <Link to={'/catalogue'} className='go-to-profile'>Go to Profile</Link>
                    </div>
                    <div className='booking-go-to-catalog'>

                        <Link to={'/catalogue'} className='go-to-catalog'>Go to Catalog</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}