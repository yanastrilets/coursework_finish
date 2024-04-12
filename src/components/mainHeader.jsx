import React from "react";
import '../App.css';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

export const MainHeader = () => {

    const {user} = useSelector(state => state.ui);
    return (
        <div className='rectangle'>
            <div className='flex-row-ed'>
                {!user &&
                    <div className='bg'>
                        <Link to='/login' className='show-me-now'>Login</Link>
                    </div>
                }

                {user && <div className='bg'
                              style={{
                                  backgroundColor: 'white',
                                  boxShadow: 'none',
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  fontSize: '17px',
                              }}>
                    {"User: " + user.username}
                </div>}
                <div className='regroup'>
                    <div className='home'>
                        <Link to='/' className='home-1'>Home</Link>
                        <span className='nbsp'> </span>
                    </div>
                    <Link to='/catalogue' className='catalog'>Catalog</Link>
                </div>
                <div className='staycation'>
                    <span className='stay'>Stay</span>
                    <span className='cation'>cation.</span>
                </div>
                <span className='about-us'>About us</span>
            </div>
            <div className='rectangle-2'/>
        </div>
    );
}
