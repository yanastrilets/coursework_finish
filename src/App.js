import './App.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {MainHeader} from './mainHeader';
import houseBlock from "./houseBlock";
import mainFooter from "./mainFooter";
import {HouseBlock} from "./houseBlock";
import psyacha_dushova from "./assets/images/karpaty_lviv.jpg";
import {Login} from "./Login";
import {
    Routes,
    Route,
    Navigate, BrowserRouter,
} from "react-router-dom";
import {Home} from "./Home";
/*import Login from "./Login";*/

function App() {


    return (
        <div className='main-container'>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home/>}></Route>
                    <Route path='/login' element={<Login/>}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
