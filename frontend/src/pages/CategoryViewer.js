import React, { useState, useEffect } from "react";
import Axios from "axios";
import axios from "axios";
import { BACKEND_ROUTE } from "../scripts/constants";
import AdminWindow from "../components/AdminWindow";
import { Link } from "react-router-dom";
import MessageModal from "../components/MessageModal";
import Button from "../components/Button";

function CategoryViewer() {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    // Obtiene las categorías
    Axios.get(BACKEND_ROUTE + "/general/get_categories", {
      withCredentials: true,
    }).then((res) => {
      if (!res.data.error) {
        setCategories(res.data.result);
      }
    });
  }, []);

  const registerCategory = (event) => {
    event.preventDefault();
    axios({
      method: "post",
      data: {
        name: categoryName.trim(),
      },
      withCredentials: true,
      url: BACKEND_ROUTE + "/admin/register_category",
    }).then((res) => {
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

  const deleteCategory = (categoryId) => {
    axios({
      method: "post",
      data: {
        categoryId: categoryId,
      },
      withCredentials: true,
      url: BACKEND_ROUTE + "/admin/delete_category",
    }).then((res) => {
      handleResponse(res.data);
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
      <div className="row mt-4 mb-4">
        <h3 className="mb-4">Categorías</h3>
        <div style={{ maxHeight: "400px", overflowY: "auto" }}>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => {
                return (
                  <tr key={category._id}>
                    <td>{category.name}</td>
                    <td>
                      <Link
                        to={"/edit_category/" + category._id}
                        className="btn btn-block link-dark"
                        style={{ backgroundColor: "#73E2A7", width: "80px" }}
                      >
                        Editar
                      </Link>
                      <button
                        type="button"
                        className="btn btn-danger ms-4"
                        onClick={() => {
                          deleteCategory(category._id);
                        }}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="mt-4">
          <h5>Crear categoría</h5>
          <form onSubmit={registerCategory} className="mt-2 row">
            <div className="col-auto">
              <label>Nombre</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setCategoryName(e.target.value)}
                required
              />
            </div>
            <div className="col-auto">
              <Button
                text={"Crear"}
                bootstrap="btn mt-4"
                color="#73E2A7"
                type="submit"
              />
            </div>
          </form>
        </div>
      </div>
    </AdminWindow>
  );
}

export default CategoryViewer;
