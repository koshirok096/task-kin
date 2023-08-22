import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // import を追加
import { Helmet } from 'react-helmet';

import Home from './pages/Home/Home'
import Login from './pages/Login/Login';
import Todolist from './pages/Todolist/Todolist';
import Calendar from './pages/Calendar/Calendar';
import Settings from './pages/Settings/Settings';
import Signup from './pages/Signup/Signup';

function App() {
  const isLoggedIn = useSelector(state => state.auth.token !== null); // Redux ストアからログイン状態を取得

  return (
    <div> 
          <Helmet>
    <title>Task-Kin</title>
    </Helmet>

    <Router>
      <Routes>
      <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} /> {/* ログイン済みでないなら "/login" にリダイレクト */}
        <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login />} /> {/* ログイン済みなら "/" にリダイレクト */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/todolist" element={isLoggedIn ? <Todolist /> : <Navigate to="/login" />} /> {/* ログイン済みでないなら "/login" にリダイレクト */}
        <Route path="/calendar" element={isLoggedIn ? <Calendar /> : <Navigate to="/login" />} /> {/* ログイン済みでないなら "/login" にリダイレクト */}
        <Route path="/settings" element={isLoggedIn ? <Settings /> : <Navigate to="/login" />} /> {/* ログイン済みでないなら "/login" にリダイレクト */}
      </Routes>
    </Router>

    </div>
  );
}

export default App;
