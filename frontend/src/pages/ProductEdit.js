import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "../components/Button";
import AdminWindow from "../components/AdminWindow";
import { BACKEND_ROUTE } from "../scripts/constants";
import axios from "axios";
import MessageModal from "../components/MessageModal";
import Axios from "axios";

function ProductEdit({ toCreate, backRoute }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [units, setUnits] = useState(0);
  const [price, setPrice] = useState(0);
  const [photo, setPhoto] = useState(null);
  const [photoURL, setPhotoURL] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const { id } = useParams(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (toCreate) {
      return;
    }
    Axios.get(BACKEND_ROUTE + "/general/get_product/" + id, {
      withCredentials: true,
    }).then((res) => {
      if (!res.data.error) {
        const product = res.data.result;
        setName(product.name);
        setDescription(product.description);
        setPrice(product.price);
        setUnits(product.units);
        setPhotoURL(product.photo);
      }
    });
  }, [id, toCreate]);

  const registerProduct = (event) => {
    event.preventDefault();
    axios({
      method: "post",
      data: {
        name: name,
        description: description,
        units: units,
        price: price,
        photo: photo,
      },
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
      url: BACKEND_ROUTE + "/admin/register_product",
    }).then((res) => {
      handleResponse(res.data);
    });
  };

  const updateProduct = (event) => {
    event.preventDefault();
    axios({
      method: "post",
      data: {
        productId: id,
        name: name,
        description: description,
        units: units,
        price: price,
        photo: photo,
      },
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
      url: BACKEND_ROUTE + "/admin/update_product",
    }).then((res) => {
      handleResponse(res.data);
    });
  };

  const deleteProduct = () => {
    axios({
      method: "post",
      withCredentials: true,
      url: BACKEND_ROUTE + "/admin/delete_product/" + id,
    }).then((res) => {
      setDeleting(true);
      handleResponse(res.data);
    });
  };

  const handleResponse = (response) => {
    if (response.error) {
      setError(true);
    } else {
      setError(false);
    }
    setModalMessage(response.message);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    if (!error && !deleting) {
      window.location.reload();
    }
    if (!error && deleting) {
      window.location.href = "/admin_products";
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
      <div className="row mt-4 mb-4">
        <div
          className="mt-4 col-md-6 d-flex flex-column"
          style={{ maxHeight: "487px" }}
        >
          {toCreate ? (
            <img
              src={
                photo
                  ? URL.createObjectURL(photo)
                  : "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/310px-Placeholder_view_vector.svg.png"
              }
              className="img-fluid rounded"
              style={{
                height: "100%",
                objectFit: "contain",
              }}
              alt=""
            />
          ) : (
            <img
              src={
                photo ? URL.createObjectURL(photo) : BACKEND_ROUTE + photoURL
              }
              className="img-fluid rounded"
              style={{
                height: "100%",
                objectFit: "contain",
              }}
              alt=""
            />
          )}
        </div>
        <div className="mt-4 col-md-6 d-flex flex-column">
          <h3 className="mb-4">
            {toCreate ? "Crear Producto" : "Editar Producto"}
          </h3>
          <form onSubmit={toCreate ? registerProduct : updateProduct}>
            <div className="row mb-4">
              <div className="col mb-4">
                <div>
                  <label className="form-label">Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    required
                  />
                </div>
              </div>
              <div className="col mb-4">
                <div>
                  <label className="form-label">Precio</label>
                  <input
                    type="number"
                    className="form-control"
                    min="0"
                    defaultValue="0"
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="row mb-4">
              <div className="mb-4">
                <label className="form-label">Descripción</label>
                <textarea
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  required
                />
              </div>
            </div>
            <div className="row mb-4">
              <div className="col mb-4">
                <div>
                  <label className="form-label">Unidades</label>
                  <input
                    type="number"
                    className="form-control"
                    min="0"
                    defaultValue="0"
                    onChange={(e) => setUnits(e.target.value)}
                    value={units}
                    required
                  />
                </div>
              </div>
              <div className="col mb-4">
                {toCreate ? (
                  <div>
                    <label className="form-label">Foto</label>
                    <input
                      type="file"
                      className="form-control"
                      onChange={(e) =>
                        setPhoto(e.target.files ? e.target.files[0] : null)
                      }
                      accept=".png,.jpg,.jpeg"
                      required
                    />
                  </div>
                ) : (
                  <div>
                    <label className="form-label">Foto</label>
                    <input
                      type="file"
                      onChange={(e) => {
                        setPhoto(e.target.files ? e.target.files[0] : null);
                      }}
                      className="form-control"
                      accept=".png,.jpg,.jpeg"
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="d-flex flex-row-reverse">
              <Link
                to={backRoute}
                className="btn btn-block fa-lg mb-3"
                style={{ backgroundColor: "#73E2A7", width: "150px" }}
              >
                Regresar
              </Link>
              <Button
                text={toCreate ? "Crear" : "Guardar"}
                bootstrap="btn btn-block fa-lg mb-3 me-4"
                width={150}
                color="#73E2A7"
                type="submit"
              />
              {toCreate ? (
                <></>
              ) : (
                <Button
                  text={"Eliminar"}
                  bootstrap="btn btn-danger fa-lg mb-3 me-4"
                  width={150}
                  type="button"
                  onclickHandler={deleteProduct}
                />
              )}
            </div>
          </form>
        </div>
      </div>
    </AdminWindow>
  );
}

export default ProductEdit;
