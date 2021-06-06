const axiosConfig = {
  baseURL: process.env.VUE_APP_RESTAPI_PREFIX,
  responseType: 'json',
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN'
};

export default axiosConfig;
