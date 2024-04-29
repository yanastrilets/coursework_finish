import React, {useEffect, useState} from "react";
import './FirstBookingPage.css'
import {Box, FormControl, InputLabel, MenuItem, Select, Stack, TextField} from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {uiActions} from "../store/slices/ui.slice";
import {useDispatch, useSelector} from "react-redux";
import {useGetApartmentByIdQuery, useGetTenantsFromOneUserQuery} from "../store/api/api";
import {MainHeader} from "../components/mainHeader";
import dayjs from 'dayjs';
import 'dayjs/locale/uk';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import updateLocale from 'dayjs/plugin/updateLocale';

dayjs.extend(customParseFormat);
dayjs.extend(updateLocale);

dayjs.updateLocale('uk', {
    months: `Січень_Лютий_Березень_Квітень_Травень_Червень_Липень_Серпень_Вересень_Жовтень_Листопад_Грудень`.split('_'),
    monthsShort: `Січ_Лют_Бер_Кві_Тра_Чер_Лип_Сер_Вер_Жов_Лис_Гру`.split('_'),
    weekdays: `Неділя_Понеділок_Вівторок_Середа_Четвер_П'ятниця_Субота`.split('_'),
    weekdaysShort: `Нд_Пн_Вт_Ср_Чт_Пт_Сб`.split('_'),
    weekdaysMin: `Нд_Пн_Вт_Ср_Чт_Пт_Сб`.split('_')
});

dayjs.extend(customParseFormat);
const parseDate = (dateString) => {
    const parsedDate = dayjs(dateString, 'YYYY-MM-DDT HH:mm:ss')
    console.log("Parsed Date:", parsedDate.toString());
    return parsedDate;
};
const inputStyle = {
    minWidth: "100%", // Ви можете встановити більше значення, якщо потрібно
    marginBottom: 8,
};
const elseInputStyle = {
    minWidth: "100%", // Ви можете встановити більше значення, якщо потрібно
    marginTop: 11,
};

export const SecondBookingPage = () => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.ui.user);
    //const { bookingDetails } = useSelector(state => state.ui);
    const selectedTenantId = useSelector(state => state.ui.selectedTenantId);
    const { data: tenants, isLoading, error } = useGetTenantsFromOneUserQuery(user?.id);

    const {bookingDetails} = useSelector(state => state.ui);
    const { data: house, isLoadingHouse, isError } = useGetApartmentByIdQuery(bookingDetails.houseId);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDob] = useState(null);  // Для DatePicker використовується null як початкове значення
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [passportInfo, setPassportInfo] = useState('');


    // Якщо bookingDetails існує, продовжуйте використання даних
    console.log(bookingDetails);
    console.log(tenants);

    useEffect(() => {
        if (selectedTenantId && tenants) {
            const selectedTenant = tenants.find(tenant => tenant.id === selectedTenantId);
            if (selectedTenant) {
                setFirstName(selectedTenant.person.name);
                setLastName(selectedTenant.person.surname);
                setDob(parseDate(selectedTenant.person.date_of_birth));

                setEmail(selectedTenant.person.email);
                setPhone(selectedTenant.person.phone);
                setPassportInfo(selectedTenant.passport_info);
            }
        } else {
            setFirstName('');
            setLastName('');
            setDob(null);
            setEmail('');
            setPhone('');
        }

    }, [selectedTenantId, tenants]);
    if (!bookingDetails) {
        return <p>Error: Booking details not found!</p>; // Або будь-яка інша обробка помилки
    }
    const handleContinueClick = () => {
        console.log("Continue to Book button clicked");

    };

    const handleChange = (event) => {
        dispatch(uiActions.setSelectedTenantId(event.target.value));
    };

    if (isLoading) return <p>Завантаження...</p>;
    if (!user) return <p>Завантаження даних користувача...</p>;
    const location = house.address.country + ", " + house.address.city;
    return (
        <div className='main-container'>
            <MainHeader/>
            <div className='booking-header'>
                <span className='booking-information'>Booking Information</span>
                <span className='fill-up-fields'>
        Please fill up the blank fields below
            </span>
            </div>
            <div className='booking-info-inputs'>
                <div className='booking-info'>
                    <div className='container-booking-info'/>
                    <div className='flex-column-cd'>
                        <span className='podo-wae'>{house.house_name}</span>
                        <span className='madiun-indonesia'>{location}</span>
                    </div>
                    <div className='price-info'>
                        <div className='podo-wae'>Booking details</div>
                        <span className='usd'>${bookingDetails.sum} USD</span>
                        <span className='per'> per </span>
                        <span className='usd-1'>{bookingDetails.nights} nights</span>
                    </div>
                    <div className='check-in-check-out'>
                        {dayjs(bookingDetails.startDate).format('DD MMMM YYYY')} - {dayjs(bookingDetails.endDate).format('DD MMMM YYYY')}
                    </div>

                </div>
                <hr className='hr-booking'/>
                <div className='booking-inputs'>
                    {tenants && tenants.length > 0 && (
                        <Box sx={{minWidth: 120}}>
                            <FormControl fullWidth>
                                <InputLabel id="tenant-select-label">Tenant</InputLabel>
                                <Select
                                    labelId="tenant-select-label"
                                    id="tenant-select"
                                    value={selectedTenantId || ''}
                                    label="Tenant"
                                    onChange={handleChange}

                                >
                                    {tenants.map(tenant => (
                                        <MenuItem key={tenant.id} value={tenant.id}>
                                            {tenant.person.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    )}

                    <span className='text-above-input'>Passport Info</span>
                    <TextField label="" variant='outlined' size='small' style={inputStyle} value={passportInfo}
                               onChange={e => setPassportInfo(e.target.value)}/>
                </div>
            </div>

            <div className='booking-buttons'>
                <div className='booking-cancel'>
                    <span className='cancel'>Cancel</span>
                </div>
                <div className='booking-next'>
                    <span className='continue-to-book' onClick={handleContinueClick}>Continue to Book</span>
                </div>
            </div>
        </div>
    );
}
