import Link from 'next/link'
import Image from 'next/image'
const NotFound = () => {
  return (
    <div className="content-container not-found-container">
      <div className="container">
        <div className="row g-0">
          <div className="col-md-5 mx-auto">
            <div className="not-found-content d-flex flex-column align-items-center text-center">
              <h1>Page Not Found</h1>
              <div className="not-found-img has-img-contain">
                <Image src="/images/not-found.svg" alt="Not Found" width={1000} height={1000} quality={100} />
              </div>
              <p>Sorry, the page you’re looking for does not exist or has been moved please go back to the Home page</p>
              <Link href="/" className="btn btn-blue">Go back Home</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound