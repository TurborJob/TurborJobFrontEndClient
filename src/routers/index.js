import React from 'react';

// Layout
import LayoutDefault  from '../containers/DefaultLayout/DefaultLayout';

// Page
const HomePage = React.lazy(() => import('../views/HomePage/HomePage'));
const Login = React.lazy(() => import('../views/AuthenPage/Login'));
const Register = React.lazy(() => import('../views/AuthenPage/Register'));
const ForgotPass = React.lazy(() => import('../views/AuthenPage/ForgotPass'));
const AccountSetting = React.lazy(() => import('../views/ProfilePage'));



let routes;

let publicRouters = [
  { path: '/', name: 'Home', component: HomePage, layout: LayoutDefault,  },
  { path: '/login', name: 'Login', component: Login, layout: null },
  { path: '/register', name: 'Register', component: Register, layout: null },
  { path: '/forgotPass', name: 'Forgot Password', component: ForgotPass, layout: null },
  { path: '/account-setting', name: 'Account Setting', component: AccountSetting },
];
routes = {
  publicRouters,
};

export default routes;
