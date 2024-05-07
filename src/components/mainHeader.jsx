import React from "react";
import '../App.css';
import {Link, NavLink} from "react-router-dom";
import {useSelector} from "react-redux";

export const MainHeader = () => {

    const {user} = useSelector(state => state.ui);
    return (
        <div className='rectangle'>
            <div className='flex-row-ed'>
                {!user &&
                    <div className='bg'>
                        <NavLink to='/login' className='show-me-now' >Login</NavLink>
                    </div>
                }

                {user && user.role === 0 && <Link to='/profile' className='bg'
                              style={{
                                  backgroundColor: 'white',
                                  boxShadow: 'none',
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  fontSize: '17px',
                              }}>
                    {"User: " + user.username}
                </Link>}
                {user && user.role === 1 && <Link to='/admin' className='bg'
                                                 style={{
                                                     backgroundColor: 'white',
                                                     boxShadow: 'none',
                                                     display: 'flex',
                                                     justifyContent: 'center',
                                                     alignItems: 'center',
                                                     fontSize: '17px',
                                                 }}>
                    {"Admin: " + user.username}
                </Link>}
                <div className='regroup'>
                    <div className='home'>
                        <NavLink to='/' className='home-1' activeClassName='active-link' >Home</NavLink>
                        <span className='nbsp'> </span>
                    </div>
                    <NavLink to='/catalogue' className='catalog' activeClassName='active-link' >Catalog</NavLink>
                </div>
                <div className='staycation'>
                    <span className='stay'>Stay</span>
                    <span className='cation'>cation.</span>
                </div>

            </div>
            <div className='rectangle-2'/>
        </div>
    );
}
