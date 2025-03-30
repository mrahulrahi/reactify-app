"use client";

import React, { useState } from 'react'
import { FaHeart } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { addToFav, deleteFromSavedItinerary } from '../lib/itineraries';
import { FaRegHeart } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";

export const AddToFavBtn = ({
  access_token,
  currentId,
  isFav,
  type
}) => {

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [status, setStatus] = useState(isFav);

  const handleAddFav = async () => {
    setLoading(true);
    const isFavStatus = isFav === false ? 1 : 0
    const res = await addToFav({ access_token, currentId, isFavStatus });
    if (res?.success === true) {
      toast.success(res?.message);
      if (type === "save") {
        setStatus(!isFav);
      }
      router.refresh();
      setLoading(false);
    }
  }

  const handleDeleteSave = async () => {
    setLoading(true);
    const res = await deleteFromSavedItinerary({ access_token, currentId });
    if (res?.status === true) {
      toast.success(res?.message);
      router.refresh();
      setLoading(false);
    }
  }

  return (
    <>
      {loading ?
        <div className="spinner-border spinner-border-sm text-warning" role="status" />
        :
        <>
          <div className="action-btn-group d-flex align-items-center gap-3">
            <button disabled={loading} onClick={handleAddFav} className="action-btn d-md-flex">
              {status ?
                <FaHeart color='red' />
                :
                <FaRegHeart />
              }
            </button>
            {type === "save" &&
              <button disabled={loading} onClick={handleDeleteSave} className="action-btn d-md-flex">
                <MdDelete color='red' size={22} />
              </button>
            }
          </div>
        </>
      }
    </>
  )
}
