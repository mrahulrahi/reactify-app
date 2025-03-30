import Link from 'next/link'
import './InnerHero.css'

type InnerHeroProps = {
    bgImage: string
    title: string
    buttonText?: string
    buttonLink?: string
}

const InnerHero = ({ title, bgImage, buttonText, buttonLink }: InnerHeroProps) => {
    return (
        <div className="inner-hero-container">
            <div className="inner-hero-bg" style={{ backgroundImage: `url(${bgImage})` }}></div>
            <div className="container add-index" data-aos="fade-up" suppressHydrationWarning>
                <div className="row">
                    <div className="col-md-9">
                        <div className="inner-hero-content">
                            <h1>{title}</h1>
                            {buttonText && buttonLink && (<Link href={buttonLink} className="btn btn-white">{buttonText}</Link>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InnerHero