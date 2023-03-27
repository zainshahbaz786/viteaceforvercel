export default function setupAxios(axios, store) {
  axios.interceptors.request.use(
    config => {
      const authToken = JSON.parse(localStorage.getItem('loggedInUser'))?.accessToken;
      if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
      }
      return config;
    },
    // err => console.log(err)
    err => Promise.reject(err)
  );
}
