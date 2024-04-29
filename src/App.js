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
import {Provider} from "react-redux";
import {store} from "./store/store";
import {SignUp} from "./pages/SignUp";
import {FirstBookingPage} from "./pages/FirstBookingPage";
import {AdminPage} from "./pages/AdminPage/AdminPage";
import {LandlordRegistration} from "./pages/LandlordRegistration";
import {SecondBookingPage} from "./pages/SecondBookingPage";
import {EndBookingPage} from "./pages/EndBookingPage";
import {UserProfile} from "./pages/UserProfile/UserProfile";

function App() {
    return (
        <Provider store={store}>
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
        </Provider>
    );
}

export default App;
