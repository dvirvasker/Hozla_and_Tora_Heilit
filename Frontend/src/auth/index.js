/* eslint-disable consistent-return */
/* eslint-disable no-else-return */
/* eslint-disable arrow-body-style */
export const signup = (user) => {
  return fetch(`http://localhost:5000/api/signup`, {
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
  return fetch(`http://localhost:5000/api/signin`, {
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
    localStorage.setItem("jwt", JSON.stringify(data));
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
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};

export const updateRefreshCount = (num) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("RefreshCount", num);
  }
};
