import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../../components/Navbar/Navbar";
// import { logout } from '../../slices/authSlice'; // import logout action
import { Link } from "react-router-dom";
import styles from "./Home.module.css"

const Home = () => {
  const user = useSelector(state => state.auth.user);
  const token = useSelector(state => state.auth.token);
  // const dispatch = useDispatch();

  useEffect(() => {
    console.log("User login status:", user);
  }, [user]);

  // const handleLogout = () => {
  //   dispatch(logout()); // Dispatch logout action
  // };

  return (
    <div className={styles.layout}>
      <Navbar />

      <div>Home</div>
      <h2>Welcome {user?.fullName} to the Top Page</h2>
      
      {/* 他のコンテンツや情報を表示 */}

      <nav style={{ marginLeft: "30vw" }}>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login Page</Link>
          </li>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
