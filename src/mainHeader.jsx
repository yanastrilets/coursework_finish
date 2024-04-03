import React from "react";
import './App.css';
import {Link} from "react-router-dom";
export const MainHeader = () => {
    return (
    <div className='rectangle'>
        <div className='flex-row-ed'>
            <div className='bg'>
                <Link to='/login' className='show-me-now'>Login</Link>
            </div>
            <div className='regroup'>
                <div className='home'>
                    <span className='home-1'>Home</span>
                    <span className='nbsp'> </span>
                </div>
                <span className='catalog'>Catalog</span>
            </div>
            <div className='staycation'>
                <span className='stay'>Stay</span>
                <span className='cation'>cation.</span>
            </div>
            <span className='about-us'>About us</span>
        </div>
        <div className='rectangle-2'/>
    </div>
    );
}
