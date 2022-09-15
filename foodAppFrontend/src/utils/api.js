import axios from "axios";

const api = () => {
  const httpRequest = axios.create({
    baseURL: "/api",
    headers: { "Content-Type": "application/json" },
  });

  // we should add token to the header if token exists in storage and if token required for the api call
  if (localStorage.getItem("token")) {
    const token = localStorage.getItem("token");
    httpRequest.defaults.headers.common["authorization"] = token;
  }
  //return the axios instance to make api call accross the apps
  return httpRequest;
};

export default api;
