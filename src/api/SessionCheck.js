//import axios from "axios";
import axios from "./axios";
import { API_URL } from "./constants";
export const USERS_ID = "ui";
export const TOKEN = "token";
export const CLIENTID = "clientId";

class SessionCheck {
  basicJWTAuthentication(email, password, userType) {
    let obj = { phoneNumber: email, password: password, userType: userType };
    //console.log("session==>>", obj);
    return axios.post(`${API_URL}user/authenticate`, obj);
  }

  //const url = `${API_URL}/users/authenticate`;
  createJWTToken(token) {
    return ("Bearer " + token).toString();
  }

  setSessionForJWt(token) {
    // sessionStorage.setItem(TOKEN, token);
    localStorage.setItem(TOKEN, token);
    this.setUpAxiosInterceptors(this.createJWTToken(token));
  }

  removeSession() {
    // sessionStorage.removeItem(TOKEN);
    localStorage.removeItem(TOKEN);
  }

  checkSession() {
    // let a = sessionStorage.getItem(TOKEN);
    let a = localStorage.getItem(TOKEN);
    if (a === null) return false;
    return true;
  }

  getUserLoggedin() {
    // let a = sessionStorage.getItem(TOKEN);
    let a = localStorage.getItem(TOKEN);
    if (a === null) return "";
    return a;
  }

  setUpAxiosInterceptors(token) {
    axios.interceptors.request.use((config) => {
      if (this.checkSession()) {
        config.headers.authorization = token;
      }
      return config;
    });
  }

  getLoggedinUserId() {
    // let a = sessionStorage.getItem(TOKEN);
    let a = localStorage.getItem(TOKEN);
    let payload = "";
    if (a) {
      const payloadStart = a.indexOf(".") + 1;
      const payloadEnd = a.lastIndexOf(".");
      payload = a.substring(payloadStart, payloadEnd);
    }

    let userDetails = {
      userId: "",
      userName: "",
      userEmail: "",
      userPhoneNumber: "",
    };

    if (payload.length !== 0) {
      payload = atob(payload);
      const jsonPayload = JSON.parse(payload);
      userDetails.userId = jsonPayload.id;
      userDetails.userName = jsonPayload.name;
      userDetails.userEmail = jsonPayload.email;
      userDetails.userPhoneNumber = jsonPayload.phoneNumber;
    }

    if (payload.length === 0) return "";
    return userDetails;
  }

  getBearerToken() {
    // let a = sessionStorage.getItem(TOKEN);
    let a = localStorage.getItem(TOKEN);
    const h = { headers: { Authorization: `Bearer ${a}` } };
    return h;
  }
}
export default new SessionCheck();
