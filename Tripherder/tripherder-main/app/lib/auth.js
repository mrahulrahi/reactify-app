import axios from 'axios';
import Config from '../store/api';

export const loginUser = async (values) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await axios.post('https://api.tripherder.com/api-v1/account/login/', values, config);
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

export const signUpUser = async (values) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await axios.post('https://api.tripherder.com/api-v1/account/register/', values, config);
    return response.data;
  } catch (error) {
    throw error.response;
  }
};


export const getUserDetails = async ({ access_token }) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access_token}`,
    },
  };
  try {
    const response = await axios.get(Config?.GET_USER_DETAILS, config);
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

export const updateUserDetails = async ({ access_token, data }) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access_token}`,
    },
  };
  try {
    const response = await axios.post(Config?.UPDATE_USER_DETAILS, data, config);
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

export const updateProfilePicture = async ({ access_token, uploadedFile }) => {

  const formData = new FormData();

  formData.append('photo', uploadedFile);

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${access_token}`,
    },
  };

  try {
    const response = await axios.post(Config?.UPDATE_USER_PROFILE_IMAGE, formData, config);
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

export const getOtp = async ({ email }) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await axios.post(Config?.RESEND_OTP_URL, email, config);
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

export const forgotPassword = async ({ access_token, passwords }) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access_token}`,
    },
  };
  try {
    const response = await axios.post(Config?.FORGOT_PASSWORD_URL, passwords, config);
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

export const updatePassword = async ({ access_token, passwords }) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access_token}`,
    },
  };
  try {
    const response = await axios.post(Config?.UPDATE_PASSWORD_URL, passwords, config);
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

export const loginWithFacebook = async ({ faceBookAuthData }) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await axios.post(Config?.LOGIN_WITH_FACEBOOK, faceBookAuthData, config);
    return response.data;
  } catch (error) {
    throw error.response;
  }
};


export const loginWithGoogle = async (data) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await axios.post(Config?.LOGIN_WITH_GOOGLE, data, config);
    return response.data;
  } catch (error) {
    throw error.response;
  }
};



export const sendStayConnectedMail = async (data) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await axios.post(Config?.SEND_STAY_CONNECTED, data, config);
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

