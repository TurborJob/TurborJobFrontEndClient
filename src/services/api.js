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
  getNormalJob: {href: "/api/v1/user-only/get-normal-job"},
  applyNormalJob: {href: "/api/v1/user-only/apply-normal-job"},
  getRequestNormalJob: {href: "/api/v1/user-only/get-request-normal-job"},

  getRate: {href:"/api/v1/business-worker/get-rate"},
  rate: {href: '/api/v1/business-worker/rate'},

  createJob: {href: "/api/v1/business/create-job"},
  getJob: {href: "/api/v1/business/get-job"},
  findNormalJob : {href: "/api/v1/business/find-normal-job"},
  approveNormalJob: {href: "/api/v1/business/approve-normal-job"},
  rejectNormalJob: {href: "/api/v1/business/reject-normal-job"},
  getRequestNormalJobBusiness: {href: "/api/v1/business/get-request-normal-job"},
  updateJobToDone: {href: "/api/v1/business/update-job-done"}


 

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
