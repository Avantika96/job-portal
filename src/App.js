import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import s from "./App.module.scss";
import { Header } from "./components";
import Jobs from "./views/Jobs/Jobs";
import Home from "./views/Home/Home";
import JobDetail from "./views/JobDetail/JobDetail";
import Login from "./views/Login/Login";
import { AppProvider } from "./AppContext";
import PrivateRoute from "./PrivateRoute";
import UserDetails from "./views/Forms/UserDetails";

function App() {
  const currentPage = window.location.pathname;
  const isLoginPage = currentPage === "/login" || currentPage === "/signup";
  return (
    <AppProvider>
      <BrowserRouter>
        {!isLoginPage && <Header />}
        <main className={!isLoginPage ? s.container : null}>
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="/jobs"
              element={
                <PrivateRoute>
                  <Jobs />
                </PrivateRoute>
              }
            />
            <Route
              path="/job-detail/:jobId"
              element={
                <PrivateRoute>
                  <JobDetail />
                </PrivateRoute>
              }
            />
            <Route
              path="/user-profile/:userId"
              element={
                <PrivateRoute>
                  <UserDetails isDetailPage />
                </PrivateRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Login isSignup={true} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
