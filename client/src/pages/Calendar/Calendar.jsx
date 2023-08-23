import React, { useState, useEffect } from 'react';
import Navbar from "../../components/Navbar/Navbar";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import styles from "./Calendar.module.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useSelector } from "react-redux";

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
      const response = await fetch(`http://localhost:3001/todo/${user.group[0]}`, {
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

  return (
    <div className={styles.main_wrapper}>
      <Navbar />

      <BigCalendar
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={events}
        style={{ height: "100vh" }}
      />
    </div>
  );
}
