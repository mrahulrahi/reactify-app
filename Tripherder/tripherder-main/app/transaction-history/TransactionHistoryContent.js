import React from 'react'
import UserAccountSettingsCard from '../components/user-account-settings/UserAccountSettingsCard';

export default async function TransactionHistoryContent({ access_token, profilePic }) {

  return (
    <div className="container-lg container-fluid">
      <div className="d-flex align-items-center profile-text-content" />
      <div className="row profile-container">
        <UserAccountSettingsCard
          profilePic={profilePic}
          access_token={access_token}
        />
        <div className="col-lg-8 col-md-7 col-sm-12">
          <div className="profile-edit-content">
            <header className="general-detail-text">
              <h2>In progress...</h2>
            </header>
          </div>
        </div>
      </div>
    </div >
  )
}
