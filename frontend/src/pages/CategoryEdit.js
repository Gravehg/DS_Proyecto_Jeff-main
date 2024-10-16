import React, { useState, useEffect } from "react";
import { BACKEND_ROUTE } from "../scripts/constants";
import { useParams } from "react-router-dom";
import axios from "axios";
import Axios from "axios";
import AdminWindow from "../components/AdminWindow";
import MessageModal from "../components/MessageModal";
import Button from "../components/Button";
import { Link } from "react-router-dom";

function CategoryEdit() {
  const [categoryName, setCategoryName] = useState("");
  const [subcategoryName, setSubcategoryName] = useState("");
  const [editSubcategoryName, setEditSubcategoryName] = useState("");
  const [editSubcategoryId, setEditSubcategoryId] = useState("");
  const [showEditSubcategory, setShowEditSubcategory] = useState(false);
  const [subCategories, setSubcategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const { id } = useParams(null);

  useEffect(() => {
    // Obtiene la categoría
    Axios.get(BACKEND_ROUTE + "/general/get_category/" + id, {
      withCredentials: true,
    }).then((res) => {
      if (!res.data.error) {
        const category = res.data.result;
        setCategoryName(category.name);
      }
    });

    // Obtiene las subcategorías
    Axios.get(BACKEND_ROUTE + "/general/get_subcategories/" + id, {
      withCredentials: true,
    }).then((res) => {
      if (!res.data.error) {
        const subcategories = res.data.result;
        setSubcategories(subcategories);
      }
    });
  }, [id]);

  const updateCategory = (event) => {
    event.preventDefault();
    axios({
      method: "post",
      data: {
        name: categoryName,
        categoryId: id,
      },
      withCredentials: true,
      url: BACKEND_ROUTE + "/admin/edit_category",
    }).then((res) => {
      handleResponse(res.data);
    });
  };

  const updateSubcategory = (event) => {
    event.preventDefault();
    axios({
      method: "post",
      data: {
        name: editSubcategoryName,
        categoryId: editSubcategoryId,
      },
      withCredentials: true,
      url: BACKEND_ROUTE + "/admin/edit_category",
    }).then((res) => {
      handleResponse(res.data);
    });
  };

  const registerSubCategory = (event) => {
    event.preventDefault();
    axios({
      method: "post",
      data: {
        name: subcategoryName,
        fatherCategory: id,
      },
      withCredentials: true,
      url: BACKEND_ROUTE + "/admin/register_subcategory",
    }).then((res) => {
      handleResponse(res.data);
    });
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

  const handleSubcategoryEdit = (subcategoryId) => {
    setEditSubcategoryId(subcategoryId);
    // Obtiene la categoría
    Axios.get(BACKEND_ROUTE + "/general/get_category/" + subcategoryId, {
      withCredentials: true,
    }).then((res) => {
      if (!res.data.error) {
        const category = res.data.result;
        setEditSubcategoryName(category.name);
      }
    });
    setShowEditSubcategory(true);
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
        <div className="col">
          <h3 className="mb-4">Editar Categoría</h3>
          <div className="mb-4">
            <form onSubmit={updateCategory} className="row">
              <div className="col-auto">
                <label>Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setCategoryName(e.target.value)}
                  value={categoryName}
                  required
                />
              </div>
              <div className="col-auto">
                <Button
                  text={"Guardar"}
                  bootstrap="btn mt-4"
                  color="#73E2A7"
                  type="submit"
                  width="100px"
                />
              </div>
            </form>
          </div>
          <div className="mb-4 mt-4">
            <h5 className="mb-4">Crear Subcategoría</h5>
            <form onSubmit={registerSubCategory} className="row">
              <div className="col-auto">
                <label>Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setSubcategoryName(e.target.value)}
                  required
                />
              </div>
              <div className="col-auto">
                <Button
                  text={"Crear"}
                  bootstrap="btn mt-4"
                  color="#73E2A7"
                  type="submit"
                  width="100px"
                />
              </div>
            </form>
          </div>
          {showEditSubcategory ? (
            <div className="mb-4 mt-4">
              <h5 className="mb-4">Editar Subcategoría</h5>
              <form onSubmit={updateSubcategory} className="row">
                <div className="col-auto">
                  <label>Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setEditSubcategoryName(e.target.value)}
                    value={editSubcategoryName}
                    required
                  />
                </div>
                <div className="col-auto">
                  <Button
                    text={"Guardar"}
                    bootstrap="btn mt-4"
                    color="#73E2A7"
                    type="submit"
                    width="100px"
                  />
                </div>
              </form>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="col">
          <h3 className="mb-4">Subcategorías</h3>
          <div style={{ maxHeight: "400px", overflowY: "auto" }}>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">Nombre</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {subCategories.map((category) => {
                  return (
                    <tr key={category._id}>
                      <td>{category.name}</td>
                      <td>
                        <Button
                          text={"Editar"}
                          bootstrap="btn"
                          color="#73E2A7"
                          type="button"
                          onclickHandler={() => {
                            handleSubcategoryEdit(category._id);
                          }}
                        />
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
          <div className="mt-4 d-flex justify-content-end">
            <Link
              to={"/admin_categories"}
              className="btn btn-block fa-lg mb-3"
              style={{ backgroundColor: "#73E2A7", width: "150px" }}
            >
              Regresar
            </Link>
          </div>
        </div>
      </div>
    </AdminWindow>
  );
}

export default CategoryEdit;
