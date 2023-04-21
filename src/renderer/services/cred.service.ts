/* eslint-disable no-console */
import type { AxiosError } from "axios";
import {
  GetAllCredsResponse,
  Credential,
  ICredentialFull,
} from "../interfaces";
import axios from "../_utils/axiosInstance";

export const listAllCredsAsync = async (): Promise<{
  error?: string;
  response?: Credential[];
}> => {
  try {
    const listAllCredsResponse = await axios.get<GetAllCredsResponse>(
      `/admin/cred`
    );

    const allCreds = listAllCredsResponse.data.credentials;

    return { response: allCreds };
  } catch (error) {
    console.log("error", error);
    return {
      error: (
        (error as AxiosError).response?.data as {
          code: string;
          message: string;
        }
      )?.message,
    };
  }
};

export const getCredByProviderIdAndCourseCode = async (
  providerId: string,
  courseCode: string
) => {
  try {
    const getCredResponse = await axios.get<ICredentialFull>(
      `/provider/${providerId}/cred2/${courseCode}`
    );

    return { response: getCredResponse.data };
  } catch (error) {
    console.log("error", error);
    return {
      error: (
        (error as AxiosError).response?.data as {
          code: string;
          message: string;
        }
      )?.message,
    };
  }
};
