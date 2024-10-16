import React from "react";
import { Link } from "react-router-dom";
import { BACKEND_ROUTE } from "../scripts/constants";

function ProductCard({ photoPath, name, price, toLink }) {
  return (
    <Link
      to={toLink}
      className="col-lg-3 col-md-3 mb-4"
      style={{ textDecoration: "none" }}
    >
      <div className="card">
        <div
          style={{
            height: "300px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <img
            src={BACKEND_ROUTE + photoPath}
            className="card-img-top"
            style={{ objectFit: "scale-down", width: "100%", height: "100%" }}
            alt=""
          />
        </div>
        <div className="card-body">
          <h5 className="card-title mb-3">{name}</h5>
          <p className="card-text">
            ₡{Intl.NumberFormat("en-US").format(price)}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
