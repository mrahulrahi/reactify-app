'use client'
import { useEffect, useRef, useState } from 'react'
import './Experience.css'
import { Caprasimo } from 'next/font/google'
import Link from 'next/link'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

const caprasimo = Caprasimo({
    subsets: ["latin"],
    style: ["normal"],
    weight: ["400"],
    display: "swap",
    variable: "--font-caprasimo",
    preload: false,
});

const heroCards = [
    { id: 1, title: "Japan", img: "/images/experience/hero-card-img-1.jpg" },
    { id: 2, title: "Vietnam", img: "/images/experience/hero-card-img-2.jpg" },
    { id: 3, title: "South Korea", img: "/images/experience/hero-card-img-3.jpg" },
    { id: 4, title: "Thailand", img: "/images/experience/hero-card-img-4.jpg" }
]

const featureList = [
    { id: 1, title: "Discover hidden gems.", description: "From off-the-beaten-path restaurants to unique cultural experiences, the way you’d always imagined." },
    { id: 2, title: "Have local travel experts guide your journey", description: "From off-the-beaten-path restaurants to unique cultural experiences, the way you’d always imagined." },
    { id: 3, title: "Avoid unexpected surprises", description: "Get real-time assistance and updates even during your trip through our dedicated concierge chat service." },
]


const ExperiencePage = () => {

    /*========================== Header fix ==========================*/
    const handleScroll = () => {
        var scroll = document.documentElement.scrollTop;
        if (scroll >= 10) {
            document.body.classList.add("fixed");
        } else {
            document.body.classList.remove("fixed");
        }
    };

    // Initial check on component mount
    useEffect(() => {
        handleScroll(); // Check scroll position on mount
        window.addEventListener("scroll", handleScroll); // Attach scroll event listener

        return () => {
            window.removeEventListener("scroll", handleScroll); // Clean up the event listener on unmount
        };
    }, []);

    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

    useEffect(() => {
        let timeoutId;
        
        const handleResize = () => {
            clearTimeout(timeoutId);
            
            // Add a small delay to avoid too frequent updates during resize
            timeoutId = setTimeout(() => {
                setWindowWidth(window.innerWidth);
            }, 250);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(timeoutId);
        };
    }, []);

    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const handleVideoPlay = () => {
        videoRef.current.play();
        setIsPlaying(true);
    }

    return (
        <>
            <div className={`exp-page-wrapper ${caprasimo.variable}`}>
                <header className="exp-header d-flex align-items-center">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="exp-header-inner d-flex align-items-center justify-content-between">
                                    <Link className="exp-header-logo" href="/">
                                        <Image src="/images/experience/logo.svg" alt="Trundle" width={132} height={100} quality={100} />
                                    </Link>
                                    <div className="exp-header-right">
                                        <Link href="/experience" className="btn btn-default">Schedule a call</Link>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </header>
                <div className="exp-hero-container position-relative overflow-hidden">
                    <div className="exp-hero-graphic exp-hero-graphic-1">
                        <Image className="d-none d-md-block" src="/images/experience/hero-graphic-1.svg" alt="Trundle" width={197} height={197} quality={100} />
                        <Image className="d-md-none" src="/images/experience/hero-graphic-1-mob.svg" alt="Trundle" width={197} height={197} quality={100} />
                    </div>
                    <div className="exp-hero-graphic exp-hero-graphic-2">
                        <Image className="d-none d-md-block" src="/images/experience/hero-graphic-2.svg" alt="Trundle" width={204} height={204} quality={100} />
                        <Image className="d-md-none" src="/images/experience/hero-graphic-2-mob.svg" alt="Trundle" width={204} height={204} quality={100} />
                    </div>
                    <div className="container position-relative">
                        <div className="exp-hero-graphic-bg d-none d-md-block">
                            <Image src="/images/experience/hero-graphic-bg.svg" alt="Trundle" width={879} height={454} quality={100} />
                        </div>
                        <div className="exp-hero-graphic exp-hero-graphic-3 d-none d-md-block">
                            <Image src="/images/experience/hero-graphic-3.svg" alt="Trundle" width={136} height={136} quality={100} />
                        </div>
                        <div className="row">
                            <div className="col-lg-10 col-xl-9 mx-auto">
                                <div className="exp-hero-content text-center">
                                    <h1>Experience</h1>
                                    <div className="exp-hero-card-outer">
                                        {screen.width  < 768 ? (
                                            <Swiper
                                                breakpoints={{
                                                    375: {
                                                        spaceBetween: 64,
                                                    },
                                                    992: {
                                                        slidesPerView: 4,
                                                        spaceBetween: 0,
                                                        centeredSlides: false,
                                                    },
                                                }}
                                                slidesPerView={'auto'}
                                                spaceBetween={50}
                                                centeredSlides={true}
                                                className="exp-hero-card-list overflow-visible"
                                            >

                                                {heroCards.map(card => <SwiperSlide key={card.id} className="exp-hero-card-item">
                                                    <div className="exp-hero-card-box w-100 h-100">
                                                        <div className="exp-hero-card-img">
                                                            <Image src={card.img} alt={card.title} width={192} height={252} quality={100} />
                                                        </div>
                                                        <div className="exp-hero-card-content d-flex flex-column h-100">
                                                            <h4>{card.title}</h4>
                                                        </div>
                                                    </div>
                                                </SwiperSlide>)}
                                            </Swiper>)
                                            : (
                                                <div className="exp-hero-card-list d-flex justify-content-md-center">
                                                    {heroCards.map(card => <div key={card.id} className="exp-hero-card-item">
                                                        <div className="exp-hero-card-box w-100 h-100">
                                                            <div className="exp-hero-card-img">
                                                                <Image src={card.img} alt={card.title} width={192} height={252} quality={100} />
                                                            </div>
                                                            <div className="exp-hero-card-content d-flex flex-column h-100">
                                                                <h4>{card.title}</h4>
                                                            </div>
                                                        </div>
                                                    </div>)}
                                                </div>)
                                        }
                                    </div>
                                    <h2>like never before.</h2>
                                    <p className="exp-hero-description">Get personalised recommendations and exclusive discounts from local travel experts and influencers.</p>
                                    <Link href="/experience" className="btn btn-default btn-lg">Schedule a call</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="exp-content-container exp-media-container">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="exp-media-content mx-auto text-center">
                                    <div className={`exp-media-box ${isPlaying ? 'playing' : ''}`}>
                                        <video src="https://www.w3schools.com/html/mov_bbb.mp4" poster="/images/experience/video-img.png" ref={videoRef} controls={isPlaying}></video>
                                        {isPlaying ? (
                                            null
                                        ) : (
                                            <button className="exp-media-play-btn d-flex align-items-center justify-content-center" onClick={handleVideoPlay}>
                                                <Image src="/images/experience/play-icon.svg" alt="Trundle" width={100} height={100} quality={100} />
                                            </button>
                                        )}
                                    </div>
                                    <h4>Tired of generic travel recommendations?
                                        Experience your next trip your way with Trundle.</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="exp-content-container exp-feature-container">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-10 mx-auto">
                                <div className="exp-feature-content text-center">
                                    <div className="para"><span>We’re here to personalise your travel experience. </span> Trundle is not just your regular travel agent; we're your <strong className="fw-medium">personal travel assistant.</strong></div>
                                    <h3>With Trundle, you'll</h3>

                                    <div className="exp-feature-list d-flex flex-wrap">
                                        {featureList.map(feature => <div key={feature.id} className="exp-feature-item">
                                            <div className="exp-feature-box w-100 h-100">
                                                <h5>{feature.title}</h5>
                                                <p>{feature.description}</p>
                                            </div>
                                        </div>)}
                                    </div>

                                    <p className="exp-feature-description">Ready to elevate your next adventure?</p>
                                    <Link href="/experience" className="btn btn-default btn-lg">Schedule a call</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ExperiencePage