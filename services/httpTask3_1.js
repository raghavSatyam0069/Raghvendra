import axios from "axios";
import auth from "./authPassportService.js";

const baseURL = "http://localhost:2410";

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

function get(url) {
  let token = auth.getToken();
  return axiosInstance.get(baseURL + url, {
    headers: { authorization: token },
  });
}
function post(url, obj) {
  let token = auth.getToken();
  return axiosInstance.post(baseURL + url, obj, {
    headers: { authorization: token },
  });
}
function put(url, obj) {
  let token = auth.getToken();
  return axiosInstance.put(baseURL + url, obj, {
    headers: { authorization: token },
  });
}
function deleteApi(url) {
  let token = auth.getToken();
  console.log(baseURL + url);
  return axiosInstance.delete(baseURL + url, {
    headers: { authorization: token },
  });
}
export default {
  get,
  post,
  put,
  deleteApi,
};
