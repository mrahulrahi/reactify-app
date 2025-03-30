'use client'
import { useState } from "react";
import Link from 'next/link';
import '../form.css'
import InnerHero from "../components/inner-hero/InnerHero"
import MidContainer from "../components/mid-container/MidContainer"

const ForgotPasswordPage = () => {

    const [email, setEmail] = useState('');

    return (
        <>
            <InnerHero />
            <MidContainer size="sm">
                <div className="signin-form-container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="signin-form-head mb-4">
                                <h3>Forgot Password</h3>
                                <p>Please enter your email address to proceed further</p>
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
                            <div className="form-group">
                                <input type="submit" value="Reset Password" className="btn btn-default btn-block" />
                            </div>
                        </div>
                    </div>
                </div>
            </MidContainer>


        </>
    )
}

export default ForgotPasswordPage