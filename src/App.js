import { BrowserRouter, Route, Routes } from "react-router-dom";
import s from "./App.module.scss";
import { Header } from "./components";
import Jobs from "./views/jobs";
import Home from "./views/home";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className={s.container}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/job-detail" element={<h1>Job Detail Page</h1>} />
          <Route path="/user-profile" element={<h1>User Profile Page</h1>} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
