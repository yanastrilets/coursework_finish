import React, {useState} from 'react';
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
import './ApartmentTable.css'
import {useCreateLandlordMutation, useGetApartmentsQuery} from "../../store/api/api";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import Button from "@mui/material/Button";
import {message} from "antd";
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';

const blue = {
    100: '#DAECFF',
    200: '#b6daff',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
};

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};
function createData(houseName, pricePerNight, finalPrice, address, bedrooms, landlord) {
    return { houseName, pricePerNight, finalPrice, address, bedrooms, landlord };
}

const rows = [
    createData('Ocean View', '$200', '$600', '123 Beach Ave, Miami', 3, 'Джон Доу'),
    createData('Mountain Retreat', '$150', '$450', '456 Hill Rd, Denver', 2, 'Еліс Купер'),
    // Додайте більше рядків за потребою
];

export const ApartmentTable = () => {
    const {data: apartments, isLoading, isError} = useGetApartmentsQuery();

    const [open, setOpen] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [numOfHouse, setNumOfHouse] = useState('');
    const [numOfFlat, setNumOfFlat] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [avenue, setAvenue] = useState('');
    const [houseName, setHouseName] = useState('');
    const [houseDescription, setHouseDescription] = useState('');
    const [errors, setErrors] = useState({});
    const [fileList, setFileList] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [createLandlord, {isLoading: isCreatingLandlord, error: createLandlordError}] = useCreateLandlordMutation();
    if(isLoading) return <div>is loading</div>;
    if (isError) return <div>is error</div>;
    const handleSubmit = async (e) => {
        e.preventDefault();
        const apartmentData = {
            houseName: houseName,
            houseDescription: houseDescription,
            country: country,
            city: city,
            avenue: avenue,
            numOfHouse: numOfHouse,
            numOfFlat: numOfFlat
        };
        const formData = new FormData();
        fileList.forEach((file) => {
            formData.append('files[]', file);
        });
        setUploading(true);

        try {
            const newTenant = await createLandlord(apartmentData).unwrap(); // unwrap() для отримання даних безпосередньо
            // Переконайтеся, що ваш backend повертає id новоствореного тенанта
        } catch (error) {
            console.error("Error creating tenant:", error);
            return;
        }
        handleClose();
    };
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const columns = [
        { id: 'house_name', label: 'House name', minWidth: 170 },
        { id: 'price_per_night', label: 'Price per nignt', minWidth: 80 },
        { id: 'final_price', label: 'Final price', minWidth: 80 },
        { id: 'address', label: 'Address', minWidth: 250 },
        { id: 'count_of_room', label: 'Bedrooms', minWidth: 80 },
        { id: 'landlord', label: 'Landlord', minWidth: 180 },
    ];
    const transformedData = apartments.map(apartment => ({
        ...apartment, // Spread properties of 'person' into the new object
        price_per_night: "$" + apartment.price_per_night,
        final_price: "$" + apartment.final_price,
        address: apartment.address.country + ", " + apartment.address.city + ", " + apartment.address.avenue + ", " + apartment.address.number_of_house,
        landlord: apartment.landlord.person.name + " " + apartment.landlord.person.surname,
        id: apartment.id // Maintain 'id' from the original landlord object if needed
    }));
    const inputStyle = {
        minWidth: "100%", // Ви можете встановити більше значення, якщо потрібно
        marginBottom: 8,
    };


    const handleUpload = () => {
        const formData = new FormData();
        fileList.forEach((file) => {
            formData.append('files[]', file);
        });
        setUploading(true);
        // You can use any AJAX library you like
        fetch('https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload', {
            method: 'POST',
            body: formData,
        })
            .then((res) => res.json())
            .then(() => {
                setFileList([]);
                message.success('upload successfully.');
            })
            .catch(() => {
                message.error('upload failed.');
            })
            .finally(() => {
                setUploading(false);
            });
    };
    const props = {
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: (file) => {
            setFileList([...fileList, file]);
            return false;
        },
        fileList,
    };
    const Textarea = styled('textarea')(({ theme }) => ({
        boxSizing: 'border-box',
        width: '100%',
        fontFamily: 'IBM Plex Sans, sans-serif',
        fontSize: '16px',
        fontWeight: '400',
        lineHeight: 1.5,
        padding: '12px',
        borderRadius: '12px',
        color: theme.palette.mode === 'dark' ? grey[300] : grey[900],
        background: theme.palette.mode === 'dark' ? grey[900] : '#fff',
        border: `1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]}`,
        boxShadow: `0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]}`,
        '&:hover': {
            borderColor: grey[800],
        },
        '&:focus': {
            outline: 'none',
            borderColor: blue[400],
            boxShadow: `0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]}`,
        }
    }));

    return (
        <div className='apartment-table-main-component'>
            <div className='row-of-filters'>
                <div className='container-of-button-add'>
                    <div className='bg-button-add'>
                        <span className='button-add' onClick={handleClickOpen}>+ Add apartment</span>
                    </div>
                </div>
            </div>
            <hr className='hr-under-filters' style={{marginBottom: 20}}/>
            <Paper sx={{width: '100%', overflow: 'hidden'}}>
                <TableContainer sx={{maxHeight: 440}}>
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
                                        }} // Applying bold font style
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {transformedData.map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.houseName}>
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
                // sx={{width:800, justifyContent:}}
            >
                <DialogTitle>Add apartment</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To add some apartment, please enter your details here.
                    </DialogContentText>
                    <div className='row-of-inputs'>
                        <div className='first_column-inputs'>
                            <span className='text-above-input'>House name</span>
                            <TextField label="" error={!!errors.firstName}
                                       variant='outlined' size='small' style={inputStyle}
                                       value={houseName}
                                       onChange={e => setHouseName(e.target.value)}/>
                            <span className='text-above-input'>House description</span>
                            <Textarea
                                aria-label="minimum height"
                                minRows={7}
                                placeholder="Enter..."
                                value={houseDescription}
                                onChange={e => setHouseDescription(e.target.value)}
                            />
                        </div>
                        <div className='second-column-inputs'>
                            <span className='text-above-input'>Country</span>
                            <TextField label="" error={!!errors.email}
                                       variant='outlined' size='small' style={inputStyle}
                                       value={country}
                                       onChange={e => setCountry(e.target.value)}/>
                            <span className='text-above-input'>City</span>
                            <TextField label="" error={!!errors.phone}
                                       variant='outlined' size='small' style={inputStyle}
                                       value={city}
                                       onChange={e => setCity(e.target.value)}/>
                            <span className='text-above-input'>Avenue</span>
                            <TextField label="" error={!!errors.passportInfo}
                                       variant='outlined' size='small' style={inputStyle}
                                       value={avenue}
                                       onChange={e => setAvenue(e.target.value)}/>

                            <span className='text-above-input'>Number of House/Flat</span>
                            <div className='div-number-of-flat-house'>
                                <TextField label="" error={!!errors.passportInfo}
                                           variant='outlined' size='small' style={inputStyle}
                                           value={numOfHouse}
                                           onChange={e => setNumOfHouse(e.target.value)}/>
                                <TextField label="" error={!!errors.passportInfo}
                                           variant='outlined' size='small' style={inputStyle}
                                           value={numOfFlat}
                                           onChange={e => setNumOfFlat(e.target.value)}/>
                            </div>

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
