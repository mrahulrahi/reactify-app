"use client";

import React, { useState } from "react";
import CheckboxGroup from "../CheckboxGroup";
import { Loading } from "../Loading";
import { useDispatch, useSelector } from "react-redux";
import { postFavouriteActivities } from "../../lib/preferences";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import { setActiveStep } from "../../store/slices/preferenes";

export default function FavoriteActivitiesContent({
  isSmall,
  access_token,
  activitiesList,
  selectedArtists,
  isFrom
}) {

  const pathname = usePathname();

  const dispatch = useDispatch();

  const [selectedItemsSports, setSelectedItemsSports] = useState(
    selectedArtists?.activity_data?.activity || []
  );

  const [selectedItemsEvents, setSelectedItemsEvents] = useState([]);

  const { loading, saveArtistLoading } = useSelector(
    (state) => state.preferences
  );

  const [nextBtnLoading, setNextBtnLoading] = useState(false);

  const removeSelectedItem = (value, type) => {
    if (type === "sports") {
      const updatedSports = selectedItemsSports.filter(
        (selected) => selected.id !== value?.id
      );
      setSelectedItemsSports(updatedSports);
    } else if (type === "events") {
      const updatedEvents = selectedItemsEvents.filter(
        (selected) => selected.id !== value?.id
      );
      setSelectedItemsEvents(updatedEvents);
    }
  };

  const _handleCheckboxChange = (value, type) => {
    const sportsExist = selectedItemsSports.some(
      (selected) => selected.id === value?.id
    );
    const updatedSports = sportsExist
      ? selectedItemsSports.filter((selected) => selected.id !== value?.id)
      : [...selectedItemsSports, value];
    setSelectedItemsSports(updatedSports);
  };

  const router = useRouter();

  const handleNextOnClick = async () => {
    setNextBtnLoading(true);
    const selectedSportsOfIds = selectedItemsSports
      .map((obj) => obj.id)
      .join(",");

    const data = {
      activity_id: { activity_id: selectedSportsOfIds },
      token: access_token,
    };
    const res = await postFavouriteActivities(data);
    if (res?.status) {
      toast.success(res?.message);
      if (pathname === "/") {
        dispatch(setActiveStep(2));
      }
      if (pathname === '/select-favorite-activities') {
        router.push("/");
      }
      router.refresh();
    }
  };


  return (
    <>
      <div className={`favorite-a-s ${isSmall && 'mt-0'}`}>

        {loading ? (
          <Loading />
        ) : (
          <CheckboxGroup
            items={activitiesList}
            itemType="activities"
            handleCheckboxChange={_handleCheckboxChange}
            selectedItems={selectedItemsSports}
            removeSelectedItem={removeSelectedItem}
            isFrom={isFrom}
            access_token={access_token}
            btnDisable={selectedItemsSports?.length < 1 || saveArtistLoading}
            handleNextOnClick={handleNextOnClick}
            nextBtnLoading={nextBtnLoading}
          />
        )}
      </div>
      <div
        onClick={handleNextOnClick}
        disabled={
          selectedItemsSports?.length < 1 || saveArtistLoading
        }
        className="d-flex align-items-center justify-content-end activity-next-btn mt-5 p-0">
        <button className="btn btn-default" type="button">
          {access_token ? "Update" : "Next"}
          {saveArtistLoading && (
            <div
              className="spinner-border spinner-border-sm"
              role="status"
            />
          )}
        </button>
      </div>
    </>
  )
}
