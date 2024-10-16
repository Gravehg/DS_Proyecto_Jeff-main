import React, { useState } from "react";
import axios from "axios";
import { BACKEND_ROUTE } from "../scripts/constants";
import AdminWindow from "../components/AdminWindow";
import { Link } from "react-router-dom";
import MessageModal from "../components/MessageModal";
import Button from "../components/Button";

function CreateEvent() {
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [duration, setDuration] = useState(1);
  const [confirmOverlap, setConfirmOverlap] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const checkForOverlap = (event) => {
    event.preventDefault();
    axios({
      method: "post",
      data: {
        eventId: "",
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
        confirmRegisterWithOverlap(event);
      }
    });
  };

  const confirmRegisterWithOverlap = (event) => {
    event.preventDefault();
    axios({
      method: "post",
      data: {
        date: date,
        duration: duration,
        description: description,
        type: type,
      },
      withCredentials: true,
      url: BACKEND_ROUTE + "/admin/register_event",
    }).then((res) => {
      const response = res.data;
      setError(response.error);
      setModalMessage(response.message);
      setShowModal(true);
    });
  };

  const closeModal = () => {
    setShowModal(false);
    if (!error) {
      window.location.reload();
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
            id="registerEventForm"
            onSubmit={
              confirmOverlap ? confirmRegisterWithOverlap : checkForOverlap
            }
          >
            <div className="mb-4">
              <label className="form-label">Título</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setType(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label">Descripción</label>
              <textarea
                className="form-control"
                onChange={(e) => setDescription(e.target.value)}
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
            text={confirmOverlap ? "Confirmar" : "Guardar"}
            bootstrap="btn btn-block fa-lg mb-4 me-4"
            width={150}
            color="#73E2A7"
            type="submit"
            form="registerEventForm"
          />
          <Link
            to={"/calendar"}
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

export default CreateEvent;
