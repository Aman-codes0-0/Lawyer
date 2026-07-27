import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/context/LanguageContext";
import { LawyerAuthProvider } from "@/context/LawyerAuthContext";
import { UserProfileProvider } from "@/context/UserProfileContext";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <LanguageProvider>
          <LawyerAuthProvider>
            <UserProfileProvider>
              <SmoothScrollProvider>
                <App />
              </SmoothScrollProvider>
            </UserProfileProvider>
          </LawyerAuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
