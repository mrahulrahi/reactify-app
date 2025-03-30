import Banner from '../components/Banner/Banner'
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

const SupportPage = () => {

    return (
        <>
            <Banner />

            <div className="content-container">
                <div className="container" data-aos="fade-up" suppressHydrationWarning>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="support-wrapper">
                                <div className="support-head">
                                    <h6>Providing top notch service is extremely high on our priority list. We review every email and get back to you promptly.</h6>
                                    <p>We can be reached 24/7 at  <a href="mailto:support@lovedones.ai">support@lovedones.ai</a></p>
                                    <p>Send a message We would love to hear from you!</p>
                                </div>
                                <div className="support-body">
                                    <form>
                                        <div className="form-group mb-4">
                                            <label htmlFor="name" className="form-label">Full Name</label>
                                            <input type="name" className="form-control" id="name" placeholder="Robert" />
                                        </div>
                                        <div className="form-group mb-4">
                                            <label htmlFor="tel" className="form-label">Phone Number</label>

                                            <div className="input-group">
                                                <PhoneSelect options={options} />
                                                <input type="tel" className="form-control" id="tel" placeholder="8656565655" />
                                            </div>
                                        </div>
                                        <div className="form-group mb-4">
                                            <label htmlFor="email" className="form-label">Email Address</label>
                                            <input type="email" className="form-control" id="email" placeholder="xyz12@gmail.com" />
                                        </div>
                                        <div className="form-group mb-4">
                                            <label htmlFor="exampleFormControlTextarea1" className="form-label">Message</label>
                                            <textarea className="form-control" id="exampleFormControlTextarea1" rows={3} placeholder="Enter Message"></textarea>
                                        </div>
                                        <div className="form-group member-form-btn d-flex flex-wrap gap-3 justify-content-between">
                                            <button type="button" className="btn btn-account-delete">How to Delete Account?</button>
                                            <button type="submit" className="btn btn-blue">Submit</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SupportPage