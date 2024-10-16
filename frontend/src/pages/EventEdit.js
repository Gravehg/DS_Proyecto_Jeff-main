import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_ROUTE } from "../scripts/constants";
import AdminWindow from "../components/AdminWindow";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import MessageModal from "../components/MessageModal";
import Button from "../components/Button";

function EventEdit() {
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [duration, setDuration] = useState(1);
  const [confirmOverlap, setConfirmOverlap] = useState(false);
  const { id } = useParams(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    axios({
      method: "get",
      withCredentials: true,
      url: BACKEND_ROUTE + "/admin/get_event/" + id,
    }).then((res) => {
      const response = res.data;
      const event = response.result;
      setType(event.type);
      setDescription(event.description);
      setDate(format(new Date(event.date), "yyyy-MM-dd'T'HH:mm"));
      setDuration(event.duration);
    });
  }, [id]);

  const checkForOverlap = (event) => {
    event.preventDefault();
    axios({
      method: "post",
      data: {
        eventId: id,
        date: date,
        duration: duration,
        description: description,
        type: type,
      },
      withCredentials: true,
      url: BACKEND_ROUTE + "/admin/event_overlaps",
    }).then((res) => {
      const response = res.data;
      setConfirmOverlap(response.result);

      // Hay traslape de eventos
      if (response.result === true) {
        setError(true);
        setModalMessage(
          "El evento actualmente se traslapa con otros eventos de la agenda. Presione confirmar si desea guardar el evento de igual forma."
        );
        setShowModal(true);
      } else {
        confirmUpdateWithOverlap(event);
      }
    });
  };

  const confirmUpdateWithOverlap = (event) => {
    event.preventDefault();
    axios({
      method: "post",
      data: {
        eventId: id,
        date: date,
        duration: duration,
        description: description,
        type: type,
      },
      withCredentials: true,
      url: BACKEND_ROUTE + "/admin/update_event",
    }).then((res) => {
      const response = res.data;
      setError(response.error);
      setModalMessage(response.message);
      setShowModal(true);
    });
  };

  const deleteEvent = () => {
    axios({
      method: "post",
      data: {
        eventId: id,
      },
      withCredentials: true,
      url: BACKEND_ROUTE + "/admin/delete_event",
    }).then((res) => {
      const response = res.data;
      setError(response.error);
      setModalMessage(response.message);
      setShowModal(true);
      setDeleting(true);
    });
  };

  const closeModal = () => {
    setShowModal(false);
    if (!error && deleting) {
      window.location.href = "/calendar";
    }
  };

  return (
    <AdminWindow>
      <MessageModal
        message={modalMessage}
        is_open={showModal}
        close={closeModal}
        error={error}
      ></MessageModal>
      <div className="mt-4 mb-4">
        <div>
          <form
            id="updateEventForm"
            onSubmit={
              confirmOverlap ? confirmUpdateWithOverlap : checkForOverlap
            }
          >
            <div className="mb-4">
              <label className="form-label">Título</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setType(e.target.value)}
                value={type}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label">Descripción</label>
              <textarea
                className="form-control"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                required
              />
            </div>

            <div className="row">
              <div className="col">
                <div className="mb-4">
                  <label className="form-label">Fecha y hora de inicio</label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    onChange={(e) => setDate(e.target.value)}
                    value={date}
                    required
                  />
                </div>
              </div>
              <div className="col">
                <div className="mb-4">
                  <label className="form-label">Duración en horas</label>
                  <input
                    type="number"
                    className="form-control"
                    onChange={(e) => setDuration(e.target.value)}
                    value={duration}
                    min={1}
                    required
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="d-flex justify-content-md-end">
          <Button
            text={"Eliminar"}
            bootstrap="btn btn-danger fa-lg mb-4 me-4"
            width={150}
            type="button"
            onclickHandler={deleteEvent}
          />
          <Button
            text={confirmOverlap ? "Confirmar" : "Guardar"}
            bootstrap="btn btn-block fa-lg mb-4 me-4"
            width={150}
            color="#73E2A7"
            type="submit"
            form="updateEventForm"
          />
          <Link
            to={"/view_event/" + id}
            className="btn btn-block fa-lg mb-4"
            style={{ backgroundColor: "#73E2A7", width: "150px" }}
          >
            Regresar
          </Link>
        </div>
      </div>
    </AdminWindow>
  );
}

export default EventEdit;
