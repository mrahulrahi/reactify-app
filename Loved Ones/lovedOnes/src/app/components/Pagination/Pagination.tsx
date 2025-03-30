import Link from 'next/link'
import Image from 'next/image'
import './Pagination.css'


const Pagination = () => {
    
    return (
        <nav className="pagination-wrapper">
            <ul className="pagination d-flex align-items-center justify-content-center">
                <li className="pagination-item">
                    <Link className="pagination-link d-flex align-items-center justify-content-center" href="#" aria-label="Previous">
                        <span className="pagination-icon has-img-contain" aria-hidden="true"><Image src="/images/chevron-left.svg" alt="pagination-left" width={12} height={16} /></span>
                    </Link>
                </li>
                <li className="pagination-item active"><Link className="pagination-link d-flex align-items-center justify-content-center" href="#">1</Link></li>
                <li className="pagination-item"><Link className="pagination-link d-flex align-items-center justify-content-center" href="#">2</Link></li>
                <li className="pagination-item"><Link className="pagination-link d-flex align-items-center justify-content-center" href="#">3</Link></li>
                <li className="pagination-item"><Link className="pagination-link d-flex align-items-center justify-content-center" href="#">...</Link></li>
                <li className="pagination-item"><Link className="pagination-link d-flex align-items-center justify-content-center" href="#">10</Link></li>
                <li className="pagination-item">
                    <Link className="pagination-link d-flex align-items-center justify-content-center" href="#" aria-label="Next">
                        <span className="pagination-icon has-img-contain" aria-hidden="true"><Image src="/images/chevron-right.svg" alt="pagination-right" width={12} height={16} /></span>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default Pagination