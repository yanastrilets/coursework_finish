import './houseBlock.css';
import React from "react";
import carouselData from "../data/carouselData.json";
export const HouseBlock = ({ data}) => {
    const randomIndex = Math.floor(Math.random() * carouselData.carouselData.length);
    const randomImage = carouselData.carouselData[randomIndex].src; // Correctly use the randomIndex

    return (
        <div className='rectangle-block'>
            <div className='rectangle-1d-block'>
                <img src={randomImage} alt={data.id} style={{width: "263px", height: "180px"}}/>
                <div className='rectangle-1e-block'>
                    <div className='popular-choice'>
                        <span className='popular'>${data.price_per_night}</span>
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

