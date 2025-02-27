import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
/**
 * 建立 axios 實例
 * 設定基本 URL 和請求超時時間
 * baseURL: API 的基礎路徑
 * timeout: 請求超時時間 (10000ms = 10秒)
 */
const axiosClient = axios.create({
  baseURL: 'http://localhost:8000/api',
  timeout: 10000,
});

/**
 * 請求攔截器
 * 功能: 自動在每個 API 請求的 URL 前添加當前語言設定
 * 例如: 若當前語言為 'zh-TW'，請求 '/users' 會變成 '/zh-TW/users'
 * 特殊情況: 若當前語言為 'zhTW'，則會轉換為 'taiwan'
 */
axiosClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  return config;
});

/**
 * 響應攔截器
 * 功能:
 * 1. 成功響應 - 直接返回響應的 data 部分，免去在每個 API 調用處解構 response.data
 * 2. 錯誤響應 - 將錯誤拒絕，讓調用函數可以捕獲並處理錯誤
 * 注意: 這裡也可以擴展添加全局錯誤處理邏輯或身份驗證相關功能 (如添加 token)
 */
axiosClient.interceptors.response.use(
  <T>(response: AxiosResponse<T>) => response.data,
  (error: AxiosError) => Promise.reject(error),
);

export default axiosClient;
