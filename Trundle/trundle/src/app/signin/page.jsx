'use client'
import { useState } from "react";
import Link from 'next/link';
import '../form.css'
import InnerHero from "../components/inner-hero/InnerHero"
import MidContainer from "../components/mid-container/MidContainer"

const SignInPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <>
            <InnerHero />
            <MidContainer size="sm">
                <form className="signin-form-container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="signin-form-head mb-4">
                                <h3>Sign In</h3>
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
                            <div className="form-group mb-4">
                                <label className="form-label">Password</label>
                                <input type="password" autoComplete='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder="varun#123" className="form-control" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="form-group mb-4">
                                <input type="submit" value="Log In" className="btn btn-default btn-block" />
                            </div>
                            <div className="mb-4">
                                <Link href="/forgot-password" className="link-2 w-100 text-center">Forgot Password ?</Link>
                            </div>
                            <div>
                                <Link href="/signup" className="link-2 w-100 text-center">Sign Up ?</Link>
                            </div>
                        </div>
                    </div>
                </form>
            </MidContainer>


        </>
    )
}

export default SignInPage