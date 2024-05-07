import React, {useEffect, useState} from "react";
import {
    TextField, Dialog, DialogActions, DialogContent, DialogContentText,
    DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead,
    TableRow, FormControl, InputLabel, Select, MenuItem, TablePagination
} from "@mui/material";
import {
    useCreateTenantMutation,
    useGetBookingsFromOneUserQuery,
    useGetLandlordsQuery, useGetReviewQuery, useGetReviewsByUserIdQuery,
    useGetTenantsFromOneUserQuery
} from "../../store/api/api";
import {format} from "date-fns";
import {useDispatch, useSelector} from "react-redux";
import {MainHeader} from "../../components/mainHeader";
import './UserProfile.css'
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {BookingList} from "../../components/BookingList/BookingList";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import Button from "@mui/material/Button";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";

function TabPanel(props) {
    const {children, value, index, ...other} = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const inputStyle = {
    minWidth: "100%",
    marginBottom: 8,
};

export const UserProfile = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.ui.user);
    console.log(user);
    const {data: bookings, isLoadingBookings, isErrorBookings} = useGetBookingsFromOneUserQuery(user?.id);
    const [userName, setUserName] = useState(user?.username);
    const [password, setPassword] = useState('');
    const [value, setValue] = useState(0);
    const [open, setOpen] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDob] = useState(null);  // Для DatePicker використовується null як початкове значення
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [passportInfo, setPassportInfo] = useState('');
    const [errors, setErrors] = useState({});
    const [createTenant, {isLoading: isCreatingTenant, error: createTenantError}] = useCreateTenantMutation();
    const [sortField, setSortField] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');
    const { data: reviews, isLoading: isLoadingReviews, isError: isErrorReviews } = useGetReviewsByUserIdQuery(user?.id);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    console.log(user)
    const { data: tenants, isLoading, error } = useGetTenantsFromOneUserQuery({
        id: user?.id,
        sortField,
        sortOrder
    });
    useEffect(() => {
        console.log(tenants);
    }, [tenants]);
    useEffect(() => {
        console.log(bookings);
    }, [bookings]);
    if (isLoading) return <div>is loading</div>;
    if (error) return <div>is error</div>;

    if (isLoadingBookings) return <div>is loading</div>;
    if (isErrorBookings) return <div>is error</div>;

    const transformedData = tenants.map(tenant => ({
        ...tenant.person,
        date_of_birth: format(new Date(tenant.person.date_of_birth), 'dd/MM/yyyy'),
        id: tenant.id
    }));

    const handleClickOpen = () => {

        setOpen(true);

    };

    const handleClose = () => {
        setOpen(false);
    };
    const columns = [
        {id: 'name', label: 'Name', minWidth: 120},
        {id: 'surname', label: 'Surname', minWidth: 150},
        {id: 'date_of_birth', label: 'Date of Birth', minWidth: 150},
        {id: 'phone', label: 'Phone', minWidth: 180},
        {id: 'email', label: 'Email', minWidth: 250},
        {id: 'passport_info', label: 'Passport Info', minWidth: 150},
    ];

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
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
            } catch (error) {
            console.error("Error creating tenant:", error);
            return;
        }
        handleClose();
    };

    const handleChangeSortField = (event) => {
        setSortField(event.target.value);
    };

    const handleChangeSortOrder = (event) => {
        setSortOrder(event.target.value);
    };
    return (
        <div className='page'>
            <MainHeader/>
            <Box sx={{width: '100%', heigh: '100%', flexGrow: 1, bgcolor: 'background.paper', display: 'flex'}}>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    sx={{
                        borderRight: 1,
                        borderColor: 'divider',
                        fontFamily: 'Poppins, var(--default-font-family)',
                        '& .Mui-selected': {
                            backgroundColor: 'common.white', // Задає колір фону для активної вкладки
                            color: '#3252df', // Задає колір тексту для активної вкладки
                            fontWeight: 'fontWeightBold', // Задає жирний шрифт для активної вкладки
                            fontFamily: 'Poppins, var(--default-font-family)'
                        }
                    }}
                >
                    <Tab label="User info" {...a11yProps(0)} />
                    <Tab label="Bookings" {...a11yProps(1)} />
                </Tabs>
                <TabPanel value={value} index={0}>
                    <div className='user-profile-main-component'>
                        {/*<div className='profile-text'>Profile</div>*/}

                        <div className='profile-text-tenants'>User info</div>
                        <hr className='hr-under-filters' style={{marginBottom: 20, marginTop: 10}}/>
                        <div className='row-of-user-inputs'>
                            <div className='row-of-user-inputs-firstcolumn'>
                                <span className='text-above-input'>User name</span>
                                <TextField label=""
                                           variant='outlined' size='small' style={{minWidth: "110%", marginBottom: 8,}}
                                           value={userName}
                                           onChange={e => setUserName(e.target.value)}/>
                            </div>
                            <div className='row-of-user-inputs-firstcolumn'>
                                <span className='text-above-input'>Password</span>
                                <TextField label=""
                                           variant='outlined' size='small' style={{minWidth: "120%", marginBottom: 8,}}
                                           value={password}
                                           onChange={e => setPassword(e.target.value)}/>
                            </div>
                            <div className='row-of-user-inputs-thirdcolumn'>
                                <div className='booking-next'>
                                    <span className='continue-to-book' onClick={handleClickOpen}>Update</span>
                                </div>
                            </div>
                        </div>

                        <div className='row-of-filters'>
                            <div className='profile-text-tenants' style={{flex: 1}}>Tenants</div>
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
                                    <span className='button-add' onClick={handleClickOpen}>+ Add tenant</span>
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
                            <TablePagination
                                rowsPerPageOptions={[10, 15, 25, { label: 'All', value: -1 }]}
                                component="div"
                                count={tenants.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Paper>
                    </div>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <div className='user-profile-main-component'>
                        <div className='profile-text-tenants'>Bookings</div>
                        <hr className='hr-under-filters' style={{marginBottom: 20, marginTop: 10}}/>
                        {bookings && <BookingList data={bookings}></BookingList>}
                    </div>
                </TabPanel>
            </Box>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: handleSubmit
                }}
            >
                <DialogTitle>Add tenant</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To add some tenant, please enter your details here.
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
                                       variant='outlined' size='small' style={inputStyle}
                                       value={email}
                                       onChange={e => setEmail(e.target.value)}/>
                            <span className='text-above-input'>Phone number</span>
                            <TextField label="" error={!!errors.phone}
                                       variant='outlined' size='small' style={inputStyle}
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