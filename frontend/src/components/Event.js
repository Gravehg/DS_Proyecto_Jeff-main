import React from "react";
import { Link } from "react-router-dom";

function Event({ event }) {
  return (
    <Link to={event.url} style={{ textDecoration: "none", color: "inherit" }}>
      <div>{event.title}</div>
    </Link>
  );
}

export default Event;
