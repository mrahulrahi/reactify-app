'use client'

import './Footer.css'
import Image from 'next/image';
import Logo from './footer-logo.svg'
import { FaLinkedin, FaYoutube, FaFacebookF, FaXTwitter } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ItineraryCTA from '../components/itineraryCTA/ItineraryCTA';


const Footer = ({ role }) => {
    const pathname = usePathname();

    const isAuthPage = ["/auth/signin", "/auth/signup", "/create-influencer-profile", "/otp-verification"];

    return (
        <>
            {!isAuthPage?.includes(pathname) &&
                <>
                    {pathname !== "/about" &&
                        <>
                            {role !== 1 &&
                                <div className="container mb-4">
                                    <div className="row">
                                        <div className="col-xl-10 mx-auto">
                                            <ItineraryCTA />
                                        </div>
                                    </div>
                                </div>
                            }
                        </>
                    }
                </>
            }
            {!isAuthPage?.includes(pathname) &&
                <footer id="footer" className="mt-auto">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-10 mx-auto">
                                <div className="footer-upper">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="footer-upper-left">
                                                <Link href="/" className="footer-logo"><Image src={Logo} alt="logo" /></Link>
                                                <p><Link style={{ textDecoration: "underline" }} href={"/about"}>Trundle.me</Link> is a platform where travellers can find and buy curated itineraries from popular travel influencers around the world.</p>
                                            </div>
                                        </div>
                                        <div className="col-md-7 col-lg-6 ms-auto">
                                            <div className="footer-upper-right d-flex gap-4 flex-wrap justify-content-between">
                                                <div className="fur-col">
                                                    <h6 className="footer-heading">Legal</h6>
                                                    <ul className="footer-nav d-flex flex-column">
                                                        <li className="footer-nav-item mb-2"><Link href="/tandc" className="footer-nav-link p-0">Terms & Conditions</Link></li>
                                                        <li className="footer-nav-item mb-2"><Link href="/privacypolicy" className="footer-nav-link p-0">Privacy Policy</Link></li>
                                                    </ul>
                                                </div>
                                                <div className="fur-col">
                                                    <h6 className="footer-heading">Follow us on</h6>
                                                    <div className="footer-social-links d-flex align-items-center gap-2">
                                                        <a href="https://www.linkedin.com/company/trundleapp" target='_blank' className="d-flex align-items-center justify-content-center"><FaLinkedin /></a>
                                                        <a href="https://www.instagram.com/trundle.world/" target='_blank' className="d-flex align-items-center justify-content-center"><RiInstagramFill /></a>
                                                        {/* <a href="#" className="d-flex align-items-center justify-content-center"><FaYoutube /></a> */}
                                                        {/* <a href="#" className="d-flex align-items-center justify-content-center"><FaFacebookF /></a> */}
                                                        <a href="https://twitter.com/trundleworld" target='_blank' className="d-flex align-items-center justify-content-center"><FaXTwitter /></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="footer-lower d-flex align-items-center justify-content-between flex-column flex-sm-row gap-3 gap-md-0">
                                    <div className="copyright">Trundle.me is a part of Trundle Technology LLP. </div>
                                    <div className="copyright">&copy; {new Date().getFullYear()} Trundle.me. All rights reserved.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            }
        </>
    )
}

export default Footer