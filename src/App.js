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

function App() {
    return (
        <div className='main-container'>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home/>}></Route>
                    <Route path='/login' element={<Login/>}></Route>
                    <Route path='/housepage' element={<HousePage/>}></Route>
                    <Route path='/catalogue' element={<CataloguePage/>}></Route>
                    <Route path='/catalogue/:id' element={<HousePage/>}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
