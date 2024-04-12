import React, {useState} from 'react';
import { useParams } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './HousePage.css';
import { MyCarousel } from "../components/Carousel";
import carouselData from "../data/carouselData.json";
import {useGetApartmentByIdQuery} from "../store/api/api";
export const HousePage = () =>{
    const { id } = useParams();
    const {data: house} = useGetApartmentByIdQuery(id);

    if (!house) {
        return <p>House not found!</p>;
    }

    console.log(house);
    const location = house.address.country + ", " + house.address.city;
    return (
        <div className='main-container-housepage'>

            <div className='flex-row-e2'>
                <span className='house-name'>{house.house_name}</span>
                <div className='catalog-house-details'>
                    <span className='catalog-housepage'>Catalog / </span>
                    <span className='house-details'>House Details</span>
                </div>
            </div>
            <span className='house-location'>{location}</span>
            <div className="my-carousel">
                <MyCarousel data={carouselData.carouselData}/>
            </div>
            <div className='flex-row-3'>
                <span className='about-the-place'>About the place</span>
                <div className='rectangle-4'>
                    <span className='start-booking'>Start Booking</span>
                    <div className='per-night'>
                        <span className='dollar'>{house.price_per_night}</span>
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
                        {/*<span className='pick-date'>{nights} nights</span>*/}
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
                <span className='house-description'>{house.description}</span>

                <div className='bedroom-icon'/>
                <div className='livingroom-icon'/>
                <div className='bedroom-icon-b'/>
                <div className='diningroom-icon'/>
                <div className='bedroom'>
                    <span className='five'>{house.count_of_room}</span>
                    <span className='bedroom-c'> bedroom</span>
                </div>
                <div className='living-room'>
                    <span className='one'>1</span>
                    <span className='living-room-d'> living room</span>
                </div>
                <div className='bathroom'>
                    <span className='three'>{house.count_of_bathroom}</span>
                    <span className='bathroom-e'> bathroom</span>
                </div>
                <div className='dining-room'>
                    <span className='one-f'>{house.count_of_kitchen}</span>
                    <span className='dining-room-10'> dining room</span>
                </div>

            </div>

        </div>
    );
}