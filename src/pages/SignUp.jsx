import React, { useState } from 'react';
import './SignUp.css';
import {Link} from "react-router-dom";

export const SignUp = () => {
    // Стани для зберігання значень інпутів
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Функція для обробки натискання на кнопку "Sign in"
    const handleSignIn = (e) => {
        e.preventDefault(); // Запобігаємо стандартній поведінці форми
        console.log('Email:', email, 'Password:', password); // Тут можна додати логіку відправки даних
    };

    return (
        <div className='main-container-sign-up'>
            <div className='staycation-sign-up'>
                <span className='stay'>Stay</span>
                <span className='cation'>cation.</span>
            </div>
            <div className='sign-in-form-desktop'>
                <div className='rectangle-sign-up' />
                <div className='frame'>
                    <div className='frame-1'>
                        <div className='frame-2'><br /></div>
                        <div className='sign-in-forms'>
                            <div className='sign-in-form-web'>
                                <div className='frame-6'>
                                    <span className='nice-to-see'>Welcome! </span>
                                    <form className='frame-7' onSubmit={handleSignIn}>
                                        <div className='input-configurator'>
                                            <input
                                                type='text'
                                                placeholder='Enter email'
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className='sign-up-input'
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
                                            <span className='sign-in-16'>Sign up</span>
                                        </button>
                                    </form>
                                    <div className='nav' />
                                </div>
                                <div className='sign-up-offer'>
                                    <span className='dont-have-account'>Have an account?</span>
                                    <Link to='/login' className='login-now'>Log in now</Link>
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
