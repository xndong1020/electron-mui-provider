import { setupInterceptorsTo } from "./axiosInterceptors";
import axios from "axios";

const instance = axios.create({
  baseURL: process.env.API_BASEURL || "",
});

export default setupInterceptorsTo(instance);
