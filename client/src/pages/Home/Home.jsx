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

      <div className={styles.content}>
        <h2 className={styles.title}>Welcome to the Top Page</h2>
        {user ? (
          <div className={styles.userInfo}>
            <p>Hello, {user.username}!</p>
            <p>YOUR GROUP: {user.group}</p>
            <p>Numbers of Remain Tasks: 17</p>
            <p>Numbers of Remain Invitation: 2</p>
          </div>
        ) : (
          <p className={styles.notLoggedIn}>Please log in to see your information.</p>
        )}

        <nav className={styles.navLinks}>
          <ul>
            <li>
              <Link to="/" className={styles.navLink}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/login" className={styles.navLink}>
                Login Page
              </Link>
            </li>
            <li>
              <Link to="/signup" className={styles.navLink}>
                Signup
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Home;