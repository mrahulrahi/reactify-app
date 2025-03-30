'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { followTrundler, unFollowTrundler } from '../../lib/traveller/traveller';
import toast from 'react-hot-toast';

export default function FollowButton({ access_token, _data, followingStatus }) {

  const [loading, setLoading] = useState(false)

  const router = useRouter();

  const [isFollowing, setIsFollowing] = useState(followingStatus);

  const followOnClick = async () => {
    setLoading(true)
    if (access_token) {
      if (parseInt(isFollowing) === 0) {
        const res = await followTrundler({ access_token, _data })
        toast.success(res?.message)
        if (res) {
          setLoading(false)
          setIsFollowing(1);
          router.refresh();
        } else {
          setLoading(false);
        }
      } else {
        const res = await unFollowTrundler({ access_token, _data })
        toast.success(res?.message)
        if (res) {
          setLoading(false);
          setIsFollowing(0);
          router.refresh();
        } else {
          setLoading(false)
        }
      }
    } else {
      router.push('/auth/signin')
    }
  }

  return (
    <div className="mp-cta">
      <button className={`btn ${isFollowing === 1 ? `btn-primary` : `btn-default`} px-5`} disabled={loading} onClick={followOnClick}>
        {parseInt(isFollowing) === 1 ? 'Unfollow' : 'Follow'}
        {loading &&
          <span
            className="spinner-border spinner-border-sm ms-3"
            role="status"
            aria-hidden="true"
          />
        }
      </button>
    </div>)
}
