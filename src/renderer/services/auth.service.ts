import type { AxiosError } from "axios";
import { LoginRequest, LoginResponse } from "../interfaces";
import { setItem } from "../_utils/localStorage";
import axios from "../_utils/axiosInstance";

export const loginAsync = async ({
  username,
  password,
}: Omit<LoginRequest, "pool">): Promise<{ error?: string }> => {
  try {
    const loginResponse = await axios.post<LoginResponse>("/auth", {
      username,
      password,
      pool: "provider",
    });

    setItem("user", loginResponse.data);
    return {};
  } catch (error) {
    return { error: (error as AxiosError).message };
  }
};
