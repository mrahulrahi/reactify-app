"use client";

import React from 'react';
import { FaDownload } from "react-icons/fa";
import moment from 'moment';
import axios from 'axios';
import Config from '../store/api';

export default function InvoicesList({ access_token, invoicesList }) {

  const downloadOnClick = (id) => {
    axios({
      method: 'get',
      url: `${Config.DOWNLOAD_INVOICE}/${id}/`,
      responseType: 'blob', // Set the response type to blob
      headers: {
        Authorization: `Bearer ${access_token}`
      },
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
    <>
      {invoicesList?.length > 0 ?
        <table className="table table-bordered text-white transaction-table-container mb-0">
          <thead>
            <tr className="transaction-table-content">
              <th scope="col">Name</th>
              <th scope="col">Date</th>
              <th scope="col">Amount</th>
              <th className="text-center" scope="col">
                Status
              </th>
              <th className="text-center" scope="col">
                Action{" "}
              </th>
            </tr>
          </thead>
          <tbody>
            {invoicesList?.map((data, index) => {
              return (
                <tr key={index} className="transaction-table-data">
                  <td className="block-content">
                    <a href="#!" className="truncate transaction-id-text">
                      {data?.billing_name}
                    </a>
                    <p className="truncate mb-0 transaction-id-content">
                      Id: {data?.invoice_id}
                    </p>
                  </td>
                  <td className="block-content">
                    <p className="transaction-id-text mb-0">
                      {moment(data?.created_at).format("MMMM D, YYYY")}
                    </p>
                    <p className="transaction-id-content mb-0">
                      {moment(data?.created_at).format("h:mm A")}
                    </p>
                  </td>
                  <td className="amount-content">
                    <p className='mb-0 transaction-id-text transaction-id-text'>
                      ${data?.total} {data?.currency}
                    </p>
                  </td>
                  <td className="succeeded-content text-center transaction-id-text text-success">
                    <p className='mb-0 fw-bold'>{data?.status}</p>
                  </td>
                  <td className="details-content text-center transaction-id-text">
                    <button
                      onClick={() => downloadOnClick(data?.id)}
                      className='border-0 bg-transparent d-flex align-items-center justify-content-center gap-1'
                    >
                      <FaDownload color='rgb(240, 71, 34)' />
                      <span className='text-primary'>Download</span>
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table> :
        <p className='text-dark m-4 mb-0'>No records</p>
      }
    </>
  )
}
