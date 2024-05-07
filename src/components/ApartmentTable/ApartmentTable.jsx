import React, {useState} from 'react';
import {
    Box,
    Dialog,
    DialogActions,
    DialogContent, DialogContentText,
    DialogTitle, FormControl, InputLabel, MenuItem,
    Paper, Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, TextField
} from "@mui/material";
import './ApartmentTable.css'
import {
    useCreateLandlordMutation,
    useGetApartmentsQuery,
    useCreateApartmentMutation,
    useGetLandlordsQuery, useGetSortedApartmentsQuery, useGetApartmentCSVQuery
} from "../../store/api/api";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import Button from "@mui/material/Button";
import {message} from "antd";
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
import {useDispatch, useSelector} from "react-redux";
import {uiActions} from "../../store/slices/ui.slice";
import {TablePagination} from "@mui/material";
import {Link} from "react-router-dom";

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
export const ApartmentTable = () => {

    const [open, setOpen] = useState(false);
    const [numOfHouse, setNumOfHouse] = useState('');
    const [numOfFlat, setNumOfFlat] = useState('');
    const [countOfRoom, setCountOfRoom] = useState('');
    const [countOfBath, setCountOfBath] = useState('');
    const [countOfKitchen, setCountOfKitchen] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [avenue, setAvenue] = useState('');
    const [houseName, setHouseName] = useState('');
    const [houseDescription, setHouseDescription] = useState('');
    const [pricePerNight, setPricePerNight] = useState('');
    const [errors, setErrors] = useState({});
    const [fileList, setFileList] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [createApartment, {isLoading: isCreatingLandlord, error: createLandlordError}] = useCreateApartmentMutation();
    const dispatch = useDispatch();
    const { data: landlords, isLoadingLand, errorLand } = useGetLandlordsQuery();
    const selectedLandlordId = useSelector(state => state.ui.selectedLandlordId);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [sortField, setSortField] = useState('house_name');
    const [sortOrder, setSortOrder] = useState('asc');
    const {data: apartments, isLoading, isError} = useGetSortedApartmentsQuery({
        sortField,
        sortOrder
    });
    const { data, error, isLoadingCSV } = useGetApartmentCSVQuery();
    const safeApartments = apartments || [];

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, safeApartments.length - page * rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handleChange = (event) => {
        dispatch(uiActions.setSelectedLandlordId(event.target.value || null));
    };

    if (isLoadingLand) return <p>Loading...</p>;
    if (errorLand) return <p>Error loading landlords!</p>;
    if (isLoading) return <div>is loading</div>;
    if (isError) return <div>is error</div>;
    const handleSubmit = async (e) => {
        e.preventDefault();
        const apartmentData = {
            house_name: houseName,
            description: houseDescription,
            country: country,
            city: city,
            avenue: avenue,
            number_of_house: numOfHouse,
            number_of_flat: numOfFlat,
            count_of_room: countOfRoom,
            count_of_bathroom: countOfBath,
            count_of_kitchen: countOfKitchen,
            price_per_night: pricePerNight,
            landlordId: selectedLandlordId
        };
        const formData = new FormData();
        fileList.forEach((file) => {
            formData.append('files[]', file);
        });
        setUploading(true);

        try {
            const newApartment = await createApartment(apartmentData).unwrap(); // unwrap() для отримання даних безпосередньо

        } catch (error) {
            console.error("Error creating tenant:", error);
            return;
        }
        handleClose();
    };
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleExport = () => {
        console.log(data)
        if (data) {
            const url = window.URL.createObjectURL(data);
            const a = document.createElement('a');
            a.href = url;
            a.download = "apartments.csv";
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        }
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
    const transformedData = safeApartments.map(apartment => ({
        ...apartment, // Spread properties of 'person' into the new object
        price_per_night: "$" + apartment.price_per_night,
        final_price: "$" + apartment.final_price,
        address: apartment.address.country + ", " + apartment.address.city + ", " + apartment.address.avenue + ", " + apartment.address.number_of_house,
        landlord: apartment.landlord.person.name + " " + apartment.landlord.person.surname,
        id: apartment.id // Maintain 'id' from the original landlord object if needed
    }));
    const inputStyle = {
        minWidth: "100%",
        marginBottom: 8,
    };
    const inputStyle2 = {
        maxWidth: "50%",
        marginBottom: 8,
        minWidth: "45%",
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
    const handleChangeSortField = (event) => {
        setSortField(event.target.value);
    };

    const handleChangeSortOrder = (event) => {
        setSortOrder(event.target.value);
    };

    return (
        <div className='apartment-table-main-component'>
            <div className='row-of-filters'>
                <Box sx={{display: 'flex', gap: 2}}>
                    <FormControl size="small">
                        <InputLabel id="sort-field-label">Sort By</InputLabel>
                        <Select labelId="sort-field-label" id="sort-field" value={sortField} label="Sort By"
                                onChange={handleChangeSortField}>
                            <MenuItem value="house_name">House name</MenuItem>
                            <MenuItem value="price_per_night">Price</MenuItem>
                            <MenuItem value="count_of_room">Bedrooms</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl size="small">
                        <InputLabel id="sort-order-label">Order</InputLabel>
                        <Select labelId="sort-order-label" id="sort-order" value={sortOrder} label="Order"
                                onChange={handleChangeSortOrder}>
                            <MenuItem value="asc">Ascending</MenuItem>
                            <MenuItem value="desc">Descending</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <div className='container-of-button-add'>
                    <Link to={`http://localhost:3001/apartment/download`} className='bg-button-add'>
                        <span className='button-add' onClick={handleExport}>Export</span>
                    </Link>
                </div>
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
                                        style={{ minWidth: column.minWidth, fontWeight: 'bold', fontFamily: 'Poppins, var(--default-font-family)' }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(rowsPerPage > 0
                                    ? transformedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : transformedData
                            ).map((row) => (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.houseName}>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            ))}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 15, 25, { label: 'All', value: -1 }]}
                    component="div"
                    count={apartments.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
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
                    <Box sx={{ minWidth: 120, marginBottom: 5, marginTop: 2}}>
                        <
                            FormControl fullWidth>
                            <InputLabel id="landlord-select-label">Landlord</InputLabel>
                            <Select
                                labelId="landlord-select-label"
                                id="landlord-select"
                                value={selectedLandlordId}
                                label="Landlord"
                                onChange={handleChange}
                            >
                                {landlords && landlords.map(landlord => (
                                    <MenuItem key={landlord.id} value={landlord.id}>
                                        {landlord.person.name + " " + landlord.person.surname}
                                    </MenuItem>
                                ))}

                            </Select>
                        </FormControl>
                    </Box>
                    <div className='apartment-row-of-inputs'>
                        <div className='apartment-first-column-inputs'>
                            <span className='apartment-text-above-input'>House name</span>
                            <TextField label="" error={!!errors.apartmentFirstName}
                                       variant='outlined' size='small' style={inputStyle}
                                       value={houseName}
                                       onChange={e => setHouseName(e.target.value)}/>
                            <span className='apartment-text-above-input'>House description</span>
                            <textarea
                                aria-label="minimum height"
                                placeholder=" "
                                value={houseDescription}
                                style={{minWidth: '100%', minHeight: '190px', borderColor: '#B0B8C4'}}
                                onChange={e => setHouseDescription(e.target.value)}
                            />
                            <div className='apartment-div-number-of-flat-house'>
                                <div className='apartment-div-number-of-flat-house-text'>
                                    <span className='apartment-text-above-input'>Room</span>
                                    <TextField label="" error={!!errors.apartmentPassportInfo}
                                               variant='outlined' size='small' style={inputStyle2}
                                               value={countOfRoom}
                                               onChange={e => setCountOfRoom(e.target.value)}/>
                                </div>
                                <div className='apartment-div-number-of-flat-house-text'>
                                    <span className='apartment-text-above-input'>Bath</span>
                                    <TextField label="" error={!!errors.apartmentPassportInfo}
                                               variant='outlined' size='small' style={inputStyle2}
                                               value={countOfBath}
                                               onChange={e => setCountOfBath(e.target.value)}/>
                                </div>
                                <div className='apartment-div-number-of-flat-house-text'>
                                    <span className='apartment-text-above-input'>Kitchen</span>
                                    <TextField label="" error={!!errors.apartmentPassportInfo}
                                               variant='outlined' size='small' style={inputStyle2}
                                               value={countOfKitchen}
                                               onChange={e => setCountOfKitchen(e.target.value)}/>
                                </div>
                            </div>
                        </div>
                        <div className='apartment-second-column-inputs'>
                            <span className='apartment-text-above-input'>Country</span>
                            <TextField label="" error={!!errors.apartmentEmail}
                                       variant='outlined' size='small' style={inputStyle}
                                       value={country}
                                       onChange={e => setCountry(e.target.value)}/>
                            <span className='apartment-text-above-input'>City</span>
                            <TextField label="" error={!!errors.apartmentPhone}
                                       variant='outlined' size='small' style={inputStyle}
                                       value={city}
                                       onChange={e => setCity(e.target.value)}/>
                            <span className='apartment-text-above-input'>Avenue</span>
                            <TextField label="" error={!!errors.apartmentPassportInfo}
                                       variant='outlined' size='small' style={inputStyle}
                                       value={avenue}
                                       onChange={e => setAvenue(e.target.value)}/>

                            <div className='apartment-div-number-of-flat-house'>
                                <div className='apartment-div-number-of-flat-house-text'>
                                    <span className='apartment-text-above-input'>Num of House</span>
                                    <TextField label="" error={!!errors.apartmentPassportInfo}
                                               variant='outlined' size='small' style={inputStyle2}
                                               value={numOfHouse}
                                               onChange={e => setNumOfHouse(e.target.value)}/>
                                </div>
                                <div className='apartment-div-number-of-flat-house-text'>
                                    <span className='apartment-text-above-input'>Num of Flat</span>
                                    <TextField label="" error={!!errors.apartmentPassportInfo}
                                               variant='outlined' size='small' style={inputStyle2}
                                               value={numOfFlat}
                                               onChange={e => setNumOfFlat(e.target.value)}/>
                                </div>
                            </div>
                            <span className='apartment-text-above-input'>Price per night</span>
                            <TextField label="" error={!!errors.apartmentPassportInfo}
                                       variant='outlined' size='small' style={inputStyle}
                                       value={pricePerNight}
                                       onChange={e => setPricePerNight(e.target.value)}/>
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
