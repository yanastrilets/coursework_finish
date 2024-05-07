import React, { useState } from 'react';
import { Slider, Switch } from 'antd';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import './FilterContainer.css';
import {useGetAllCitiesQuery, useGetAllCountriesQuery} from "../../store/api/api";
import {Box, FormControl, InputLabel, MenuItem, Select} from "@mui/material"; // Шлях до вашого CSS файлу
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../store/slices/ui.slice'; // Шлях до вашого slice файла

export const FilterContainer = ({ handleOnClick }) => {
    const dispatch = useDispatch();
    const { bookingDetails, priceRange, selectedCity } = useSelector(state => state.ui);
    const { data: cities, isLoading: isLoadingCities, isError: isErrorCities } = useGetAllCitiesQuery();

    const handlePriceChange = (value) => {
        dispatch(uiActions.setPriceRange(value));
    };

    const handleCityChange = (event) => {
        dispatch(uiActions.setCity(event.target.value));
    };

    const handleSelectDates = (ranges) => {
        const { startDate, endDate } = ranges.selection;
        dispatch(uiActions.updateBookingDates({
            startDate,
            endDate
        }));
    };

    return (
        <div className='filter-container' style={{border: '2px ', padding: '12px', borderRadius: '5px'}}>
            <h4>Filters:</h4>
            <hr/>
            <h5>Price Range</h5>
            <Slider
                range
                value={priceRange}
                min={0}
                max={10000}
                onChange={handlePriceChange}
                marks={{
                    0: '$0',
                    10000: '$10k'
                }}
            />
            <h5>Date Range</h5>
            <DateRangePicker
                className='date-pick'
                ranges={[{
                    startDate: bookingDetails.startDate,
                    endDate: bookingDetails.endDate,
                    key: 'selection'
                }]}
                onChange={handleSelectDates}
                minDate={new Date()}
                showDateDisplay={true}
                color={'#3252df'}
            />
            <h5>Pick a City</h5>
            <Box sx={{ minWidth: 120, marginBottom: 2 }}>
                <FormControl fullWidth>
                    <InputLabel id="city-select-label">City</InputLabel>
                    <Select
                        labelId="city-select-label"
                        id="city-select"
                        value={selectedCity}
                        label="City"
                        onChange={handleCityChange}
                    >
                        <MenuItem value="All">All</MenuItem>
                        {isLoadingCities ? (
                            <MenuItem value="">Loading...</MenuItem>
                        ) : isErrorCities ? (
                            <MenuItem value="">Error</MenuItem>
                        ) : (
                            cities.map((city, index) => (
                                <MenuItem key={index} value={city.city}>{city.city}</MenuItem>
                            ))
                        )}
                    </Select>
                </FormControl>
            </Box>
            {/*<div className='button-apply-div'>*/}
            {/*    <div className='button-apply'>*/}
            {/*        <span className='button-apply-text' onClick={handleOnClick}>Apply</span>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    );
};
