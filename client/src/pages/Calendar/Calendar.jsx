import React, {useState} from 'react'
import Navbar from "../../components/Navbar/Navbar";

import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

import "./Calendar.module.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

export default function Calendar() {
  const [events, setEvents] = useState([
    {
      start: moment().toDate(),
      end: moment()
        .add(1, "days")
        .toDate(),
      title: "Some title"
    }
  ]);

  return (
        <div className="App">
         <Navbar />

        <BigCalendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={events}
          style={{ height: "100vh" }}
        />
      </div>
    // <>
    //   <Navbar />
    //   <div>Calendar</div>
    // </>
  );
}

