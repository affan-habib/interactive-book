import axios from "axios";
import { FAKE_URL } from "@/config";

const instance = axios.create({
  baseURL: FAKE_URL,
  headers: {
    "content-type": "application/json",
  },
});

export default {
  get: (url, params = "") =>
    instance({
      method: "GET",
      url,
      params,
    }),
  post: (url, data) =>
    instance({
      method: "POST",
      url,
      data,
    }),
  filepost: (url, data) =>
    instance({
      method: "POST",
      url,
      data,
      headers : {
        "Content-Type": "multipart/form-data"
      }
    }),
  put: (url, data) =>
    instance({
      method: "PUT",
      url,
      data,
    }),
  patch: (url, data) =>
    instance({
      method: "PATCH",
      url,
      data,
    }),
  delete: (url, data) =>
    instance({
      method: "DELETE",
      url,
      data,
    }),
};
