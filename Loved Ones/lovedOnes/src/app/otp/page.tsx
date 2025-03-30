'use client'
import Link from "next/link"

const OTPPage = () => {
    return (
        <>
            <div className="content-container">
                <div className="container" data-aos="fade-up" suppressHydrationWarning>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="member-wrapper mx-auto">
                                <div className="member-head text-center">
                                    <h2>Verify Code</h2>
                                </div>
                                <div className="member-form-content text-center">
                                    <h6>Code sent to xy****&#64;gmail.com and +91*******530 </h6>
                                    <p>If the code is not available, please check the spam folder.</p>
                                    <div className="otp-countdown">01:57</div>
                                </div>
                                <form>
                                    <div className="form-group mb-4">
                                        <div className="member-otp-box gap-2 gap-xl-4 d-flex align-items-center justify-content-between">
                                            <input className="member-otp-input" type="text" inputMode="numeric" maxLength={1} />
                                            <input className="member-otp-input" type="text" inputMode="numeric" maxLength={1} />
                                            <input className="member-otp-input" type="text" inputMode="numeric" maxLength={1} />
                                            <input className="member-otp-input" type="text" inputMode="numeric" maxLength={1} />
                                            <input className="member-otp-input" type="text" inputMode="numeric" maxLength={1} />
                                            <input className="member-otp-input" type="text" inputMode="numeric" maxLength={1} />
                                        </div>
                                    </div>
                                    <div className="form-group member-form-btn">
                                        <button type="button" className="btn btn-blue btn-block pe-0 text-center" onClick={() => window.location.href = '/new-password'}>Submit</button>
                                    </div>
                                    <div className="form-group">
                                        <div className="member-link-box text-center">Didn’t receive code? <Link href="#!" className="text-grey">Resend</Link></div>
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

export default OTPPage