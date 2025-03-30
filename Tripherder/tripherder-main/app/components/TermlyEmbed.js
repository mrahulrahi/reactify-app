"use client"

import React, { useEffect } from 'react';

const TermlyEmbed = ({ dataId }) => {

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.termly.io/embed-policy.min.js";
    script.id = 'termly-jssdk';
    script.async = true;
    document.getElementsByTagName('head')[0].appendChild(script);
  }, []);

  return (
    <div
      name="termly-embed"
      data-id={dataId}
      data-type="iframe"
      className='container mb-3'
    ></div>
  );
};

export default TermlyEmbed;
