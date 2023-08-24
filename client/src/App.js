import "./App.css";
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux"; // import を追加
import { Helmet } from "react-helmet";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Todolist from "./pages/Todolist/Todolist";
import Calendar from "./pages/Calendar/Calendar";
import Settings from "./pages/Settings/Settings";
import Signup from "./pages/Signup/Signup";

import Navbar from "./components/Navbar/Navbar";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.token !== null); // Redux ストアからログイン状態を取得

  return (
    <div>
      <Helmet>
        <title>Task-Kin</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon_package_v0.16/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon_package_v0.16/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon_package_v0.16/favicon-16x16.png"
        />
        <link
          rel="manifest"
          href="/favicon_package_v0.16/site.webmanifest"
        />
        <link
          rel="mask-icon"
          href="/favicon_package_v0.16/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <meta name="msapplication-TileColor" content="#603cba" />
        <meta name="theme-color" content="#ffffff"></meta>
      </Helmet>

      <Router>
      {isLoggedIn && <Navbar />}
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
          />{" "}
          {/* ログイン済みでないなら "/login" にリダイレクト */}
          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/" /> : <Login />}
          />{" "}
          {/* ログイン済みなら "/" にリダイレクト */}
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/todolist"
            element={isLoggedIn ? <Todolist /> : <Navigate to="/login" />}
          />{" "}
          {/* ログイン済みでないなら "/login" にリダイレクト */}
          <Route
            path="/calendar"
            element={isLoggedIn ? <Calendar /> : <Navigate to="/login" />}
          />{" "}
          {/* ログイン済みでないなら "/login" にリダイレクト */}
          <Route
            path="/settings"
            element={isLoggedIn ? <Settings /> : <Navigate to="/login" />}
          />{" "}
          {/* ログイン済みでないなら "/login" にリダイレクト */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
