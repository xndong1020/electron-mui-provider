import { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { LoginResponse } from "../interfaces";
import { getItem } from "./localStorage";

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  const access_token = getItem<LoginResponse>("user")?.idToken;
  if (access_token) {
    config.headers!["Authorization"] = "Bearer " + access_token;
  }
  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  console.log(`onRequestError`, error);
  return Promise.reject(error);
};

export function setupInterceptorsTo(
  axiosInstance: AxiosInstance
): AxiosInstance {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  return axiosInstance;
}
