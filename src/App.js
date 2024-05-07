import './App.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {Login} from "./pages/Login";
import {
    Routes,
    Route,
    Navigate, BrowserRouter,
} from "react-router-dom";
import {Home} from "./pages/Home";
import {HousePage} from "./pages/HousePage";
import {CataloguePage} from "./pages/CataloguePage";
import {Provider, useDispatch} from "react-redux";
import {store} from "./store/store";
import {SignUp} from "./pages/SignUp";
import {FirstBookingPage} from "./pages/FirstBookingPage";
import {AdminPage} from "./pages/AdminPage/AdminPage";
import {LandlordRegistration} from "./pages/LandlordRegistration";
import {SecondBookingPage} from "./pages/SecondBookingPage";
import {EndBookingPage} from "./pages/EndBookingPage";
import {UserProfile} from "./pages/UserProfile/UserProfile";
import {useEffect} from "react";
import {uiActions} from "./store/slices/ui.slice";
import {useGetAuthTokenMutation} from "./store/api/api";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        const login=async () => {
            const res = await fetch('http://localhost:3001/auth/profile', {
                headers: {
                    authorization: "Bearer " + localStorage.getItem('token')
                }
            });
            if (res.error) {
                return;
            }
            const user = await res.json()


            dispatch(uiActions.setUser(user))
        }
        login();
    }, []);
    return (

            <div className='main-container'>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<Home/>}></Route>
                        <Route path='/login' element={<Login/>}></Route>
                        <Route path='/housepage' element={<HousePage/>}></Route>
                        <Route path='/catalogue' element={<CataloguePage/>}></Route>
                        <Route path='/catalogue/:id' element={<HousePage/>}></Route>
                        <Route path='/signup' element={<SignUp/>}></Route>
                        <Route path='/book' element={<FirstBookingPage/>}></Route>
                        <Route path='/admin' element={<AdminPage/>}></Route>
                        <Route path='/landlordreg' element={<LandlordRegistration/>}></Route>
                        <Route path='/book2' element={<SecondBookingPage/>}></Route>
                        <Route path='/endbooking' element={<EndBookingPage/>}></Route>
                        <Route path='/profile' element={<UserProfile/>}></Route>
                    </Routes>
                </BrowserRouter>
            </div>

    );
}

export default App;
