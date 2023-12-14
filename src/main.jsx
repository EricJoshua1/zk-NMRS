import React from "react";
import ReactDOM from "react-dom/client";
import { MetaMaskProvider } from "@metamask/sdk-react";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MetaMaskProvider
      debug={false}
      sdkOptions={{
        dappMetadata: {
          name: "iSafe Near-Miss Reporting System",
          url: window.location.href,
        },
      }}
    >
      <App />
    </MetaMaskProvider>
  </React.StrictMode>
);
