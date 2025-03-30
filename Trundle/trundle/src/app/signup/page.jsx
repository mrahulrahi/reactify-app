'use client'
import { useState } from "react";
import Link from 'next/link';
import '../form.css'
import InnerHero from "../components/inner-hero/InnerHero"
import MidContainer from "../components/mid-container/MidContainer"

const SignInPage = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');

    return (
        <>
            <InnerHero />
            <MidContainer size="sm">
                <form className="signup-form-container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="signup-form-head mb-4">
                                <h3>Welcome back</h3>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="form-group mb-4">
                                <label className="form-label">First Name</label>
                                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Varun" className="form-control" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="form-group mb-4">
                                <label className="form-label">Last Name</label>
                                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Singh" className="form-control" />
                            </div>
                        </div>
                    </div>
                    <div className="row g-3">
                        <div className="col-lg-12">
                            <div className="form-group mb-4">
                                <label className="form-label">Gender</label>
                                <div className="form-radio-check-group mb-4 d-flex flex-wrap align-items-center" id="gender">
                                    <div className="form-check custom-radio d-flex align-items-center">
                                        <input className="form-check-input" type="radio" name="gender" id="gender1" />
                                        <label className="form-check-label" htmlFor="gender1">Male</label>
                                    </div>
                                    <div className="form-check custom-radio d-flex align-items-center">
                                        <input className="form-check-input" type="radio" name="gender" id="gender2" />
                                        <label className="form-check-label" htmlFor="gender2">Female</label>
                                    </div>
                                    <div className="form-check custom-radio d-flex align-items-center">
                                        <input className="form-check-input" type="radio" name="gender" id="gender3" />
                                        <label className="form-check-label" htmlFor="gender3">Others</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="form-group mb-4">
                                <label className="form-label">Email</label>
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="varun@gmail.com" className="form-control" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="form-group mb-4">
                                <label className="form-label">Password</label>
                                <input type="password" autoComplete='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder="varun#123" className="form-control" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="form-group mb-4">
                                <label className="form-label">Phone Number</label>
                                <input type="number" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="8564752010" className="form-control" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="form-group mb-4">
                                <input type="submit" value="Sign Up" className="btn btn-default btn-block" />
                            </div>
                            <div className="already-account d-flex align-items-center justify-content-center">
                                Already have an account?<Link href="/signin" className="link ms-1">Sign In</Link>
                            </div>
                        </div>
                    </div>
                </form>
            </MidContainer>

        </>
    )
}

export default SignInPage