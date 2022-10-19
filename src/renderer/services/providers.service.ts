/* eslint-disable no-console */
import type { AxiosError } from "axios";
import { CreateProviderResponse, IProvider } from "../interfaces";
import axios from "../_utils/axiosInstance";

export const createProviderAsync = async (
  payload: IProvider
): Promise<{
  error?: string;
  response?: CreateProviderResponse;
  payload: IProvider;
}> => {
  try {
    const createProviderResponse = await axios.post<CreateProviderResponse>(
      "/admin/provider",
      payload
    );
    console.log("createProviderResponse", createProviderResponse);
    return { payload, response: createProviderResponse.data };
  } catch (error) {
    console.log("error", error);
    return {
      payload,
      error: (
        (error as AxiosError).response?.data as {
          code: string;
          message: string;
        }
      )?.message,
    };
  }
};

export const deleteProviderAsync = async (
  providerId: string
): Promise<{
  error?: string;
  response?: CreateProviderResponse;
  providerId: string;
}> => {
  try {
    const deleteProviderResponse = await axios.delete<CreateProviderResponse>(
      `/admin/provider/${providerId}`
    );
    console.log("deleteProviderResponse", deleteProviderResponse);
    return { providerId };
  } catch (error) {
    console.log("error", error);
    return {
      providerId,
      error: (
        (error as AxiosError).response?.data as {
          code: string;
          message: string;
        }
      )?.message,
    };
  }
};
