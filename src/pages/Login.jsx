import React, { useState } from 'react';
import './Login.css';
import {Link, useNavigate} from "react-router-dom";
import {useGetAuthTokenMutation} from "../store/api/api";
import {useDispatch} from "react-redux";
import {uiActions} from "../store/slices/ui.slice";

export const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [handleAuth] = useGetAuthTokenMutation();

    const handleSignIn = async (e) => {
        e.preventDefault();
        const res = await handleAuth({username, password});
        if(res.error) { return;}
        const token = res.data['access_token'];
        const user = res.data.user;
        localStorage.setItem('token', token);
        dispatch(uiActions.setUser(user))
        navigate('/');
    };

    return (
        <div className='main-container-login'>
            <div className='staycation-login'>
                <span className='stay'>Stay</span>
                <span className='cation'>cation.</span>
            </div>
            <div className='sign-in-form-desktop'>
                <div className='rectangle-login' />
                <div className='frame'>
                    <div className='frame-1'>
                        <div className='frame-2'><br /></div>
                        <div className='sign-in-forms'>
                            <div className='sign-in-form-web'>
                                <div className='frame-6'>
                                    <span className='nice-to-see'>Nice to see you again</span>
                                    <form className='frame-7' onSubmit={handleSignIn}>
                                        <div className='input-configurator'>
                                            <input
                                                type='text'
                                                placeholder='Enter email'
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                className='login-input'
                                            />
                                        </div>
                                        <div className='input-configurator-c'>
                                            <input
                                                type='password'
                                                placeholder='Enter password'
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className='password-input'
                                            />
                                        </div>

                                        <button type='submit' className='primary-button'>
                                            <span className='sign-in-16'>Log in</span>
                                        </button>
                                    </form>
                                    <div className='nav' />
                                </div>
                                <div className='sign-up-offer'>
                                    <span className='dont-have-account'>Don't have an account?</span>
                                    <Link to='/signup' className='sign-up-now'>Sign up now</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className='bottom-panel'>
                        <span className='head'>© Staycation 2024</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
