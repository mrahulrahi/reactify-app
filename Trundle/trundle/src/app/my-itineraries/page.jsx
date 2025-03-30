import ItineraryCard from "../components/itineraryCard/ItineraryCard"

const MyItineraries = () => {
    return (
        <>
            <div className="content-container">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-10 mx-auto">
                            <div className="heading d-flex align-items-center justify-content-between">
                                <h5>My Itineraries</h5>
                            </div>
                        </div>

                        <div className="col-xl-10 mx-auto">
                            <div className="row g-4">
                                <div className="col-lg-4 col-md-6">
                                    <ItineraryCard isUser={false} showTimer={true}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyItineraries