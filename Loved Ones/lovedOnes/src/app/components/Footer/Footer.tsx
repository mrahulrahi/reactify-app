import Image from 'next/image'
import './Footer.css'
import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok, FaXTwitter, FaYoutube } from 'react-icons/fa6'

const Footer = () => {
    return (
        <footer className="bg-black mt-auto">
            <div className="footer-top">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                        <div className="footer-logo d-md-none mb-5 mx-auto has-img-contain"><Image src="/images/footer-logo.png" alt="logo" width={230} height={230} quality={100} /></div>
                            <div className="footer-nav-list d-flex flex-wrap justify-content-center">
                                <div className="footer-nav-item">
                                    <a href="/about" className="footer-nav-link">About</a>
                                </div>
                                <div className="footer-nav-item">
                                    <a href="/how-it-works" className="footer-nav-link">How it Works</a>
                                </div>
                                <div className="footer-nav-item">
                                    <a href="/sample-videos" className="footer-nav-link">Sample Videos</a>
                                </div>
                                <div className="footer-nav-item">
                                    <a href="/support" className="footer-nav-link">Support</a>
                                </div>
                                <div className="footer-nav-item">
                                    <a href="/privacy-policy" className="footer-nav-link">Privacy Policy</a>
                                </div>
                                <div className="footer-nav-item">
                                    <a href="/terms-and-conditions" className="footer-nav-link">Terms & Condition</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="footer-bottom-top d-flex flex-wrap align-items-center justify-content-center">
                                <div className="fbt-left order-2 order-md-1"><a href="#!" className="w-100 has-img-contain"><Image src="/images/google-play.png" alt="logo" width={200} height={200} quality={100} /></a></div>
                                <ul className="social-links d-flex flex-wrap order-3 order-md-2">
                                    <li><a href="#!"><FaFacebook /></a></li>
                                    <li><a href="#!"><FaInstagram /></a></li>
                                    <li><a href="#!"><FaYoutube /></a></li>
                                    <li><a href="#!"><FaTiktok /></a></li>
                                    <li><a href="#!"><FaXTwitter /></a></li>
                                    <li><a href="#!"><FaLinkedin /></a></li>
                                </ul>
                                <div className="fbt-right order-2 order-md-3"><a href="#!" className="w-100 has-img-contain"><Image src="/images/app-store.png" alt="logo" width={200} height={200} quality={100} /></a></div>
                            </div>
                            <div className="footer-bottom-bottom d-flex align-items-center justify-content-center">
                                <div className="footer-logo d-none d-md-block has-img-contain"><Image src="/images/footer-logo.png" alt="logo" width={230} height={230} quality={100} /></div>
                                <div className="copyright">© All rights reserved.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer