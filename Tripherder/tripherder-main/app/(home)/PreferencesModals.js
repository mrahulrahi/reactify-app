"use client";

import Modal from 'react-bootstrap/Modal';
import React, { useEffect, useRef, useState } from 'react';
import { Stepper, Step } from 'react-form-stepper';
import './stepper.css';
import FavoriteActivitiesContent from '../components/fav-activity-content/FavoritActivityContent';
import { GrPrevious, GrNext } from "react-icons/gr";
import PreferencecForm from './PreferencecForm';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveStep, setPreferenceModalShow } from '../store/slices/preferenes';
import Artists from "./Artists"

export default function PreferencesModals({
  selectedArtists,
  artistsList,
  access_token,
  activitiesList,
  session,
}) {

  const router = useRouter();

  const dispatch = useDispatch();

  const { preferenceModalShow, activeStep } = useSelector(state => state.preferences);

  const [isArtistAdded, setIsArtistAdd] = useState(false);

  const initialSpotifyData = selectedArtists?.spotify_data ?? [];

  const [_selectedArtists, setSelectedArtists] = useState(access_token ? [...selectedArtists?.spotify_data] : []);

  const initialSelectedArtistsRef = useRef([...initialSpotifyData] || []);

  const hasChangedRef = useRef(false);


  useEffect(() => {
    const initialSet = new Set(initialSelectedArtistsRef.current.map(artist => artist.id));
    const currentSet = new Set(_selectedArtists.map(artist => artist.id));

    if (initialSet.size !== currentSet.size || [...initialSet].some(artist => !currentSet.has(artist))) {
      hasChangedRef.current = true;
    } else {
      hasChangedRef.current = false;
    }
    setIsArtistAdd(hasChangedRef.current);
  }, [_selectedArtists]);

  const handleNext = () => {
    dispatch(setActiveStep(activeStep + 1));
  };

  const handleBack = () => {
    dispatch(setActiveStep(activeStep - 1));
  };

  const handleShow = () => {
    if (access_token) {
      dispatch(setPreferenceModalShow(true));
    } else {
      router.push("/auth/signin");
    }
  };

  return (
    <>
      <button
        onClick={handleShow}
        type="button"
        className="btn btn-default text-capitalize rounded-2">
        Get started
      </button>
      <Modal
        className='preferences-modal'
        show={preferenceModalShow}
        onHide={() => {
          dispatch(setPreferenceModalShow(false));
        }}
        centered
      >
        <Modal.Header className='border-0'>
          <button
            type="button"
            style={{
              width: "35px",
              height: "35px",
              background: "#F04722"
            }}
            className='flex-shrink-0 rounded-circle border-0'
            disabled={activeStep === 0}
            onClick={handleBack}
          >
            <GrPrevious color='white' />
          </button>
          <Stepper
            className='w-100'
            activeStep={activeStep}
            connectorStateColors
          >
            <Step label="" />
            <Step label="" />
            <Step label="" />
          </Stepper>
          <button
            type="button"
            style={{
              width: "35px",
              height: "35px",
              background: "#F04722"
            }} className='flex-shrink-0 rounded-circle border-0'
            disabled={activeStep === 2}
            onClick={handleNext}
          >
            <GrNext color='white' />
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="app-container">
            <div className="content">
              {
                activeStep === 0 &&
                <div className="step-content">
                  <Artists
                    selectedArtists={selectedArtists?.spotify_data}
                    _artistsList={artistsList}
                    access_token={access_token}
                    session={session}
                    isFrom="modal"
                  />
                </div>
              }
              {
                activeStep === 1 && <div className="step-content">
                  <FavoriteActivitiesContent
                    isSmall
                    access_token={access_token}
                    activitiesList={activitiesList}
                    selectedArtists={selectedArtists}
                    isFrom="modal"
                  />
                </div>
              }
              {activeStep === 2 && <div className="step-content mt-2">
                <div className="my-0 trip-s-container">
                  <div className="border-0 px-2 w-100">
                    <div className="border-0  ">
                      <h1
                        className="modal-title fs-5 mb-2 trip-s-text"
                        id="exampleModalToggleLabe32"
                      >
                        Finally, tell us more about your travel preferences.
                      </h1>
                      <button
                        type="button"
                        className="btn-close popup-btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      />
                    </div>
                    <div className="trip-s-p">
                      Are you looking for trips over the summer, within a season, or just a
                      weekend? <br /> Think big and have fun!
                    </div>
                    <PreferencecForm token={access_token} />
                  </div>
                </div>
              </div>}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}
