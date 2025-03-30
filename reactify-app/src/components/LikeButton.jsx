/* eslint-disable react/prop-types */

const LikeButton = ({ title, style, size, hasIcon, onLikeItem }) => {
    return (
        <div>
            <button type="button" className={`btn btn-${style} ${size ? `btn-${size}` : ''} ${hasIcon ? `has-icon` : ''}`} onClick={onLikeItem}>
                {title}
                <div className="btn-icon">
                    {hasIcon}
                </div>
            </button >
        </div >
    )
}

export default LikeButton

