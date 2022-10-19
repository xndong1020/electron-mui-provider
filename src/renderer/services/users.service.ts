/* eslint-disable no-console */
import type { AxiosError } from "axios";
import { CreateUserResponse, IUser } from "../interfaces";
import axios from "../_utils/axiosInstance";

export const createUserAsync = async (
  payload: IUser
): Promise<{
  error?: string;
  response?: CreateUserResponse;
  payload: IUser;
}> => {
  try {
    const createUserResponse = await axios.post<CreateUserResponse>(
      "/admin/user",
      payload
    );
    console.log("createUserResponse", createUserResponse);
    return { payload, response: createUserResponse.data };
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

export const deactivateUserAsync = async (
  username: string
): Promise<{
  error?: string;
  response?: CreateUserResponse;
}> => {
  try {
    const deactivateUserResponse = await axios.post<CreateUserResponse>(
      `/admin/user/deactivate/${username}`,
      {}
    );
    console.log("deactivateUserResponse", deactivateUserResponse);
    return { response: deactivateUserResponse.data };
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
