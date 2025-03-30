import Image from "next/image";
import Link from "next/link";
import VideoFrame from "./components/VideoFrame/VideoFrame";


export default function Home() {
  const ewData = [
    { title: 'Closure', image: '/images/ew-people-img-1.jpg' },
    { title: 'Comfort', image: '/images/ew-people-img-2.jpg' },
    { title: 'Healing', image: '/images/ew-people-img-3.jpg' },
    { title: 'Connection', image: '/images/ew-people-img-4.jpg' },
    { title: 'Forgiveness', image: '/images/ew-people-img-5.jpg' },
    { title: 'Gratitude', image: '/images/ew-people-img-6.jpg' },
    { title: 'Empowerment', image: '/images/ew-people-img-7.jpg' },
    { title: 'Resilience', image: '/images/ew-people-img-8.jpg' },
    { title: 'Reflection', image: '/images/ew-people-img-9.jpg' },
    { title: 'Legacy', image: '/images/ew-people-img-10.jpg' },
  ]

  return (
    <>
      <div className="hero-container">
        <div className="container" data-aos="fade-up" suppressHydrationWarning>
          <div className="row flex-column-reverse flex-lg-row g-4 g-lg-5">
            <div className="col-lg-7">
              <div className="hero-left">
                <div className="hero-content">
                  <h1 className="h2">Create Timeless Memories, Videos of your Loved Ones Who have passed away bringing their voices and legacy back to life!</h1>
                  <p>Experience feelings of Comfort, Healing, Connection and many <br /> more other Emotional Wellness benefits...</p>
                </div>
                <div className="hero-tick-list">
                  <div className="hero-tick-item">
                    <div className="hero-tick-box bg-white">
                      <div className="hero-tick-content">
                        <h5>Upload a Photo for a Personalized Video</h5>
                        <p>Upload a high-quality front-facing photo from shoulders up with visible lips for the best video results.</p>
                      </div>
                    </div>
                  </div>
                  <div className="hero-tick-item">
                    <div className="hero-tick-box bg-white">
                      <div className="hero-tick-content">
                        <h5>Submit Text and Voice to Bring Their Words to Life</h5>
                        <p>Submit text in any available language and optionally upload a voice recording, or choose from available voices.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="hero-actions text-center">
                  <h4>Get the App</h4>
                  <div className="hero-actions-list">
                    <ul className="d-flex flex-wrap gap-4 justify-content-center">
                      <li><Link href="/" className="hero-actions-btn"><Image src="/images/app-store.png" alt="Apple" width={280} height={280} quality={100} /></Link></li>
                      <li><Link href="/" className="hero-actions-btn"><Image src="/images/google-play.png" alt="Google Play" width={280} height={280} quality={100} /></Link></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="hero-right d-flex flex-column h-100 ">
                <div className="hero-media has-img-cover mb-5 mb-lg-0">
                  <VideoFrame thumbnailSrc="/images/hero-img.jpg" videoSrc="/videos/portrait-video.mp4" />
                </div>
                <div className="hero-img-list d-flex flex-wrap mt-auto">
                  <div className="hero-img-item has-img-cover">
                    <Image src="/images/hero-img-1.jpg" alt="Hero" width={1000} height={1000} quality={100} />
                  </div>
                  <div className="hero-img-item has-img-cover">
                    <Image src="/images/hero-img-2.jpg" alt="Hero" width={1000} height={1000} quality={100} />
                  </div>
                  <div className="hero-img-item has-img-cover">
                    <Image src="/images/hero-img-3.jpg" alt="Hero" width={1000} height={1000} quality={100} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="content-container bg-white">
        <div className="container" data-aos="fade-up" suppressHydrationWarning>
          <div className="row g-4 g-lg-5">
            <div className="col-lg-8 col-xl-9">
              <div className="why-us-content">
                <h2>Why LovedOnes.ai</h2>
                <div className="wu-tick-list d-flex flex-wrap">
                  <div className="wu-tick-item">
                    <div className="wu-tick-box">
                      <p>Do you ever miss a loved one in your life who has passed away, a parent, a sibling, a spouse, a child, a relative, a partner, a friend, or any person you had an emotional connection with over the span of your life?</p>
                    </div>
                  </div>
                  <div className="wu-tick-item">
                    <div className="wu-tick-box">
                      <p>When you do, are there words, expressions, or comments you wish you had heard or could have heard from them?</p>
                    </div>
                  </div>
                  <div className="wu-tick-item">
                    <div className="wu-tick-box">
                      <p> It is known through several studies that being able to relive those moments with your Loved Ones that have passed away expressing what you wish they would say, or would have said, when they were alive brings you emotional wellness</p>
                    </div>
                  </div>
                  <div className="wu-tick-item">
                    <div className="wu-tick-box">
                      <p>Such emotional WELLNESS benefits can be accomplished with videos of sixty words or less in the image and voice of your loved ones who have passed away.</p>
                    </div>
                  </div>
                  <div className="wu-tick-item">
                    <div className="wu-tick-box">
                      <p>You are not alone. Just about every person alive experiences such longing for those moments.</p>
                    </div>
                  </div>
                  <div className="wu-tick-item">
                    <div className="wu-tick-box">
                      <p>The LovedOnes.ai mobile app enables you to accomplish such emotional wellness.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-xl-3">
              <div className="why-us-media has-img-cover">
                <VideoFrame thumbnailSrc="/images/why-us-img.png" videoSrc="/videos/portrait-video.mp4" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="content-container">
        <div className="container" data-aos="fade-up" suppressHydrationWarning>
          <div className="row">
            <div className="col-12">
              <h2 className="fw-semibold">With the Loved Ones app you will experience many Emotional Wellness
                benefits like:</h2>

              <div className="emotional-wellness-list d-flex flex-wrap">
                {ewData.map((item, index) => (
                  <div className="emotional-wellness-item" key={index}>
                    <div className="emotional-wellness-box">
                      <div className="ew-media has-img-cover video-frame">
                        <Image src={item.image} alt="Emotional Wellness" width={100} height={100} />
                        <button type="button" className="play-btn" data-bs-toggle="modal" data-bs-target="#videoModal" />
                      </div>
                      <p>{item.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="content-container bg-white">
        <div className="container" data-aos="fade-up" suppressHydrationWarning>
          <div className="row align-items-center g-4">
            <div className="col-md-5 col-lg-4 offset-lg-1">
              <div className="founders-vision-media has-img-cover">
                <VideoFrame thumbnailSrc="/images/founders-vision-img.png" videoSrc="/videos/video.mp4" />
              </div>
            </div>
            <div className="col-md-5 offset-md-1">
              <div className="founders-vision-content">
                <h2>Founders Vision</h2>
                <p>The Founders vision is to create a platform where people can preserve and relive memories of their loved ones through personalized videos. The goal is to bring comfort and connection by recreating their voices and stories.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade video-modal" id="videoModal" tabIndex={-1} aria-labelledby="videoModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 overflow-hidden">
            <div className="modal-body p-0">
              <VideoFrame thumbnailSrc="/images/why-us-img.png" videoSrc="/videos/portrait-video.mp4" />
              <button type="button" className="modal-close-btn d-flex align-items-center justify-content-center" data-bs-dismiss="modal" aria-label="Close">
                <Image src="/images/close-icon.svg" alt="Close" width={14} height={14} quality={100} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
