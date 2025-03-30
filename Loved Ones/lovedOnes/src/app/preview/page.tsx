'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'
import Image from 'next/image';
import VideoFrame from "../components/VideoFrame/VideoFrame";
import ConfirmationModal from "../components/ConfirmationModal/ConfirmationModal";

const PreviewPage = () => {
    const router = useRouter();
    const [customPrice, setCustomPrice] = useState(false);
    const [applyPromo, setApplyPromo] = useState(false);
    const [promoCode, setPromoCode] = useState('');

    const handleClick = () => {
        router.push('/payment');
    };

    const handleCustomPrice = () => {
        setCustomPrice(true);
    }

    const handleApplyPromo = () => {
        setApplyPromo(!applyPromo);
    }

    return (
        <>
            <div className="content-container">
                <div className="container" data-aos="fade-up" suppressHydrationWarning>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="preview-content mx-auto">
                                <div className="preview-top text-center">
                                    <h3>You can preview the first half of your video up to 5 times. Please tap the Buy Now button to get your full video.</h3>

                                    <div className="preview-btn-wrap d-flex align-items-end justify-content-between">
                                        <div className="preview-video-label rounded-pill">5 First half preview of video left</div>
                                        <Link href="#!" className="btn-link" data-bs-toggle="modal" data-bs-target="#cancelVideoModal">Cancel Video</Link>
                                    </div>
                                    <div className="preview-video-wrapper">
                                        <div className="preview-video-media">
                                            <VideoFrame thumbnailSrc="/images/preview-video-img.jpg" videoSrc="/videos/portrait-video.mp4" />
                                        </div>

                                        <div className="preview-video-logo has-img-contain">
                                            <Image src="/images/logo-video.png" alt="logo" width={100} height={100} quality={100} />
                                        </div>
                                    </div>
                                </div>
                                <div className="preview-bottom text-center text-black">
                                    <h6> Please enter your promotional code for the price of your custom video</h6>

                                    <div className="preview-promo-wrap">
                                        <span className="promo-icon"><img src="/images/promo-icon.svg" alt="promo-icon" /></span>
                                        <input type="text" className="form-control" placeholder="Promotional code" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} disabled={applyPromo} required />
                                        {applyPromo ?
                                            <>
                                                <button className="close-btn d-flex align-items-center justify-content-center border-0 bg-transparent" onClick={handleApplyPromo}><img src="/images/close-icon.svg" alt="close-icon" /></button>
                                                <p className="promo-success">Applied</p>
                                            </>
                                            :
                                            <button className="btn-link text-black border-0 bg-transparent" onClick={handleApplyPromo}>Apply</button>
                                        }

                                    </div>
                                    {applyPromo ? <p>With the promotion code your custom price is only  <span>$15.99</span></p> :
                                        customPrice ? <p>Your custom price is Only  <span>$19.99</span></p> : <button className="btn-link text-black border-0 bg-transparent mb-3" onClick={handleCustomPrice}>Tap here for your custom price </button>
                                    }

                                    <p>Any promotional code you have will be applied to the price of only $19.99</p>
                                    <Link href="/payment" className="btn btn-blue btn-block" data-bs-toggle="modal" data-bs-target="#watchVideoModal">Buy Now</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ConfirmationModal modalId="cancelVideoModal" message="“Upon cancellation, this video will be permanently deleted and cannot be retrieved. Are you absolutely certain you want to proceed with this action”" cancelText="No" buttonText="Yes" />

            <ConfirmationModal modalId="watchVideoModal" title="Watch the Full Video Now" message="Get instant access—buy now to enjoy the full experience!" cancelText="Cancel" buttonText="Continue" setButtonAction={handleClick} />
        </>
    )
}

export default PreviewPage