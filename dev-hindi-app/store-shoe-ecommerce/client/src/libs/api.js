import { strapiPublicApiToken, strapiApiUrl } from "@/utils/data";
import axios from "axios";

export const fetchDataFromApi = async (endPoint) => {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${strapiPublicApiToken}`,
    },
  };

  const res = await fetch(`${strapiApiUrl}${endPoint}`, options);
  const data = await res.json();

  return data;
};

export const api = axios.create({
  baseURL: strapiApiUrl,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_STRAPI_PUBLIC_API_TOKEN}`,
  },
});
