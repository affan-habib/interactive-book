import axios from "axios";
import { toast } from "react-toastify";
import { toastOption } from "@/constant/data";
import { CIRCULAR_URL } from "../config";

const _token = JSON.parse(window.localStorage.getItem("token"));
const TOKEN = '996|HQ1buhOk8Ai5lkxcDjFqoRW5FqMBvFrjS4bUXlU9OztzdKf07KlAIqaKYWzoxezi15RbAn4rWiNkJIiCDjZ0UsdY909Txr4bvMLnem2mIPLDHNe17NzNOMcxKG8axc7VybyfZ3s1skHoW1PETadEJQRqnhczrPPjpB6w6vn1gxoKjNUoV26NhBu1vsLyRh3GyOeY7yJx3q1jMPyS1ZRrNPDLwHqEd6hHa6d9pUW7GITt3xXs';
const instance = axios.create({
  baseURL: CIRCULAR_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${_token}`,
  },
});

instance.interceptors.response.use(
  (response) => {
    const method = response.config.method;
    const showToaster = response.config.showToaster !== false;
    if (method == "get" && (response.status < 200 || response.status > 204) && showToaster) {
      toast.info("Data not found", toastOption);
    }
    if (
      method === "post" ||
      method === "put" ||
      method === "patch" ||
      method === "delete"
    ) {
      const message = response.data?.message;
      if (response.status >= 200 || response.status <= 204) {
        if (showToaster) toast.success(message, toastOption);
      } else {
        if (showToaster) toast.error(message, toastOption);
      }
    }
    return response;
  },
  (err) => {
    // toast.error(err.response?.data?.message, toastOption);
    return new Promise((resolve, reject) => {
      if (err.response?.status === 401) {
        // Invalid token
        // window.location.href = "/";
        invalidTokenHandler();
        return reject(err);
      } else if (err.response?.status === 403) {
        // Not authorized
        window.location.href = "/dashboard";
      } else {
        return reject(err);
      }
    });
  }
);

const invalidTokenHandler = () => {
  instance.interceptors.request.use(
    (config) => {
      const _token = window.localStorage.getItem("_token");
      const storageToken = _token ? JSON.parse(_token) : null;
      if (storageToken && storageToken != undefined && storageToken != TOKEN) {
        config.headers["Authorization"] = `Bearer ${storageToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

export default {
  get: (url, params = "", showToaster = true) =>
    instance({
      method: "GET",
      url,
      params,
      showToaster,
    }),
  post: (url, data, showToaster = true) =>
    instance({
      method: "POST",
      url,
      data,
      showToaster,
    }),
  filepost: (url, data, showToaster = true) =>
    instance({
      method: "POST",
      url,
      data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      showToaster,
    }),
  put: (url, data, showToaster = true) =>
    instance({
      method: "PUT",
      url,
      data,
      showToaster,
    }),
  fileput: (url, data, showToaster = true) => {
    data.append("_method", "PUT");
    return instance({
      method: "POST",
      url,
      data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      showToaster,
    });
  },
  patch: (url, data, showToaster = true) =>
    instance({
      method: "PATCH",
      url,
      data,
      showToaster,
    }),
  filepatch: (url, data, showToaster = true) => {
    data.append("_method", "PATCH");
    return instance({
      method: "PATCH",
      url,
      data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      showToaster,
    });
  },
  delete: (url, data, showToaster = true) =>
    instance({
      method: "DELETE",
      url,
      data,
      showToaster,
    }),
};
