'use client'
import Link from 'next/link'
import { useState } from 'react';
import Image from 'next/image';
const NewPasswordPage = () => {

    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <div className="content-container">
                <div className="container" data-aos="fade-up" suppressHydrationWarning>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="member-wrapper mx-auto">
                                <div className="member-head text-center">
                                    <h2>Create a New Password</h2>
                                </div>
                                <form>
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
                                        <label htmlFor="inputPassword4" className="form-label">Confirm Password</label>
                                        <div className="password-group">
                                            <input type={showPassword ? 'text' : 'password'} className="form-control" id="inputPassword4" placeholder="Enter Confirm Password" />
                                            <div className="password-icon d-flex align-items-center justify-content-center" onClick={() => setShowPassword(!showPassword)}>
                                                <Image src={showPassword ? '/images/eye-on-icon.svg' : '/images/eye-off-icon.svg'} alt="" width={20} height={20} quality={100} />
                                            </div>
                                        </div>
                                        <div className="form-text mt-4">
                                            <span>*</span> Password must have at least one capital letter, one number and one special character and be at least 8 characters long (!#$%*)
                                        </div>
                                    </div>
                                    <div className="form-group member-form-btn">
                                        <button type="submit" className="btn btn-blue btn-block pe-0 text-center">Submit</button>
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

export default NewPasswordPage