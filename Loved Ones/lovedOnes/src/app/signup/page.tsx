'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react';
import PhoneSelect from '../components/PhoneSelect/PhoneSelect'

const options = [
    { value: '+91', label: '+91' },
    { value: '+92', label: '+92' },
    { value: '+93', label: '+93' },
    { value: '+94', label: '+94' },
    { value: '+95', label: '+95' },
    { value: '+96', label: '+96' },
    { value: '+97', label: '+97' },
    { value: '+98', label: '+98' },
    { value: '+99', label: '+99' },
    { value: '+100', label: '+100' },
    { value: '+1-001', label: '+1-001' },
]

const SignUpPage = () => {

    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <div className="content-container">
                <div className="container" data-aos="fade-up" suppressHydrationWarning>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="member-wrapper mx-auto">
                                <div className="member-head text-center">
                                    <h2>Sign Up</h2>
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
                                        <label htmlFor="name" className="form-label">Full Name</label>
                                        <input type="name" className="form-control" id="name" placeholder="Enter Full Name" />
                                    </div>
                                    <div className="form-group mb-4">
                                        <label htmlFor="number" className="form-label">Phone Number</label>
                                        <div className="input-group">
                                            <PhoneSelect options={options} />
                                            <input type="tel" className="form-control" id="tel" placeholder="Enter Phone Number" />
                                        </div>
                                    </div>
                                    <div className="form-group mb-4">
                                        <label htmlFor="email" className="form-label">Email Address</label>
                                        <input type="email" className="form-control" id="email" placeholder="Enter Email Address" />
                                    </div>
                                    <div className="form-group mb-4">
                                        <label htmlFor="inputPassword3" className="form-label">Password</label>
                                        <div className="password-group">
                                            <input type={showPassword ? 'text' : 'password'} className="form-control" id="inputPassword3" placeholder="Enter Password" />
                                            <div className="password-icon d-flex align-items-center justify-content-center" onClick={() => setShowPassword(!showPassword)}>
                                                <Image src={showPassword ? '/images/eye-on-icon.svg' : '/images/eye-off-icon.svg'} alt="" width={20} height={20} quality={100} />
                                            </div>
                                        </div>
                                        <div className="form-text mt-4">
                                            <span>*</span> Password must have at least one capital letter, one number and one special character and be at least 8 characters long (!#$%*)
                                        </div>
                                    </div>
                                    <div className="form-group mb-4">
                                        <div className="member-policy">
                                            By continuing you agree to our <Link href="#!">Terms of Service</Link> and <Link href="#!">Privacy Policy.</Link>
                                        </div>
                                    </div>
                                    <div className="form-group member-form-btn">
                                        <button type="button" className="btn btn-blue btn-block pe-0 text-center" onClick={() => window.location.href = '/otp'}>Sign Up</button>
                                    </div>
                                    <div className="form-group">
                                        <div className="member-link-box">Already have an account? <Link href="/signin">Sign In</Link></div>
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

export default SignUpPage