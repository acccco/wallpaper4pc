import axios from "axios";

const baseURL = "http://acccco.com";

let httpClient = axios.create({
  baseURL,
});

/* 过滤响应 */
httpClient.interceptors.response.use(
  (result) => {
    /* 假设当code为0时代表响应成功 */
    if (result.data.code !== 0) {
      return Promise.reject(result);
    }
    return result.data.data;
  },
  (result) => {
    return Promise.reject(result);
  },
);

export { baseURL };

export function getWallByBefore(day) {
  return httpClient.get(`/api/wallpaper/before/${day}`);
}

export function getWallByPage(pageNum, pageSize) {
  return httpClient.get(
    `/api/wallpaper?pageNum=${pageNum}&pageSize=${pageSize}`,
  );
}
