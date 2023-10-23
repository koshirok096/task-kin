import React, { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import styles from "./Home.module.css"
import axios from "axios";
import { refreshUser } from "../../slices/authSlice";
import Divider from "@mui/material/Divider";
import HistoryToggleOffIcon from '@mui/icons-material/HistoryToggleOff';

//DARKMODE
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../../slices/theme";
import GlobalTheme from "../../slices/globals.js";
import styled from "styled-components";

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
      const user = await axios.get(`${process.env.REACT_APP_PROD_API_URL}/auth/me`, { 
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
      const response = await fetch(`${process.env.REACT_APP_PROD_API_URL}/group/${user.group[0]}`, {
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
      const response = await fetch(`${process.env.REACT_APP_PROD_API_URL}/todo/${user.group[0]}/inprogress`, {
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
      const response = await fetch(`${process.env.REACT_APP_PROD_API_URL}/invite/${user.email}`, {
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

    if (currentHour >= 6 && currentHour < 12) {
      return "Good Morning";
    } else if (currentHour >= 12 && currentHour < 18) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };

  const today = new Date();

  // 月の名称を取得
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // 日付をフォーマット
  const formattedDate = `${today.getDate()} ${months[today.getMonth()]} ${today.getFullYear()}`;

   //DARKMODE
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
    <div className={styles.layout}>
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
    <Fragment>
    <GlobalTheme />
      {user ? (
        <>
        <div className={styles.titleandtimewrapper}>
          <div className={styles.titlewrapper}>
            <h2>{greeting}, {user?.username}!</h2>
            <h3>Family and work are the twin pillars of a balanced life.</h3>
          </div>
          <p><HistoryToggleOffIcon/>{formattedDate}</p>
          </div>
          <Divider />
          <div className={styles.groupcard}>
            <p>Your Group: <br /> {group ? group?.name : "Not joined any group yet. Create or join group!"}</p>
          </div>
          <div>
      </div>

          <div className={styles.cardwrapper}>
            <div className={styles.card}>Remain Tasks : <br /> <span> {uncompletedTodos ? uncompletedTodos.length : '0'}</span></div>
            <div className={styles.card}>Assigned Tasks : <br /> <span> {uncompletedTodos ? uncompletedTodos.filter(todo => todo.assignedTo === user._id).length : '0'}</span></div>
            <div className={styles.card}>Pending Invitation : <br /> <span> {remainingInvitation ? remainingInvitation.length : '0'}</span></div>
          </div>
        </>
      ) : (
        <p></p>
      )}

      {/* <nav style={{ marginLeft: "30vw" }}>
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
      </nav> */}
          </Fragment>
    </ThemeProvider>
    </div>

  );
};

export default Home;
