import React, {useEffect, useState} from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent, DialogContentText,
    DialogTitle, FormControl, InputLabel, MenuItem,
    Paper, Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead, TablePagination,
    TableRow, TextField
} from "@mui/material";
import './LandlordTable.css'
import {Link} from "react-router-dom";
import {
    useCreateLandlordMutation,
    useCreateTenantMutation,
    useGetApartmentByIdQuery,
    useGetLandlordsQuery, useGetSortedLandlordsQuery
} from "../../store/api/api";
import {format} from "date-fns";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const inputStyle = {
    minWidth: "100%", // Ви можете встановити більше значення, якщо потрібно
    marginBottom: 8,
};

export const LandlordTable = () => {

    const [open, setOpen] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDob] = useState(null);  // Для DatePicker використовується null як початкове значення
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [passportInfo, setPassportInfo] = useState('');
    const [errors, setErrors] = useState({});
    const [createLandlord, {isLoading: isCreatingLandlord, error: createLandlordError}] = useCreateLandlordMutation();
    const [sortField, setSortField] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');
    const [refresh, setRefresh] = useState(0);
    const { data: landlords, isLoading, isError } = useGetSortedLandlordsQuery({
        sortField,
        sortOrder
    });
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    useEffect(() => {
        if (landlords && isError) {
            console.error('Error fetching landlords');
            console.log(landlords)
        }
    }, [landlords, isError]);

    const transformedData = landlords?.map(landlord => ({
        ...landlord.person,
        date_of_birth: format(new Date(landlord.person.date_of_birth), 'dd/MM/yyyy'),
        id: landlord.id
    })) || [];
    if(isLoading) return <div>is loading</div>;
    if (isError) return <div>is error</div>;

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
    const handleChangeSortField = (event) => {
        setSortField(event.target.value);
    };

    const handleChangeSortOrder = (event) => {
        setSortOrder(event.target.value);
    };
    return (
        <div className='landlord-table-main-component'>
            <div className='row-of-filters'>
                <div className='container-of-button-add'>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <FormControl size="small">
                            <InputLabel id="sort-field-label">Sort By</InputLabel>
                            <Select labelId="sort-field-label" id="sort-field" value={sortField} label="Sort By" onChange={handleChangeSortField}>
                                <MenuItem value="name">Name</MenuItem>
                                <MenuItem value="surname">Surname</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl size="small">
                            <InputLabel id="sort-order-label">Order</InputLabel>
                            <Select labelId="sort-order-label" id="sort-order" value={sortOrder} label="Order" onChange={handleChangeSortOrder}>
                                <MenuItem value="asc">Ascending</MenuItem>
                                <MenuItem value="desc">Descending</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
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
                            {transformedData.map((row, index) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id|| index}>
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
                <TablePagination
                    rowsPerPageOptions={[10, 15, 25, { label: 'All', value: -1 }]}
                    component="div"
                    count={landlords.length}
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
