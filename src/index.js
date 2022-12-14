import React from "react";
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import store from "./redux/store";
import reportWebVitals from "./reportWebVitals";
// import * as ServiceWorkerRegistration from "./serviceWorkerRegistration"
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
  
    <Provider store={store}>

      <App />

    </Provider>
  </BrowserRouter>
);
reportWebVitals();
// ServiceWorkerRegistration.register()