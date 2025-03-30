'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react';

const SignInPage = () => {

    const [showPassword, setShowPassword] = useState(false);
    
    return (
        <>
            <div className="content-container">
                <div className="container" data-aos="fade-up" suppressHydrationWarning>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="member-wrapper mx-auto">
                                <div className="member-head text-center">
                                    <h2>Sign In</h2>
                                </div>
                                <div className="member-login-btn">
                                    <ul className="mlb-list">
                                        <li className="mlb-item">
                                            <Link href="#!" className="mlb-box">
                                                <div className="mlb-box-img has-img-contain">
                                                    <Image src="/images/google-icon.svg" alt="" width={26} height={26} quality={100} />
                                                </div>
                                                Continue With Google
                                            </Link>
                                        </li>
                                        <li className="mlb-item">
                                            <Link href="#!" className="mlb-box">
                                                <div className="mlb-box-img has-img-contain">
                                                    <Image src="/images/facebook-icon.svg" alt="" width={26} height={26} quality={100} />
                                                </div>
                                                Continue With Facebook
                                            </Link>
                                        </li>
                                        <li className="mlb-item">
                                            <Link href="#!" className="mlb-box">
                                                <div className="mlb-box-img has-img-contain">
                                                    <Image src="/images/apple-icon.svg" alt="" width={26} height={26} quality={100} />
                                                </div>
                                                Continue With Apple
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="member-dash-line text-center">
                                    <div className="text-uppercase">Or</div>
                                </div>
                                <form>
                                    <div className="form-group mb-3">
                                        <label htmlFor="email" className="form-label">Phone Number or Email</label>
                                        <input type="email" className="form-control" id="email" placeholder="Enter Phone Number or Email" />
                                        <div className="form-text">e.g. +1******1234 or user@example.com</div>
                                    </div>
                                    <div className="form-group mb-4">
                                        <label htmlFor="inputPassword3" className="form-label">Password</label>
                                        <div className="password-group">
                                            <input type={showPassword ? 'text' : 'password'} className="form-control" id="inputPassword3" placeholder="Enter Password" />
                                            <div className="password-icon d-flex align-items-center justify-content-center" onClick={() => setShowPassword(!showPassword)}>
                                                <Image src={showPassword ? '/images/eye-on-icon.svg' : '/images/eye-off-icon.svg'} alt="" width={20} height={20} quality={100} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group mb-4">
                                        <div className="member-forgot-pass d-flex justify-content-end">
                                            <Link href="/forgot-password">Forgot Password??</Link>
                                        </div>
                                    </div>
                                    <div className="form-group member-form-btn">
                                        <button type="button" className="btn btn-blue btn-block pe-0 text-center" onClick={() => window.location.href = '/otp'}>Sign In</button>
                                    </div>
                                    <div className="form-group">
                                        <div className="member-link-box">Don’t Have an account? <Link href="/signup">Sign Up</Link></div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default SignInPage