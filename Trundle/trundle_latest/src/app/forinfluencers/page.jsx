/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/alt-text */
import './influencer-lp.css'
import Image from 'next/image'
import "../globals.css";
import Link from 'next/link';
import { OG_IMAGE, SITE_NAME, _metadata } from '../lib/metadata';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/authOptions';

export async function generateMetadata(parent) {

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: _metadata?.homepage?.title,
    description: _metadata?.homepage?.description,
    openGraph: {
      siteName: SITE_NAME, // Add your site name here
      url: 'https://trundle.me', // Add your website URL here
      images: [
        {
          url: OG_IMAGE,
          width: 1200,  // common recommended width
          height: 630   // common recommended height
        },
        ...previousImages
      ],
    },
    twitter: {
      card: 'summary_large_image', // Twitter card type
      title: _metadata?.homepage?.title,
      description: _metadata?.homepage?.description,
      image: {
        url: OG_IMAGE,
        width: 1200,  // common recommended width
        height: 630   // common recommended height
      },
    }
  }
}

const InfluencerLandingPage = async () => {

  const session = await getServerSession(authOptions);

  const role = session?.user?.user_role;

  return (
    <>
      <div className="content-container influencer-lp-hero-container position-relative">
        <div className="ilp-hero-shape-1 d-flex">
          <Image src="/images/ilp-hero-shape-1.svg" width={100} height={100} />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 d-flex align-items-center justify-content-between">
              <Link
                href={`${role === 1 ? `/influencer/my-profile` : role === 2 ? `/travellers` : "/"}`}
                className="ilp-hero-llogo">
                <Image className='navbar-brand' src="/images/ilp-hero-logo.svg" width={100} height={100} />
              </Link>
              {/* <Link style={{ color: "#6C27FF", fontSize: "14px", fontWeight: 600 }} href={"/travellers"}>Are you a traveller?</Link> */}
            </div>
          </div>
        </div>
        <div className="container position-relative">
          <div className="ilp-hero-graphic-bg"><Image src="/images/ilp-hero-graphic-bg.svg" width={1000} height={1000} /></div>
          <div className="ilp-hero-shape-2"><Image src="/images/ilp-hero-shape-2.svg" width={100} height={100} /></div>
          <div className="row mt-4">
            <div className="col-lg-10 mx-auto">
              <div className="ilp-hero-box text-center add-index">
                <div className="ilp-hero-icon icon-1"><Image src="/images/ilp-hero-icon-1.png" width={100} height={100} /></div>
                <div className="ilp-hero-icon icon-2"><Image src="/images/ilp-hero-icon-2.png" width={100} height={100} /></div>
                <div className="ilp-hero-icon icon-3"><Image src="/images/ilp-hero-icon-3.png" width={100} height={100} /></div>
                <div className="ilp-hero-icon icon-4"><Image src="/images/ilp-hero-icon-4.png" width={100} height={100} /></div>
                <div className="ilp-hero-icon icon-5"><Image src="/images/ilp-hero-icon-5.png" width={100} height={100} /></div>
                <div className="ilp-hero-content">
                  <h1>Turn your <span>Travel Passion into Profits</span></h1>
                  <p>Sell curated itineraries and travel packages to your audience and earn 3x more in profits.</p>
                  <div className="ilp-hero-btn-wrap"><Link href="/onboard" className="btn btn-default">CREATE YOUR PROFILE</Link></div>
                  <p>in just 2 mins</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row mb-md-5 my-2">
          <div className="col-md-4 col-sm-6 col-12 my-2">
            <div className='new-card h-100'
              style={{ backgroundColor: "#F3EEFB", borderRadius: "20px" }}
            >
              <Image className='mb-2' src="/images/coins.svg" width={48} height={48} />
              <p className='card-title'>
                Earn 3x more profits
              </p>
              <p className='mb-0 card-description'>
                Trundle offers you an additional revenue stream on top of what you earn from other socials.
              </p>
            </div>
          </div>
          <div className="col-md-4 col-sm-6 col-12 my-2">
            <div className='new-card h-100'
              style={{ backgroundColor: "#F3EEFB", borderRadius: "20px" }}
            >
              <Image className='mb-2' src="/images/chat.svg" width={48} height={48} />
              <p className='card-title'>
                Engage with your audience directly
              </p>
              <p className='mb-0 card-description'>
                On Trundle, you can publish curated, unexplored recommendations that your audience crave for.                            </p>
            </div>
          </div>
          <div className="col-md-4 col-sm-6 col-12 my-2">
            <div className='new-card h-100'
              style={{ backgroundColor: "#F3EEFB", borderRadius: "20px" }}
            >
              <Image className='mb-2' src="/images/discount.svg" width={48} height={48} />
              <p className='card-title'>
                Zero commission fee
              </p>
              <p className='mb-0 card-description'>
                That's right, you keep everything you earn. But just for a limited time.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="content-container influencer-lp-intro-container pt-0">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="ilp-intro-wrapper d-flex flex-wrap">
                <div className="ilp-intro-content">
                  <h3>With Trundle, you can turn your passion for travel into a successful business.</h3>
                  <p>Create and publish itineraries and encourage your audience to buy it so that they can have the same experience you love and recommend.</p>
                </div>

                <div className="ilp-intro-img-box d-flex align-items-end justify-content-center justify-content-lg-end">
                  <div className="ilp-intro-img ms-auto">
                    <Image src="/images/ilp-intro-mobile-frame.png" width={1000} height={1000} />
                    <div className="ilp-intro-img-back"><Image src="/images/ilp-intro-img-1.jpg" width={1000} height={1000} /></div>
                    <div className="ilp-intro-img-front"><Image src="/images/ilp-intro-img-2.jpg" width={1000} height={1000} /></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="content-container influencer-lp-steps-container pt-0">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="ilp-steps-content-box">

                <h3 className="text-center">Passion to Profit</h3>

                <div className="ilp-steps-list d-flex flex-wrap">
                  <div className="ilp-steps-item">
                    <div className="ilp-steps-box d-flex flex-column w-100 h-100">
                      <div className="ilp-steps-content w-100 flex-grow-1">
                        <div className="ilp-steps-no">01</div>
                        <h5>Create Profile</h5>
                        <p>Head to - <br /> trundle.me/create-influencer-profile and create your profile.</p>
                      </div>

                      <div className="ilp-steps-img img-1"><Image src="/images/ilp-steps-img-1.png" width={1000} height={1000} /></div>
                    </div>
                  </div>
                  <div className="ilp-steps-item">
                    <div className="ilp-steps-box d-flex flex-column w-100 h-100">
                      <div className="ilp-steps-content w-100 flex-grow-1">
                        <div className="ilp-steps-no">02</div>
                        <h5>Create Itinerary</h5>
                        <p>Create your first itinerary by filling the required details.</p>
                      </div>

                      <div className="ilp-steps-img img-2"><Image src="/images/ilp-steps-img-2.png" width={1000} height={1000} /></div>
                    </div>
                  </div>
                  <div className="ilp-steps-item">
                    <div className="ilp-steps-box d-flex flex-column w-100 h-100">
                      <div className="ilp-steps-content w-100 flex-grow-1">
                        <div className="ilp-steps-no">03</div>
                        <h5>Publish</h5>
                        <p>Publish your itinerary.</p>
                      </div>

                      <div className="ilp-steps-img img-3"><Image src="/images/ilp-steps-img-3.svg" width={1000} height={1000} /></div>
                    </div>
                  </div>
                  <div className="ilp-steps-item">
                    <div className="ilp-steps-box d-flex flex-column w-100 h-100">
                      <div className="ilp-steps-content w-100 flex-grow-1">
                        <div className="ilp-steps-no">04</div>
                        <h5>Share</h5>
                        <p>Copy link of your itinerary and share it with your audience on various platforms like YouTube, Instagram, Twitch, X.com etc.</p>
                      </div>                                            <div className="ilp-steps-img img-4"><Image src="/images/ilp-steps-img-4.png" width={1000} height={1000} /></div>
                    </div>
                  </div>
                  <div className="ilp-steps-item">
                    <div className="ilp-steps-box d-flex flex-column w-100 h-100">
                      <div className="ilp-steps-content w-100 flex-grow-1">
                        <div className="ilp-steps-no">05</div>
                        <h5>Promote your profile</h5>
                        <p>Promote your Trundle profile and itineraries to your audience and encourage them to buy it to have experiences that you recommended.</p>
                      </div>

                      <div className="ilp-steps-img img-5"><Image src="/images/ilp-steps-img-5.svg" width={1000} height={1000} /></div>
                    </div>
                  </div>
                  <div className="ilp-steps-item">
                    <div className="ilp-steps-box d-flex flex-column w-100 h-100">
                      <div className="ilp-steps-content w-100 flex-grow-1">
                        <div className="ilp-steps-no">06</div>
                        <h5>Dashboard</h5>
                        <p>Check your dashboard for the number of purchases and payment earned.</p>
                      </div>

                      <div className="ilp-steps-img img-6"><Image src="/images/ilp-steps-img-6.png" width={1000} height={1000} /></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="content-container influencer-lp-features-container pt-0 pb-0">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="ilp-features-content-box">

                <h3 className="text-center">Features in works</h3>
                <div className="ilp-features-list d-flex flex-wrap">
                  <div className="ilp-features-item">
                    <div className="ilp-features-box">
                      <div className="ilp-features-content">
                        <h4>Create tour packages</h4>
                        <p>Ability to create and publish your own tour packages that may include recommendations for stay, intra-city travel, when and where to go during your trip etc.</p>
                      </div>

                      <div className="ilp-features-img img-1">
                        <Image src="/images/ilp-features-img-1.png" width={1000} height={1000} />
                      </div>
                    </div>
                  </div>
                  <div className="ilp-features-item">
                    <div className="ilp-features-box">
                      <div className="ilp-features-content">
                        <h4>Community</h4>
                        <p>Create, manage and engage with your followers.</p>
                      </div>

                      <div className="ilp-features-img img-2">
                        <Image src="/images/ilp-features-img-2.png" width={1000} height={1000} />
                      </div>
                    </div>
                  </div>
                  <div className="ilp-features-item">
                    <div className="ilp-features-box">
                      <div className="ilp-features-content">
                        <h4>Affiliate marketing</h4>
                        <p>Dedicated affiliate marketing for brand collaboration and e-commerce platform to sell sponsored products.</p>
                      </div>

                      <div className="ilp-features-img img-3">
                        <Image src="/images/ilp-features-img-3.png" width={1000} height={1000} />
                      </div>
                    </div>
                  </div>
                  <div className="ilp-features-item">
                    <div className="ilp-features-box">
                      <div className="ilp-features-content">
                        <h4>Become a host</h4>
                        <p>Welcome travellers for a stay at your place, serve them home cooked food, take them around the country etc.</p>
                      </div>

                      <div className="ilp-features-img img-4">
                        <Image src="/images/ilp-features-img-4.png" width={1000} height={1000} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container d-flex align-items-center justify-content-center">
        <div className="ilp-hero-content mb-5">
          <div className="ilp-hero-btn-wrap"><Link href="/create-influencer-profile" className="btn btn-default">CREATE YOUR PROFILE</Link></div>
          <p className='text-center'>in just 2 mins</p>
        </div>
      </div>
    </>
  )
}

export default InfluencerLandingPage