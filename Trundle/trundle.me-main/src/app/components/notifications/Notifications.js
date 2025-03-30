'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { updateNotifictionStatus } from '../../lib/itinerary/getItinerary';

export default function Notifications({ classNames, notificationList, session }) {

  const router = useRouter();

  const access_token = session?.user?.access_token;

  function timeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();

    const diff = Math.abs(now - date);
    const minutes = Math.floor(diff / 60000);

    if (minutes < 60) {
      return `${minutes} ${minutes === 1 ? 'min' : 'mins'} ago`;
    } else if (minutes < 1440) {
      const hours = Math.floor(minutes / 60);
      return `${hours} ${hours === 1 ? 'hr' : 'hrs'} ago`;
    } else {
      const days = Math.floor(minutes / 1440);
      return `${days === 1 ? 'One day' : `${days} days`} ago`;
    }
  }

  const notificationOnClick = async (data) => {
    const notification_id = data?.id;
    const isAdminType = (data?.name === 'Admin') ? true : false;
    await updateNotifictionStatus({ notification_id, access_token, isAdminType });
    if (!isAdminType) {
      await router.push(`/itineraries/${data?.itinerary}`);
    } else {
      const parts = data?.link?.split('/');
      const lastId = parts?.pop(); // Removes the last element and returns it
      await router.push(`/itineraries/${lastId}`);
    }
    await router.refresh();
  }

  return (
    <li style={{ listStyle: "none" }} className={classNames}>
      <button className="dropdown-toggle d-flex align-items-center justify-content-center" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        <Image src="/images/notification-icon.svg" width={20} height={20} alt="notification icon" />
      </button>
      {!notificationList?.is_read_all &&
        <Image
          src="/images/noti-dot.svg"
          className='position-absolute new-noti-dot-icon'
          width={9} height={9}
          alt="notification icon"
        />
      }
      <div className="dropdown-menu">
        <div className="notification-head d-flex align-items-center">
          <div className="notification-icon"><Image src="/images/notification-icon.svg" width={16} height={16} alt="notification icon" /></div>
          <div className="notification-label">Notifications</div>
        </div>
        <ul className="notification-body">
          {notificationList?.notifications?.length > 0 ?
            <>
              {notificationList?.notifications?.map((data, index) => {
                const isAdmin = data?.name === 'Admin'
                if (isAdmin) {
                  return (
                    <div key={index}>
                      {data?.link ?
                        <li onClick={() => notificationOnClick(data)} className={`notification-row w-100`} key={index}>
                          <div className="notification-box d-flex cursor-pointer">
                            <div className="notification-user-img flex-shrink-0 rounded-circle overflow-hidden"><Image src={data?.photo} width={48} height={48} alt="flag" /></div>
                            <div className="notification-content flex-grow-1">
                              <h6 style={!data?.is_read ? { fontWeight: "800" } : {}}>{data?.message} <span style={!data?.is_read ? { fontWeight: "800" } : {}}>{data?.itinerary_name}</span></h6>
                              <p>{timeAgo(data?.created_at)}</p>
                            </div>
                          </div>
                        </li> :
                        <li className={`notification-row`} key={index}>
                          <div className="notification-box d-flex">
                            <div className="notification-user-img flex-shrink-0 rounded-circle overflow-hidden"><Image src={data?.photo} width={48} height={48} alt="flag" /></div>
                            <div className="notification-content flex-grow-1">
                              <h6>{data?.message} <span>{data?.itinerary_name}</span></h6>
                              <p>{timeAgo(data?.created_at)}</p>
                            </div>
                          </div>
                        </li>
                      }
                    </div>
                  )
                } else {
                  return (
                    <li className={`notification-row`} key={index}>
                      <div className="notification-box d-flex cursor-pointer" onClick={() => notificationOnClick(data)}>
                        <div className="notification-user-img flex-shrink-0 rounded-circle overflow-hidden"><Image src={data?.photo} width={48} height={48} alt="flag" /></div>
                        <div className="notification-content flex-grow-1">
                          <h6 style={!data?.is_read ? { fontWeight: "800" } : {}}> <span style={!data?.is_read ? { fontWeight: "800" } : {}}>{data?.name}</span> {data?.message} <span style={!data?.is_read ? { fontWeight: "800" } : {}}>{data?.itinerary_name}</span></h6>
                          <p style={!data?.is_read ? { fontWeight: "800" } : {}}>{timeAgo(data?.created_at)}</p>
                        </div>
                      </div>
                    </li>
                  )
                }
              })}
            </> :
            'No notifications'
          }
        </ul>
      </div>
    </li>
  )
}
