'use client'
import Image from 'next/image'
import Link from 'next/link'
import './StepNav.css'

import { usePathname } from 'next/navigation'

const StepNav = () => {
    const pathname = usePathname()

    const stepNavItems = [
        {
            id: 1,
            title: 'Upload Photo',
            href: '/create-video/upload-photo',
            icon: '../../images/upload-icon.svg',
        },
        {
            id: 2,
            title: 'Input Text',
            href: '/create-video/input-text',
            icon: '../../images/clipboard-icon.svg',
        },
        {
            id: 3,
            title: 'Audio or Video',
            href: '/create-video/audio-video',
            icon: '../../images/media-icon.svg',
        },
        {
            id: 4,
            title: 'Preview',
            href: '/preview',
            icon: '../../images/preview-icon.svg',
        },
    ]

    return (
        <> 
            <ul className="step-nav-list d-flex align-items-center justify-content-between gap-4">
                {stepNavItems.map((item) => (
                    <li className={`step-nav-item ${pathname === item.href ? 'active' : ''}`} key={item.id}>
                        <Link href={item.href} className="step-nav-box d-flex align-items-center gap-2">
                            <div className="step-nav-box-icon d-flex align-items-center justify-content-center flex-shrink-0">
                                <Image src={item.icon} alt="" width={20} height={20} quality={100} />
                            </div>
                            <div className="step-nav-box-text">
                                <h6>{item.title}</h6>
                            </div>
                        </Link>
                    </li>
                ))} 
            </ul>
        </>
    )
}

export default StepNav