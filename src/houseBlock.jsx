import './houseBlock.css';
import React from "react";
export const HouseBlock = ({ price, houseName, location, image }) => {
    return (
        <div className='rectangle'>
            <div className='rectangle-1d-block'>
                <img src={image} alt="картінка" style={{width: "263px", height: "180px"}}/>
                <div className='rectangle-1e-block'>
                    <div className='popular-choice'>
                        <span className='popular'>{price}</span>
                        <span className='choice'> per night</span>
                    </div>
                </div>
            </div>
            <div className='flex-row-bbe2'>
                <span className='tabby-town'>{houseName}</span>
            </div>
            <div className='flex-row2'>
                <span className='gunung-batu-indonesia'>{location}</span>
            </div>
        </div>
    );
}

