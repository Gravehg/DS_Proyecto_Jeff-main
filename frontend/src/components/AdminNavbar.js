import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import { BACKEND_ROUTE } from "../scripts/constants";
import Axios from "axios";
import NotificationButton from "./NotificationButton";

function AdminNavbar() {
  const logout = () => {
    Axios.get(BACKEND_ROUTE + "/logout", {
      withCredentials: true,
    }).then((res) => {
      if (res.data.error === false) {
        window.location.href = "/";
      }
    });
  };

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{ backgroundColor: "#1C7C54" }}
    >
      <div className="container">
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-3 mb-lg-3">
            <li className="nav-item me-4 mt-3">
              <Link to="/admin_menu" className="nav-link text-white">
                Menú principal
              </Link>
            </li>
            <li className="nav-item me-4 mt-3">
              <NotificationButton></NotificationButton>
            </li>
          </ul>
        </div>
        <div className="d-flex">
          <Link
            to="/profile"
            className="btn mx-2"
            style={{ backgroundColor: "#73E2A7", width: "150px" }}
          >
            Mi perfil
          </Link>
          <Button
            text="Cerrar sesión"
            bootstrap="btn mx-2"
            color="#73E2A7"
            width="150px"
            onclickHandler={logout}
          ></Button>
        </div>
      </div>
    </nav>
  );
}

export default AdminNavbar;
