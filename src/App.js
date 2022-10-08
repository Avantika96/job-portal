import { BrowserRouter, Route, Routes } from "react-router-dom";
import s from "./App.module.scss";
import { Header } from "./components";
import Jobs from "./views/Jobs/Jobs";
import Home from "./views/Home/Home";
import JobDetail from "./views/JobDetail/JobDetail";
import Login from "./views/Login/Login";
import { AppProvider } from "./AppContext";

function App() {
  const currentPage = window.location.pathname;
  const isLoginPage = currentPage === "/login" || currentPage === "signup";
  return (
    <AppProvider>
      <BrowserRouter>
        {!isLoginPage && <Header />}
        <main className={!isLoginPage && s.container}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/job-detail/:jobId" element={<JobDetail />} />
            <Route
              path="/user-profile/:userId"
              element={<h1>User Profile Page</h1>}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Login isSignup={true} />} />
          </Routes>
        </main>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
