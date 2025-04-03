'use client';

import { useEffect } from 'react'
import Link from 'next/link';
import Image from 'next/image'
import '../../(home)/LPJapan.css'
import '../Blog.css'
import localFont from 'next/font/local'
import BlogCard from '../../components/blogCard/BlogCard'
import { FaInstagram, FaExternalLinkAlt } from "react-icons/fa";
import moment from "moment";

const clashDisplay = localFont({
  src: [
    {
      path: '../../(home)/fonts/ClashDisplay-Semibold.woff2',
      weight: '600',
    },
  ],
  variable: '--font-clashDisplay',
  display: 'swap',
})

export default function BlogById({ blogDetails, recentBlogsList }) {

  console.log(blogDetails);

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
                  <Link href={whatsAppNavUrl} className="btn btn-default">Talk to us</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="breadcrumb-container">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 mx-auto">
              <div className="breadcrumb-wrapper d-flex align-items-center justify-content-between">
                <div className="breadcrumb-left">
                  <nav aria-label="breadcrumb">
                    <ol class="breadcrumb mb-0">
                      <li class="breadcrumb-item"><Link href="/">Home</Link></li>
                      <li class="breadcrumb-item"><Link href="/blog">Blog</Link></li>
                      <li class="breadcrumb-item active" aria-current="page">{blogDetails?.title}</li>
                    </ol>
                  </nav>
                </div>

                <div className="breadcrumb-right">
                  <button className="share-btn d-flex align-items-center gap-2">
                    <span className="share-icon-btn"><Image src="/images/japan/share-icon.svg" alt="" width={16} height={16} quality={100} /></span>Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="blog-single-hero-container pb-0">
          <div className="container">
            <div className="row">
              <div className="col-lg-10 mx-auto">
                <div className="blog-sh-content text-center mx-auto">
                  <h1>{blogDetails?.title}</h1>
                  <p>{blogDetails?.short_description}</p>
                  <div className="blog-date">{moment(blogDetails?.updated_at).format("MMM DD")}</div>
                  <div className="blog-categories-row d-flex align-items-center justify-content-center flex-wrap gap-2">
                    {blogDetails?.tags?.map((tag, index) => {
                      return <div key={index} className="blog-category">{tag}</div>
                    })}
                  </div>
                </div>
              </div>
              <div className="col-lg-10 mx-auto mt-5">
                <div className="blog-single-img-outer">
                  <div className="blog-single-img"><Image src={blogDetails?.image} alt="" fill /></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lpj-content-container blog-single-container">
          <div className="container">
            <div className="row align-items-center justify-content-center">
              <div className="col-lg-8 mx-auto">
                <div className="bs-content-wrapper">
                  <h4>Unique experience for both locals and tourists alike</h4>
                  <p>{blogDetails?.long_description}</p>
                  <div className="blog-post-box text-center">
                    <div className="blog-post-head">
                      <h4>Matcha Cafe,</h4>
                      <p>Shinjuku</p>
                    </div>

                    <div className="blog-post-body">
                      <div className="blog-post-img-outer">
                        <div className="blog-post-img"><Image src="/images/japan/blog-post-img-1.jpg" alt="" fill /></div>
                      </div>
                      <p>Serves the best matcha coffees in Tokyo. Try their croissant and enjoy the trains passing by.</p>
                    </div>

                    <div className="blog-post-footer d-flex flex-wrap align-items-center justify-content-between gap-2">
                      <div className="bp-footer-left d-flex align-items-center gap-2">Recommendation by <a href="#!" className="instagram-link d-flex align-items-center gap-2"><span><FaInstagram /></span>@hirokojapan</a></div>
                      <div className="bp-footer-right"><a href="#!" className="direction-link d-flex align-items-center gap-2"><span><FaExternalLinkAlt /></span>Direction</a></div>
                    </div>
                  </div>

                  <div className="blog-post-box text-center">
                    <div className="blog-post-head">
                      <h4>Excelsior Cafe</h4>
                      <p>Ginza</p>
                    </div>

                    <div className="blog-post-body">
                      <div className="blog-post-img-outer">
                        <div className="blog-post-img"><Image src="/images/japan/blog-post-img-2.jpg" alt="" fill /></div>
                      </div>
                      <p>Serves the best cold coffee and the best part is you can refill it 3 times for free. Affable staff and a great place to sit and relax</p>
                    </div>

                    <div className="blog-post-footer d-flex flex-wrap align-items-center justify-content-between gap-2">
                      <div className="bp-footer-left d-flex align-items-center gap-2">Recommendation by <a href="#!" className="instagram-link d-flex align-items-center gap-2"><span><FaInstagram /></span>@hirokojapan</a></div>
                      <div className="bp-footer-right"><a href="#!" className="direction-link d-flex align-items-center gap-2"><span><FaExternalLinkAlt /></span>Direction</a></div>
                    </div>
                  </div>

                  <h4>In conclusion</h4>
                  <p>Kamakura’s cafe scene is a delightful mix of flavors, atmospheres, and experiences. Whether you’re looking for a quiet spot to enjoy a cup of coffee, a place to indulge in sweet treats, or a unique dining experience, Kamakura has something to offer everyone. So next time you find yourself in this beautiful city, be sure to explore its charming cafes!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="subscribe-form-container">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 mx-auto">
              <div className="subscribe-form-box">
                <div className="subscribe-form-content add-index d-flex flex-wrap align-items-center">
                  <div className="sf-content-left flex-shrink-0">
                    <h4>Subscribe to get more such curated recommendations in your inbox</h4>
                  </div>
                  <div className="sf-content-right flex-grow-1">
                    <div className="subscribe-form d-flex align-items-center justify-content-between gap-2">
                      <input className="flex-grow-1" type="text" placeholder="naruto@email.com" />
                      <button className="btn btn-default flex-shrink-0">Subscribe</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lpj-content-container other-blog-container">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 mx-auto">
              <div className="lpj-blog-content-wrapper">
                <div className="lpj-blog-head text-center">
                  <h3>Explore	Japan</h3>
                  <p>Hidden Gems. Important Information. Recommendations.</p>
                </div>

                <div className="lpj-blog-list d-flex flex-wrap">
                  {recentBlogsList?.map(blog => <div key={blog.id} className="lpj-blog-item">
                    <BlogCard title={blog.title} img={blog.image} blogLink={`/blog/${blog?.slug}`} />
                  </div>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >)
}
