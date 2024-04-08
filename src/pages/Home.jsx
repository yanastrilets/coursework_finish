import '../App.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {MainHeader} from '../components/mainHeader';
import houseBlock from "../components/houseBlock";
import {MainFooter} from "../components/MainFooter";
import {HouseBlock} from "../components/houseBlock";
import psyacha_dushova from "../assets/images/karpaty_lviv.jpg";

import housesData from "../data/houses.json";
export const Home = () => {
    const blocks = [1, 2, 3];
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1
    };
    const housesData2 = [
        {
            price: "$120",
            houseName: "Cozy Cabin",
            location: "Aspen, Colorado",
            img: psyacha_dushova
        },
        {
            price: "$200",
            houseName: "Beachfront Villa",
            location: "Malibu, California",
            img: psyacha_dushova
        },
        {
            price: "$90",
            houseName: "Country Cottage",
            location: "Savannah, Georgia",
            img: psyacha_dushova
        },
        {
            price: "$150",
            houseName: "Mountain Lodge",
            location: "Boulder, Colorado",
            img: psyacha_dushova
        },
        {
            price: "$250",
            houseName: "Urban Flat",
            location: "New York, New York",
            img: psyacha_dushova
        },
    ];
    return <div>
        <MainHeader/>

        <div className='slider-row'>
            <div className='w-3/4 m-auto'>
                <Slider {...settings}>
                    {housesData.housesData.map((house, index) => (
                        <HouseBlock key={index}
                            data={house}

                            // key={index}
                            // price={house.price}
                            // houseName={house.houseName}
                            // location={house.location}
                            // image={house.img}
                        />
                    ))}
                </Slider>
            </div>

        </div>


        <div className='flex-row-e'>
        <span className='forget-busy-work'>
          Forget Busy Work,
          <br/>
          Start Next Vacation
        </span>
            <div className='picture'/>
            <div className='rectangle-3'/>
            <span className='we-provide'>
          We provide what you need to enjoy your <br/>
          holiday with family. Time to make another <br/>
          memorable moments.
        </span>
            <div className='bg-4'>
                <span className='show-me-now-5'>Show Me Now</span>
            </div>
            <div className='ic-traveler'/>
            <div className='ic-treasure'/>
            <div className='ic-cities'/>
            <div className='travelers-div'>
                <span className='span-1'>80,409</span>
                <span className='span-2'> travelers</span>
            </div>
            <div className='treasure-div'>
                <span className='span-3'>862</span>
                <span className='span-4'> treasure</span>
            </div>
            <div className='cities-div'>
                <span className='span-5'>1,492</span>
                <span className='span-6'> cities</span>
            </div>
        </div>
        <span className='most-picked-span'>Most Picked</span>
        <div className='flex-row-div'>
            <div className='rectangle-div'>
                <div className='rectangle-div-6'>
                    <div className='rectangle-div-7'>
                        <div className='per-night-div'>
                            <span className='span-7'>$50</span>
                            <span className='span-8'> per night</span>
                        </div>
                    </div>
                    <div className='flex-column-f-div'>
                        <span className='blue-origin-fams-span'>Blue Origin Fams</span>
                        <span className='jakarta-indonesia-span'>Jakarta, Indonesia</span>
                    </div>
                </div>
            </div>
            <div className='rectangle-div-8'>
                <div className='rectangle-div-9'>
                    <div className='rectangle-div-a'>
                        <div className='per-night-div-b'>
                            <span className='span-9'>$22</span>
                            <span className='per-night'> per night</span>
                        </div>
                    </div>
                    <div className='flex-column-ec'>
                        <span className='ocean-land'>Ocean Land</span>
                        <span className='bandung-indonesia'>Bandung, Indonesia</span>
                    </div>
                </div>
            </div>
            <div className='rectangle-c'>
                <div className='rectangle-d'>
                    <div className='rectangle-e'>
                        <div className='per-night-f'>
                            <span className='dollar'>$856</span>
                            <span className='per-night-10'> per night</span>
                        </div>
                    </div>
                    <div className='flex-column-fedf'>
                        <span className='stark-house'>Stark House</span>
                        <span className='malang-indonesia'>Malang, Indonesia</span>
                    </div>
                </div>
            </div>
            <div className='rectangle-11'>
                <div className='rectangle-12'>
                    <div className='rectangle-13'>
                        <div className='per-night-14'>
                            <span className='dollar-15'>$62</span>
                            <span className='per-night-16'> per night</span>
                        </div>
                    </div>
                    <div className='flex-column-ac'>
                        <span className='vinna-vill'>Vinna Vill</span>
                        <span className='malang-indonesia-17'>Malang, Indonesia</span>
                    </div>
                </div>
            </div>
            <div className='rectangle-18'>
                <div className='rectangle-19'>
                    <div className='rectangle-1a'>
                        <div className='per-night-1b'>
                            <span className='dollar-1c'>$72</span>
                            <span className='per-night-text'> per night</span>
                        </div>
                    </div>
                    <div className='flex-column-fe'>
                        <span className='bobox'>Bobox</span>
                        <span className='medan-indonesia'>Medan, Indonesia</span>
                    </div>
                </div>
            </div>
        </div>
        <span className='beauty-backyard'>Houses with beauty backyard</span>
        <div className='flex-row-b'>
            <div className='rectangle-1d'>
                <div className='rectangle-1e'>
                    <div className='popular-choice'>
                        <span className='popular'>Popular</span>
                        <span className='choice'> Choice</span>
                    </div>
                </div>
            </div>
            <div className='rectangle-1f'/>
            <div className='rectangle-20'/>
            <div className='rectangle-21'/>
        </div>
        <div className='flex-row-bbe'>
            <span className='tabby-town'>Tabby Town</span>
            <span className='anggana'>Anggana</span>
            <span className='seattle-rain'>Seattle Rain</span>
            <span className='wodden-pit'>Wodden Pit</span>
        </div>
        <div className='flex-row'>
            <span className='gunung-batu-indonesia'>Gunung Batu, Indonesia</span>
            <span className='bogor-indonesia'>Bogor, Indonesia</span>
            <span className='jakarta-indonesia'>Jakarta, Indonesia</span>
            <span className='wonosobo-indonesia'>Wonosobo, Indonesia</span>
        </div>
        <MainFooter/>
    </div>
}