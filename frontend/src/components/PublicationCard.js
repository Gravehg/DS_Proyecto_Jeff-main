import React from "react";
import { Link } from "react-router-dom";
import { BACKEND_ROUTE } from "../scripts/constants";

function PublicationCard({ photoPath, description, date, category, toLink }) {
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
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
            alt=""
          />
        </div>
        <div className="card-body">
          <p className="text-truncate mb-3">{description}</p>
          <div className="d-flex justify-content-between">
            <p className="text-muted">{date}</p>
            <p className="ml-auto fw-bold">{category}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PublicationCard;
