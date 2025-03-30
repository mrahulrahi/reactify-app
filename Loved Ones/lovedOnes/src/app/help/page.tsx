import Image from 'next/image'
import Banner from '../components/Banner/Banner'

const HelpPage = () => {
  return (
<>
    <Banner />

    <div className="content-container">
        <div className="container" data-aos="fade-up" suppressHydrationWarning>
            <div className="row">
                <div className="col-lg-12">
                    <div className="help-content">
                        <ul className="help-list d-flex flex-column gap-5">
                            <li className="help-item">
                                <div className="help-box d-flex flex-wrap justify-content-between">
                                    <div className="help-box-left">
                                        <div className="help-left-content">
                                            <h6>Upload Photo</h6>
                                            <p>Upload a clear high definition photo or image of your Loved One, for the best results a front-facing one and their lips must be showing.  The higher the quality of the photo and the larger the image file the better the Custom Video of your Loved One will turn out.</p>
                                        </div>
                                    </div>
                                    <div className="help-box-right">
                                        <div className="help-right-img has-img-contain">
                                            <Image src="/images/upload-photo-img.svg" alt="" width={500} height={500} quality={100} />
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="help-item">
                                <div className="help-box d-flex flex-wrap justify-content-between">
                                    <div className="help-box-left">
                                        <div className="help-left-content">
                                            <h6>Submit Text to Video</h6>
                                            <p>Type what you would like your Loved One to say in your custom video [upto 400 characters]. An example of that would be “I miss you so very much and I am so proud of you, I'll keep watching over you, I love you with all my heart!”</p>
                                        </div>
                                    </div>
                                    <div className="help-box-right">
                                        <div className="help-right-img has-img-contain">
                                            <Image src="/images/submit-img.svg" alt="" width={500} height={500} quality={100} />
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="help-item">
                                <div className="help-box d-flex flex-wrap justify-content-between">
                                    <div className="help-box-left">
                                        <div className="help-left-content">
                                            <h6>Upload Audio or Video File</h6>
                                            <p>Upload an audio or video file of your Loved One speaking so that the text will be spoken in the Loved One's voice. The Audio or Video file needs to be between five seconds to two minutes long.</p>
                                        </div>
                                    </div>
                                    <div className="help-box-right">
                                        <div className="help-right-img has-img-contain">
                                            <Image src="/images/upload-audio-img.svg" alt="" width={500} height={500} quality={100} />
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</>

  )
}

export default HelpPage