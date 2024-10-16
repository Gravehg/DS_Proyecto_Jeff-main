import React, { useState, useEffect } from "react";
import ClientWindow from "../components/ClientWindow";
import AdminWindow from "../components/AdminWindow";
import axios from "axios";
import { BACKEND_ROUTE } from "../scripts/constants";

function Notifications({ user }) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Marcamos como leídas las notificaciones
    axios({
      method: "post",
      withCredentials: true,
      url: BACKEND_ROUTE + "/general/mark_notifications_as_read",
    });

    // Pedimos las notificaciones
    axios({
      method: "get",
      withCredentials: true,
      url: BACKEND_ROUTE + "/general/get_notifications",
    }).then((res) => {
      const response = res.data;
      setNotifications(response.result);
    });
  }, []);

  if (user.role === 2) {
    return (
      <AdminWindow>
        <div className="mt-4 mb-4">
          {notifications.map((notification) => {
            return (
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">{notification.title}</h5>
                  {notification.content}
                </div>
              </div>
            );
          })}
        </div>
      </AdminWindow>
    );
  } else {
    return (
      <ClientWindow>
        <div className="mt-4 mb-4">
          {notifications.map((notification) => {
            return (
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">{notification.title}</h5>
                  {notification.content}
                </div>
              </div>
            );
          })}
        </div>
      </ClientWindow>
    );
  }
}

export default Notifications;
