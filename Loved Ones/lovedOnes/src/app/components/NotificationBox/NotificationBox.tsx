import './NotificationBox.css'

interface NotificationBoxProps {
    unread?: boolean;
    title: string;
    subtitle: string;
    time: string;
}

export default function NotificationBox({ unread, title, subtitle, time }: NotificationBoxProps) {
    return (
        <div className={`notification-box ${unread ? 'unread' : ''}`}>
            <h5>{title}</h5>
            <h6>{subtitle}</h6>
            <p>{time}</p>
        </div>
    )
}