import axios from "axios";
import Config from "../../store/api";

export const getRecentBlogs = async () => {
  try {
    const response = await axios.get(Config.GET_RECENT_BLOGS_API_URL, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getAllBlogs = async () => {
  try {
    const response = await axios.get(Config.GET_ALL_BLOGS_API_URL, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getBlogsById = async (id) => {
  try {
    const response = await axios.get(`${Config.GET_BLOG_BY_ID_API_URL}/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};