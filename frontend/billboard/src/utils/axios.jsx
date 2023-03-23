import axios from "axios";

const DOMAIN = import.meta.env.VITE_APP_API_URL;
const PATH = import.meta.env.VITE_APP_API_PATH;

const baseURL = DOMAIN + PATH;
const httpClient = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    // Todo: headers 작성
    // "Access-Control-Allow-Credentials": true,
    // "Access-Control-Allow-Origin": "*",
    // "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});

export default httpClient;
