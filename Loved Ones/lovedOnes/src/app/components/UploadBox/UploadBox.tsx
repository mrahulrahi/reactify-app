'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import './UploadBox.css'
import VideoFrame from '../VideoFrame/VideoFrame'

type UploadBoxProps = {
    label?: string
}

const UploadBox = ({ label }: UploadBoxProps) => {

    const [file, setFile] = useState<File | null>(null)

    return (
        <>
            <div className="upload-file-box position-relative d-flex align-items-center justify-content-center">
                <input type="file" className="file-input" id="formFile" onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)} />
                <div className="upload-file-content d-flex flex-column align-items-center justify-content-center text-center gap-3">
                    {file ? (
                        <>
                            <div className="upload-file-icon d-flex justify-content-center align-items-center has-img-contain">
                                <Image src="../../images/file-icon.svg" alt="" width={50} height={50} quality={100} />
                            </div>
                            <div className={`upload-file-text ${file ? 'file-uploaded' : ''}`}>
                                <p>{file?.name}</p>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="upload-file-text"><h6>Click Here</h6></div>

                            <div className="upload-file-icon d-flex justify-content-center align-items-center has-img-contain">
                                <Image src="../../images/upload-photo.svg" alt="" width={50} height={50} quality={100} />
                            </div>
                            <div className="upload-file-text">
                                <p>{label}</p>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {file && (
                <div className="upload-preview-btn d-flex align-items-center justify-content-end">
                    <Link href="#uploadPreviewModal" className="btn-link" data-bs-toggle="modal">Preview</Link>
                </div>
            )}

            <div className="modal fade upload-preview-modal" id="uploadPreviewModal" tabIndex={-1} aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content border-0 rounded-0">
                        <div className="modal-body text-center">
                            <Link href="#uploadPreviewModal" className="modal-close-btn d-flex align-item-center justify-content-center has-img-contain" data-bs-dismiss="modal">
                                <Image src="../../images/close-icon.svg" alt="" width={30} height={30} quality={100} />
                            </Link>
                            <div className="upload-preview-media mb-4">
                                <VideoFrame thumbnailSrc='../images/preview-img.jpg' videoSrc='../videos/video.mp4' />
                            </div>
                            <h4 className="h6 fw-medium mb-0">This is your video preview</h4>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UploadBox