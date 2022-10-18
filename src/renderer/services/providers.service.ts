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
