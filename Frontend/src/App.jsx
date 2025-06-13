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
import { TaskManagerPage } from "./pages/TaskManagerPage";
import { CategoryManagerPage } from "./pages/CategoryManagerPage";
import { ListTask } from "./pages/ListTaskPage";
import { NotFound } from "./pages/NotFoundPage";

const App = () => {
  return (
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<DashboardPage />}/>
              <Route path="/profile" element={<ProfilePage />}/>
              <Route path="/taskmanager" element={<TaskManagerPage />}/>
              <Route path="/categorymanager" element={<CategoryManagerPage />}/>
              <Route path="/list/task/:date" element={<ListTask />}/>
            </Route>
            <Route element={<ProtectedLogRoute />}>
              <Route path="/signup" element={<SignUpPage />}/>
              <Route path="/signin" element={<SignInPage />}/>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
  );
};

export default App;