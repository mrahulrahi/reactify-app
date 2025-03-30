import InnerHero from '../components/InnerHero/InnerHero'
import VideoCard from '../components/VideoCard/VideoCard'
import VideoFrame from '../components/VideoFrame/VideoFrame'

const Home2Page = () => {
    return (
        <>
            <InnerHero title="Create custom videos of your LovedOnes who have passed away" bgImage="/images/inner-hero-bg.jpg" buttonText="+ Create Your Video" buttonLink="/create-video" />

            <div className="content-container pb-0">
                <div className="container" data-aos="fade-up" suppressHydrationWarning>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="section-head">
                                <h2 className="h6">Create a video of your Loved Ones who have passed away, it is as simple as:</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <ul className="custom-num-list">
                                <li><p>Upload your LovedOne’s photo front facing from the shoulders up.</p></li>
                                <li><p>Submit your <span> Text for the Video,</span> of what your LovedOnes will say.</p></li>
                                <li><p>Upload an <span>Audio or Video file</span> of your LovedOne’s voice to have the <span>text spokenin the LovedOne’s Voice.</span> </p></li>
                            </ul>
                            <p className="text-black"><b>NO WORRIES</b> if you don’t have an Audio or Video File of the LovedOne’s voice, there are <b>many voices to choose from!</b></p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="content-container pt-5 pb-0">
                <div className="container" data-aos="fade-up" suppressHydrationWarning>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="section-head">
                                <h2 className="h6 mb-3">My Videos</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row g-4">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <div className="col-sm-6 col-lg-3" key={index}>
                                <VideoCard title="Video of my Son" createdAt="Nov 17, 2023" videoImage="/images/video-card-img.png" videoUrl="/my-videos/video-of-my-son" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="content-container pt-5">
                <div className="container" data-aos="fade-up" suppressHydrationWarning>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="section-head">
                                <h2 className="h6 mb-3">Sample Videos</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row g-4">
                        {Array.from({ length: 2 }).map((_, index) => (
                            <div className="col-6 col-lg-2" key={index}>
                                <div className="sample-video-media">
                                    <VideoFrame thumbnailSrc="/images/hero-img.jpg" videoSrc="/videos/portrait-video.mp4" /> 
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home2Page