import axios from 'axios';

export const userServiceApi = axios.create({
  baseURL: "https://smarthost.globalmta.biz.id/backend/user-service",
  timeout: 30000,
  headers: {
    Accept: '*/*',
    // Authorization: `Bearer ${token}`
  },
});
