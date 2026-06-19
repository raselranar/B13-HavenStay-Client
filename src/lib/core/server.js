import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
export const serverFetch = async (path) => {
  const url = `${baseUrl}${path}`;
  console.log(url);
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};
