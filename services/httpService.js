import axios from "axios";
import auth from "./authPassportService.js";

const baseURL = "http://localhost:2410";
// const baseURL = "https://gbi-bank-ggkr.onrender.com";
const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

function get(url) {
  let token = auth.getToken();
  return axiosInstance.get(baseURL + url, {
    headers: { Authorization: "bearer " + token },
  });
}
function post(url, obj) {
  return axiosInstance.post(baseURL + url, obj);
}
function put(url, obj) {
  return axiosInstance.put(baseURL + url, obj);
}
function deleteApi(url) {
  console.log(baseURL + url);
  return axiosInstance.delete(baseURL + url);
}
export default {
  get,
  post,
  put,
  deleteApi,
};
