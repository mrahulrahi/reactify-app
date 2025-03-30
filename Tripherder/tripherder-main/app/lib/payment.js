import axios from "axios";
import Config from "../store/api";

export const getPlans = async () => {
  try {
    const headers = {
      "Content-Type": "application/json",
    }

    const response = await axios.get(
      `${Config.GET_PLANS}`,
      {
        headers: headers,
        responseType: 'json',
        validateStatus: (status) => {
          return status >= 200 && status < 300;
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getInvoices = async ({ access_token }) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    }

    const response = await axios.get(
      `${Config.GET_INVOICES}`,
      {
        headers: headers,
        responseType: 'json',
        validateStatus: (status) => {
          return status >= 200 && status < 300;
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const downloadInvoice = async ({ access_token, id }) => {
  try {
    const headers = {
      // "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    }

    const response = await axios.get(
      `${Config.DOWNLOAD_INVOICE}/${id}/`,
      {
        headers: headers,
        responseType: 'json',
        validateStatus: (status) => {
          return status >= 200 && status < 300;
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getPlanById = async ({ id }) => {
  try {
    const headers = {
      "Content-Type": "application/json",
    }

    const response = await axios.get(
      `${Config.GET_PLAN_BY_ID}/${id}`,
      {
        headers: headers,
        responseType: 'json',
        validateStatus: (status) => {
          return status >= 200 && status < 300;
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getIntentIDandSecret = async ({ access_token, data }) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    }

    const response = await axios.post(Config.CREATE_INTENT,
      data,
      {
        headers: headers,
        responseType: 'json',
        validateStatus: (status) => {
          return status >= 200 && status < 300;
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const confirmOrderToPurchase = async ({ access_token, paymentIntentId }) => {
  const data = { p_id: paymentIntentId }
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    }

    const response = await axios.post(Config.CONFIRM_ORDER,
      data,
      {
        headers: headers,
        responseType: 'json',
        validateStatus: (status) => {
          return status >= 200 && status < 300;
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};