import React from "react";
import { Link } from "react-router-dom";
import { BACKEND_ROUTE } from "../scripts/constants";

function OrderCard({
  orderId,
  name,
  orderDate,
  deliveryDate,
  totalPrice,
  direction,
  state,
  toLink,
  email,
  phone,
  photoLink,
}) {
  const openImageWindow = () => {
    window.open(BACKEND_ROUTE + photoLink);
  };

  return (
    <div className="card mb-4">
      <h5 className="card-header">
        <div className="row">
          <div className="col">Pedido: {orderId}</div>
          <div className="col">{state ? "Estado: " + state : ""}</div>
        </div>
      </h5>
      <div className="row g-0">
        <div className={"col-md-12"}>
          <div className="card-body">
            <div className="row mb-3 g-0">
              <div className="col">
                <p className="card-text">Fecha de orden: {orderDate}</p>
                <p className="card-text">Fecha de entrega: {deliveryDate}</p>
                <p className="card-text">
                  Precio con envío: ₡
                  {Intl.NumberFormat("en-US").format(totalPrice)}
                </p>
              </div>
              <div className="col">
                <p className="card-text">{name ? "Nombre: " + name : ""}</p>
                <p className="card-text">
                  {email ? "Correo electrónico: " + email : ""}
                </p>
                <p className="card-text">{phone ? "Teléfono: " + phone : ""}</p>
              </div>
            </div>

            <p className="card-text">Dirección de entrega: {direction}</p>
            {!photoLink ? (
              <div className="d-flex justify-content-end">
                <Link
                  to={toLink}
                  className="btn btn-outline-secondary"
                  style={{ width: "150px" }}
                >
                  Ver detalles
                </Link>
              </div>
            ) : (
              <div className="d-flex justify-content-end">
                <button
                  onClick={() => openImageWindow()}
                  className="btn btn-outline-secondary"
                  style={{ width: "150px" }}
                >
                  Ver comprobante
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderCard;
