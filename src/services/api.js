import axios from "./axios";

var config = {};

var path = {
  //login
  login: { href: "/api/v1/login" },
  uploadFile: { href: "/api/v1/all/upload-file" },
  register: { href: "/api/v1/all/register" },
  changePass: {href: "api/v1/auth/change-pass"},
  logout: { href: "/api/v1/logout" },
  getRoleName: { href: "/api/v1/user/get-role-name" },
  updateProfile: {href: "/api/v1/auth/update-profile"},
  updateBusiness: {href: "/api/v1/user-only/update-business"},

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
