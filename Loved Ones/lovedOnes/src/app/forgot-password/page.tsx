'use client'
import Link from "next/link"

const ForgotPasswordPage = () => {
    return (
        <>
            <div className="content-container">
                <div className="container" data-aos="fade-up" suppressHydrationWarning>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="member-wrapper mx-auto">
                                <div className="member-head text-center">
                                    <h2>Forgot Password</h2>
                                </div>
                                <form>
                                    <div className="form-group mb-3">
                                        <label htmlFor="name" className="form-label">Phone Number or Email</label>
                                        <input type="name" className="form-control" id="name" placeholder="Enter Phone Number or Email" />
                                        <div className="form-text">e.g. +1******1234 or user@example.com</div>
                                    </div>
                                    <div className="form-group member-form-btn">
                                        <button type="button" className="btn btn-blue btn-block pe-0 text-center" onClick={() => window.location.href = '/otp'}>Submit</button>
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

export default ForgotPasswordPage