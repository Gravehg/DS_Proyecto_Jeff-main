import React, { useContext } from "react";
import ClientWindow from "../components/ClientWindow";
import { Link } from "react-router-dom";
import photo1 from "../photos/ClientMenu_img_1.png";
import photo2 from "../photos/ClientMenu_img_2.jpg";
import { appContext } from "../context";

function ClientMenu() {
  const ctx = useContext(appContext).user;

  return (
    <ClientWindow>
      <div className="row mt-4 mb-3">
        <div className="ms-4 col d-flex flex-column">
          <div className="ms-5 col d-flex flex-column">
            <h3 className="ms-5">Bienvenid@, {ctx.name} al Sistema Duende</h3>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col d-flex flex-column align-items-center">
          <div className="d-flex flex-column">
            <Link to="/client_publications" className="link-dark fs-4 mb-4">
              <b>Ver publicaciones</b>
            </Link>
            <img
              src={photo1}
              alt=""
              style={{ width: "400px", height: "400px" }}
            />
            <p className="mt-3">Observa mis trabajos de maquillaje</p>
          </div>
        </div>
        <div className="col d-flex flex-column align-items-center">
          <div className="d-flex flex-column">
            <Link to="/client_products" className="link-dark fs-4 mb-4">
              <b>Ver productos</b>
            </Link>
            <img
              src={photo2}
              alt=""
              style={{ width: "400px", height: "400px" }}
            />
            <p className="mt-3">
              Adquiere productos de maquillaje y cuidado para la piel
            </p>
          </div>
        </div>
      </div>
    </ClientWindow>
  );
}

export default ClientMenu;
