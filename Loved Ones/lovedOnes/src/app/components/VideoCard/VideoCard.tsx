'use client'
import Link from 'next/link';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import './VideoCard.css'
import Image from 'next/image'

interface VideoCardProps {
    title: string;
    createdAt: string;
    videoImage: string;
    videoUrl: string;
}



const VideoCard = ({ title, createdAt, videoImage, videoUrl }: VideoCardProps) => {
    return (
        <>
            <div className="video-card-box">
                <button className="video-del-btn d-flex align-items-center justify-content-center has-img-contain" data-bs-toggle="modal" data-bs-target="#delete-video-modal"><Image src="/images/trash-bin-icon.svg" alt="Play" width={25} height={25} quality={100} /></button>
                <Link href={videoUrl} className="video-card-inner w-100">
                    <div className="video-card-media has-img-cover">
                        <Image src={videoImage} alt="Video Card Media" width={300} height={300} quality={100} />

                    </div>
                    <div className="video-card-content">
                        <h5>{title}</h5>
                        <p>Created {createdAt}</p>
                    </div>
                </Link>
            </div>

            <ConfirmationModal modalId="delete-video-modal" title="Confirm Delete" message="Are you sure you want to delete this video" cancelText="Cancel" buttonText="Delete" />
        </>
    )
}

export default VideoCard