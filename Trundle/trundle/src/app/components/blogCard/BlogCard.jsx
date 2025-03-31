import Link from 'next/link'
import Image from 'next/image'
import './BlogCard.css'

const BlogCard = ({ img, title, blogLink }) => {
    return (
        <Link href={blogLink} className="lpj-blog-box w-100 h-100 d-flex align-items-end justify-content-start">
            <div className="lpj-blog-img">
                <Image src={img} alt={title} width={271} height={348} quality={100} />
            </div>
            <div className="lpj-blog-content d-flex flex-column">
                <h4>{title}</h4>
            </div>
        </Link>
    )
}

export default BlogCard
