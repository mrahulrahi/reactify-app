"use client";

import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  _setEndDate,
  _setStartDate,
  setCity,
  setPriority,
  setDrivingDistance,
  setNumOfNights,
  setState,
} from "../store/slices/preferenes";
import Select from "react-select";
import { generateTripEngine } from "../store/slices/home";
import moment from "moment";
import DatePicker from "react-datepicker";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { LuCalendarDays } from "react-icons/lu";

const validationSchema = Yup.object().shape({
  driving_distance: Yup.number()
    .typeError("Driving distance must be a number")
    .required("Driving distance is required"),
  num_nights: Yup.number()
    .typeError("Number of nights must be a number")
    .required("Number of nights is required")
    .min(3, "Minimum of 3 nights required")
    .max(7, "Maximum of 7 nights allowed"),
  geo_city: Yup.object().required("City code is required"),
  state: Yup.object().required("State code is required"),
  priority: Yup.object().required("Priority is required"),
  start_date: Yup.string().required("Start date is required"),
  end_date: Yup.string().required("End date is required"),
});

const TripSetting = ({ token }) => {
  const dispatch = useDispatch();

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [cityLoading, setCityLoading] = useState(false);

  const [startDate, setStartDate] = useState();

  const [endDate, setEndDate] = useState();

  const [stateList, setStateList] = useState([]);

  const [citiesList_, setCitiesList_] = useState([]);

  const {
    city,
    state,
    priority,
    drivingDistance,
    _startDate,
    _endDate,
    numberOfNights,
  } = useSelector((state) => state.preferences);

  const parsedStartDate = _startDate ? new Date(_startDate) : null;

  const parsedEndDtate = _endDate ? new Date(_endDate) : null;

  const stateListOptions = Array.isArray(stateList)
    ? stateList.map((data) => ({
      value: data?.state_name || "",
      label: data?.state_name || "",
      id: data?.id,
    }))
    : [];

  const countriestOptions = Array.isArray(citiesList_)
    ? citiesList_.map((data, index) => ({
      value: data?.city || "",
      label: data?.city || "",
      id: index || "",
      longitude: data?.geo?.longitude,
      latitude: data?.geo?.latitude,
    }))
    : [];

  const apiUrl = "https://api.tripherder.com/api-v1/account/states/";

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: 'none',
      boxShadow: 'none',
      backgroundColor: "transparent",
      '&:hover': {
        border: 'none',
        boxShadow: 'none',
      }
    })
  };

  const formik = useFormik({
    initialValues: {
      state: state || "",
      geo_city: city || "",
      priority: priority || "",
      driving_distance: drivingDistance || "",
      num_nights: numberOfNights || "",
      start_date: parsedStartDate || "",
      end_date: parsedEndDtate || "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const data = {
        latitudes: values?.geo_city?.latitude,
        longitudes: values?.geo_city?.longitude,
        driving_distance: values?.driving_distance,
        start_date: moment(new Date(values?.start_date)).format(
          "YYYY-MM-DD"
        ),
        end_date: moment(new Date(values?.end_date)).format("YYYY-MM-DD"),
        num_nights: values?.num_nights,
        user_prefer: values?.priority?.value,
      };

      setLoading(true);
      try {
        const res = await dispatch(generateTripEngine({ token, data }));
        if (res?.payload?.status === 200) {
          setLoading(false);
          // dispatch(setCity(null));
          // dispatch(setPriority(null));
          // dispatch(setDrivingDistance(null));
          // dispatch(_setStartDate(null));
          // dispatch(_setEndDate(null));
          // dispatch(setNumOfNights(null));
          // router.push("/");
        } else {
          router.push("/how-it-works");
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  useEffect(() => {
    if (state) {
      fetchCities(state?.id);
    }
  }, []);

  useEffect(() => {
    fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setStateList(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const fetchCities = (stateId) => {
    setCityLoading(true);
    const GET_CITIES_BY_STATE = `https://api.tripherder.com/api-v1/account/cities/?state_id=${stateId}`;
    fetch(GET_CITIES_BY_STATE, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCitiesList_(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setCityLoading(false);
      });
  };

  return (
    <>
      <div className="trip-search-container">
        <div className="container" style={{ maxWidth: '1324px' }}>
          <div className="row">
            <div className="col-xl-10 mx-auto">
              <div className="trip-search-wrapper">
                <div className="row g-0 gy-4">
                  <div className="col-md-3 col-6">
                    <div className="custom-form-group">
                      <div className="custom-form-label">State</div>
                      <div className="custom-form-select">
                        <Select
                          className="form-select-container"
                          classNamePrefix="form-select"
                          customStyles={customStyles}
                          placeholder="Select state"
                          id="state"
                          name="state"
                          onChange={(e) => {
                            formik.setFieldValue("state", e);
                            formik.setFieldValue("geo_city", null);
                            fetchCities(e.id);
                            dispatch(setState(e));
                            dispatch(setCity(null));
                          }}
                          defaultValue={state ? state : null}
                          options={stateListOptions}
                        />
                        {formik?.errors?.state && formik?.touched?.state && (
                          <p className="error-message">State is required</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-md-3 col-6">
                    <div className="custom-form-group">
                      <div className="custom-form-label">City</div>
                      <div className="custom-form-select">
                        {cityLoading ? (
                          <div
                            className="d-flex border-0 align-items-center form-select-container justify-content-start ps-3 text-muted"
                            style={{
                              border: "1px solid hsl(0, 0%, 80%)",
                              borderRadius: "4px",
                            }}
                          >
                            Loading...{" "}
                          </div>
                        ) : (
                          <Select
                            placeholder="Select city"
                            className="form-select-container"
                            classNamePrefix="form-select"
                            id="geo_city"
                            name="geo_city"
                            onChange={(e) => {
                              formik.setFieldValue("geo_city", e);
                              dispatch(setCity(e));
                            }}
                            defaultValue={city ? city : null}
                            options={countriestOptions}
                            value={formik?.values?.geo_city}
                          />
                        )}
                        {formik?.errors?.geo_city && formik?.touched?.geo_city && (
                          <p className="error-message">City is required</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-md-3 col-6">
                    <div className="custom-form-group">
                      <div className="custom-form-label">Starting Date</div>
                      <div className="custom-date-select">
                        <DatePicker
                          placeholderText="MM/DD/YYYY"
                          // className="form-control"
                          selected={parsedStartDate || startDate}
                          onChange={(date) => {
                            setStartDate(date);
                            formik.setFieldValue("start_date", date);
                            setEndDate("");
                            dispatch(_setStartDate(date));
                            dispatch(_setEndDate(null));
                            formik?.setFieldValue("end_date", null);
                          }}
                          startDate={startDate}
                          minDate={new Date()}
                        />
                        {formik?.errors?.start_date &&
                          formik?.touched?.start_date && (
                            <p className="error-message">
                              {formik?.errors?.start_date}
                            </p>
                          )}
                      </div>
                    </div>
                  </div>

                  <div className="col-md-3 col-6" id="end-date-content">
                    <div className="custom-form-group">
                      <div className="custom-form-label">Ending Date</div>
                      <div className="custom-date-select">
                        <DatePicker
                          disabled={!formik?.values?.start_date}
                          placeholderText="MM/DD/YYYY"
                          selected={parsedEndDtate || endDate}
                          onChange={(date) => {
                            formik.setFieldValue("end_date", date);
                            setEndDate(date);
                            dispatch(_setEndDate(date));
                          }}
                          endDate={endDate}
                          startDate={startDate}
                          minDate={
                            parsedStartDate
                              ? parsedStartDate?.getTime() + 24 * 60 * 60 * 1000
                              : startDate
                                ? new Date(
                                  startDate.getTime() + 24 * 60 * 60 * 1000
                                )
                                : new Date()
                          }
                        />
                        {formik?.errors?.end_date && formik?.touched?.end_date && (
                          <p className="error-message">
                            {formik?.errors?.end_date}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-md-3 col-6">
                    <div className="custom-form-group">
                      <div className="custom-form-label">Driving Distance</div>
                      <div className="custom-form-input">
                        <input
                          className="custom-form-control"
                          type="number"
                          id="driving_distance"
                          name="driving_distance"
                          placeholder="Driving distance"
                          onChange={(e) => {
                            formik.setFieldValue(
                              "driving_distance",
                              e.target.value
                            );
                            dispatch(setDrivingDistance(e.target.value));
                          }}
                          onBlur={formik.handleBlur}
                          value={formik.values.driving_distance}
                          defaultValue={drivingDistance ? drivingDistance : 0}
                        />
                        {formik?.errors?.driving_distance &&
                          formik?.touched?.driving_distance && (
                            <p className="error-message">
                              Driving distance is required
                            </p>
                          )}
                      </div>
                    </div>
                  </div>

                  <div className="col-md-3 col-6">
                    <div className="custom-form-group">
                      <div className="custom-form-label">Number of nights</div>
                      <div className="custom-form-input">
                        <input
                          className="custom-form-control"
                          type="number"
                          id="num_nights"
                          placeholder="No of nights"
                          name="num_nights"
                          onChange={(e) => {
                            formik.setFieldValue(
                              "num_nights",
                              e.target.value
                            );
                            dispatch(setNumOfNights(e.target.value));
                          }}
                          onBlur={formik.handleBlur}
                          value={formik?.values?.num_nights}
                          defaultValue={numberOfNights ? numberOfNights : 0}
                        />
                        {formik?.errors?.num_nights &&
                          formik?.touched?.num_nights && (
                            <p className="error-message">
                              {formik?.errors?.num_nights}
                            </p>
                          )}{" "}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 col-6">
                    <div className="custom-form-group">
                      <div className="custom-form-label">Priority</div>
                      <div className="custom-form-select">
                        <Select
                          className="form-select-container h-100 form-select-container_city"
                          classNamePrefix="form-select"
                          placeholder="Priority"
                          id="priority"
                          name="priority"
                          isSearchable={false}
                          onChange={(e) => {
                            formik.setFieldValue("priority", e);
                            dispatch(setPriority(e));
                          }}
                          value={formik?.values?.priority}
                          options={[
                            { value: 1, label: "Activities" },
                            { value: 2, label: "Concerts" },
                          ]}
                        />
                        {formik?.errors?.priority && formik?.touched?.priority && (
                          <p className="error-message">
                            {formik.errors.priority}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 col-6">
                    <button className="search-box-button w-100 text-light shadow"
                      disabled={loading}
                      type="button"
                      style={{
                        opacity: loading ? .5 : 1,
                        cursor: loading ? "progress" : ""
                      }}
                      onClick={formik?.handleSubmit}
                    >
                      {loading && (
                        <div
                          className="spinner-border spinner-border-sm ms-2 text-light"
                          role="status"
                        />
                      )}
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TripSetting;
