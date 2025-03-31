'use client';
import { useEffect } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import '../(home)/LPJapan.css'
import './Blog.css'
import localFont from 'next/font/local'
import BlogCard from '../components/blogCard/BlogCard'

const clashDisplay = localFont({
    src: [
        {
            path: '../(home)/fonts/ClashDisplay-Semibold.woff2',
            weight: '600',
        },
    ],
    variable: '--font-clashDisplay',
    display: 'swap',
})

const BlogPage = () => {

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

    const blogCards = [
        { id: 1, title: "10 hidden cafes in Kamakura", img: "/images/japan/blog-img-1.jpg", blogLink: "/blog/blog-single" },
        { id: 2, title: "Pokeman manholes in Kyoto", img: "/images/japan/blog-img-2.jpg", blogLink: "/blog/blog-single" },
        { id: 3, title: "Pokeman manholes in Kyoto", img: "/images/japan/blog-img-3.jpg", blogLink: "/blog/blog-single" },
        { id: 4, title: "Pokeman manholes in Kyoto", img: "/images/japan/blog-img-2.jpg", blogLink: "/blog/blog-single" },
        { id: 5, title: "Pokeman manholes in Kyoto", img: "/images/japan/blog-img-3.jpg", blogLink: "/blog/blog-single" },
    ];

    return (
        <>
            <div className={`lpj-page-wrapper ${clashDisplay.variable} overflow-hidden`}>
                <header className="lpj-header d-flex align-items-center">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="lpj-header-inner d-flex align-items-center justify-content-between">
                                    <Link className="lpj-header-logo" href="/">
                                        <Image src="/images/japan/logo.svg" alt="Trundle" width={132} height={100} quality={100} />
                                    </Link>
                                    <div className="lpj-header-right">
                                        <Link href={whatsAppNavUrl} className="btn btn-outline">Talk to us</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                
                <div className="blog-inner-hero-container position-relative d-flex align-items-center overflow-hidden">
                    <div className="container add-index">
                        <div className="row align-items-center justify-content-center">
                            <div className="col-md-7 col-lg-6 text-center">
                                <h1>Explore Japan</h1>
                            </div>
                        </div>
                    </div>
                    <div className="blog-ih-bg">
                        <Image src="/images/japan/blog-ih-bg.jpg" alt="" width={978} height={256} quality={100} />
                    </div>
                    <div className="blog-line-1">
                        <Image src="/images/japan/ttj-line-1.svg" alt="" width={146} height={100} quality={100} />
                    </div>
                    <div className="blog-line-2">
                        <Image src="/images/japan/ttj-line-2.svg" alt="" width={132} height={265} quality={100} />
                    </div>
                    <div className="blog-star">
                        <Image src="/images/japan/ttj-star.svg" alt="" width={25} height={25} quality={100} />
                    </div>
                </div>

                <div className="lpj-content-container blogs-container">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-10 mx-auto">
                                <div className="blog-content-wrapper">
                                    <div className="lpj-blog-list d-flex flex-wrap">
                                        {blogCards.map(card => <div key={card.id} className="lpj-blog-item">
                                            <BlogCard title={card.title} img={card.img} blogLink={card.blogLink} />
                                        </div>)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BlogPage