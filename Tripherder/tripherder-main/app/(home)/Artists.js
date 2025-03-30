"use client";

import React, { useEffect, useRef, useState } from "react";
import { CheckboxGroup } from "../components";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { postFavouriteArtists } from "../lib/preferences";
import Pagination from "../components/Pagination";
import toast from "react-hot-toast";
import { getArtists } from "../lib/preferences";
import { MdClear } from "react-icons/md";
import { FaSpotify } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setSpotifyToken } from "../store/slices/auth";
import Config from "../store/api";
import axios from "axios";
import { setActiveStep } from "../store/slices/preferenes";
import Select from "react-select";

const importSpotifyArtists = (pathname) => {
  const client_id = Config.SPOTIFY_CLIENT_ID;

  const redirect_uri = pathname === "/" ? window.location.origin : `${window.location.origin}${pathname}`;

  const scope = "user-read-private user-read-email user-follow-read";

  window.location = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&redirect_uri=${encodeURIComponent(redirect_uri)}&scope=${encodeURIComponent(scope)}&state=123`;
};

const getHash = () => {
  if (typeof window !== 'undefined') {
    const hash = window.location.hash.substring(1);
    return hash ? decodeURIComponent(hash) : '';
  }
  return '';
};

const useHash = () => {
  const [hash, setHash] = useState(getHash());

  useEffect(() => {
    const handleHashChange = () => {
      setHash(getHash());
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return hash;
};

export default function Artists({
  selectedArtists,
  _artistsList,
  access_token,
  session,
  isFrom
}) {

  const router = useRouter();

  const { replace } = useRouter();

  const pathname = usePathname();

  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams);

  const [searchArtistName, setSearchArtistName] = useState(
    params?.get("q") || null
  );

  const [artistsList, setArtistList] = useState(_artistsList || []);

  const [_selectedArtists, setSelectedArtists] = useState(selectedArtists ? [...selectedArtists] : []);

  const handleTokenReceived = useRef(false);

  const [accessToken, setAccessToken] = useState(null);

  const hash = useHash();

  const dispatch = useDispatch();

  useEffect(() => {
    if (window.location.hash === '#_=_') {
      window.history.replaceState(null, null, window.location.href.split('#')[0]);
    }
  }, []);

  useEffect(() => {
    processToken();
  }, [params, hash]);

  useEffect(() => {
    getSpotifyFollowedArtists(accessToken);
  }, [accessToken]);

  const processToken = () => {
    const params = new URLSearchParams(hash);
    const token = params.get("access_token");
    if (token && !handleTokenReceived.current) {
      handleTokenReceived.current = true;
      setAccessToken(token);
      dispatch(setSpotifyToken(token));
      window.history.replaceState(null, null, ' ');
    }
  };

  const getSpotifyFollowedArtists = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`,
      },
    };

    const data = {
      access_token: session?.user?.spotify_token ? session?.user?.spotify_token : accessToken
    }

    try {
      const res = await axios.post(Config?.GET_SPOTIFY_FOLLOWED_ARTISTS, data, config);
      const selected = res?.data?.artists?.items;
      const concatedArray = [...(selected ? selected : []), ...selectedArtists];
      const uniqueArray = concatedArray.filter(
        (value, index, self) =>
          self.findIndex((obj) => obj.id === value.id) === index
      );
      const selectedArtistsOfIds = uniqueArray
        .map((obj) => obj.id)
        .join(",");
      const _res = await postFavouriteArtists({
        artists_ids: selectedArtistsOfIds,
        token: access_token,
      });
      setSelectedArtists(uniqueArray);
    } catch (error) {
      console.error("Error fetching Spotify followed artists:", error);
    }
  };


  const _handleCheckboxChange = (value) => {
    const artistExists = _selectedArtists?.some(
      (selected) => selected.id === value?.id
    );
    const updatedArtists = artistExists
      ? _selectedArtists?.filter((selected) => selected.id !== value?.id)
      : [..._selectedArtists, value];
    setSelectedArtists(updatedArtists);
  };

  const removeSelectedItem = (value) => {
    const updatedArtists = _selectedArtists.filter(
      (selected) => selected.id !== value?.id
    );
    setSelectedArtists(updatedArtists);
  };

  const handleNextOnClick = async () => {
    setLoading(true);
    const selectedArtistsOfIds = _selectedArtists
      .map((obj) => obj.id)
      .join(",");

    const res = await postFavouriteArtists({
      artists_ids: selectedArtistsOfIds,
      token: access_token,
    });
    if (res) {
      if (isFrom === 'modal') {
        dispatch(setActiveStep(1))
        router.refresh();
      }
    }
    toast.success(res?.message);
    if (res?.status) {
      if (pathname === '/select-favorite-artist') {
        router.push("/select-favorite-activities");
        router.refresh();
      }
      router.refresh();
    } else {
      setLoading(false);
    }
  };

  const onHandleNextPage = async (selectedPage) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", selectedPage);
    if (pathname !== "/") {
      replace(`${pathname}?${params.toString()}`);
    }
    const res = await getArtists(params?.toString());
    setArtistList(res);
  };

  // const handleArtistOnChange = async (searchedParam) => {
  //   const params = new URLSearchParams(searchParams);
  //   if (searchedParam?.length >= 3) {
  //     params.set("q", searchedParam);
  //     params.delete("page");
  //     replace(`${pathname}?${params.toString()}`);
  //     const res = await getArtists(params?.toString());
  //     setArtistList(res);
  //   } else if (!searchedParam) {
  //     params.delete("q");
  //     params.delete("page");
  //     router.replace(pathname);
  //     const res = await getArtists(params?.toString());
  //     setArtistList(res);
  //   }
  // };

  const handleArtistOnChange = async (searchedParam) => {
    const params = new URLSearchParams(searchParams);

    if (pathname === "/") {
      // If pathname is '/', don't add the query string to the URL
      if (searchedParam?.length >= 3) {
        params.set("q", searchedParam);
      } else if (!searchedParam) {
        params.delete("q");
      }

      // Fetch artists without modifying the URL
      const res = await getArtists(params?.toString());
      setArtistList(res);
    } else {
      // If pathname is not '/', handle query string updates
      if (searchedParam?.length >= 3) {
        params.set("q", searchedParam);
        params.delete("page");
        replace(`${pathname}?${params.toString()}`);
      } else if (!searchedParam) {
        params.delete("q");
        params.delete("page");
        router.replace(pathname);
      }

      // Fetch artists based on updated parameters
      const res = await getArtists(params?.toString());
      setArtistList(res);
    }
  };


  const handleClearSearch = () => {
    setInputValue("");
    handleArtistOnChange();
  };


  const [options, setOptions] = useState([]);

  const [inputValue, setInputValue] = useState('');

  const handleInputChange = async (event) => {
    setInputValue(event);
    await axios.get(`https://api.tripherder.com/api-v1/spotify/get-artists-name/?q=${event}`)
      .then(response => {
        setOptions(response?.data?.data?.artist_names); // Assuming the response contains an array of artist names in 'artists'
      })
      .catch(error => {
        console.error('Error fetching artist names:', error);
      });
  };


  const filteredOptions = options.filter(option => {
    const words = inputValue.toLowerCase().split(' ');
    return words.every(word => option.toLowerCase().includes(word));
  }).filter(option => option.toLowerCase() !== inputValue.toLowerCase());

  return (
    <>
      <div className="event-search-wrapper d-flex flex-column flex-sm-row align-items-center w-100">
        <div className="event-search-box d-flex gap-2 position-relative w-100 flex-grow-1">
          <input className="form-control" placeholder="Search your Artists" type="text" value={inputValue} onChange={(e) => {
            handleInputChange(e.target.value);
            handleArtistOnChange(e.target.value);
          }
          }
          />
          {inputValue && (
            <div
              onClick={handleClearSearch}
              className="position-absolute cursor-pointer"
              style={{ right: 250, top: 12 }}
            >
              <MdClear size={23} color="red" />
            </div>
          )}
          {inputValue?.length > 0 && filteredOptions?.length > 0 && (
            <select
              className="suggesion-dropdown shadow rounded ps-2 pb-2"
              style={{
                maxHeight: "200px",
                overflowY: "auto",
                position: "absolute",
                top: "50px",
                left: "10px"
              }} name="select" id="select" size={filteredOptions?.length}>
              {filteredOptions?.map((option, index) => (
                <option
                  // className="form-select"
                  key={index}
                  onClick={() => {
                    setInputValue(option);
                    handleArtistOnChange(option);
                  }}
                >
                  {option}
                </option>
              ))}
            </select>
          )}
          <button
            style={{ backgroundColor: "#1ED760" }}
            className={`btn btn-spotify text-light d-flex align-items-center justify-content-center gap-2 flex-shrink-0`}
            // disabled={isArtistAdded}
            onClick={() => importSpotifyArtists(pathname)}
          >
            <FaSpotify />
            <span>
              Import from spotify
            </span>
          </button>
        </div>
      </div>
      {/* <div className="event-search-wrapper d-flex flex-column flex-sm-row align-items-center w-100">
        <div className="event-search-box position-relative w-100 flex-grow-1">
          <Select
            // className="form-select-container_city"
            // classNamePrefix="form-select"
            placeholder="Search your Artists"
            id="priority"
            name="priority"
            value={searchArtistName}
            isSearchable={true}
            onChange={(e) => {
              setSearchArtistName(e);
              handleArtistOnChange(e?.label);
            }}
            options={[
              { value: 1, label: "Anirudh Ravichander" },
              { value: 2, label: "AR Rahman" },
              { value: 3, label: "Aryan Rahmanian" },
              { value: 4, label: "Artist Vs Poet" },
              { value: 5, label: "Kwe the Artist" },
              { value: 6, label: "Memphis Cult Artists" },
            ]}
          />
          {searchArtistName && (
            <div
              onClick={handleClearSearch}
              className="position-absolute cursor-pointer"
              style={{ right: 45, top: 12 }}
            >
              <MdClear size={23} color="red" />
            </div>
          )}
        </div>

        <button
          style={{ backgroundColor: "#1ED760" }}
          className={`btn btn-spotify text-light d-flex align-items-center justify-content-center gap-2 flex-shrink-0`}
          // disabled={isArtistAdded}
          onClick={() => importSpotifyArtists(pathname)}
        >
          <FaSpotify />
          <span>
            Import from spotify
          </span>
        </button>
      </div> */}
      <>
        {artistsList?.artists?.items?.length === 0 ? (
          <p className="text-center mt-3 fw-bold">No results found</p>
        ) : (
          <div>
            <CheckboxGroup
              items={artistsList?.artists?.items}
              itemType="artists"
              handleCheckboxChange={(item) => {
                // setIsArtistAdd(true);
                _handleCheckboxChange(item)
              }}
              selectedItems={_selectedArtists}
              removeSelectedItem={(data) => {
                removeSelectedItem(data);
                // setIsArtistAdd(true);
              }}
              handleNextOnClick={handleNextOnClick}
              access_token={access_token}
              isFrom={isFrom}
              btnDisable={_selectedArtists?.length < 1 || loading}
              nextBtnLoading={loading}

            />
            <div className="pagination-container d-flex flex-column flex-sm-row align-items-center justify-content-between gap-4 mt-4">
              <Pagination
                placesList={artistsList?.artists}
                onHandleNextPage={onHandleNextPage}
              />
              <div className="pagination-btn-wrapper">
                <button
                  onClick={handleNextOnClick}
                  disabled={_selectedArtists?.length < 1 || loading}
                  className='btn btn-default'
                >
                  {loading ? "Loading" : access_token ? "Update" : "Next"}
                </button>
              </div>
            </div>
          </div>
        )
        }
      </>
    </>
  )
}
