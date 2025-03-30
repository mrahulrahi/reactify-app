import React from 'react';
import "./invoice.style.css"
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/authOptions';
import UserAccountSettingsCard from '../components/user-account-settings/UserAccountSettingsCard';
import { getUserDetails } from '../lib/auth';
import { getInvoices } from '../lib/payment';
import InvoicesList from "./InvoicesList"
import { redirect } from 'next/navigation';
import Link from 'next/link';

export const metadata = {
  title: 'Invoices | Tripherder',
};

export default async function InvoicesPage() {

  const session = await getServerSession(authOptions);

  const access_token = session?.user?.access_token;

  if (!access_token) {
    redirect("/auth/signin")
  }

  const userDetails = await getUserDetails({ access_token });

  const invoicesList = await getInvoices({ access_token });

  return (
    <>
      <div className="page-top-header">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="pth-content-box d-flex flex-column align-items-center justify-content-between">
                <h3>Transaction History</h3>
                <nav aria-label="breadcrumb">
                  <ol class="breadcrumb mb-0">
                    <li class="breadcrumb-item"><Link href="/my-profile">Profile</Link></li>
                    <li class="breadcrumb-item active" aria-current="page">Transaction History</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="content-container profile-container">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="profile-inner-box d-flex flex-wrap">
                <UserAccountSettingsCard
                  access_token={access_token}
                  profilePic={userDetails?.data?.photo}
                />

                <div className="profile-body-wrapper">
                  <div className="profile-edit-content p-0">
                    <div className="">
                      <div className="row">
                        <div className="col-12">
                          <div className="dashboard-content">
                            <div className="table-responsive">
                              <InvoicesList
                                access_token={access_token}
                                invoicesList={invoicesList?.data}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
