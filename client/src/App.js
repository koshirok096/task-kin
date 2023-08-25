import "./App.css";
import React, { Fragment, useState,useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./slices/theme.js";
import GlobalTheme from "./slices/globals.js";
import styled from "styled-components";
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
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    if (theme === "light") {
      window.localStorage.setItem("theme", "dark");
      setTheme("dark");
    } else {
      window.localStorage.setItem("theme", "light");
      setTheme("light");
    }
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem("theme");
    localTheme && setTheme(localTheme);
  }, []);
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

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
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
