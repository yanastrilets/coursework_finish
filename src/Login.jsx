import React from 'react';
import './Login.css';

export const Login = () => {
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
                        <div className='frame-2'>
                            <br></br>
                        </div>
                        <div className='sign-in-forms'>
                            <div className='sign-in-form-web'>
                                <div className='frame-6'>
                                    <span className='nice-to-see'>Nice to see you again</span>
                                    <div className='frame-7'>
                                        <div className='frame-8'>
                                            <div className='input-configurator'>
                                                <div className='input-configurator-9'>
                                                    <div className='satellite-input'>
                                                        <span className='login'>Login</span>
                                                    </div>
                                                    <div className='login-input'>
                                                        <div className='input-bg' />
                                                        <div className='regular-input-double-row'>
                                                            <div className='placeholder-value'>
                                                                <div className='frame-a'>
                                                                    <span className='email'>Email</span>
                                                                </div>
                                                            </div>
                                                            <div className='input-icons'>
                                                                <div className='login-icons'>
                                                                    <div className='frame-b'>
                                                                        <div className='union' />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='input-configurator-c'>
                                                <div className='input-configurator-d'>
                                                    <div className='satellite-input-e'>
                                                        <span className='password'>Password</span>
                                                    </div>
                                                    <div className='password-input'>
                                                        <div className='input-bg-f' />
                                                        <div className='regular-input-double-row-10'>
                                                            <div className='placeholder-value-11'>
                                                                <div className='frame-12'>
                                  <span className='enter-password'>
                                    Enter password
                                  </span>
                                                                </div>
                                                            </div>
                                                            <div className='input-icons-13'>
                                                                <div className='login-icons-14' />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='frame-15'>
                                            <span className='description'>Forgot password?</span>
                                        </div>
                                    </div>
                                </div>
                                <button className='primary-button'>
                                    <span className='sign-in-16'>Sign in</span>
                                </button>
                                <div className='nav' />
                            </div>
                            <div className='sign-up-offer'>
                                <span className='dont-have-account'>Dont have an account?</span>
                                <span className='sign-up-now'>Sign up now</span>
                            </div>
                        </div>
                    </div>
                    <button className='bottom-panel'>
                        <span className='head'>© Perfect Login 2021</span>
                    </button>
                </div>
            </div>
        </div>
    );
}