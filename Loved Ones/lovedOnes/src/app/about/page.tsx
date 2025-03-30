import Banner from '../components/Banner/Banner'

const AboutPage = () => {
    return (
        <>
            <Banner />

            <div className="content-container">
                <div className="container" data-aos="fade-up" suppressHydrationWarning>
                    <div className="row">
                        <div className="col-md-12"> 
                            <div className="about-content bg-white">
                                <h2 className="h6">Our mission is to virtually bring back your Loved Ones!</h2>
                                <p>We believe that being able to create a video of your Loved Ones who have passed away will bring comfort and help with the grieving process. Now with the LovedOnes.AI app that is possible.</p>
                                <p>You may have lost a loved one physically but with the help of the LovedOnes.ai app, we will bring them back for you virtually!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AboutPage