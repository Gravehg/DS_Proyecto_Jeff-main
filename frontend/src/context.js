import React, { createContext, useEffect, useState } from "react";
import Axios from "axios";
import { BACKEND_ROUTE } from "./scripts/constants";

export const appContext = createContext({});

export default function Context({ children }) {
  // Estado inicial del usuario en sesión
  const [user, setUser] = useState(() => {
    if (localStorage.getItem("session")) {
      return JSON.parse(localStorage.getItem("session"));
    }
    return null;
  });

  // Obtención del usuario autenticado
  useEffect(() => {
    Axios.get(BACKEND_ROUTE + "/get_user", {
      withCredentials: true,
    }).then((res) => {
      setUser(res.data);
      localStorage.setItem("session", JSON.stringify(res.data));
    });
  }, []);

  // Actualización de los datos de la sesión
  const updateUserSessionData = () => {
    Axios.get(BACKEND_ROUTE + "/get_user", { withCredentials: true }).then(
      (res) => {
        setUser(res.data);
        localStorage.removeItem("session");
        localStorage.setItem("session", JSON.stringify(res.data));
      }
    );
  };

  return (
    <appContext.Provider value={{ user, updateUserSessionData }}>
      {children}
    </appContext.Provider>
  );
}
