import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const request = axios.create({
  baseURL: "http://192.168.0.14:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

request.interceptors.request.use(
  async (config: any) => {
    const token = await AsyncStorage.getItem("@token_donation_app");
    if (token) {
      config.headers.common.Authorization = `Bearer ${token}`;
    } else {
      config.headers.common.Authorization = `Basic ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { request };
