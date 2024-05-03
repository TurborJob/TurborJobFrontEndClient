import React from 'react';

// Layout
import {DefaultLayout}  from '../containers/DefaultLayout/index';
import { BusinessLayout } from '../containers/BusinessLayout/index';

// Page
const HomePage = React.lazy(() => import('../views/HomePage/HomePage'));
const Login = React.lazy(() => import('../views/AuthenPage/Login'));
const Register = React.lazy(() => import('../views/AuthenPage/Register'));
const ForgotPass = React.lazy(() => import('../views/AuthenPage/ForgotPass'));
const AccountSetting = React.lazy(() => import('../views/ProfilePage'));
const JobManagement = React.lazy(() => import('../views/JobManagement'));
const JobHome = React.lazy(() => import('../views/JobManagement/Home'));
const JobCreate = React.lazy(() => import('../views/JobManagement/Create'));
const JobList = React.lazy(() => import('../views/JobManagement/ListJob'));
const FindJobs = React.lazy(() => import('../views/FindJobs'));
const JobsApply = React.lazy(() => import('../views/JobsApply'));
const JobRequestForm =  React.lazy(() => import('../views/JobManagement/ListRequestForms'));
const RatingPage =  React.lazy(() => import('../views/Rating'));
const RatingBusinessPage =  React.lazy(() => import('../views/JobManagement/Rating'));
const FindJobsRealTimePage =  React.lazy(() => import('../views/FindJobsRealTime'));









let routes;

let publicRouters = [
  { path: '/', name: 'Home', component: HomePage, layout: DefaultLayout,  },
  { path: '/login', name: 'Login', component: Login, layout: null },
  { path: '/register', name: 'Register', component: Register, layout: null },
  { path: '/forgotPass', name: 'Forgot Password', component: ForgotPass, layout: null },
  { path: '/account-setting', name: 'Account Setting', component: AccountSetting, layout: DefaultLayout },
  { path: '/job-management', name: 'Job Management', component: JobManagement, layout: BusinessLayout, role:"Business"},
  { path: '/job-management/home', name: 'Job Home', component: JobHome, layout: BusinessLayout, role:"Business"},
  { path: '/job-management/create', name: 'Job Create Page', component: JobCreate, layout: BusinessLayout, role:"Business"},
  { path: '/job-management/list', name: 'Job List Page', component: JobList, layout: BusinessLayout, role:"Business"},
  { path: '/job-management/rating', name: 'Job Rating Page', component: RatingBusinessPage, layout: BusinessLayout, role:"Business"},
  { path: '/find-jobs/normal', name: 'Find Jobs Page', component: FindJobs, layout: DefaultLayout, role:"User"},
  { path: '/job-apply', name: 'Jobs Apply Page', component: JobsApply, layout: DefaultLayout, role:"User"},
  { path: '/request-form', name: "Request Form", component: JobRequestForm, layout: BusinessLayout, role:"Business"},
  { path: '/rating', name: "Rating Page", component: RatingPage, layout: DefaultLayout, role:"User"},
  { path: '/find-jobs/realtime', name: "Find Jobs Realtime Page", component: FindJobsRealTimePage, layout: DefaultLayout, role:"User"},



];
routes = {
  publicRouters,
};

export default routes;
