import React, { useContext } from "react";
import AdminWindow from "../components/AdminWindow";
import { Link } from "react-router-dom";
import { appContext } from "../context";

function AdminMenu() {
  const ctx = useContext(appContext).user;

  return (
    <AdminWindow>
      <div className="row mt-4 mb-4">
        <div className="col d-flex flex-column">
          <div className="d-flex flex-column">
            <h3>Bienvenid@, {ctx ? ctx.name : "nombre"} al Sistema Duende</h3>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col d-flex flex-column">
          <div className="d-flex flex-column">
            <Link to="/admin_publications" className="link-dark fs-4 mb-4">
              <b>Administrar publicaciones</b>
            </Link>
            <Link to="/admin_products" className="link-dark fs-4 mb-4">
              <b>Administrar productos</b>
            </Link>
            <Link to="/admin_categories" className="link-dark fs-4 mb-4">
              <b>Administrar categorías</b>
            </Link>
            <Link to="/admin_orders" className="link-dark fs-4 mb-4">
              <b>Administrar pedidos</b>
            </Link>
            <Link className="link-dark fs-4 mb-4">
              <b>Ver chats</b>
            </Link>
          </div>
        </div>
        <div className="col d-flex flex-column">
          <div className="d-flex flex-column">
            <Link to="/create_publication" className="link-dark fs-4 mb-4">
              <b>Crear publicación</b>
            </Link>
            <Link to="/create_product" className="link-dark fs-4 mb-4">
              <b>Crear producto</b>
            </Link>
            <Link to="/admin_categories" className="link-dark fs-4 mb-4">
              <b>Crear categoría</b>
            </Link>
            <Link to="/calendar" className="link-dark fs-4 mb-4">
              <b>Ver agenda</b>
            </Link>
          </div>
        </div>
      </div>
    </AdminWindow>
  );
}

export default AdminMenu;
