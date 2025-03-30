import Banner from '../components/Banner/Banner'
import NotificationBox from '../components/NotificationBox/NotificationBox'

const NotificationPage = () => {
    return (
        <>
            <Banner />

            <div className="content-container notification-page-container">
                <div className="container" data-aos="fade-up" suppressHydrationWarning>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="notification-body">
                                <div className="notification-filter-row d-flex gap-2">
                                    <div className="notification-badge">This Week</div>
                                </div>
                                <div className="notification-list">
                                    <div className="notification-item">
                                        <NotificationBox unread={true} title="Your LovedOnes.ai Video is Ready!" subtitle="‘2154’ video creation completed" time="1 min" />
                                    </div>
                                    <div className="notification-item">
                                        <NotificationBox unread={true} title="Your LovedOnes.ai Video is Ready!" subtitle="‘2154’ video creation completed" time="1 min" />
                                    </div>
                                    <div className="notification-item">
                                        <NotificationBox unread={false} title="Your LovedOnes.ai Video is Ready!" subtitle="‘2154’ video creation completed" time="1 min" />
                                    </div>
                                    <div className="notification-item">
                                        <NotificationBox unread={false} title="Your LovedOnes.ai Video is Ready!" subtitle="‘2154’ video creation completed" time="1 min" />
                                    </div>
                                    <div className="notification-item">
                                        <NotificationBox unread={false} title="Your LovedOnes.ai Video is Ready!" subtitle="‘2154’ video creation completed" time="1 min" />
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

export default NotificationPage