import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routes from "./routers/";

import "./styles/style.css";
import {DefaultLayout} from "./containers/DefaultLayout/index";
import React from "react";
import Loader from "./views/Loader";
import NotFound from './views/NotFound';
import { useAppSelector } from './reduxs/hooks';

function App() {
  const { userModeView } = useAppSelector((state) => state.account);

  return (
    <>
      <Router>
        <div className="App">
          <Routes>
            {routes.publicRouters.map((route, index) => {
              let Page = route.component;
              let Layout;
              if (route?.layout) {
                Layout = route.layout;
              }
              if (!route?.layout) {
                Layout = DefaultLayout;
              }
              if (route.layout === null) {
                Layout = React.Fragment;
              }
              if(route?.role && !(route.role == userModeView)){
                Page = NotFound
              }
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <React.Suspense fallback={<Loader />}>
                      <Layout>
                        <Page />
                      </Layout>
                    </React.Suspense>
                  }
                />
              );
            })}
            <Route element={<NotFound />} path={"*"}></Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
