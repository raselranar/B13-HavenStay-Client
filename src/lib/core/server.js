"use server";
import axios from "axios";
import { authHeaders, getUserSession } from "./session";
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
export const protectedFetch = async (path) => {
  const session = await getUserSession();
  const url = `${baseUrl}${path}`;
  console.log(url);
  try {
    const response = await axios.get(url, {
      headers: await authHeaders(),
      data: session,
    });
    return response.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};
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

export const serverMutate = async (path, method = "POST", data = {}) => {
  const url = `${baseUrl}${path}`;
  if (!data.userId) {
    data.user = await getUserSession();
  }
  try {
    const response = await axios({
      method,
      url,
      data,
      headers: await authHeaders(),
    });
    return response.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};
