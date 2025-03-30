'use client'
import { useState } from 'react';
import Link from 'next/link';
import Alert from '../../components/Alert/Alert'
import StepNav from '../../components/StepNav/StepNav'

const InputTextPage = () => {
    const [textCount, setTextCount] = useState(0);

    return (
        <>
            <div className="content-container">
                <div className="container" data-aos="fade-up" suppressHydrationWarning>
                    <div className="row">
                        <div className="col-lg-12">
                            <StepNav />
                            <div className="create-video-body">
                                <form>
                                    <div className="create-video-head">
                                        <h4>Input the text your Loved one will say in your video</h4>
                                    </div>
                                    <div className="form-group mb-4">
                                        <input type="text" className="form-control" id="inputText" placeholder="Enter your Title" />
                                    </div>
                                    <div className="create-video-head mb-3">
                                        <h4>Feel free to enter the text in the language of your choice</h4>
                                        <p>English, Japanese, Chinese, German, Hindi, French, Korean, Portuguese, Italian, Spanish, Indonesian, Dutch, Turkish, Filipino, Polish, Swedish, Bulgarian, Romanian, Arabic, Czech, Greek, Finnish, Croatian, Malay, Slovak, Danish, Tamil, Ukrainian, Russian, Vietnamese, Norwegian, Hungarian, Chinese Traditional</p>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="inputTextarea" className="form-label">Please enter 100 to 400 Characters</label>
                                        <textarea className="form-control" id="inputTextarea" placeholder="Enter your Text.." rows={10} maxLength={400} onChange={(e) => setTextCount(e.target.value.length)}></textarea>
                                        <div className="form-text-count">{textCount}/400</div>
                                    </div>
                                    <div className="form-bottom-btn d-flex mt-5">
                                        <Link href="/create-video/audio-video" className="btn btn-blue ms-auto">Next</Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="alert-wrapper">
                <Alert type="success" message="Language Supported" />
            </div>
        </>
    )
}

export default InputTextPage