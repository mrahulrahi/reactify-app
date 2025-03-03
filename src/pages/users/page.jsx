/* eslint-disable react/prop-types */
import UserTable from './UserTable';
import { Suspense } from 'react';

const UserPage = async ({ searchParams: { sortOrder } }) => {

  return (
    <>
      <div className="content-container">
        <div className="container">
          <div className="row">
            <div className="col-md-6 mx-auto">
              <div className="w-100">
                <h2>Book Registration</h2>
                <form className="mt-5" name="Display">
                  <div className="form-group d-flex align-items-center justify-content-between mb-4">
                    <label className="form-label flex-shrink-0">Member Name</label>
                    <input type="text" className="form-control flex-grow-1" id="mname" name="mname" placeholder='Enter your name' />
                  </div>
                  <div className="form-group d-flex align-items-center justify-content-between mb-4">
                    <label className="form-label flex-shrink-0">Email Address</label>
                    <input type="text" className="form-control flex-grow-1" id="email" name="email" placeholder='Enter your email address' />
                  </div>
                  <div className="form-group d-flex align-items-center justify-content-between mb-4">
                    <label className="form-label flex-shrink-0">Phone No.</label>
                    <input type="text" className="form-control flex-grow-1" id="phone" name="phone" placeholder='Enter your phone number' />
                  </div>

                  <div className="form-group d-flex align-items-center justify-content-between mb-4">
                    <label className="form-label flex-shrink-0">No. of Books</label>
                    <input type="text" className="form-control flex-grow-1" id="noOfBooks" name="noOfBooks" placeholder='Enter no. of books' />
                  </div>

                  <div className="errorcss">
                    <label id="blankLabel"></label>
                  </div>
                  <div className="form-group d-flex"><input className="btn btn-primary ms-auto" type="submit" value="Create" /></div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Suspense fallback={<p>Loading...</p>}>
        <UserTable sortOrder={sortOrder} />
      </Suspense>
    </>
  )
}

export default UserPage;