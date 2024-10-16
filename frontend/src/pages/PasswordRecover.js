import React, { useState, useRef } from "react";
import { BACKEND_ROUTE } from "../scripts/constants";
import MessageModal from "../components/MessageModal";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Axios from "axios";
import axios from "axios";
import { sanitizeEmail } from "../scripts/data_sanitizer";

function PasswordRecover() {
  const [email, setEmail] = useState("");
  const [recoverCode, setRecoverCode] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [correctEmail, setCorrectEmail] = useState(false);
  const [correctCode, setCorrectCode] = useState(false);
  const [successRecovery, setSuccessRecovery] = useState(false);
  const emailFormRef = useRef(null);
  const codeFormRef = useRef(null);

  const validateEmail = (event) => {
    event.preventDefault();
    const sanitizedEmail = sanitizeEmail(email);

    Axios.get(BACKEND_ROUTE + "/general/check_email_exists", {
      withCredentials: true,
      params: { email: sanitizedEmail },
    }).then((res) => {
      const response = res.data;
      if (response.error) {
        setError(true);
        setShowModal(true);
        setModalMessage(response.message);
      } else {
        setCorrectEmail(response.result);
        if (response.result === false) {
          setError(true);
          setModalMessage(
            "No existe una cuenta registrada con el correo ingresado"
          );
        } else {
          setError(false);
          setModalMessage(
            "Se ha enviado un código de recuperación al correo ingresado"
          );
        }
        setShowModal(true);
      }
    });
  };

  const validateCode = (event) => {
    event.preventDefault();
    const sanitizedEmail = sanitizeEmail(email);

    Axios.get(BACKEND_ROUTE + "/general/check_recover_code", {
      withCredentials: true,
      params: { email: sanitizedEmail, code: recoverCode },
    }).then((res) => {
      const response = res.data;
      if (response.error) {
        setError(true);
        setShowModal(true);
        setModalMessage(response.message);
      } else {
        setCorrectCode(response.result);
        if (response.result === false) {
          setError(true);
          setModalMessage("El código ingresado es incorrecto");
          setShowModal(true);
        }
      }
    });
  };

  const validatePasswords = () => {
    return password1 === password2;
  };

  const updatePassword = (event) => {
    event.preventDefault();

    if (!validatePasswords()) {
      setError(true);
      setModalMessage("Las contraseñas deben ser iguales");
      setShowModal(true);
      return;
    }
    const sanitizedEmail = sanitizeEmail(email);
    axios({
      method: "post",
      data: {
        email: sanitizedEmail,
        password: password1,
      },
      withCredentials: true,
      url: BACKEND_ROUTE + "/general/update_user_password",
    }).then((res) => {
      const response = res.data;
      if (response.error) {
        setError(true);
        setShowModal(true);
        setModalMessage(response.message);
      } else {
        setError(false);
        setModalMessage("Contraseña actualizada exitosamente");
        setShowModal(true);
        setSuccessRecovery(true);
      }
    });
  };

  const steps = () => {
    if (!correctEmail) {
      emailFormRef.current.requestSubmit();
    } else if (!correctCode) {
      codeFormRef.current.requestSubmit();
    }
  };

  const closeModal = () => {
    setShowModal(false);
    if (successRecovery) {
      window.location.href = "/";
    }
  };

  return (
    <div className="container py-5 h-100">
      <MessageModal
        message={modalMessage}
        is_open={showModal}
        close={closeModal}
        error={error}
      ></MessageModal>
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-xl-10">
          <div className="card rounded-3 text-black">
            <div className="row g-0">
              <div className="col-lg-6">
                <div className="card-body p-md-5 mx-md-4">
                  <div className="text-center">
                    <h1 className="mt-1 mb-5 pb-1">Sistema Duende</h1>
                  </div>
                  <h5 className="mt-1 mb-3 pb-1">Recuperar contraseña</h5>
                  <form ref={emailFormRef} onSubmit={validateEmail}>
                    <div className="form-outline mb-4">
                      <input
                        type="email"
                        id="email"
                        className="form-control"
                        placeholder="email@gmail.com"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={correctEmail}
                      />
                      <label className="form-label">Correo electrónico</label>
                    </div>
                  </form>
                  <div>
                    <p className="fw-light" style={{ textAlign: "justify" }}>
                      Ingrese el correo electrónico de la cuenta que desea
                      recuperar la contraseña. A este correo se le enviará un
                      código de uso único con el que podrá cambiar la contraseña
                    </p>
                  </div>
                  <form ref={codeFormRef} onSubmit={validateCode}>
                    <div
                      style={{ visibility: !correctEmail ? "hidden" : "" }}
                      className="form-outline mt-4 mb-4"
                    >
                      <input
                        type="text"
                        id="name"
                        className="form-control"
                        placeholder=""
                        onChange={(e) => setRecoverCode(e.target.value)}
                        required
                        disabled={correctCode}
                      />
                      <label className="form-label">
                        Código de recuperación
                      </label>
                    </div>
                  </form>
                  <div className="mt-4" hidden={correctCode}>
                    <Button
                      text="Siguiente"
                      bootstrap="btn btn-block fa-lg mb-3 link-dark"
                      color="#73E2A7"
                      type="submit"
                      width="200px"
                      onclickHandler={steps}
                    ></Button>
                  </div>
                  <div>
                    <Link to="/">Iniciar sesión</Link>
                  </div>
                </div>
              </div>
              <div
                className="text-white col-lg-6"
                style={{ backgroundColor: "#1C7C54" }}
              >
                <div className="card-body p-md-5 mx-md-4">
                  <div className="text-center">
                    <h1 className="mt-1 mb-5 pb-1">&nbsp;</h1>
                  </div>
                  <h5 className="mt-1 mb-3 pb-1">&nbsp;</h5>
                  <form onSubmit={updatePassword}>
                    <div
                      style={{ visibility: !correctCode ? "hidden" : "" }}
                      className="form-outline mb-4"
                    >
                      <input
                        type="password"
                        id="recover_password"
                        className="form-control"
                        onChange={(e) => setPassword1(e.target.value)}
                        required
                      />
                      <label className="form-label">Contraseña</label>
                    </div>

                    <div
                      style={{ visibility: !correctCode ? "hidden" : "" }}
                      className="form-outline mb-4"
                    >
                      <input
                        type="password"
                        id="recover_confirm_password"
                        className="form-control"
                        onChange={(e) => setPassword2(e.target.value)}
                        required
                      />
                      <label className="form-label">Confirmar contraseña</label>
                    </div>
                    <div style={{ visibility: !correctCode ? "hidden" : "" }}>
                      <Button
                        text="Cambiar contraseña"
                        bootstrap="btn btn-block fa-lg mb-3 link-dark"
                        color="#73E2A7"
                        type="submit"
                        width="200px"
                      ></Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PasswordRecover;
