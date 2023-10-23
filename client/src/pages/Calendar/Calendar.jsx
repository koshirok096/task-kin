import React, { Fragment, useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import styles from "./Calendar.module.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useSelector } from "react-redux";

//DARKMODE
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../../slices/theme";
import GlobalTheme from "../../slices/globals.js";
import styled from "styled-components";

const localizer = momentLocalizer(moment);

export default function Calendar() {
  const [events, setEvents] = useState([]);
  const user = useSelector(state => state.auth.user);
  const token = useSelector(state => state.auth.token);


  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_PROD_API_URL}/todo/${user.group[0]}`, {
        headers: {
          Authorization: `${token}`
        }
      });
      const todos = await response.json();
      
      const todoEvents = todos.map(todo => ({
        start: new Date(todo.startDate),
        end: new Date(todo.endDate),
        title: todo.title
      }));
      
      setEvents(todoEvents);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

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

    <div className={styles.main_wrapper}>
          <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
    <Fragment>
      <GlobalTheme />
      <BigCalendar
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={events}
        style={{ height: "100vh" }}
      />
          </Fragment>
    </ThemeProvider>
    </div>

  );
}
