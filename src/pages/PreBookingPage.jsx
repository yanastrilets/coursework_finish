import React from "react";
import {Header} from "../components/Header";
import './FirstBookingPage.css'
import { useInput } from '@mui/base/useInput';
import {Stack, TextField} from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export const FirstBookingPage = () => {
    const handleContinueClick = () => {
        console.log("Continue to Book button clicked");
        // Тут може бути логіка для подальшого оброблення, наприклад, перехід на іншу сторінку або відправка даних форми
    };
    return (
        <div className='main-container'>
            <Header/>
            <div className='booking-header'>
                <span className='booking-information'>Booking Information</span>
                <span className='fill-up-fields'>
        Select a previosly created tenant or add new info
            </span>
            </div>
            <div className='booking-info-inputs'>
                <div className='booking-info'>
                    <div className='container-booking-info'/>
                    <div className='flex-column-cd'>
                        <span className='podo-wae'>Podo Wae</span>
                        <span className='madiun-indonesia'>Madiun, Indonesia</span>
                    </div>
                    <div className='price-info'>
                        <span className='usd'>$480 USD</span>
                        <span className='per'> per </span>
                        <span className='usd-1'>2 nights</span>
                    </div>
                </div>
                <hr className='hr-booking'/>
                <div className='info-about-tenant'>

                </div>
            </div>

            <div className='booking-buttons'>
                <div className='booking-cancel'>
                    <span className='cancel'>Cancel</span>
                </div>
                <div className='booking-next'>
                    <span className='continue-to-book' onClick={handleContinueClick}>Continue to Book</span>
                </div>
            </div>
        </div>
    );
}