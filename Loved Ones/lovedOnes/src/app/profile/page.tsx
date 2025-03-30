'use client'
import { useState } from 'react'
import Banner from '../components/Banner/Banner'
import Image from 'next/image'
import { MdEdit } from 'react-icons/md'
import ConfirmationModal from '../components/ConfirmationModal/ConfirmationModal'
import { TbPhoto } from 'react-icons/tb'
import PhoneSelect from '../components/PhoneSelect/PhoneSelect'

const options = [
    { value: '+91', label: '+91' },
    { value: '+92', label: '+92' },
    { value: '+93', label: '+93' },
    { value: '+94', label: '+94' },
    { value: '+95', label: '+95' },
    { value: '+96', label: '+96' },
    { value: '+97', label: '+97' },
    { value: '+98', label: '+98' },
    { value: '+99', label: '+99' },
    { value: '+100', label: '+100' },
    { value: '+1-001', label: '+1-001' },
]

const ProfilePage = () => {

    const [profileEdit, setProfileEdit] = useState<boolean>(false);
    const [profileEditName, setProfileEditName] = useState<string>('Robert');
    const [profileEditPhone, setProfileEditPhone] = useState<string>('8656565655');
    const [profileEditEmail, setProfileEditEmail] = useState<string>('xyz12@gmail.com');
    const [profileImg, setProfileImg] = useState<boolean>(true);

    return (
        <>
            <Banner />

            <div className="content-container">
                <div className="container" data-aos="fade-up" suppressHydrationWarning>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="profile-wrapper">
                                <div className="profile-head d-flex align-items-center">
                                    <div className="ph-left">
                                        <div className="profile-img-wrapper position-relative">
                                            <div className={`profile-img ${profileImg ? 'has-img-cover' : 'd-flex flex-column align-items-center justify-content-center'}`}>
                                                {profileImg ? (
                                                    <Image src="/images/profile-img.jpg" alt="" width={192} height={192} quality={100} />
                                                ) : (
                                                    <>
                                                        <div className="profile-img-icon d-flex align-items-center justify-content-center mb-2"><TbPhoto /></div>
                                                        <span className="fw-medium">+ Upload Photo</span>
                                                    </>
                                                )}
                                            </div>
                                            {profileEdit && (
                                                <div className="dropdown">
                                                    <button className="profile-img-edit d-flex align-items-center justify-content-center" data-bs-toggle="dropdown">
                                                        <MdEdit />
                                                    </button>

                                                    <div className="dropdown-menu">
                                                        <button className="dropdown-item">Take Photo</button>
                                                        <button className="dropdown-item">Upload Photo</button>
                                                        <button className="dropdown-item" data-bs-toggle="modal" data-bs-target="#profile-photo-modal">Remove Photo</button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="ph-right w-100 d-flex flex-wrap justify-content-between gap-4">
                                        <div className="ph-right-text">
                                            <h6>Robert</h6>
                                            <p>Xyz@gmail.com</p>
                                        </div>
                                        <div className="ph-right-btn d-flex align-items-center">
                                            <button className="btn btn-blue btn-sm text-center" onClick={() => setProfileEdit(true)}>Edit</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="profile-body">
                                    <form>
                                        <div className="form-group mb-4">
                                            <label htmlFor="name" className="form-label">Full Name</label>
                                            <input type="name" value={profileEditName} className="form-control" id="name" placeholder="Robert" disabled={!profileEdit} onChange={(e) => setProfileEditName(e.target.value)} />
                                        </div>
                                        <div className="form-group mb-4">
                                            <label htmlFor="tel" className="form-label">Phone Number</label>
                                            <div className="input-group">
                                                <PhoneSelect options={options} disabled={!profileEdit} />
                                                <input type="tel" value={profileEditPhone} className="form-control" id="tel" placeholder="8656565655" disabled={!profileEdit} onChange={(e) => setProfileEditPhone(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="form-group mb-4">
                                            <label htmlFor="email" className="form-label">Email Address</label>
                                            <input type="email" value={profileEditEmail} className="form-control" id="email" placeholder="xyz12@gmail.com" disabled={!profileEdit} onChange={(e) => setProfileEditEmail(e.target.value)} />
                                        </div>
                                        <div className="form-group member-form-btn">
                                            <button type="submit" className="btn btn-blue btn-block pe-0 text-center" onClick={() => setProfileEdit(false)}>Update</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ConfirmationModal modalId="profile-photo-modal" title="Remove your profile photo" cancelText="Cancel" buttonText="Remove" setButtonAction={() => { setProfileImg(false) }} />
        </>
    )
}

export default ProfilePage