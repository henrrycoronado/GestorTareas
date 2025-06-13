import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout }  from "./pages/Layout";
import { ProtectedRoute } from "./pages/Protected";
import { ProtectedLogRoute } from "./pages/ProtectedLog";
import { HomePage } from "./pages/HomePage";
import { DashboardPage } from "./pages/DashboardPage";
import { ProfilePage } from "./pages/ProfilePage";
import { SignUpPage } from "./pages/SignUpPage";
import { SignInPage } from "./pages/SignInPage";

const App = () => {
  return (
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="/" element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<DashboardPage />}/>
              <Route path="/profile" element={<ProfilePage />}/>
            </Route>
            <Route path="/" element={<ProtectedLogRoute />}>
              <Route path="/signup" element={<SignUpPage />}/>
              <Route path="/signin" element={<SignInPage />}/>
            </Route>
          </Routes>
        </Layout>
      </Router>
  );
};

export default App;