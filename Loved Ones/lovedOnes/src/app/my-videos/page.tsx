import VideoCard from '../components/VideoCard/VideoCard'
import Link from 'next/link'

const MyVideosPage = () => {
    return (
        <>
            <div className="content-container">
                <div className="container" data-aos="fade-up" suppressHydrationWarning>
                    <div className="row g-4 g-lg-5">
                        <div className="col-sm-6 col-lg-3">
                            <Link href="/create-video" className="create-video-btn d-flex flex-column align-items-center justify-content-center">
                                <div className="create-video-icon">
                                    <img src="/images/video-icon.svg" alt="plus" />
                                </div>
                                <span>+ Create Video</span>
                            </Link>
                        </div>
                        {Array.from({ length: 6 }).map((_, index) => (
                            <div className="col-sm-6 col-lg-3" key={index}>
                                <VideoCard title="Video of my Son" createdAt="Nov 17, 2023" videoImage="/images/video-card-img.png" videoUrl="/my-videos/video-of-my-son" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyVideosPage