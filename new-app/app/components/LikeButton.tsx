'use client'
import React from 'react'

interface Props {
    title: string;
    style: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'lg';
    hasIcon?: JSX.Element;
    onLikeItem: () => void;
}

const LikeButton = ({ title, style, size, hasIcon, onLikeItem }: Props) => {
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

