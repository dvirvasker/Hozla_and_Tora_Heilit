/* eslint-disable consistent-return */
/* eslint-disable no-else-return */
/* eslint-disable arrow-body-style */
import CryptoJS from "crypto-js";

export const signup = (user) => {
  return fetch(`http://localhost:5000/HozlaApi/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
// not in use
export const signin = (user) => {
  return fetch(`http://localhost:5000/HozlaApi/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
export const signout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    localStorage.removeItem("RefreshCount");

    return fetch(`/api/signout`, {
      method: "GET",
    })
      .then((response) => {
        console.log("signout", response);
      })
      .catch((err) => console.log(err));
  }
};

export const authenticate = (data) => {
  if (typeof window !== "undefined") {
    const encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      "8154cb24758ff7a388e3ed8398245f7a1662dbdefccdbe90b4a68e19c0d0d3fa1537713ea0021f55dc3b0685d69e1cdfb1e61dd4cf706d9f99b4897a8bacbbe3"
    );
    localStorage.setItem("jwt", encrypted);
    if (localStorage.getItem("RefreshCount") === null) {
      localStorage.setItem("RefreshCount", "0");
    }
  }
};

export const isAuthenticated = () => {
  if (typeof window === "undefined") {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    const decrypted = CryptoJS.AES.decrypt(
      localStorage.getItem("jwt"),
      "8154cb24758ff7a388e3ed8398245f7a1662dbdefccdbe90b4a68e19c0d0d3fa1537713ea0021f55dc3b0685d69e1cdfb1e61dd4cf706d9f99b4897a8bacbbe3"
    );
    console.log("decrypted");
    console.log(decrypted.toString(CryptoJS.enc.Utf8));
    return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
  } else {
    return false;
  }
};

export const updateRefreshCount = (num) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("RefreshCount", num);
  }
};
