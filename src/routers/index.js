import React from 'react';

// Layout
import LayoutDefault  from '../containers/DefaultLayout/DefaultLayout';

// Page
const HomePage = React.lazy(() => import('../views/HomePage'));
const Login = React.lazy(() => import('../views/Login'));
const Register = React.lazy(() => import('../views/Register'));
const ForgotPass = React.lazy(() => import('../views/ForgotPass'));



let routes;

let publicRouters = [
  { path: '/', name: 'Home', component: HomePage, layout: LayoutDefault,  },
  { path: '/login', name: 'Login', component: Login, layout: null },
  { path: '/register', name: 'Register', component: Register, layout: null },
  { path: '/forgotPass', name: 'Forgot Password', component: ForgotPass, layout: null },
];
routes = {
  publicRouters,
};

export default routes;
