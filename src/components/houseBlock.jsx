import './houseBlock.css';
import React from "react";
export const HouseBlock = ({ data }) => {
    return (
        <div className='rectangle-block'>
            <div className='rectangle-1d-block'>
                <img src={data.img} alt={data.id} style={{width: "263px", height: "180px"}}/>
                <div className='rectangle-1e-block'>
                    <div className='popular-choice'>
                        <span className='popular'>{data.price}</span>
                        <span className='choice'> per night</span>
                    </div>
                </div>
            </div>
            <div className='flex-row-bbe2'>
                <span className='tabby-town'>{data.houseName}</span>
            </div>
            <div className='flex-row2'>
                <span className='gunung-batu-indonesia'>{data.location}</span>
            </div>
        </div>
    );
}

