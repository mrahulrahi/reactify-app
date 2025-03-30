"use client";

import { HiDotsHorizontal } from "react-icons/hi";
import { deleteItinerary } from "../../lib/itinerary/getItinerary";
import toast from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Config from "../../store/api";
import axios from "axios";

export const ItineraryActions = ({ itinerary_id, access_token, buyCount, status }) => {
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleDeleteItinerary = async () => {
    setDeleteLoading(true);
    const id = itinerary_id;
    const res = await deleteItinerary({ id, access_token });
    if (res?.status === true) {
      router.refresh();
      setDeleteLoading(false);
      toast.success(res?.message);
    } else {
      setDeleteLoading(false);
    }
  };

  const changeStatus = async (id) => {
    const statusId = id === 0 ? 1 : 0;
    const data = { status: `${statusId}` };
    setLoading(true);
    const res = await axios.post(
      `${Config.CHANGE_STATUS}/${itinerary_id}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    if (res?.status === 200) {
      toast.success(res?.data?.message);
      setLoading(false);
      router.push("/influencer/my-profile");
      router.refresh();
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="dropdown ms-auto ms-md-0">
      <a
        href="#"
        className="id-options"
        role="button"
        id="dropdownMenuLink"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <HiDotsHorizontal />
      </a>
      <ul
        className="dropdown-menu dropdown-menu-end"
        aria-labelledby="dropdownMenuLink"
      >
        {loading ?
          <li>
            <a className="dropdown-item">
              Loading
            </a>
          </li> :
          <li
            className="cursor-pointer"
            onClick={() => changeStatus(status)}
          >
            <a className="dropdown-item">
              {status === 0 ? "Active" : "Inactive"}
            </a>
          </li>
        }
        {buyCount === 0 &&
          <li>
            <a
              className="dropdown-item text-danger cursor-pointer"
              onClick={handleDeleteItinerary}
            >
              {deleteLoading ? "Deleting" : "Delete"}
            </a>
          </li>
        }
      </ul>
    </div>
  );
};
