import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../../components/Navbar/Navbar";
// import { logout } from '../../slices/authSlice'; // import logout action
import { Link } from "react-router-dom";
import styles from "./Home.module.css"


const Home = () => {
  const user = useSelector(state => state.auth.user);
  // const todos = useSelector(state => state.todo.todo);
  const token = useSelector(state => state.auth.token);
  const [group, setGroup] = useState(null);
  const [uncompletedTodos, setUncompletedTodos] = useState(null);
  // const dispatch = useDispatch();

  useEffect(() => {
    console.log("User login status:", user);
  
    const fetchData = async () => {
      try {
        if (user.group.length > 0) {
          await getGroup();
          await getUncompletedTodos(); // Call getUncompletedTodos after fetching the group
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };
    
    fetchData();
  }, [user]);
  
  const getGroup = async () => {
    try {
      const response = await fetch(`http://localhost:3001/group/${user.group[0]}`);
      const data = await response.json();
      console.log("Fetched group data:", data); // コンソールでデータを確認
      setGroup(data);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const getUncompletedTodos = async () => {
    console.log(user.group);
    try {
        const response = await fetch(`http://localhost:3001/todo/${user.group[0]}`); // URLを修正
        const todo = await response.json();
        console.log("Fetched todos:", todo);
        setUncompletedTodos(todo);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

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
        <p>YOUR GROUP: {group ? group?.name : "No group yet"}</p>
          <p>Numbers of Remain Tasks : {uncompletedTodos ? 'will be numbers here' : 'not connected'}</p>
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
