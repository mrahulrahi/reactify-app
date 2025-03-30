import Image from 'next/image'
import './PlaceCard.css'

import placeImg from "./place-img.jpg"

const PlaceCard = () => {
    return (
        <>
            <div className="place-box w-100 h-100 d-flex flex-wrap border flex-column-reverse flex-md-row">
                <div className="place-box-left">
                    <div className="place-box-text-inside">
                        <div className="place-box-label">Religious</div>
                        <div className="place-box-title fw-semibold">Osaka Castle</div>
                        <ul className="place-box-desc-list">
                            <li className="place-box-desc-item">
                                <div className="place-box-desc-box w-100 h-100 d-flex flex-wrap position-relative">
                                    <div className="place-box-desc-icon d-flex align-items-center justify-content-center">
                                        <Image src="../images/location-icon.svg" alt="location" width={15} height={17} /></div>
                                    <div className="place-box-desc-text">2 Chome-24-7 Gotokuji, <br />Setagaya City, Tokyo-154-0021</div>
                                </div>
                            </li>
                            <li className="place-box-desc-item">
                                <div className="place-box-desc-box w-100 h-100 d-flex flex-wrap position-relative">
                                    <div className="place-box-desc-icon d-flex align-items-center justify-content-center">
                                        <Image src="../images/clock-icon.svg" alt="time" width={16} height={16} />
                                    </div>
                                    <div className="place-box-desc-text">10:00am - 5:00pm</div>
                                </div>
                            </li>
                            <li className="place-box-desc-item">
                                <div className="place-box-desc-box w-100 h-100 d-flex flex-wrap position-relative">
                                    <div className="place-box-desc-icon d-flex align-items-center justify-content-center">
                                        <Image src="../images/money-icon.svg" alt="money" width={17} height={13} />
                                    </div>
                                    <div className="place-box-desc-text">Entry fee - Free</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="place-box-right position-relative">
                    <div className="place-box-img-holder"> <Image src={placeImg} alt="palce img" fill sizes="100VW" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default PlaceCard