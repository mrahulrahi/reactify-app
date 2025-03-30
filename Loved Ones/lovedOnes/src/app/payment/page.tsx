'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
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

const PaymentPage = () => {
    const [promoApplied, setPromoApplied] = useState<boolean>(false);
    const [promoCode, setPromoCode] = useState<string>('');

    const handlePromoCode = (value: boolean) => {
        if (promoCode) {
            setPromoApplied(value);
        }
    }

    return (
        <>
            <div className="content-container">
                <div className="container" data-aos="fade-up" suppressHydrationWarning>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="payment-wrapper">
                                <div className="payment-header text-center">
                                    <h2>Payment Method</h2>
                                </div>
                                <div className="row g-4 g-md-5">
                                    <div className="col-lg-6">
                                        <div className="payment-left d-flex flex-column h-100">
                                            <div className="payment-left-head">
                                                <div className="plh-content d-flex flex-wrap justify-content-between gap-2 mb-3">
                                                    <h6>Credit/ Debit card</h6>
                                                    <div className="plh-img-list d-flex">
                                                        <span className="plh-img has-img-contain"><Image src="/images/visa-logo.svg" alt="card" width={32} height={18} quality={100} /></span>
                                                        <span className="plh-img has-img-contain"><Image src="/images/master-card-logo.svg" alt="card" width={32} height={18} quality={100} /></span>
                                                        <span className="plh-img has-img-contain"><Image src="/images/american-express-logo.svg" alt="card" width={56} height={18} quality={100} /></span>
                                                        <span className="plh-img has-img-contain"><Image src="/images/discover-logo.svg" alt="card" width={68} height={18} quality={100} /></span>
                                                    </div>
                                                </div>
                                                <p>Securely enter your credit or debit card details to complete your payment transaction</p>
                                            </div>
                                            <hr />
                                            <div className="payment-left-body">
                                                <form>
                                                    <div className="row g-4">
                                                        <div className="col-12">
                                                            <div className="form-group">
                                                                <label htmlFor="name" className="form-label">Name</label>
                                                                <input type="text" className="form-control" id="name" placeholder="Name on Card" />
                                                            </div>
                                                        </div>
                                                        <div className="col-12">
                                                            <div className="form-group">
                                                                <label htmlFor="cardNumber" className="form-label">Card Number</label>
                                                                <input type="number" className="form-control" id="cardNumber" placeholder="1234 1234 1234 1234" />
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="form-group">
                                                                <label htmlFor="date" className="form-label">MM / YY</label>
                                                                <input type="number" className="form-control" id="date" placeholder="MM / YY" />
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="form-group">
                                                                <label htmlFor="cvv" className="form-label">CVC</label>
                                                                <input type="number" className="form-control" id="cvv" placeholder="Security Code" />
                                                            </div>
                                                        </div>
                                                        <div className="col-12">
                                                            <div className="form-group">
                                                                <Link href="#" className="form-control text-black" id="billingaddress" data-bs-toggle="modal" data-bs-target="#billingModal">Add your billing address <span className="text-red">*</span></Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="payment-right d-flex flex-column h-100">
                                            <div className="payment-right-body mb-2">
                                                <div className="prb-head">
                                                    <h5>Order Summary</h5>
                                                    <h6>Custom Video of your Loved One</h6>
                                                    <p>Only $19.99 / per video</p>
                                                </div>
                                                <hr className="" />
                                                <div className="prb-content">
                                                    <form>
                                                        <div className="form-group mb-3">
                                                            <label htmlFor="code" className="form-label">Enter Your Promotion Code</label>
                                                            <div className="d-flex flex-wrap flex-md-nowrap gap-3">
                                                                <input type="text" className="form-control" id="code" placeholder="Enter Code" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} />
                                                                <button className="btn btn-blue-outline" onClick={(e) => { e.preventDefault(); handlePromoCode(true) }}>Apply</button>
                                                            </div>
                                                        </div>
                                                    </form>

                                                    {promoApplied && (
                                                        <div className="payment-promo-alert d-flex align-items-center justify-content-between gap-2">
                                                            <div className="pp-alert-left">
                                                                <h6>YAY! You Saved $9.00</h6>
                                                                <p>{promoCode} Promotion Code Applied</p>
                                                            </div>
                                                            <div className="pp-alert-right">
                                                                <button className="pp-alert-close d-flex align-item-center justify-content-center" onClick={(e) => { e.preventDefault(); handlePromoCode(false) }}>
                                                                    <Image src="../../images/close-icon.svg" alt="" width={12} height={12} quality={100} />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )}

                                                    <div className="prb-cart-total d-flex flex-column">
                                                        <div className="prb-total-row d-flex justify-content-between">
                                                            <span>Subtotal</span>
                                                            <h6>$19.99</h6>
                                                        </div>
                                                        {promoApplied && (
                                                            <div className="prb-total-row d-flex justify-content-between">
                                                                <span>Promo Code Discount</span>
                                                                <h6>$9.00</h6>
                                                            </div>
                                                        )}
                                                        <div className="prb-total-row d-flex justify-content-between">
                                                            <span>Tax(10%)</span>
                                                            <h6>$4.90</h6>
                                                        </div>
                                                        <hr className="m-0" />
                                                        <div className="prb-total-row d-flex justify-content-between">
                                                            <h6 className="text-red">Total:</h6>
                                                            {promoApplied ? (
                                                                <h6 className="text-red">$15.89</h6>
                                                            ) : (
                                                                <h6 className="text-red">$24.89</h6>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="payment-right-footer mt-auto">
                                                <div className="mb-3">By continuing, you agree to LovedOnes.ai  <Link href="/terms-of-service" className="btn-link ">Terms of Service</Link> and <Link href="/privacy-policy" className="btn-link">Privacy Policy</Link></div>
                                                <Link href="/payment-successful" className="btn btn-blue btn-block">Pay</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >


            <div className="modal fade billing-modal" id="billingModal" tabIndex={-1} aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content border-0">
                        <div className="billing-header d-flex align-items-center justify-content-between">
                            <h5>Billing Address</h5>
                            <Link href="#!" className="billing-header-close d-flex align-item-center justify-content-center has-img-contain" data-bs-dismiss="modal">
                                <Image src="../../images/close-icon-fill.svg" alt="" width={28} height={28} quality={100} />
                            </Link>
                        </div>
                        <div className="billing-body">
                            <form>
                                <div className="row gx-lg-5 gy-3">
                                    <div className="col-sm-12">
                                        <div className="form-group">
                                            <label htmlFor="name" className="form-label">Full Name</label>
                                            <input type="text" className="form-control" id="name" placeholder="Enter Full Name" />
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className="form-group">
                                            <label htmlFor="country" className="form-label">Country or Region</label>
                                            <input type="text" className="form-control" id="country" placeholder="Enter Country or Region" />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label htmlFor="address" className="form-label">Address Line 1</label>
                                            <input type="text" className="form-control" id="address" placeholder="Enter Address Line 1" />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label htmlFor="address2" className="form-label">Address Line 2 (optional)</label>
                                            <input type="text" className="form-control" id="address2" placeholder="Enter Address Line 2" />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label htmlFor="city" className="form-label">City</label>
                                            <input type="text" className="form-control" id="city" placeholder="Enter Your City" />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label htmlFor="zip" className="form-label">Zip Code</label>
                                            <input type="number" className="form-control" id="zip" placeholder="Enter Your Zip Code" />
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className="form-group">
                                            <label htmlFor="state" className="form-label">State</label>
                                            <input type="text" className="form-control" id="state" placeholder="State" />
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className="form-group">
                                            <label htmlFor="phone" className="form-label">Phone Number</label>
                                            <div className="input-group">
                                                <PhoneSelect options={options} />
                                                <input type="tel" className="form-control" id="tel" placeholder="8656565655" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="billing-footer">
                            <button className="btn btn-blue btn-block" data-bs-dismiss="modal">Continue</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentPage