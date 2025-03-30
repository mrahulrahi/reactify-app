"use client";

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { FaFileInvoiceDollar, FaUser } from 'react-icons/fa'
import { HiUser } from "react-icons/hi2";
import { RiLockPasswordFill, RiLogoutBoxRFill } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import Image from 'next/image';
import { signOut } from 'next-auth/react';
import { MdOutlineSportsEsports } from "react-icons/md";
import { BiSolidParty } from "react-icons/bi";
import { updateProfilePicture } from '../../lib/auth';
import toast from 'react-hot-toast';

export default function UserAccountSettingsCard({ access_token, profilePic }) {

  const pathname = usePathname();

  const router = useRouter();

  const [uploadedProfile, setUploadedProfile] = useState(profilePic);

  const [loading, setLoading] = useState(false);

  const navItems = [
    { href: '/my-profile', icon: HiUser, label: 'My Profile' },
    { href: '/update-password', icon: RiLockPasswordFill, label: 'Update Password' },
    { href: '/update-favorite-artists', icon: BiSolidParty, label: 'Favorite Artist' },
    { href: '/update-favorite-activity', icon: MdOutlineSportsEsports, label: 'Favorite Activity' },
    { href: '/invoices', icon: FaFileInvoiceDollar, label: 'Invoices' },
  ];

  const renderNavItem = ({ href, icon: Icon, label }) => (
    <div key={href} className="sidebar-nav-item d-flex align-items-center justify-content-center">
      <Link href={href} onClick={() => router.refresh()} className="sidebar-nav-link d-flex align-items-center justify-content-center"
        style={{
          backgroundColor: pathname === href ? '#FFF5F1' : '',
        }}>
        <Icon size={23} style={{ color: pathname === href ? '#F04722' : 'black' }} />
        <span className="ms-2" style={{ color: pathname === href ? '#F04722' : 'black' }}>
          {label}
        </span>
      </Link>
    </div>
  );

  return (
    <div className="profile-sidebar-wrapper">
      <div className="profile-side-navbar">
        <div className="d-flex flex-column align-items-center justify-content-start h-100">
          <div className="profile-image-box added">
            <label className="profile-image-inner position-relative" htmlFor="profile-photo">
              <span>
                <MdEdit />
              </span>
              <div className={`profile-image ${loading && 'opacity-25'}`}>
                {uploadedProfile ?
                  <Image
                    src={uploadedProfile}
                    id="profile-output"
                    alt="Profile Photo"
                    height={200}
                    width={200}
                  /> :
                  <Image
                    src={'/images/default_profile.jpg'}
                    id="profile-output"
                    alt="Profile Photo"
                    height={200}
                    width={200}
                  />
                }
              </div>
              {loading &&
                <div style={{
                  right: 0,
                  left: "42%",
                  top: "33%"
                }} className="spinner-border position-absolute text-light" role="status" />
              }
              <p>Profile Photo</p>
            </label>
            <input
              id="profile-photo"
              type="file"
              onChange={async (e) => {
                setLoading(true);
                const uploadedFile = e.currentTarget.files[0];
                if (uploadedFile) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setUploadedProfile(reader.result);
                  };
                  reader.readAsDataURL(uploadedFile);
                }
                const res = await updateProfilePicture({ uploadedFile, access_token });
                if (res?.success) {
                  toast.success(res?.message);
                  setLoading(false);
                  router.refresh();
                } else {
                  setLoading(false);
                  setUploadedProfile(null);
                }
              }}
            />
          </div>
          <div className="sidebar-nav-menu d-flex flex-lg-column align-items-center custom-scrollbar">
            {navItems.map(renderNavItem)}
            <div
              className="sidebar-nav-item d-flex align-items-center justify-content-center">
              <button
                className="sidebar-nav-link d-flex align-items-center justify-content-center"
                onClick={async () => {
                  await signOut({
                    redirect: false,
                  });
                  localStorage?.clear();
                  router.push("/auth/signin");
                  router.refresh();
                }}>
                <RiLogoutBoxRFill size={23} />
                <span className="ms-2">
                  Logout
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
