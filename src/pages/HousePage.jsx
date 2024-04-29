import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './HousePage.css';
import { MyCarousel } from "../components/Carousel";
import carouselData from "../data/carouselData.json";
import {useGetApartmentByIdQuery, useGetReservedDatesFromHouseQuery} from "../store/api/api";
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../store/slices/ui.slice';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import {MainHeader} from "../components/mainHeader";
import {addDays, isSameDay, subDays} from 'date-fns'; // Бібліотека для зручної роботи з датами

export const HousePage = () =>{
    const { id } = useParams();
    const { data: house, isLoading, isError } = useGetApartmentByIdQuery(id);
    //const {houseId} = house.id;
    const bookingDetails = useSelector(state => state.ui.bookingDetails);
    const dispatch = useDispatch();
    const { data: reservedDates, isLoadingDates, error } = useGetReservedDatesFromHouseQuery(id);

    useEffect(() => {
        console.log("Reserved Dates:", reservedDates);
    }, [reservedDates]);

    useEffect(() => {
        if (!isLoading && house) {
            dispatch(uiActions.setBookingDetails({
                houseId: house.id,
                startDate: bookingDetails.startDate,
                endDate: bookingDetails.endDate,
                nights: bookingDetails.nights,
                sum: house.price_per_night * bookingDetails.nights
            }));
        }

    }, [house, isLoading, dispatch]);

    //НЕ ПРАЦЮЄ
    useEffect(() => {
        // Якщо дати ще завантажуються або відсутні зарезервовані дати, то не обробляємо логіку
        if (isLoadingDates || !reservedDates) return;

        const today = new Date();
        today.setHours(0, 0, 0, 0); // Видалення часової частини дати

        // Перевіряємо, чи знаходиться сьогоднішня дата в зарезервованих діапазонах
        const isTodayReserved = reservedDates.some(dateRange => {
            const startDate = new Date(dateRange.startDate);
            const endDate = new Date(dateRange.endDate);
            return startDate <= today && today <= endDate;
        });

        if (isTodayReserved) {
            // Знаходимо наступну вільну дату після останньої зарезервованої
            const lastReservedDate = reservedDates.reduce((latestDate, currentRange) => {
                const endDate = new Date(currentRange.endDate);
                return endDate > latestDate ? endDate : latestDate;
            }, new Date());

            const nextAvailableStartDate = addDays(lastReservedDate, 1);
            const nextAvailableEndDate = addDays(nextAvailableStartDate, 1);

            // Встановлюємо нові дати в Redux store
            dispatch(uiActions.updateBookingDates({
                startDate: nextAvailableStartDate,
                endDate: nextAvailableEndDate
            }));

            dispatch(uiActions.updateNightsAndSum({
                nights: 1, // Оскільки вибрано тільки наступну вільну ніч
                sum: house.price_per_night // Оновлення суми відповідно до однієї ночі
            }));
        }
    }, [reservedDates, isLoadingDates, dispatch]);


    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading house data.</div>;
    if (!house) return <div>House not found!</div>;
    if (isLoadingDates) return <div>Loading reserved dates...</div>;
    if (error) return <div>Error loading reserved dates: {error.message}</div>;

    const disabledDates = reservedDates?.map(dateRange => ({
        start: new Date(dateRange.startDate),
        end: new Date(dateRange.endDate)
    }));

    const handleSelect = (ranges) => {
        let { startDate, endDate } = ranges.selection;

        // Перевіряємо, чи вибрана дата початку та кінця є однаковими
        if (startDate.getDate() === endDate.getDate() &&
            startDate.getMonth() === endDate.getMonth() &&
            startDate.getFullYear() === endDate.getFullYear()) {
            endDate = addDays(startDate, 1);  // Встановлюємо дату завершення на наступний день
        }
        disabledDates.forEach(dateRange => {
            console.log("Checking", startDate, endDate, "against", new Date(dateRange.start), new Date(dateRange.end));
        });
        const isDateReserved = disabledDates.some(dateRange =>
            startDate <= new Date(dateRange.end) && new Date(dateRange.start) <= endDate
        );


        if (isDateReserved) {
            alert('Selected dates include reserved dates. Please select another range.');
            return;
        }
        const nights = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
        dispatch(uiActions.updateBookingDates({ startDate, endDate }));
        dispatch(uiActions.updateNightsAndSum({ nights, sum: nights * house.price_per_night }));
    };



    const handleIncreaseNights = () => {
        const newEndDate = addDays(new Date(bookingDetails.endDate), 1);
        dispatch(uiActions.updateBookingDates({
            startDate: bookingDetails.startDate,
            endDate: newEndDate
        }));
        dispatch(uiActions.updateNightsAndSum({
            nights: bookingDetails.nights + 1,
            sum: (bookingDetails.nights + 1) * house.price_per_night
        }));
    };

    const handleDecreaseNights = () => {
        if (bookingDetails.nights > 1) {
            const newEndDate = addDays(new Date(bookingDetails.endDate), -1);
            dispatch(uiActions.updateBookingDates({
                startDate: bookingDetails.startDate,
                endDate: newEndDate
            }));
            dispatch(uiActions.updateNightsAndSum({
                nights: bookingDetails.nights - 1,
                sum: (bookingDetails.nights - 1) * house.price_per_night
            }));
        }
    };
    const handleContinueClick = () => {
        // Оновлюємо Redux store з останніми деталями бронювання перед переходом на наступну сторінку
        dispatch(uiActions.setBookingDetails({
            houseId: house.id,  // Переконайтеся, що house.id доступний
            startDate: bookingDetails.startDate,
            endDate: bookingDetails.endDate,
            nights: bookingDetails.nights,
            sum: bookingDetails.sum
        }));
        // Ви можете тут використовувати history.push('/some-route') для редиректу, якщо потрібно
    };
    const customDayRenderer = (day, selectedRange) => {
        const isReserved = disabledDates.some(disabledDate =>
            isSameDay(day, new Date(disabledDate.start)) || isSameDay(day, new Date(disabledDate.end))
        );

        const dayClassName = `rdrDay ${isReserved ? 'rdrDayDisabled' : ''}`;

        return (
            <button type="button" className={dayClassName} style={{ color: isReserved ? '#ccc' : undefined }}>
                <span className="rdrDayNumber"><span>{day.getDate()}</span></span>
            </button>
        );
    };
    console.log(house);


    return (
        <div className='main-container-housepage'>
            <MainHeader/>
            <div className='flex-row-e2'>
                <span className='house-name'>{house.house_name}</span>
                <div className='catalog-house-details'>
                    <span className='catalog-housepage'>Catalog / </span>
                    <span className='house-details'>House Details</span>
                </div>
            </div>
            <span className='house-location'>{house.address.country + ", " + house.address.city}</span>
            <div className='row-carousel-startbooking'>
                <div className='photo-and-info'>
                    <div className="my-carousel">
                        <MyCarousel data={carouselData.carouselData}/>
                    </div>
                    <div className='flex-row-3'>
                        <span className='about-the-place'>About the place</span>
                        <span className='house-description'>{house.description}</span>
                    </div>
                    <div className='containers-of-details'>
                        <div className='rooms'>
                            <div className='bedroom-icon'/>
                            <div className='room-details'>
                                <span className='num-of-room'>{house.count_of_room}</span>
                                <span className='text-room'> bedroom</span>
                            </div>
                        </div>
                        <div className='rooms'>
                            <div className='livingroom-icon'/>
                            <div className='room-details'>
                                <span className='num-of-room'>1</span>
                                <span className='text-room'> living room</span>
                            </div>
                        </div>
                        <div className='rooms'>
                            <div className='bedroom-icon-b'/>
                            <div className='room-details'>
                                <span className='num-of-room'>{house.count_of_bathroom}</span>
                                <span className='text-room'> bathroom</span>
                            </div>
                        </div>
                        <div className='rooms'>
                            <div className='diningroom-icon'/>
                            <div className='room-details'>
                                <span className='num-of-room'>{house.count_of_kitchen}</span>
                                <span className='text-room'> dining room</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='rectangle-4'>
                    <div className='text-price'>
                        <span className='start-booking'>Start Booking</span>
                        <div className='per-night-book'>
                            <span className='dollar-book'>{house.price_per_night}$  </span>

                            <span className='per-night-5'>per night</span>
                        </div>
                    </div>
                    <hr className='hr-housepage'/>
                    <div className='booking-controls'>
                        <span className='stay-duration'>How long you will stay?</span>
                        <Stack spacing={2} direction="row" alignItems="center" justifyContent="flex-end" >
                            <Button variant="outlined" onClick={handleDecreaseNights}
                                    sx={{
                                        minWidth: '30px', // Мінімальна ширина, щоб кнопка не була занадто великою
                                        width: '40px', // Фіксована ширина кнопки
                                        padding: '6px 8px', // Вертикальний і горизонтальний відступи
                                        fontSize: '0.75rem' // Розмір шрифту в середині кнопки
                                    }}>-</Button>
                            <span className='stay-duration'>{bookingDetails.nights} nights</span>
                            <Button variant="outlined" onClick={handleIncreaseNights}
                                    sx={{
                                        minWidth: '30px', // Мінімальна ширина, щоб кнопка не була занадто великою
                                        width: '40px', // Фіксована ширина кнопки
                                        padding: '6px 8px', // Вертикальний і горизонтальний відступи
                                        fontSize: '0.75rem' // Розмір шрифту в середині кнопки
                                    }}>+</Button>
                        </Stack>
                    </div>
                    <span className='pick-date-7'>Pick a Date:</span>
                    <div className='container-date'>
                        <DateRangePicker className='date-pick'
                                         ranges={[{
                                             startDate: bookingDetails.startDate,
                                             endDate: bookingDetails.endDate,
                                             key: 'selection'
                                         }]}
                                         onChange={handleSelect}
                                         minDate={new Date()}
                                         showDateDisplay={true}
                                         disabledDates={disabledDates}
                                         color={'#3252df'}
                                         //renderDay={customDayRenderer}
                        />
                    </div>

                    <div className='pay-per-night'>
                        <span className='pay-text'>You will pay </span>
                        <span className='pay-amount'>${bookingDetails.sum} USD</span>
                        <span className='pay-text-9'> per </span>
                        <span className='pay-amount-a'>{bookingDetails.nights} nights</span>
                    </div>
                    <div className='bg-housepage'>
                        <Link to={{
                            pathname: '/book',

                        }
                        } className='continue-to-book-housepage' onClick={handleContinueClick}>Continue to Book</Link>
                    </div>
                </div>
            </div>

        </div>
    );
}