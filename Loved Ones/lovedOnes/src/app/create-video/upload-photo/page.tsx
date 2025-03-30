import Link from 'next/link'
import StepNav from '../../components/StepNav/StepNav'
import Alert from '../../components/Alert/Alert'
import UploadBox from '../../components/UploadBox/UploadBox'

const UploadPhotoPage = () => {
    return (
        <>
            <div className="content-container">
                <div className="container" data-aos="fade-up" suppressHydrationWarning>
                    <div className="row">
                        <div className="col-lg-12">
                            <StepNav />
                            <div className="create-video-body">
                                <div className="create-video-head mb-5">
                                    <h4>Upload a Photo of your Loved One</h4>
                                </div> 
                                <div className="create-video-content">
                                    <ul className="custom-num-list mb-5">
                                        <li>Upload a clear high definition photo of your Loved One front facing from the shoulders up. (Crop as needed).</li>
                                        <li>The lips must be showing for the best results.</li>
                                        <li>The higher the quality of the photo and the larger the image file the better the custom Video of your Loved Ones will turn out!</li>
                                    </ul>   
                                    <form>
                                        <div className="form-group">
                                            <UploadBox label="to upload photo" />
                                        </div>
                                        <div className="form-bottom-btn d-flex">
                                            <Link href="/create-video/input-text" className="btn btn-blue ms-auto">Next</Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="alert-wrapper">
                <Alert type="success" message="Excellent! Perfect Image Chosen" />
            </div>
        </>
    )
}

export default UploadPhotoPage  