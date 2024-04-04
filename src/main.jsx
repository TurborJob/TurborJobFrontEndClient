import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./reduxs/store.js";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./themes/index.js";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
     <ChakraProvider  theme={theme}>
      <React.Fragment>
        <App />
        <ToastContainer />
      </React.Fragment>
    </ChakraProvider>
  </Provider>
);
