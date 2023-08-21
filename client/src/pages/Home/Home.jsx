import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../../components/Navbar/Navbar";
// import { logout } from '../../slices/authSlice'; // import logout action
import { Link } from "react-router-dom";

const Home = () => {
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("User login status:", user);
  }, [user]);

  // const handleLogout = () => {
  //   dispatch(logout()); // Dispatch logout action
  // };

  return (
    <>
      <Navbar />

      <div>Home</div>
      <h2>Welcome to the Top Page</h2>
      {user ? (
        <>
          <p>Hello, {user.username}!</p>
          {/* <button onClick={handleLogout}>Logout</button> */}
        </>
      ) : (
        <p>Hello, Guest!</p>
      )}
      
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
    </>
  );
};

export default Home;
