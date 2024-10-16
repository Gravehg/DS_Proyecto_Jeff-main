import React, { useState, useEffect } from "react";
import { BACKEND_ROUTE } from "../scripts/constants";
import MessageModal from "../components/MessageModal";
import { Link } from "react-router-dom";
import AdminWindow from "../components/AdminWindow";
import Button from "../components/Button";
import { useParams } from "react-router-dom";
import CategoryDropdown from "../components/CategoryDropdown";
import axios from "axios";
import Axios from "axios";

function PublicationEdit({ toCreate, backRoute }) {
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [photo, setPhoto] = useState(null);
  const [photoURL, setPhotoURL] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const { id } = useParams(null);
  const [deleting, setDeleting] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(null);

  useEffect(() => {
    // Obtiene las categorías
    Axios.get(BACKEND_ROUTE + "/general/get_categories", {
      withCredentials: true,
    }).then((res) => {
      if (!res.data.error) {
        setCategories(res.data.result);
      }
    }, []);
  }, []);

  useEffect(() => {
    if (toCreate) {
      return;
    }

    // Obtiene la publicación, si es para editar
    Axios.get(BACKEND_ROUTE + "/general/get_publication/" + id, {
      withCredentials: true,
    }).then((res) => {
      if (!res.data.error) {
        const publication = res.data.result;
        console.log(publication);
        setDescription(publication.description);
        setPhotoURL(publication.photo);
        setKeywords(publication.tags.join(", "));
        setCategoryId(publication.categoryId);
      }
    });
  }, [id, toCreate]);

  const registerPublication = (event) => {
    event.preventDefault();
    axios({
      method: "post",
      data: {
        description: description,
        keywords: keywords,
        categoryId: categoryId,
        photo: photo,
      },
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
      url: BACKEND_ROUTE + "/admin/register_publication",
    }).then((res) => {
      handleResponse(res.data);
    });
  };

  const updatePublication = (event) => {
    event.preventDefault();
    axios({
      method: "post",
      data: {
        publicationId: id,
        description: description,
        tags: keywords,
        categoryId: categoryId,
        photo: photo,
      },
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
      url: BACKEND_ROUTE + "/admin/update_publication",
    }).then((res) => {
      handleResponse(res.data);
    });
  };

  const deletePublication = () => {
    axios({
      method: "post",
      withCredentials: true,
      url: BACKEND_ROUTE + "/admin/delete_publication/" + id,
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
      window.location.href = "/admin_publications";
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
            {toCreate ? "Crear Publicación" : "Editar Publicación"}
          </h3>
          <form onSubmit={toCreate ? registerPublication : updatePublication}>
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
              <div className="mb-4">
                <label className="form-label">Palabras clave</label>
                <textarea
                  className="form-control"
                  onChange={(e) => setKeywords(e.target.value)}
                  value={keywords}
                  required
                />
              </div>
            </div>
            <div className="row mb-4">
              <div className="col mb-4">
                <div>
                  <label className="form-label">Categoría</label>
                  <CategoryDropdown
                    categories={categories}
                    setCategoryId={setCategoryId}
                    bootstrap={"form-select"}
                    required={true}
                    selectedId={categoryId}
                  ></CategoryDropdown>
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
                  onclickHandler={deletePublication}
                />
              )}
            </div>
          </form>
        </div>
      </div>
    </AdminWindow>
  );
}

export default PublicationEdit;
