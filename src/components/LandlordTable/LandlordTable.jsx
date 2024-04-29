import React, {useEffect, useState} from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent, DialogContentText,
    DialogTitle,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, TextField
} from "@mui/material";
import './LandlordTable.css'
import {Link} from "react-router-dom";
import {
    useCreateLandlordMutation,
    useCreateTenantMutation,
    useGetApartmentByIdQuery,
    useGetLandlordsQuery
} from "../../store/api/api";
import {format} from "date-fns";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import Button from "@mui/material/Button";

function createData(name, surname, dateOfBirth, phone, email, passportInfo) {
    return { name, surname, dateOfBirth, phone, email, passportInfo };
}

const rows = [
    createData('John', 'Doe', '1980-02-15', '+1234567890', 'john.doe@example.com', 'AB1234567'),
    createData('Alice', 'Smith', '1975-06-01', '+0987654321', 'alice.smith@example.com', 'CD7654321'),
    // Add more rows as needed
];
const inputStyle = {
    minWidth: "100%", // Ви можете встановити більше значення, якщо потрібно
    marginBottom: 8,
};

export const LandlordTable = () => {
    const { data: landlords, isLoading, isError } = useGetLandlordsQuery();

    const [open, setOpen] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDob] = useState(null);  // Для DatePicker використовується null як початкове значення
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [passportInfo, setPassportInfo] = useState('');
    const [errors, setErrors] = useState({});
    const [createLandlord, {isLoading: isCreatingLandlord, error: createLandlordError}] = useCreateLandlordMutation();

    useEffect(() => {
        console.log(landlords);
    }, [landlords]);
    if(isLoading) return <div>is loading</div>;
    if (isError) return <div>is error</div>;
    const transformedData = landlords.map(landlord => ({
        ...landlord.person, // Spread properties of 'person' into the new object
        date_of_birth: format(new Date(landlord.person.date_of_birth), 'dd/MM/yyyy'), // Formatting the date
        id: landlord.id // Maintain 'id' from the original landlord object if needed
    }));
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const landlordData = {
            name: firstName,
            surname: lastName,
            date_of_birth: dob ? dob.toISOString() : null,
            email: email,
            phone: phone,
            passport_info: passportInfo
        };

        try {
            const newTenant = await createLandlord(landlordData).unwrap(); // unwrap() для отримання даних безпосередньо
            // Переконайтеся, що ваш backend повертає id новоствореного тенанта
        } catch (error) {
            console.error("Error creating tenant:", error);
            return;
        }
        handleClose();
    };
    const columns = [
        { id: 'name', label: 'Name', minWidth: 120 },
        { id: 'surname', label: 'Surname', minWidth: 150 },
        { id: 'date_of_birth', label: 'Date of Birth', minWidth: 150 },
        { id: 'phone', label: 'Phone', minWidth: 180 },
        { id: 'email', label: 'Email', minWidth: 250 },
        { id: 'passport_info', label: 'Passport Info', minWidth: 150 },
    ];
    return (
        <div className='landlord-table-main-component'>
            <div className='row-of-filters'>
                <div className='container-of-button-add'>
                    <div className='bg-button-add'>
                        <span className='button-add' onClick={handleClickOpen}>+ Add landlord</span>
                    </div>
                </div>
            </div>
            <hr className='hr-under-filters' style={{marginBottom: 20}}/>
            <Paper sx={{width: '100%', overflow: 'hidden'}}>
                <TableContainer sx={{maxHeight: 500}}>
                <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{
                                            minWidth: column.minWidth,
                                            fontWeight: 'bold',
                                            fontFamily: 'Poppins, var(--default-font-family)',
                                        }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {transformedData.map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}
                                                           style={{fontFamily: 'Poppins, var(--default-font-family)',}}>
                                                    {value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: handleSubmit
                }}
            >
                <DialogTitle>Add landlord</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To add some landlord, please enter your details here.
                    </DialogContentText>
                    <div className='row-of-inputs'>
                        <div className='first_column-inputs'>
                            <span className='text-above-input'>First Name</span>
                            <TextField label="" error={!!errors.firstName}
                                       variant='outlined' size='small' style={inputStyle}
                                       value={firstName}
                                       onChange={e => setFirstName(e.target.value)}/>
                            <span className='text-above-input'>Last Name</span>
                            <TextField label="" error={!!errors.lastName}
                                       variant='outlined' size='small' style={inputStyle}
                                       value={lastName}
                                       onChange={e => setLastName(e.target.value)}/>
                            <span className='text-above-input'>Date Of Birth</span>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker label="" error={!!errors.dob}
                                            value={dob} onChange={setDob}
                                            renderInput={(params) => <TextField {...params} size='small'/>}
                                />
                            </LocalizationProvider>

                        </div>
                        <div className='second-column-inputs'>
                            <span className='text-above-input'>Email Address</span>
                            <TextField label="" error={!!errors.email}
                                       variant='outlined' size='small'  style={inputStyle}
                                       value={email}
                                       onChange={e => setEmail(e.target.value)}/>
                            <span className='text-above-input'>Phone number</span>
                            <TextField label="" error={!!errors.phone}
                                       variant='outlined' size='small'  style={inputStyle}
                                       value={phone}
                                       onChange={e => setPhone(e.target.value)}/>
                            <span className='text-above-input'>Passport Info</span>
                            <TextField label="" error={!!errors.passportInfo}
                                       variant='outlined' size='small' style={inputStyle}
                                       value={passportInfo}
                                       onChange={e => setPassportInfo(e.target.value)}/>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Add</Button>
                </DialogActions>
            </Dialog>
        </div>

    );
}
