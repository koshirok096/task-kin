import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import styles from "./Home.module.css"
import axios from "axios";
import { refreshUser } from "../../slices/authSlice";


const Home = () => {
  const user = useSelector(state => state.auth.user);
  const token = useSelector(state => state.auth.token);
  const dispatch = useDispatch();

  const [group, setGroup] = useState(null);
  const [uncompletedTodos, setUncompletedTodos] = useState(null);
  const [remainingInvitation, setRemainingInvitation] = useState(null);
  const [greeting, setGreeting] = useState('');

  const fetchUser = async () => {
    try {
      const user = await axios.get("http://localhost:3001/auth/me", { 
        headers: {
          "Authorization": token
        }
      });
      dispatch(refreshUser(user.data.user));
    } catch (error) {
      
    }
  }

  useEffect(() => {
    fetchData();
    getRemainingInvitation();
    setGreeting(getGreetingMessage()); // 初回のレンダリング時に挨拶メッセージを設定
    fetchUser();
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

  const getGroup = async () => {
    try {
      const response = await fetch(`http://localhost:3001/group/${user.group[0]}`, {
        headers: {
          Authorization: `${token}` // Here
        }
      });
      const data = await response.json();
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

      setRemainingInvitation(pendingInvitations);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const getGreetingMessage = () => {
    const currentHour = new Date().getHours();

    if (currentHour >= 0 && currentHour < 12) {
      return "Good Morning";
    } else if (currentHour >= 12 && currentHour < 18) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };

  return (
    <div className={styles.layout}>
      {user ? (
        <>
          <h2>{greeting}, {user?.username}!</h2>
          <h3 style={{color: 'gray'}}>Family and work are the twin pillars of a balanced life.</h3>
          <p>YOUR GROUP: {group ? group?.name : "No group yet"}</p>
          <p>Numbers of Remain Tasks : {uncompletedTodos ? uncompletedTodos.length : '0'}</p>
          <p>Numbers of Assigned Tasks : {uncompletedTodos ? uncompletedTodos.filter(todo => todo.assignedTo === user._id).length : 'not connected'}</p>
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
