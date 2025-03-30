import Banner from '../components/Banner/Banner'
import VideoFrame from '../components/VideoFrame/VideoFrame'
const SampleVideosPage = () => {
    return (
        <>
            <Banner />

            <div className="content-container">
                <div className="container" data-aos="fade-up" suppressHydrationWarning>
                    <div className="row g-4 g-lg-5">
                        <div className="col-lg-6">
                            <div className="smaple-video-box d-flex align-items-center justify-content-center"> 
                                <VideoFrame thumbnailSrc="/images/hero-img.jpg" videoSrc="/videos/portrait-video.mp4" videoFit="contain" />
                            </div>
                        </div>
                        <div className="col-lg-6">  
                            <div className="smaple-video-box d-flex align-items-center justify-content-center">
                                <VideoFrame thumbnailSrc="/images/hero-img.jpg" videoSrc="/videos/portrait-video.mp4" videoFit="contain" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SampleVideosPage