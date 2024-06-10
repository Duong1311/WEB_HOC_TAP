import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store";
import theme from "~/theme";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ConfirmProvider } from "material-ui-confirm";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="945480411700-p12qqi6t9n1md62dv7m39ojevm4mnek0.apps.googleusercontent.com">
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <CssVarsProvider theme={theme}>
          <ConfirmProvider>
            <CssBaseline />
            <App />
            <ToastContainer />
          </ConfirmProvider>
        </CssVarsProvider>
      </PersistGate>
    </Provider>
  </GoogleOAuthProvider>
);
