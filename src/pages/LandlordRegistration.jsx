import React from "react";
import {MainHeader} from "../components/mainHeader";
import {TextField} from "@mui/material";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import './LandlordRegistration.css';
export const LandlordRegistration = () =>{
    const handleContinueClick = () => {
        console.log("Continue to Book button clicked");
        // Тут може бути логіка для подальшого оброблення, наприклад, перехід на іншу сторінку або відправка даних форми
    };
    return(
        <div>
            <MainHeader/>
            <div className='landlord-reg-header'>
                <span className='landlord-reg-information'>Landlord Information</span>
                <span className='landlord-reg-fill-up-fields'>
        Please fill up the blank fields below
            </span>
            </div>
            <div className='reg-inputs'>
                <span className='landlord-reg-text-above-input'>First Name</span>
                <TextField label='' variant='outlined' size='small' style={{marginTop: 11}}/>
                <span className='landlord-reg-text-above-input'>Last Name</span>
                <TextField label='' variant='outlined' size='small' style={{marginTop: 11}}/>
                <span className='landlord-reg-text-above-input'>Date Of Birth</span>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker label="" size='small' style={{marginTop: 11}}/>
                </LocalizationProvider>
                <span className='landlord-reg-text-above-input'>Email Address</span>
                <TextField label='' variant='outlined' size='small' style={{marginTop: 11}}/>
                <span className='landlord-reg-text-above-input'>Phone number</span>
                <TextField label='' variant='outlined' size='small' style={{marginTop: 11}}/>
            </div>
            <div className='landlord-reg-buttons'>
                <div className='landlord-reg-cancel'>
                    <span className='cancel'>Cancel</span>
                </div>
                <div className='landlord-reg-next'>
                    <span className='landlord-reg-continue-to-book' onClick={handleContinueClick}>Registrate</span>
                </div>
            </div>
        </div>
    );
}