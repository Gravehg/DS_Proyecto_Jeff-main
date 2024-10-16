import React, { useState, useContext } from "react";
import { BACKEND_ROUTE } from "../scripts/constants";
import MessageModal from "../components/MessageModal";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import axios from "axios";
import { appContext } from "../context";
import { sanitizeName, sanitizeEmail } from "../scripts/data_sanitizer";

function Profile({ user }) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [userId] = useState(user.id);
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const { updateUserSessionData } = useContext(appContext);

  const updateUser = (name, email, phone, password) => {
    axios({
      method: "post",
      data: {
        userId: userId,
        name: name,
        email: email,
        phone: phone,
        password: password,
      },
      withCredentials: true,
      url: BACKEND_ROUTE + "/general/update_user",
    }).then((res) => {
      handleResponse(res.data);
    });
  };

  const validateDataFormat = () => {
    // Validamos que las contraseñas sean igualdes
    if (password1 === password2) {
      return true;
    }
    return false;
  };

  const handleResponse = (response) => {
    if (response.error) {
      handleError(response.message);
    } else {
      handleSuccess(response.message);
    }
  };

  const handleError = (message) => {
    setModalMessage(message);
    setShowModal(true);
    setError(true);
  };

  const handleSuccess = (message) => {
    updateUserSessionData();
    setModalMessage(message);
    setShowModal(true);
    setError(false);
  };

  const sendForm = (event) => {
    event.preventDefault();
    const valid = validateDataFormat();
    if (!valid) {
      handleError("Las contraseñas deben ser iguales");
      return;
    }

    // Limpiamos los datos
    let sanitizedName = sanitizeName(name);
    let sanitizedEmail = sanitizeEmail(email);

    // Mandamos a registrar el usuario
    updateUser(sanitizedName, sanitizedEmail, phone, password1);
  };

  const closeModal = () => {
    setShowModal(false);
    if (!error) {
      window.location.reload();
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
            <form onSubmit={sendForm}>
              <div className="row g-0">
                <div className="col-lg-6">
                  <div className="card-body p-md-5 mx-md-4">
                    <div>
                      <h1 className="mt-1 mb-5 pb-1">Mi Perfil</h1>
                    </div>
                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        id="name"
                        className="form-control"
                        placeholder=""
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        required
                      />
                      <label className="form-label">Nombre completo</label>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="email"
                        id="email"
                        className="form-control"
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email@gmail.com"
                        value={email}
                        required
                      />
                      <label className="form-label">Correo electrónico</label>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        id="phone"
                        className="form-control"
                        onInput={(e) =>
                          (e.target.value = e.target.value
                            .replace(/[^0-9.]/g, "")
                            .replace(/(\..*)\./g, "$1"))
                        }
                        pattern=".{8,8}"
                        maxlength="8"
                        placeholder="00000000"
                        onChange={(e) => setPhone(e.target.value)}
                        value={phone}
                        required
                      />
                      <label className="form-label">Teléfono</label>
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
                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        id="signup_password"
                        className="form-control"
                        onChange={(e) => setPassword1(e.target.value)}
                      />
                      <label className="form-label">Contraseña</label>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        id="signup_confirm_password"
                        className="form-control"
                        onChange={(e) => setPassword2(e.target.value)}
                      />
                      <label className="form-label">Confirmar contraseña</label>
                    </div>
                    <Button
                      text="Actualizar"
                      bootstrap="btn btn-block fa-lg mb-3 link-dark"
                      color="#73E2A7"
                      type="submit"
                      width="150px"
                    ></Button>
                    <div>
                      <Link to="/" className="link-light">
                        Menú principal
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
