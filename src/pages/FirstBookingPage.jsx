import React, {useEffect, useState} from "react";
import './FirstBookingPage.css'
import {
    Box,
    Dialog, DialogActions,
    DialogContent, DialogContentText,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from "@mui/material";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {uiActions} from "../store/slices/ui.slice";
import {useDispatch, useSelector} from "react-redux";
import {
    useGetApartmentByIdQuery,
    useGetTenantsFromOneUserQuery,
    useCreateTenantMutation,
    useCreateBookingMutation, useCreatePaymentMutation
} from "../store/api/api";
import {MainHeader} from "../components/mainHeader";
import dayjs from 'dayjs';
import 'dayjs/locale/uk';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import updateLocale from 'dayjs/plugin/updateLocale';
import {Link} from "react-router-dom";
import Button from "@mui/material/Button";
import {useNavigate} from 'react-router-dom';
import {addDays} from "date-fns";
import utc from 'dayjs-plugin-utc';
import { format } from 'date-fns';

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
dayjs.extend(utc);
const parseDate = (dateString) => {
    if (!dateString) return null;
    const parsedDate = dayjs(dateString).utc(true);
    return parsedDate.isValid() ? parsedDate : null;
};


const inputStyle = {
    minWidth: "100%", // Ви можете встановити більше значення, якщо потрібно
    marginBottom: 8,
};
export const FirstBookingPage = () => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.ui.user);
    const selectedTenantId = useSelector(state => state.ui.selectedTenantId);
    const {data: tenants, isLoading, error} = useGetTenantsFromOneUserQuery(user?.id);

    const {bookingDetails} = useSelector(state => state.ui);
    const {data: house, isLoadingHouse, isError} = useGetApartmentByIdQuery(bookingDetails.houseId);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDob] = useState(null);  // Для DatePicker використовується null як початкове значення
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [passportInfo, setPassportInfo] = useState('');

    const [createTenant, {isLoading: isCreatingTenant, error: createTenantError}] = useCreateTenantMutation();
    const [createBooking, {isLoading: isCreatingBooking}] = useCreateBookingMutation();
    const [createPayment, {isLoading: isCreatingPayment}] = useCreatePaymentMutation();

    const [open, setOpen] = React.useState(false);
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const validateFields = () => {
        const newErrors = {};
        if (!firstName.trim()) newErrors.firstName = "First Name is required";
        if (!lastName.trim()) newErrors.lastName = "Last Name is required";
        if (!dob) newErrors.dob = "Date of Birth is required";
        if (!email.trim()) newErrors.email = "Email is required";
        if (!phone.trim()) newErrors.phone = "Phone is required";
        if (!passportInfo.trim()) newErrors.passportInfo = "Passport Info is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleClickOpen = () => {
        if (validateFields()) {
            setOpen(true);
        }
    };
    const handleAgreeClick = async () => {
        let usedTenantId = selectedTenantId;

        if (!selectedTenantId) {
            const tenantData = {
                userId: user?.id,
                name: firstName,
                surname: lastName,
                date_of_birth: dob ? dob.toISOString() : null,
                email: email,
                phone: phone,
                passport_info: passportInfo
            };

            try {
                const newTenant = await createTenant(tenantData).unwrap(); // unwrap() для отримання даних безпосередньо
                usedTenantId = newTenant.id; // Переконайтеся, що ваш backend повертає id новоствореного тенанта
            } catch (error) {
                console.error("Error creating tenant:", error);
                return;
            }
        }

        // Дані для створення бронювання
        const bookingData = {
            tenantId: usedTenantId, // Отриманий з попередньої логіки
            apartmentId: bookingDetails.houseId,
            created_at: new Date().toISOString(), // Приклад, може бути змінено
            check_in: bookingDetails.startDate,
            check_out: bookingDetails.endDate,
            price: bookingDetails.sum
        };

        try {
            const createdBooking = await createBooking(bookingData).unwrap();
            console.log("Booking created successfully!");
            createPaymentRecord(createdBooking);
            navigate('/endbooking');
            handleClose(); // Закриваємо діалог
        } catch (error) {
            console.error("Error creating booking:", error);
        }
        handleClose(); // Закриваємо діалог після виконання всіх операцій

    };
    const createPaymentRecord = async (booking) => {
        const paymentData = {
            bookingId: booking.id,
            sum: booking.price,
            created_at: new Date(),
        };

        try {
            const payment = await createPayment(paymentData).unwrap(); // Припускаючи, що у вас є така функція
            console.log("Payment recorded successfully", payment);
        } catch (error) {
            console.error("Error creating payment record:", error);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (selectedTenantId && tenants) {
            const selectedTenant = tenants.find(tenant => tenant.id === selectedTenantId);
            if (selectedTenant) {
                setFirstName(selectedTenant.person.name);
                setLastName(selectedTenant.person.surname);
                const datanarodzennya = addDays(selectedTenant.person.date_of_birth, 1);
                console.log(datanarodzennya)
                setDob(parseDate(addDays(selectedTenant.person.date_of_birth, 1)));

                setEmail(selectedTenant.person.email);
                setPhone(selectedTenant.person.phone);
                setPassportInfo(selectedTenant.person.passport_info);
            }
        } else {
            setFirstName('');
            setLastName('');
            setDob(null);
            setEmail('');
            setPhone('');
            setPassportInfo('');
        }

    }, [selectedTenantId, tenants]);
    useEffect(() => {
        console.log(selectedTenantId);  // Це виведе оновлений `selectedTenantId` після кожного оновлення
    }, [selectedTenantId]);

    if (!bookingDetails) {
        return <p>Error: Booking details not found!</p>; // Або будь-яка інша обробка помилки
    }
    if (isLoadingHouse) return <div>load</div>
    const handleContinueClick = () => {//додавання в базу даних
        console.log("Continue to Book button clicked");
    };

    const handleChange = (event) => {
        dispatch(uiActions.setSelectedTenantId(event.target.value || null));
    };

    if (isLoading) return <p>Завантаження...</p>;
    if (!user) return <p>Завантаження даних користувача...</p>;
    //const location = house.address.country + ", " + house.address.city;
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
                        <span className='podo-wae'>{house ? house.house_name : 'Loading...'}</span>
                        <span className='madiun-indonesia'>{house? house.address.country + ", " + house.address.city : ''}</span>
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
                        <Box sx={{minWidth: 120, marginBottom: 2}}>
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
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    )}
                    <div className='row-of-inputs'>
                        <div className='first_column-inputs'>
                            <span className='text-above-input'>First Name</span>
                            <TextField label="" error={!!errors.firstName}
                                       variant='outlined' size='small' disabled={!!selectedTenantId} style={inputStyle}
                                       value={firstName}
                                       onChange={e => setFirstName(e.target.value)}/>
                            <span className='text-above-input'>Last Name</span>
                            <TextField label="" error={!!errors.lastName}
                                       variant='outlined' size='small' disabled={!!selectedTenantId} style={inputStyle}
                                       value={lastName}
                                       onChange={e => setLastName(e.target.value)}/>
                            <span className='text-above-input'>Date Of Birth</span>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker label="" error={!!errors.dob}
                                            value={dob} onChange={setDob} disabled={!!selectedTenantId}
                                            renderInput={(params) => <TextField {...params} size='small'/>}
                                />
                            </LocalizationProvider>

                        </div>
                        <div className='second-column-inputs'>
                            <span className='text-above-input'>Email Address</span>
                            <TextField label="" error={!!errors.email}
                                       variant='outlined' size='small' disabled={!!selectedTenantId} style={inputStyle}
                                       value={email}
                                       onChange={e => setEmail(e.target.value)}/>
                            <span className='text-above-input'>Phone number</span>
                            <TextField label="" error={!!errors.phone}
                                       variant='outlined' size='small' disabled={!!selectedTenantId} style={inputStyle}
                                       value={phone}
                                       onChange={e => setPhone(e.target.value)}/>
                            <span className='text-above-input'>Passport Info</span>
                            <TextField label="" error={!!errors.passportInfo}
                                       variant='outlined' size='small' disabled={!!selectedTenantId} style={inputStyle}
                                       value={passportInfo}
                                       onChange={e => setPassportInfo(e.target.value)}/>
                        </div>
                    </div>
                    <div className='row-of-buttons'>
                        <div className='booking-cancel'>
                            <Link to={'/catalogue'} className='cancel'>Cancel</Link>
                        </div>
                        <div className='booking-next'>
                            <span className='continue-to-book' onClick={handleClickOpen}>Continue
                                to
                                Book</span>
                        </div>
                    </div>
                </div>
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Confirm this reservation?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        House: {house? house.house_name : ''}
                        <br/>
                        Location: {house? house.address.country: ''}, {house? house.address.city: ''}, {house? house.address.avenue: ''} st., {house? house.address.number_of_house: ''}
                        <br/>
                        Dates: {dayjs(bookingDetails.startDate).format('DD MMMM YYYY')} - {dayjs(bookingDetails.endDate).format('DD MMMM YYYY')}
                        <br/>
                        Total: ${bookingDetails.sum} for {bookingDetails.nights} nights
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handleAgreeClick} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
