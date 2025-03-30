"use client";

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { RiInstagramLine } from "react-icons/ri";
import { ImFacebook2 } from "react-icons/im";
import { IoMdMail } from "react-icons/io";
import { authedPages } from '../../lib/data';
import { IoLogoWhatsapp } from "react-icons/io";

const Footer = ({ session }) => {
  const pathname = usePathname();

  const excludeHeaderPathNamesList = [
    "/auth/update-password",
    "/auth/otp-verification",
    '/auth/signin',
    "/auth/signup",
    "/auth/forgot-password",
    "/payement-success"
  ];

  const isAuthedPage = authedPages.includes(pathname);

  return (
    <>
      {(!isAuthedPage || (isAuthedPage && session)) &&
        <>
          {(!excludeHeaderPathNamesList.includes(pathname) || pathname === "/update-profile") && (
            <footer className="footer">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="footer-top d-flex flex-wrap justify-content-lg-between px-xl-3">
                      <div className="footer-content">
                        <Link href={"/"}>
                          <Image
                            className="footer-logo"
                            src="/images/app-logo.png"
                            alt="Tripherder"
                            width={53}
                            height={53}
                            objectFit='contain'
                          />
                        </Link>
                        <p className="lorem-text">
                          Generate trip plans in seconds enjoy the ride
                        </p>
                      </div>
                      <div className="footer-content">
                        <h4>Sitemap links</h4>
                        <ul className="ps-0 mb-0">
                          <li>
                            <Link href="/how-it-works">How it Works</Link>
                          </li>
                          <li>
                            <Link href="/itineraries">Make a Trip</Link>
                          </li>
                        </ul>
                      </div>
                      <div className="footer-content">
                        <h4>Get in Touch</h4>
                        <ul className="ps-0 mb-0">
                          {/* <li className="d-flex">
                            <Image
                              className="location-icon mt-1"
                              src="/images/location_on.png"
                              alt="location-icon"
                              width={24}
                              height={24}
                            />
                            <a className="ms-2" href="#!">
                              abc. South Gate,
                              <br />
                              CA 90280
                            </a>
                          </li> */}
                          <li className="d-flex align-items-center justify-content-center justify-content-sm-start">
                            <a className="ms-2" href="mailto:info@tripherder.com">
                              <IoMdMail className='me-1' size={22} />
                              info@tripherder.com
                            </a>
                          </li>
                          <li className="d-flex align-items-center justify-content-center justify-content-sm-start">
                            <a className="ms-2" target='_blank' href="https://wa.me/message/PUOS3XHNL3EOD1">
                              <IoLogoWhatsapp className='me-1' size={22} />
                              WhatsApp Us
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="footer-content">
                        <h4>Legal</h4>
                        <ul className="ps-0 mb-0">
                          <li>
                            <Link href="/terms-and-conditions">Terms and Conditions</Link>
                          </li>
                          <li>
                            <Link href="/privacy-policy">Privacy Policy</Link>
                          </li>
                        </ul>
                      </div>
                      <div className="footer-content">
                        <h4>Follow us on</h4>
                        <ul className="ps-0 d-flex justify-content-center justify-content-sm-start gap-3 mb-0">
                          <li>
                            <Link target='_blank' href="https://www.instagram.com/tripherderofficial/">
                              <RiInstagramLine size={23} />
                            </Link>
                          </li>
                          <li>
                            <Link target='_blank' href="https://www.facebook.com/TripherderOfficial/">
                              <ImFacebook2 size={19} />
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container-fluid">
                <div className="footer-bottom py-4">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className='copy-r-content text-center text-light'>
                        © Tripherder, a division of <Link target='_blank' className='text-light' href="https://lazyacres.co/">
                          Lazy Acres Enterprises, LLC.
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </footer>
          )}
        </>
      }
    </>
  );
};

export default Footer;
