import axios from "./axios";

var config = {};

var path = {
  //login
  login: { href: "/api/v1/login" },
  uploadFile: { href: "/api/v1/all/upload-file" },
  register: { href: "/api/v1/all/register" },
  forgotPass: { href: "/api/v1/all/forgot-pass" },
  changePass: { href: "api/v1/auth/change-pass" },
  logout: { href: "/api/v1/logout" },
  getRoleName: { href: "/api/v1/user/get-role-name" },
  updateProfile: { href: "/api/v1/auth/update-profile" },
  vnPay: {href: "/api/v1/all/payment/vnpay"},

  updateBusiness: { href: "/api/v1/user-only/update-business" },
  getNormalJob: { href: "/api/v1/user-only/get-normal-job" },
  applyNormalJob: { href: "/api/v1/user-only/apply-normal-job" },
  getRequestNormalJob: { href: "/api/v1/user-only/get-request-normal-job" },
  getRequestNormalJob: { href: "/api/v1/user-only/get-request-normal-job" },
  createContact: { href: "/api/v1/user-only/create-contact" },

  getRate: { href: "/api/v1/business-worker/get-rate" },
  rate: { href: "/api/v1/business-worker/rate" },
  getNumNotifyUnread: { href: "/api/v1/business-worker/get-num-notify-unread" },
  markAllNotifyRead: { href: "/api/v1/business-worker/mark-all-notify-read" },
  getNotifyUser: { href: "/api/v1/business-worker/get-notify-user" },

  createJob: { href: "/api/v1/business/create-job" },
  getJob: { href: "/api/v1/business/get-job" },
  findNormalJob: { href: "/api/v1/business/find-normal-job" },
  approveNormalJob: { href: "/api/v1/business/approve-normal-job" },
  rejectNormalJob: { href: "/api/v1/business/reject-normal-job" },
  getRequestNormalJobBusiness: {
    href: "/api/v1/business/get-request-normal-job",
  },
  updateJobToDone: { href: "/api/v1/business/update-job-done" },
  checkJobSuccess: { href: "/api/v1/business/check-job-success" },
  getBusinessStatistic: { href: "/api/v1/business/get-business-statistic" },
  extendBusiness: {href:"/api/v1/business/extend-business"},

  getAdminStatistic: { href: "/api/v1/admin/get-admin-statistic" },
  getUserByAdmin: { href: "api/v1/admin/get-user-by-admin" },
  updateStatusUserByAdmin: { href: "api/v1/admin/update-status-user-by-admin" },
  getAllContact: { href: "api/v1/admin/get-all-contact" },
  replyContact: { href: "api/v1/admin/reply-contact" },
};

Object.keys(path).forEach(function (key) {
  const method = key?.method || "post";
  config[key] = async function (data, headers) {
    let result = await axios[method](path[key]?.href || "", data, { headers });
    return result;
  };
}, this);

export default config;
