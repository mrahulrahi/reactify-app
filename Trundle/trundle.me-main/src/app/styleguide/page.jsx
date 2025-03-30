import ItineraryCard from "../components/itineraryCard/ItineraryCard"
import Link from 'next/link';
import Image from 'next/image';


const StyleguidePage = () => {
    return (
        <>

            <div className="content-container">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 offset-lg-1">
                            <div className="heading d-flex align-items-center justify-content-between">
                                <h5>Heading text here</h5>
                                <div className="heading-right ps-3 flex-shrink-0">
                                    <Link href="/" className="btn btn-primary"><span><Image src="/images/upload-icon.svg" width={20} height={19} alt="Upload Itinerary" /></span> CTA <em className="fst-normal d-none d-md-inline">Here</em></Link>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-10 offset-lg-1">
                            <div className="row g-4">
                                <div className="col-lg-4 col-md-6">
                                    <ItineraryCard />

                                </div>
                                <div className="col-lg-4 col-md-6">
                                    <ItineraryCard />

                                </div>
                                <div className="col-lg-4 col-md-6">
                                    <ItineraryCard />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="content-container">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 offset-lg-1">
                            <div className="heading d-flex align-items-center justify-content-between">
                                <h5>Heading text here</h5>
                                <div className="heading-right ps-3 flex-shrink-0">
                                    <Link href="/" className="btn btn-primary"><span><Image src="/images/upload-icon.svg" width={20} height={19} alt="Upload Itinerary" /></span> CTA <em className="fst-normal d-none d-md-inline">Here</em></Link>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-10 offset-lg-1">
                            <div className="row g-4">
                                <div className="col-lg-4 col-md-6">
                                    <ItineraryCard isUser={true} status='active' />

                                </div>
                                <div className="col-lg-4 col-md-6">
                                    <ItineraryCard isUser={true} status='inactive' />

                                </div>
                                <div className="col-lg-4 col-md-6">
                                    <ItineraryCard isUser={true} status='active' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="content-container">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 offset-lg-1">
                            <h1>Heading 1</h1>
                            <h2>Heading 2</h2>
                            <h3>Heading 3</h3>
                            <h4>Heading 4</h4>
                            <h5>Heading 5</h5>
                            <h6>Heading 6</h6>
                            <p>3B Training values the personal information you provide to us and we wouldn’t want to use it in a way that you wouldn’t expect. This Privacy Notice explains how we protect your privacy and how you can control how we use your personal information. If you want to change the way in which we use your data or if you have a question about how your personal information is used, please contact us using the methods below:</p>

                            <ul>
                                <li>Text goes here</li>
                                <li>Text goes here</li>
                                <li>Text goes here</li>
                                <li>Text goes here</li>
                            </ul>

                            <ol>
                                <li>Text goes here</li>
                                <li>Text goes here</li>
                                <li>Text goes here</li>
                                <li>Text goes here</li>
                            </ol>

                            <a href="#" className="btn btn-default">Default</a>
                            <a href="#" className="btn btn-primary">Primary</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StyleguidePage