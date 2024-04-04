import axios from "./axios";

var config = {};

var path = {
  //login
  login: { href: "/api/v1/login" },
  uploadFile: { href: "/api/v1/all/upload-file" },
  register: { href: "/api/v1/all/register" },

  // logout: "/api/user/logout",
  // getCaptcha: "/api/user/create-captcha",
};

Object.keys(path).forEach(function (key) {
  const method = key?.method || "post";
  config[key] = async function (data, headers) {
    let result = await axios[method](path[key]?.href || "", data, {headers});
    return result;
  };
}, this);

export default config;
