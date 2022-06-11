import axios from "axios";

const request = axios.create({
  baseURL: "http://192.168.0.14:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

export { request };
