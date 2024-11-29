// import axios from "axios";
// import jwtDefaultConfig from "./jwtDefaultConfig";
// import { EnvironmentService } from "../../../services/environmentService";

// // const environmentService = new EnvironmentServices()
// const envService = new EnvironmentService();
// const instance = axios.create({
//   baseURL: envService.getBaseUrl(),
//   timeout: 50000,
//   headers: { "Content-Type": "application/json" },
// });
// // const formDataAxios = axios.create({
// //   baseURL: envService.getBaseUrl(),
// //   timeout: 50000,
// //   headers: { "content-type": "multipart/form-data" },
// // });
// export default class JwtService {
//   jwtConfig = { ...jwtDefaultConfig };
//   isAlreadyFetchingAccessToken = false;
//   subscribers = [];
//   constructor(jwtOverrideConfig) {
//     this.jwtConfig = { ...this.jwtConfig, ...jwtOverrideConfig };
//     instance.interceptors.request.use(
//       (config) => {
//         let accessToken;
//         if (localStorage.getItem("persist:root")?.auth?.userDate?.token) {
//           accessToken = this.getToken();
//         }
//         if (accessToken) {
//           config.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`;
//         }
//         return config;
//       },
//       (error) => Promise.reject(error)
//     );

//     instance.interceptors.response.use(
//       (response) => response,
//       (error) => {
//         const { config, response } = error;
//         const originalRequest = config;

//         if (response && response.status === 401) {
//           if (!this.isAlreadyFetchingAccessToken) {
//             this.isAlreadyFetchingAccessToken = true;
//             this.refreshToken().then((r) => {
//               this.isAlreadyFetchingAccessToken = false;

//               // ** Update accessToken in localStorage
//               this.setToken(r.data.accessToken);
//               this.setRefreshToken(r.data.refreshToken);

//               this.onAccessTokenFetched(r.data.accessToken);
//             });
//           }
//           const retryOriginalRequest = new Promise((resolve) => {
//             this.addSubscriber((accessToken) => {
//               // ** Make sure to assign accessToken according to your response.
//               // ** Check: https://pixinvent.ticksy.com/ticket/2413870
//               // ** Change Authorization header
//               originalRequest.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`;
//               resolve(this.instance(originalRequest));
//             });
//           });
//           return retryOriginalRequest;
//         }
//         return Promise.reject(error);
//       }
//     );
//   }
//   onAccessTokenFetched(accessToken) {
//     this.subscribers = this.subscribers.filter((callback) =>
//       callback(accessToken)
//     );
//   }
//   getToken() {
//     return JSON.parse(
//       localStorage.getItem("persist:root")?.auth?.userData?.token
//     );
//   }
//   getRefreshToken() {
//     return localStorage.getItem(this.jwtConfig.storageRefreshTokenKeyName);
//   }
//   setToken(value) {
//     localStorage.setItem(this.jwtConfig.storageTokenKeyName, value);
//   }
//   setRefreshToken(value) {
//     localStorage.setItem(this.jwtConfig.storageRefreshTokenKeyName, value);
//   }
//   login(args) {
//     return instance.post(this.jwtConfig.loginEndpoint, args);
//   }
//   getData(url, params) {
//     return instance.get(url, params);
//   }
//   postData(url, data) {
//     return instance.post(url, data);
//   }
// }
import axios from "axios";
import jwtDefaultConfig from "./jwtDefaultConfig";
import { EnvironmentService } from "../../../services/environmentService";

// const environmentService = new EnvironmentServices()
const envService = new EnvironmentService();
const instance = axios.create({
  baseURL: envService.getBaseUrl(),
  timeout: 50000,
  headers: { "Content-Type": "application/json" },
});
// const formDataAxios = axios.create({
//   baseURL: envService.getBaseUrl(),
//   timeout: 50000,
//   headers: { "content-type": "multipart/form-data" },
// });
export default class JwtService {
  jwtConfig = { ...jwtDefaultConfig };
  isAlreadyFetchingAccessToken = false;
  subscribers = [];
  constructor(jwtOverrideConfig) {
    this.jwtConfig = { ...this.jwtConfig, ...jwtOverrideConfig };
    instance.interceptors.request.use(
      (config) => {
        let accessToken;
        if (!!this.getToken()) {
          accessToken = this.getToken();
        }
        if (accessToken) {
          config.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    instance.interceptors.response.use(
      (response) => response,
      (error) => {
        // const { config, response } = error;
        // const originalRequest = config;

        // if (response && response.status === 401) {
        //   if (!this.isAlreadyFetchingAccessToken) {
        //     this.isAlreadyFetchingAccessToken = true;
        //     this.refreshToken().then((r) => {
        //       this.isAlreadyFetchingAccessToken = false;

        //       // ** Update accessToken in localStorage
        //       this.setToken(r.data.accessToken);
        //       this.setRefreshToken(r.data.refreshToken);

        //       this.onAccessTokenFetched(r.data.accessToken);
        //     });
        //   }
        //   const retryOriginalRequest = new Promise((resolve) => {
        //     this.addSubscriber((accessToken) => {
        //       // ** Make sure to assign accessToken according to your response.
        //       // ** Check: https://pixinvent.ticksy.com/ticket/2413870
        //       // ** Change Authorization header
        //       originalRequest.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`;
        //       resolve(this.instance(originalRequest));
        //     });
        //   });
        //   return retryOriginalRequest;
        // }
        return Promise.reject(error);
      }
    );
  }
  onAccessTokenFetched(accessToken) {
    this.subscribers = this.subscribers.filter((callback) =>
      callback(accessToken)
    );
  }
  getToken() {
    // return JSON.parse(
    //   localStorage.getItem("persist:root")?.auth?.userData?.token
    // );
    return JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.auth)
      ?.userData?.token;
  }
  getRefreshToken() {
    return localStorage.getItem(this.jwtConfig.storageRefreshTokenKeyName);
  }
  setToken(value) {
    localStorage.setItem(this.jwtConfig.storageTokenKeyName, value);
  }
  setRefreshToken(value) {
    localStorage.setItem(this.jwtConfig.storageRefreshTokenKeyName, value);
  }
  login(args) {
    return instance.post(this.jwtConfig.loginEndpoint, args);
  }
  getData(url, params) {
    return instance.get(url, params);
  }
  postData(url, data) {
    return instance.post(url, data);
  }
}
