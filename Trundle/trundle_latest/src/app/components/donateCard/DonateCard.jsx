'use client'
import { useState } from 'react'
import './DonateCard.css'

const DonateCard = () => {
    const [amount, setAmount] = useState('');

    return (
        <>
            <div className="donate-card-box d-flex flex-column">
                <div className="donate-card-content mb-4">
                    <label className="donate-card-label">How do you want to donate?</label>
                    <div className="form-radio-check-group d-flex align-items-center justify-content-between" id="donateAmount">
                        <div className="form-check custom-radio w-100 d-flex align-items-center">
                            <input className="form-check-input" type="radio" name="donateAmount" id="donateAmount1" />
                            <label className="form-check-label" htmlFor="donateAmount1">$45</label>
                        </div>
                        <div className="form-check custom-radio w-100 d-flex align-items-center">
                            <input className="form-check-input" type="radio" name="donateAmount" id="donateAmount2" />
                            <label className="form-check-label" htmlFor="donateAmount2">$35</label>
                        </div>
                        <div className="form-check custom-radio w-100 d-flex align-items-center">
                            <input className="form-check-input" type="radio" name="donateAmount" id="donateAmount3" />
                            <label className="form-check-label" htmlFor="donateAmount3">$25</label>
                        </div>
                    </div>
                    <div className="my-1 text-center">or</div>
                    <div className="input-group">
                        <span className="input-group-text justify-content-center" id="inputGroupPrepend">$</span>
                        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount" className="form-control type-2" />
                    </div>
                </div>
                <div className="d-flex mt-auto"><button className="btn btn-default btn-block">Donate</button></div>
            </div>
        </>
    )
}

export default DonateCard