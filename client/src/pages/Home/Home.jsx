import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../../components/Navbar/Navbar";
// import { logout } from '../../slices/authSlice'; // import logout action
import { Link } from "react-router-dom";
import styles from "./Home.module.css"


const Home = () => {
  const user = useSelector(state => state.auth.user);
  const token = useSelector(state => state.auth.token);
  const todo = useSelector(state => state.todo.todo);
  // const dispatch = useDispatch();

  useEffect(() => {
    console.log("User login status:", user);
    console.log("Todo status:", todo);
  }, [user, todo]);

  // const handleLogout = () => {
  //   dispatch(logout()); // Dispatch logout action
  // };

  return (
    <div className={styles.layout}>
      <Navbar />

      <div>Home</div>
      <h2>Welcome to the Top Page</h2>
      {user ? (
        <>
          <p>Hello, {user.username}!</p>
          {/* if login user already joined group, it shows group name. If not, it says "you are not joined any group yet"
          Numbers of tasks (except compeleted tasks) user has.
          Numbers of pending invitation user has. */}
        <p>YOUR GROUP: {user.group}</p>
          <p>Numbers of Remain Tasks : 17</p>
          <p>Numbers of Remain Invitation : 2</p>

          {/* <button onClick={handleLogout}>Logout</button> */}
        </>
      ) : (
        <p></p>
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
    </div>
  );
};

export default Home;
