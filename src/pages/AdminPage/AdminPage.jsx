import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Analytics } from "../../components/Analytics";
import { MainHeader } from "../../components/mainHeader";
import './AdminPage.css';
import {LandlordTable} from "../../components/LandlordTable/LandlordTable";
import {ApartmentTable} from "../../components/ApartmentTable/ApartmentTable";
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
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

export const AdminPage = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <MainHeader/>
            <Box sx={{ width:'100%', heigh:'100%', flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}>
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
                    <Tab label="Analytics" {...a11yProps(0)} />
                    <Tab label="Landlords" {...a11yProps(1)} />
                    <Tab label="Apartments" {...a11yProps(2)} />
                </Tabs>
                <TabPanel value={value} index={0}>
                    <div className='analytic-tab'>
                        <Analytics/>
                    </div>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <LandlordTable/>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <ApartmentTable/>
                </TabPanel>
            </Box>
        </div>
    );
}
