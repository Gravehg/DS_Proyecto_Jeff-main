import React, { useEffect, useState } from "react";
import AdminWindow from "../components/AdminWindow";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import { addHours } from "date-fns";
import Event from "../components/Event";
import axios from "axios";
import { BACKEND_ROUTE } from "../scripts/constants";
import { Link } from "react-router-dom";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

function CalendarView() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      withCredentials: true,
      url: BACKEND_ROUTE + "/admin/get_events",
    }).then((res) => {
      const response = res.data;
      const formattedEvents = formatEvents(response.result);
      setEvents(formattedEvents);
    });
  }, []);

  const formatEvents = (events) => {
    const formattedEvents = [];

    for (let i = 0; i < events.length; i++) {
      const event = events[i];

      const formattedEvent = {
        start: new Date(event.date),
        end: addHours(new Date(event.date), event.duration),
        title: event.type,
        url: "/view_event/" + event._id,
      };

      formattedEvents.push(formattedEvent);
    }

    return formattedEvents;
  };

  return (
    <AdminWindow>
      <div className="mt-4 mb-4">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          components={{
            event: Event,
          }}
        />
        <div className="d-flex justify-content-md-end">
          <Link
            to="/register_event"
            className="btn btn-block fa-lg mb-4 mt-4"
            style={{ backgroundColor: "#73E2A7", width: "150px" }}
          >
            Registrar evento
          </Link>
        </div>
      </div>
    </AdminWindow>
  );
}

export default CalendarView;
