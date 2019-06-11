import axios from 'axios';

let httpClient = axios.create({
  baseURL: 'http://localhost:3000/'
});

/* 过滤响应 */
httpClient.interceptors.response.use((result) => {
  /* 假设当code为0时代表响应成功 */
  if (result.data.code !== 0) {
    return Promise.reject(result);
  }
  return result.data.data;
}, result => {
  return Promise.reject(result);
});

export function getWallByPass(pass) {
  return httpClient.get(`http://localhost:3000/api/wallpaper/sort/${pass}`);
}
