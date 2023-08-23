import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import styles from "./Home.module.css"

const Home = () => {
  const user = useSelector(state => state.auth.user);
    const token = useSelector(state => state.auth.token);

  const [group, setGroup] = useState(null);
  const [uncompletedTodos, setUncompletedTodos] = useState(null);
  const [remainingInvitation, setRemainingInvitation] = useState(null);

  useEffect(() => {
    fetchData();
    getRemainingInvitation();
  }, []);

  const fetchData = async () => {
    try {
      if (user.group.length > 0) {
        await getGroup();
        await getUncompletedTodos();
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  // const getGroup = async () => {
  //   try {
  //     const response = await fetch(`http://localhost:3001/group/${user.group[0]}`);
  //     const data = await response.json();
  //     console.log("Fetched group data:", data); // コンソールでデータを確認
  //     setGroup(data);
  //   } catch (error) {
  //     console.error("An error occurred:", error);
  //   }
  // };

  const getGroup = async () => {
    console.log('your token is :', token );
    try {
      const response = await fetch(`http://localhost:3001/group/${user.group[0]}`, {
        headers: {
          Authorization: `${token}` // Here
        }
      });
      const data = await response.json();
      console.log("Fetched group data:", data);
      setGroup(data);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };  

  const getUncompletedTodos = async () => {
    try {
      const response = await fetch(`http://localhost:3001/todo/${user.group[0]}/inprogress`, {
        headers: {
          Authorization: `${token}` // ここに実際のトークンを追加
        }
      });
      const todo = await response.json();
      console.log("Fetched group todo:", todo); // コンソールでデータを確認
      setUncompletedTodos(todo);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const getRemainingInvitation = async () => {
    try {
      const response = await fetch(`http://localhost:3001/invite/${user.email}`, {
        headers: {
          Authorization: `${token}` // ここに実際のトークンを追加
        }
      });
      const invitations = await response.json();

      // フィルタリング: invitation.status が 'pending' のものだけ取得
      const pendingInvitations = invitations.filter(invitation => invitation.status === 'pending');

      console.log("Fetched group invitations:", pendingInvitations); // コンソールでデータを確認
      setRemainingInvitation(pendingInvitations);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className={styles.layout}>
      <Navbar />

      <div>Home</div>
      <h2>Welcome to the Top Page</h2>
      {user ? (
        <>
          <p>Hello, {user.username}!</p>
          <p>YOUR GROUP: {group ? group?.name : "No group yet"}</p>
          <p>Numbers of Remain Tasks : {uncompletedTodos ? uncompletedTodos.length : 'not connected'}</p>
          <p>Numbers of Assigned Tasks : {uncompletedTodos ? uncompletedTodos.filter(todo => todo.assingTo && todo.assingTo._id === user._id).length : 'not connected'}</p>
          <p>Numbers of Pending Invitation : {remainingInvitation ? remainingInvitation.length : '0'}</p>
        </>
      ) : (
        <p></p>
      )}

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
