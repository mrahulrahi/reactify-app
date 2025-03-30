'use client'

import axios from 'axios';
import React from 'react'
import Config from '../../store/api';

export default function DownloadInVice({ token, orderId }) {
  const downloadOnClick = () => {
    axios({
      method: 'post',
      url: Config.GET_INVOICE,
      responseType: 'blob', // Set the response type to blob
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: {
        order_id: parseInt(orderId)
      }
    })
      .then(function (response) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'invoice.pdf');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return (
    <button className="link bg-transparent border-0" onClick={() => downloadOnClick()}>Download</button>
  )
}
