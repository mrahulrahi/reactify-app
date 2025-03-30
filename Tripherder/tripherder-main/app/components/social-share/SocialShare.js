"use client";

import {
  FacebookIcon,
  TwitterIcon,
} from "react-share";

import "./social-share.css";
import { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { MdContentCopy } from "react-icons/md";
import { Dropdown } from "react-bootstrap";
import { FaShareFromSquare } from "react-icons/fa6";

export function SocialShare({
  show,
  setShow,
  loading,
  shareUrl,
  shareOnClick
}) {

  const [copyStatus, setCopyStatus] = useState(false);

  const copyOnClick = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopyStatus(true);
    setTimeout(() => {
      setCopyStatus(false);
    }, 3000);
  }

  const CustomTwitterShareButton = ({ url, title }) => {
    const handleShareClick = (event) => {
      event.preventDefault();
      window.open(
        `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
        '_blank'
      );
    };

    return (
      <button onClick={handleShareClick} style={{ border: 'none', background: 'none', padding: 0 }}>
        <TwitterIcon size={32} round />
      </button>
    );
  };

  const CustomFacebookShareButton = ({ url }) => {
    const handleShareClick = (event) => {
      event.preventDefault();
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        '_blank'
      );
    };

    return (
      <button onClick={handleShareClick} style={{ border: 'none', background: 'none', padding: 0 }}>
        <FacebookIcon size={32} round />
      </button>
    );
  };

  const CustomInstagramShareButton = ({ profileUrl }) => {
    const handleShareClick = (event) => {
      event.preventDefault();
      window.open(profileUrl, '_blank');
    };

    return (
      <button onClick={handleShareClick} style={{ border: 'none', background: 'none', padding: 0 }}>
        <InstagramIcon size={32} round />
      </button>
    );
  };

  return (
    <>
      <Dropdown.Item className="bg-transparent border-0 d-flex gap-1 align-items-center" onClick={shareOnClick}>
        <FaShareFromSquare />
        Share
      </Dropdown.Item>
      <Modal style={{ zIndex: "1 !important" }} centered show={show} onHide={() => setShow(false)}>
        <Modal.Header className="py-2" closeButton>
          <Modal.Title className="fs-6">Share</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading ?
            <div className="d-flex align-items-center justify-content-center py-3">
              <div
                className="spinner-border my-3 text-warning"
                role="status"
              />
            </div>
            :
            <div className="drive-i-container">
              <div className="Demo__container">
                <div className="Demo__some-network">
                  <CustomFacebookShareButton
                    url={shareUrl}
                  />
                </div>
                <div className="Demo__some-network">
                  <CustomTwitterShareButton
                    url={shareUrl}
                  />
                </div>
              </div>
              <div className="row my-3 align-content-center justify-content-center">
                <div className="col-12">
                  <input className="w-100" value={shareUrl} type="text" />
                </div>
                <div className="col-12 mt-3">
                  <button
                    style={{
                      fontSize: "13px",
                      fontWeight: "bold",
                      borderRadius: "10px",
                      background: "rgb(251, 232, 224)",
                      color: "rgb(240, 71, 34)"
                    }}
                    onClick={copyOnClick}
                    className="border-0 py-2 px-5">
                    {copyStatus ?
                      <MdContentCopy size={15} /> :
                      <MdContentCopy size={15} />
                    }
                    {" "}{copyStatus ? "Copied !" : "Copy Link"}
                  </button>
                </div>
              </div>
            </div>
          }
        </Modal.Body>
      </Modal>
    </>
  );
}
