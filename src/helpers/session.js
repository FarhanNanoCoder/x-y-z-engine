import cookie from "js-cookie";
import jwtDecode from "jwt-decode";

export const setCookie = (key, value, expiration) => {
  cookie.set(key, value, {
    expires: expiration || 1,
    path: "/",
  });
};
export function decodeToken(token) {
  if (!token) return null;
  const decode = jwtDecode(token);
  return decode;
}

export const setUserCookies = ({
  accesstoken,
  accesstoken_exp,
  refreshtoken,
  refreshtoken_exp,
}) => {
  let userData = {};
  if (accesstoken) {
    userData = decodeToken(accesstoken);
    setCookie("accesstoken", accesstoken, new Date(accesstoken_exp));
    setLocalStorage("user", userData);
  }
  if (refreshtoken)
    setCookie("refreshtoken", refreshtoken, new Date(refreshtoken_exp));
  return userData;
};

export const removeCookie = (key, expiration) => {
  cookie.remove(key, {
    expires: expiration || 1,
  });
};

export const getCookie = (key, req) => {
  return req ? getCookieFromServer(key, req) : getCookieFromBrowser(key);
};

export const getCookieFromBrowser = (key) => {
  return cookie.get(key);
};

const getCookieFromServer = (key, req) => {
  if (!req.headers?.cookie) {
    return undefined;
  }
  const rawCookie = req.headers.cookie
    .split(";")
    .find((c) => c.trim().startsWith(`${key}=`));
  if (!rawCookie) {
    return undefined;
  }
  return rawCookie.split("=")[1];
};

//localstorage
export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const removeLocalStorage = (key) => {
  localStorage.removeItem(key);
};

export const getLocalStorage = (key, convertToObject) => {
  return convertToObject
    ? JSON.parse(localStorage.getItem(key))
    : localStorage.getItem(key);
};
