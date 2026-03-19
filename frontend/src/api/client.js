import axios from "axios";

export const api = axios.create({
  baseURL: "https://blurrstore.up.railway.app/",
});