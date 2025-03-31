/* eslint-disable react/no-unescaped-entities */
'use client';
import { useEffect, useState } from 'react'
import './LPJapan.css'
import localFont from 'next/font/local'
import Link from 'next/link'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import ReactPlayer from 'react-player';
import BlogCard from '../components/blogCard/BlogCard'

const clashDisplay = localFont({
  src: [
    {
      path: './fonts/ClashDisplay-Semibold.woff2',
      weight: '600',
    },
  ],
  variable: '--font-clashDisplay',
  display: 'swap',
})

const placeCards = [
  { id: 1, title: "Kirishima Shrine", img: "/images/japan/place-img-1.jpg" },
  { id: 2, title: "Kiyomizu Temple", img: "/images/japan/place-img-2.jpg" },
  { id: 3, title: "Ginzan Onsen", img: "/images/japan/place-img-3.jpg" },
  { id: 4, title: "Coffee County", img: "/images/japan/place-img-4.jpg" },
  { id: 5, title: "Koutokuji Temple", img: "/images/japan/place-img-5.jpg" },
  { id: 6, title: "Fushimi Inari Taisha", img: "/images/japan/place-img-6.jpg" },
  { id: 7, title: "Kirishima Shrine", img: "/images/japan/place-img-1.jpg" },
  { id: 8, title: "Kiyomizu Temple", img: "/images/japan/place-img-2.jpg" },
  { id: 9, title: "Ginzan Onsen", img: "/images/japan/place-img-3.jpg" },
  { id: 10, title: "Coffee County", img: "/images/japan/place-img-4.jpg" },
  { id: 11, title: "Koutokuji Temple", img: "/images/japan/place-img-5.jpg" },
  { id: 12, title: "Fushimi Inari Taisha", img: "/images/japan/place-img-6.jpg" },
]

const benefitList = [
  {
    id: 1,
    icon: "/images/japan/benefit-icon-1.png",
    title: "Have local travel experts plan your journey",
    description: "Our team will understand your expectations and provide personalised recommendations and insider tips."
  },
  {
    id: 2,
    icon: "/images/japan/benefit-icon-2.png",
    title: "Discover hidden gems",
    description: "From offbeat paths, local restaurants to unique cultural experiences, the way you’d always imagined. All curated by local travel experts."
  },
  {
    id: 3,
    icon: "/images/japan/benefit-icon-3.png",
    title: "Get exciting discounts",
    description: "As part of your recommendations, you’ll get discounts on bills or a free drink at restaurants, offers on entrance tickets and more."
  },
];

const blogCards = [
  { id: 1, title: "10 hidden cafes in Kamakura", img: "/images/japan/blog-img-1.jpg", blogLink: "/blog/blog-single" },
  { id: 2, title: "Pokeman manholes in Kyoto", img: "/images/japan/blog-img-2.jpg", blogLink: "/blog/blog-single" },
  { id: 3, title: "Pokeman manholes in Kyoto", img: "/images/japan/blog-img-3.jpg", blogLink: "/blog/blog-single" },
];

export default function HomePageContent() {

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

  const whatsAppNavUrl = "/help-plan-my-trip"

  return (
    <>
      <div className={`lpj-page-wrapper ${clashDisplay.variable} overflow-hidden`}>
        <header className="lpj-header d-flex align-items-center lpj-header-white">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="lpj-header-inner d-flex align-items-center justify-content-between">
                  <Link className="lpj-header-logo" href="/">
                    <Image src="/images/japan/logo-black.svg" alt="Trundle" width={132} height={100} quality={100} />
                  </Link>
                  <div className="lpj-header-right">
                    <Link href={whatsAppNavUrl} className="btn btn-pink">Talk to us</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="lpj-hero-container position-relative">
          <div className="lpj-hero-bg">
            <Image src="/images/japan/hero-bg.jpg" alt="hero bg" quality={100} fill />
          </div>
          <div className="lpj-hero-graphic lpj-hero-graphic-1">
            <Image className="d-none d-md-block" src="/images/experience/hero-graphic-1.svg" alt="Trundle" width={197} height={197} quality={100} />
            <Image className="d-md-none" src="/images/experience/hero-graphic-1-mob.svg" alt="Trundle" width={197} height={197} quality={100} />
          </div>
          <div className="lpj-hero-graphic lpj-hero-graphic-2">
            <Image className="d-none d-md-block" src="/images/experience/hero-graphic-2.svg" alt="Trundle" width={204} height={204} quality={100} />
            <Image className="d-md-none" src="/images/experience/hero-graphic-2-mob.svg" alt="Trundle" width={204} height={204} quality={100} />
          </div>
          <div className="container position-relative">
            <div className="row">
              <div className="col-lg-12">
                <div className="lpj-hero-content text-center mx-auto">
                  <h1>Experience Japan’s <br /> Cherry Blossoms</h1>
                  <p>Get curated recommendations and exclusive <br /> discounts from local Japan travel experts for <span>just $10.</span></p>
                </div>
                <div className="lpj-hero-cta d-flex justify-content-center">
                  <Link href={whatsAppNavUrl} className="btn btn-pink btn-lg">Talk to a Travel Expert</Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lpj-place-card-container">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="lpj-place-card-outer">
                  <Swiper
                    modules={[Autoplay]}
                    slidesPerView={'auto'}
                    spaceBetween={20}
                    loop={true}
                    freeMode={true}
                    autoplay={{ delay: 1, disableOnInteraction: true }}
                    speed={4000}
                    centeredSlides={true}
                    freeModeMomentum={false}
                    draggable={false}
                    allowTouchMove={false}
                    className="lpj-place-card-list overflow-visible"
                  >
                    {placeCards.map(card => <SwiperSlide key={card.id} className="lpj-place-card-item">
                      <div className="lpj-place-card-box w-100 h-100 d-flex align-items-end justify-content-start">
                        <div className="lpj-place-card-img">
                          <Image src={card.img} alt={card.title} width={192} height={252} quality={100} />
                        </div>
                        <div className="lpj-place-card-content d-flex flex-column">
                          <h4>{card.title}</h4>
                        </div>
                      </div>
                    </SwiperSlide>)
                    }
                  </Swiper>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lpj-content-container lpj-media-container">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="lpj-media-content mx-auto text-center">
                  <div className="lpj-media-text">
                    <h3>Trundle specialises in curating travel experiences.</h3>
                    <p>We’re your personal travel companion.</p>
                  </div>
                  <div className="lpj-media-box">
                    <ReactPlayer url='https://www.youtube.com/embed/rdFjsRYHd90' width='100%' height='100%'
                      playIcon={<button className="lpj-media-play-btn d-flex align-items-center justify-content-center">
                        <Image src="/images/japan/play-icon.svg" alt="Trundle" width={200} height={200} quality={100} />
                      </button>}
                      light={<Image src='/images/japan/video-img.jpg' alt='Thumbnail' fill />}
                      playing />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lpj-content-container lpj-benefit-container">
          <div className="container">
            <div className="row">
              <div className="col-lg-10 mx-auto">
                <div className="lpj-benefit-content text-center">
                  <div className="para">We’re here to personalise your travel experience. <br />
                    Trundle is not just your regular travel agent; we're your personal travel assistant.</div>
                  <h3>With Trundle, you'll</h3>

                  <div className="lpj-benefit-list d-flex flex-wrap">
                    {benefitList.map(benefit =>
                      <div key={benefit.id} className="lpj-benefit-item">
                        <div className="lpj-benefit-box w-100 h-100 d-flex flex-column">
                          <div className="lpj-benefit-icon">
                            <Image src={benefit.icon} alt={benefit.title} width={100} height={100} quality={100} />
                          </div>
                          <div className="lpj-benefit-text">
                            <h5>{benefit.title}</h5>
                            <p>{benefit.description}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="lpj-benefit-bottom-box d-flex flex-wrap align-items-end justify-content-between">
                    <div className="lpj-benefit-bottom-bg">
                      <Image src="/images/japan/benefit-bottom-bg.png" alt="Trundle" width={300} height={300} quality={100} />
                    </div>
                    <div className="lpj-benefit-bottom-text">
                      <h4>Access all information on our app</h4>
                      <p>After couple of calls with our travel expert, you'll receive an invite to our mobile app to access your list of recommendations on-the-go. On it you'll find details like address, directions, discount details and more.</p>
                      <p>Soon, we'll launch a chat feature for you to get instant assistance directly from our experts.</p>
                    </div>
                    <div className="lpj-benefit-bottom-img">
                      <Image src="/images/japan/benefit-bottom-img.png" alt="Trundle" width={300} height={300} quality={100} />
                    </div>
                  </div>

                  <p className="lpj-benefit-description">Are you ready to start planning your Japan trip?</p>
                  <Link href={whatsAppNavUrl} className="btn btn-white">Talk to us</Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lpj-content-container lpj-blog-container">
          <div className="container">
            <div className="row">
              <div className="col-lg-10 mx-auto">
                <div className="lpj-blog-content-wrapper">
                  <div className="lpj-blog-head text-center">
                    <h3>Explore	Japan</h3>
                    <p>Hidden Gems. Important Information. Recommendations.</p>
                  </div>

                  <div className="lpj-blog-list d-flex flex-wrap">
                    {blogCards.map(card => <div key={card.id} className="lpj-blog-item">
                      <BlogCard title={card.title} img={card.img} blogLink={card.blogLink} />
                    </div>)}
                  </div>

                  <div className="lpj-blog-cta text-center"><Link href='/blog' className="btn btn-orange btn-lg">Explore more</Link></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    </>
  )
}
