import Image from "next/image";
import Link from "next/link";
import VideoFrame from "../components/VideoFrame/VideoFrame";
import ConfirmationModal from "../components/ConfirmationModal/ConfirmationModal";

const PaymentSuccessfulPage = () => {
    return (
        <>
            <div className="content-container">
                <div className="container" data-aos="fade-up" suppressHydrationWarning>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="payment-successful-content mx-auto">
                                <div className="payment-successful-head text-center mb-5">
                                    <h2>Payment Successful</h2>
                                    <h6 className="mb-3">Transaction has been successfully Completed</h6>
                                    <p className="text-blue"><span className="fw-semibold text-black">Transaction ID :</span> 123456789</p>
                                </div>
                                <div className="payment-successful-body text-center">
                                    <h3>Video of my Son</h3>
                                    <div className="preview-video-wrapper">
                                        <div className="preview-video-media">
                                            <VideoFrame thumbnailSrc="/images/preview-video-img.jpg" videoSrc="/videos/portrait-video.mp4" />
                                        </div>
                                        <div className="preview-video-actions d-flex flex-column align-items-center justify-content-between">
                                            <Link href="#!" className="pv-del-btn d-flex align-items-center justify-content-center has-img-contain" data-bs-toggle="modal" data-bs-target="#deleteVideoModal">
                                                <Image src="/images/trash-bin-icon.svg" alt="delete" width={30} height={30} quality={100} />
                                            </Link>

                                            <div className="pv-actions-list d-flex flex-column align-items-center justify-content-between gap-4">
                                                <Link href="#!" className="pv-action-btn d-flex align-items-center justify-content-center has-img-contain">
                                                    <Image src="/images/download-icon.svg" alt="download" width={30} height={30} quality={100} />
                                                </Link>
                                                <Link href="#!" className="pv-action-btn d-flex align-items-center justify-content-center has-img-contain">
                                                    <Image src="/images/share-icon.svg" alt="share" width={30} height={30} quality={100} />
                                                </Link>
                                            </div>
                                        </div>

                                        <div className="preview-video-logo has-img-contain">
                                            <Image src="/images/logo-video.png" alt="logo" width={100} height={100} quality={100} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ConfirmationModal modalId="deleteVideoModal" title="Confirm Delete" message="Are you sure you want to delete this video" cancelText="Cancel" buttonText="Delete" />
        </>
    )
}

export default PaymentSuccessfulPage