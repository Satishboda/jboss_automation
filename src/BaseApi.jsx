import axios from "axios";
// const token =localStorage.getItem("access_token");
const token =  "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI2Z2xJampxQU5xQ2x5VmhnUk5BMDhHTUYwLVczQzQ2V0Iwa0hnaVFpSkR3In0.eyJleHAiOjE3MjEzNzU0MDIsImlhdCI6MTcyMTM3MTgwMiwianRpIjoiZDZlOWE4NjctYTQ2MS00YzIxLTg1NWMtYmIwNTJlYjc5NjhiIiwiaXNzIjoiaHR0cDovLzE5Mi4xNjguMS4xMTA6ODA4MC9yZWFsbXMvbWFzdGVyIiwiYXVkIjpbIm1hc3Rlci1yZWFsbSIsImFjY291bnQiXSwic3ViIjoiZjc2NmQyNDgtM2Q1NS00ZmY1LWI3MGMtZWE2MTkyY2Q4OTk4IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiYWRtaW4tY2xpIiwic2lkIjoiMmFkM2NhM2QtNDk0My00ZjBlLWJjMTAtMDBjYWZmNTg1NGUxIiwiYWNyIjoiMSIsInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJjcmVhdGUtcmVhbG0iLCJkZWZhdWx0LXJvbGVzLW1hc3RlciIsImpib3NzLWFkbWluIiwib2ZmbGluZV9hY2Nlc3MiLCJhZG1pbiIsImpib3NzLXZpZXdlciIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsibWFzdGVyLXJlYWxtIjp7InJvbGVzIjpbInZpZXctcmVhbG0iLCJ2aWV3LWlkZW50aXR5LXByb3ZpZGVycyIsIm1hbmFnZS1pZGVudGl0eS1wcm92aWRlcnMiLCJpbXBlcnNvbmF0aW9uIiwiY3JlYXRlLWNsaWVudCIsIm1hbmFnZS11c2VycyIsInF1ZXJ5LXJlYWxtcyIsInZpZXctYXV0aG9yaXphdGlvbiIsInF1ZXJ5LWNsaWVudHMiLCJxdWVyeS11c2VycyIsIm1hbmFnZS1ldmVudHMiLCJtYW5hZ2UtcmVhbG0iLCJ2aWV3LWV2ZW50cyIsInZpZXctdXNlcnMiLCJ2aWV3LWNsaWVudHMiLCJtYW5hZ2UtYXV0aG9yaXphdGlvbiIsIm1hbmFnZS1jbGllbnRzIiwicXVlcnktZ3JvdXBzIl19LCJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6InByb2ZpbGUgZW1haWwiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicHJlZmVycmVkX3VzZXJuYW1lIjoiYWRtaW4ifQ.dn_BEllwgDuW78COBPNH4dSyofTNZZV7h7urOuHgde42eCDQchKFDuMmSw3oX-RskJPVxFflS_sv1V1Amz-eZZGMDXktvO4Xq7s7F738evtTycMEVQiFHlkpeLcGoJrxLyQNXmC2puAcjWIz1PD96Lj4iPRENhLLLwiB7sQGMH628qTeJm7_byonyPD4mOPT43ZT7PmMk5mZemniOqu-N-5OkjZ2KviNCTt2ers6BIC_1BRMY7tjknTYsUCwnZFGslh1P9ELn5SZuEurdXCsnpI_u5NjhkA0-XHGI17gzHp5H8aVYXSwiB3RCYi3ztvVTS3v7Sfif3d6upj-y_soSw"
export const url="http://192.168.1.69:8000"
       const BaseApi = axios.create({
  baseURL: "http://192.168.1.69:8000",
  headers: {
    "Content-Type": "application/json",
    "access-token": token,
  },
});

export default BaseApi;
// import axios from "axios";

// const BaseApi = axios.create({
//   baseURL: "http://192.168.1.69:8000",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Function to refresh the access token
// const refreshToken = async () => {
//   try {
//     const refresh_token = localStorage.getItem("refresh_token");
//     // const response = await axios.post(`${BaseApi.defaults.baseURL}/refresh_token`, {
//     //   refresh_token,
//     // });
//     const response = await axios.post(`${BaseApi.defaults.baseURL}/refresh_token`, null, {
//       params: {
//         refresh_token: refresh_token,
//       },
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     localStorage.setItem("access_token", response.data.access_token);
//     localStorage.setItem("refresh_token", response.data.refresh_token);
//     localStorage.setItem("expiration_time", response.data.expires_in);
//     localStorage.setItem("check","inside refreshToken Method")

//     return response.data.access_token;
//   } catch (error) {
//     console.error("Token refresh failed", error);
//     // Handle token refresh failure (e.g., redirect to login)
//     throw error;
//   }
// };

// // Axios request interceptor to add the access token and refresh it if needed
// BaseApi.interceptors.request.use(async (config) => {
//   let token = localStorage.getItem("access_token");
//   const expirationTime = localStorage.getItem("expiration_time");
//   const now = Math.floor(Date.now() / 1000); // Current time in seconds

//   if (token && expirationTime && now > expirationTime - 60) {
//     // Token is about to expire, refresh it
//     token = await refreshToken();
//   }

//   if (token) {
//     config.headers["Authorization"] = `Bearer ${token}`;
//   }

//   return config;
// }, (error) => {
//   return Promise.reject(error);
// });

// export const url = "http://192.168.1.69:8000";
// export default BaseApi;

