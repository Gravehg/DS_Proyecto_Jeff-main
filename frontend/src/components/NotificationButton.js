import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BACKEND_ROUTE } from "../scripts/constants";

function NotificationButton() {
  const [unreadNotifications, setUnreadNotifications] = useState(0);

  useEffect(() => {
    const sendRequest = () => {
      axios({
        method: "get",
        withCredentials: true,
        url: BACKEND_ROUTE + "/general/get_unread_amount",
      }).then((res) => {
        const response = res.data;
        setUnreadNotifications(response.result);
      });
    };

    sendRequest();

    // Configuración del intervalo de peticiones
    const interval = setInterval(() => {
      sendRequest();
    }, 5000);

    // Función de limpieza
    return () => clearInterval(interval);
  }, []);

  return (
    <Link to="/notifications" className="nav-link text-white">
      Notificaciones{" "}
      {unreadNotifications > 0 ? (
        <span className="badge bg-danger">{unreadNotifications}</span>
      ) : (
        <></>
      )}
    </Link>
  );
}

export default NotificationButton;
