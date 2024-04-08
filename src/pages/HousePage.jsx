import React, {useState} from 'react';
import { useParams } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './HousePage.css';
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import { Carousel } from "../components/Carousel";

import carouselData from "../data/carouselData.json";
import housesData from "../data/houses.json";
export const HousePage = () =>{
    //let { id } = useParams(); // Отримуємо id будинку з URL

    const { id } = useParams();
    const numericId = parseInt(id, 10); // Перетворення рядка `id` в число
    console.log(numericId);
// Потім використовуємо numericId для пошуку
    const houseInfo = housesData.housesData.find(house => house.id === numericId);
    console.log(houseInfo);
    // Перевіряємо, чи існує будинок з таким id
    if (!houseInfo) {
        return <p>House not found!</p>;
    }
    return (
        <div className='main-container-housepage'>
            <Carousel data={carouselData.carouselData} />
            <div className='flex-row-e2'>
                <span className='house-name'>{houseInfo.houseName}</span>
                <div className='catalog-house-details'>
                    <span className='catalog-housepage'>Catalog / </span>
                    <span className='house-details'>House Details</span>
                </div>
            </div>
            <span className='house-location'>{houseInfo.location}</span>
            <div className='flex-row-housepage'>
                <div className='rectangle-housepage'/>
                <div className='rectangle-1-housepage'/>
                <div className='rectangle-2-housepage'/>
            </div>
            <div className='flex-row-3'>
                <span className='about-the-place'>About the place</span>
                <div className='rectangle-4'>
                    <span className='start-booking'>Start Booking</span>
                    <div className='per-night'>
                        <span className='dollar'>{houseInfo.price}</span>
                        <span className='empty-space'> </span>
                        <span className='per-night-5'>per night</span>
                    </div>
                    <span className='stay-duration'>How long you will stay?</span>
                    <button className='rectangle-button'>
                        <div className='rectangle-6'>
                            <span className='minus'>-</span>
                        </div>
                        <div className='plus'>
                            <span className='nights'>+</span>
                        </div>
                        <span className='pick-date'>2 nights</span>
                    </button>
                    <span className='pick-date-7'>Pick a Date</span>
                    <button className='rectangle-button-8'>
                        <div className='calendar-icon'/>
                        <span className='date-range'>20 Jan - 22 Jan</span>
                    </button>
                    <div className='pay-per-night'>
                        <span className='pay-text'>You will pay </span>
                        <span className='pay-amount'>$480 USD</span>
                        <span className='pay-text-9'> per </span>
                        <span className='pay-amount-a'>2 nights</span>
                    </div>
                    <div className='bg-housepage'>
                        <span className='continue-to-book'>Continue to Book</span>
                    </div>
                </div>
                <span className='house-description'>{houseInfo.description}</span>

                <div className='bedroom-icon'/>
                <div className='livingroom-icon'/>
                <div className='bedroom-icon-b'/>
                <div className='diningroom-icon'/>
                <div className='bedroom'>
                    <span className='five'>5</span>
                    <span className='bedroom-c'> bedroom</span>
                </div>
                <div className='living-room'>
                    <span className='one'>1</span>
                    <span className='living-room-d'> living room</span>
                </div>
                <div className='bathroom'>
                    <span className='three'>3</span>
                    <span className='bathroom-e'> bathroom</span>
                </div>
                <div className='dining-room'>
                    <span className='one-f'>1</span>
                    <span className='dining-room-10'> dining room</span>
                </div>
                <div className='ic-wifi'/>
                <div className='ic-ac'/>
                <div className='ic-kulkas'/>
                <div className='ic-tv'/>
            </div>
            <div className='flex-row-11'>
                <div className='mbp-s'>
                    <span className='span'>10</span>
                    <span className='mbp-s-12'> mbp/s</span>
                </div>
                <div className='unit-ready'>
                    <span className='span-13'>7</span>
                    <span className='unit-ready-14'> unit ready</span>
                </div>
                <div className='regroup-housepage'>
                    <div className='refigrator'>
                        <span className='span-15'>2</span>
                        <span className='refigrator-16'> refigrator</span>
                    </div>
                    <div className='television'>
                        <span className='span-17'>4</span>
                        <span className='television-18'> television</span>
                    </div>
                </div>
            </div>
        </div>
    );
}