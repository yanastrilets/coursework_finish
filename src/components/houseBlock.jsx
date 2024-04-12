import './houseBlock.css';
import React from "react";
export const HouseBlock = ({ data }) => {
    return (
        <div className='rectangle-block'>
            <div className='rectangle-1d-block'>
                <img src={'https://a0.muscache.com/im/pictures/21f1bd4d-cac0-47a0-84d3-a6413f675003.jpg?im_w=1200'} alt={data.id} style={{width: "263px", height: "180px"}}/>
                <div className='rectangle-1e-block'>
                    <div className='popular-choice'>
                        <span className='popular'>{data.price_per_night}</span>
                        <span className='choice'> per night</span>
                    </div>
                </div>
            </div>
            <div className='flex-row-bbe2'>
                <span className='tabby-town'>{data.house_name}</span>
            </div>
            <div className='flex-row2'>
                <span className='gunung-batu-indonesia'>{data.address.country + ", " + data.address.city}</span>
            </div>
        </div>
    );
}

