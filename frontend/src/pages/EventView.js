import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_ROUTE } from "../scripts/constants";
import AdminWindow from "../components/AdminWindow";
import { Link } from "react-router-dom";

function EventView() {
  const [event, setEvent] = useState(null);
  const { id } = useParams(null);

  useEffect(() => {
    axios({
      method: "get",
      withCredentials: true,
      url: BACKEND_ROUTE + "/admin/get_event/" + id,
    }).then((res) => {
      const response = res.data;
      setEvent(response.result);
    });
  }, [id]);

  return (
    <AdminWindow>
      <div className="mt-4 mb-4">
        {event ? (
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{event.type}</h5>
              <p className="card-text">{event.description}</p>
              <p className="card-text">
                Fecha: {new Date(event.date).toLocaleDateString()} a las{" "}
                {new Date(event.date).toLocaleTimeString()}
              </p>
              <p className="card-text">Duración: {event.duration} horas</p>
              {event.customFields && event.customFields.length > 0 ? (
                <>
                  <p className="card-text fw-bolder">
                    Información adicional: <br />
                  </p>
                  {event.customFields.map((field) => {
                    return (
                      <p style={{ whiteSpace: "pre-line" }}>
                        {field.name}: <br /> {field.value}
                      </p>
                    );
                  })}
                </>
              ) : (
                <></>
              )}
              <Link
                to={"/edit_event/" + id}
                className="btn btn-block"
                style={{ backgroundColor: "#73E2A7", width: "150px" }}
              >
                Editar
              </Link>
            </div>
          </div>
        ) : (
          <></>
        )}
        <div className="d-flex justify-content-md-end">
          <Link
            to={"/calendar"}
            className="btn btn-block fa-lg mb-4 mt-4"
            style={{ backgroundColor: "#73E2A7", width: "150px" }}
          >
            Regresar
          </Link>
        </div>
      </div>
    </AdminWindow>
  );
}

export default EventView;
