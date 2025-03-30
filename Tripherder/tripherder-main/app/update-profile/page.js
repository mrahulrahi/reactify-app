import Link from 'next/link'
import React from 'react'

export default function ProfileUpdatePage() {
  return (
    <>
      <div className="container-fluid profile-header">
        <div className="container p-0">
          <nav className="navbar navbar-expand-lg navbar-trip-header">
            <div className="container-fluid px-lg-0 px-4">
              <div className="d-flex align-items-center">
                <Link className="navbar-brand me-3" href="/">
                  <img src="./images/img-2.png" alt="website logo" />
                </Link>
              </div>
              <button
                className="navbar-toggler btn-nav"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarTogglerDemo02"
                aria-controls="navbarTogglerDemo02"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon" />
              </button>
              <div
                className="collapse navbar-collapse justify-content-end"
                id="navbarTogglerDemo02"
              >
                <div className="d-flex align-items-center">
                  <div className="dropdown">
                    <a
                      className="btn dropdown-toggle cta-get-s"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="fa-solid fa-user me-2" /> Hey user
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <a className="dropdown-item" href="#">
                          My Profile
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Saved Itinerary{" "}
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Favorite Itinerary{" "}
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
      <div className="container-lg container-fluid">
        <div className="d-flex align-items-center profile-text-content">
          <Link href="/">Home</Link>
          <i className="fa-solid fa-angle-right ms-3" />
          <h3 className="text-start ms-3">My Profile</h3>
        </div>
        <div className="row profile-container">
          <div className="col-lg-4 col-md-5 col-sm-12 mb-lg-0 mb-md-0 mb-5">
            <div className="profile-side-navbar">
              <div className="d-flex flex-column align-items-center justify-content-center">
                <div className="form-profile-pic added">
                  <label className="form-label" htmlFor="profile-photo">
                    <span>
                      <i className="fa-solid fa-pen" />
                    </span>
                    <img src="./images/tom.png" id="profile-output" width={200} />
                    <p>Profile Photo</p>
                  </label>
                  <input
                    id="profile-photo"
                    type="file"
                    onchange="loadFile(event)"
                  />
                </div>
                <div className="mt-4 ">
                  <div className="my-profile-a-text d-flex align-items-center justify-content-center">
                    <a href="#!">
                      {" "}
                      <i className="fa-regular fa-user" /> My Profile
                    </a>
                  </div>
                  {/* <div className="transaction-h-content d-flex align-items-center justify-content-center">
                    <a href="#!">
                      <img
                        src="./images/Transaction History.svg"
                        alt="Transaction History"
                      />
                      Transaction History
                    </a>
                  </div> */}
                  <div className="update-password-content d-flex align-items-center justify-content-center">
                    <Link href="/update-password">
                      <img
                        src="./images/Update-Password.svg"
                        alt="Update Password"
                      />{" "}
                      Update Password
                    </Link>
                  </div>
                  <div className="logout-content d-flex align-items-center justify-content-center">
                    <a href="#!">
                      {" "}
                      <img src="./images/logout.svg" alt="Logout" />
                      Logout
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-8 col-md-7 col-sm-12">
            <div className="profile-edit-content">
              <header className="general-detail-text">
                <h2>General Details</h2>
              </header>
              <form>
                <div className="row d-n-header">
                  <div className="col drive-i-container">
                    <label htmlFor="text">First Name</label>
                    <input
                      type="text"
                      id="text"
                      className="form-control"
                      aria-label="First name"
                    />
                  </div>
                  <div className="col n-i-container">
                    <label htmlFor="lastname">Last Name</label>
                    <input
                      type="text"
                      id="lastname"
                      className="form-control"
                      aria-label="Last name"
                    />
                  </div>
                </div>
                <div className="row date-header">
                  <div className="col d-flex flex-column date-i-container">
                    <label htmlFor="date">Date of Birth</label>
                    <input type="date" id="date" name="date" />
                  </div>
                  <div className="mobile-n-content col">
                    <label htmlFor="FormControlMobile">Mobile Number</label>
                    <div className="input-group mobile-n-input">
                      <select className="form-control" id="FormControlMobilePrefix">
                        <option value={+91}>+91</option>
                        <option value={+92}>+92</option>
                      </select>
                      <input
                        type="tel"
                        className="form-control"
                        id="FormControlMobile"
                      />
                    </div>
                  </div>
                </div>
                <div className="row profile-input-content">
                  <div className="col drive-i-container">
                    <label htmlFor="Nationality">Nationality</label>
                    <input
                      type="text"
                      id="Nationality"
                      className="form-control"
                      aria-label="First name"
                    />
                  </div>
                  <div className="col state-i-container">
                    <label htmlFor="inputState" className="form-label">
                      State
                    </label>
                    <select id="inputState" className="form-select">
                      <option selected="">Choose...</option>
                      <option>Tamilnadu</option>
                      <option>Kerala</option>
                    </select>
                  </div>
                </div>
                <div className="row d-n-header">
                  <div className="col city-i-container">
                    <label htmlFor="inputCity" className="form-label">
                      City
                    </label>
                    <select id="inputCity" className="form-select">
                      <option selected="">Choose...</option>
                      <option>Chennai</option>
                      <option>Madurai</option>
                    </select>
                  </div>
                  <div className="col n-i-container">
                    <label htmlFor="Pincode">Pincode</label>
                    <input
                      type="text"
                      id="Pincode"
                      className="form-control"
                      aria-label="Last name"
                    />
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-end edit-btn">
                  <button type="button">Edit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
