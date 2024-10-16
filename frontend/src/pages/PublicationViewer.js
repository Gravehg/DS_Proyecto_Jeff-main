import React, { useEffect, useState } from "react";
import AdminWindow from "../components/AdminWindow";
import ClientWindow from "../components/ClientWindow";
import PublicationCard from "../components/PublicationCard";
import CategoryDropdown from "../components/CategoryDropdown";
import Axios from "axios";
import { BACKEND_ROUTE } from "../scripts/constants";

function PublicationViewer({ forUser }) {
  const [categoryId, setCategoryId] = useState(null);
  const [keywords, setKeywords] = useState("");
  const [categories, setCategories] = useState([]);
  const [publications, setPublications] = useState([]);

  const getAllPublications = () => {
    Axios.get(BACKEND_ROUTE + "/general/get_publications", {
      withCredentials: true,
    }).then((res) => {
      if (!res.data.error) {
        setPublications(res.data.result);
      }
    });
  };

  const resetFilters = () => {
    getAllPublications();
    setKeywords("");
    setCategoryId("");
  };

  useEffect(() => {
    // Obtiene las categorías
    Axios.get(BACKEND_ROUTE + "/general/get_categories", {
      withCredentials: true,
    }).then((res) => {
      if (!res.data.error) {
        setCategories(res.data.result);
      }
    });

    // Obtiene las publicaciones
    getAllPublications();
  }, []);

  useEffect(() => {
    if (categoryId === "") {
      return;
    }
    // Obtiene las publicaciones por categoría
    Axios.get(BACKEND_ROUTE + "/general/get_publications", {
      withCredentials: true,
      params: { categoryId: categoryId },
    }).then((res) => {
      if (!res.data.error) {
        setPublications(res.data.result);
      }
    });
  }, [categoryId]);

  const filterByKeywords = (event) => {
    event.preventDefault();
    // Obtiene las publicaciones por palabras clave
    Axios.get(BACKEND_ROUTE + "/general/get_publications", {
      withCredentials: true,
      params: { keywords: keywords },
    }).then((res) => {
      if (!res.data.error) {
        setPublications(res.data.result);
      }
    });
  };

  if (forUser === "admin") {
    return (
      <AdminWindow>
        <div className="d-flex mt-4 mb-4">
          <div className="col d-flex md-6">
            <button
              type="submit"
              className="btn btn-outline-secondary me-4"
              onClick={resetFilters}
            >
              Reiniciar filtros
            </button>
            <p className="me-4">Filtrar por categoría</p>
            <CategoryDropdown
              categories={categories}
              setCategoryId={setCategoryId}
              bootstrap={"rounded flex-fill form-control-sm"}
              required={true}
              selectedId={categoryId}
            ></CategoryDropdown>
          </div>
          <div className="col d-flex md-6 justify-content-center">
            <p className="mx-4">Filtrar por palabras clave</p>
            <input
              type="search"
              className="flex-fill rounded form-control-sm"
              placeholder="Palabras clave"
              onChange={(e) => setKeywords(e.target.value)}
              value={keywords}
            />
            <button
              type="submit"
              className="btn btn-outline-secondary"
              onClick={filterByKeywords}
            >
              Filtrar
            </button>
          </div>
        </div>
        <div className="row mt-4 mb-4"></div>
        <div className="row mt-4">
          {publications.map((publication) => {
            return (
              <PublicationCard
                toLink={"/edit_publication/" + publication._id}
                id={publication._id}
                description={publication.description}
                date={new Date(publication.date).toLocaleDateString()}
                category={publication.category.name}
                photoPath={publication.photo}
                key={publication._id}
              ></PublicationCard>
            );
          })}
        </div>
      </AdminWindow>
    );
  } else {
    return (
      <ClientWindow>
        <div className="d-flex mt-4 mb-4">
          <div className="col d-flex md-6">
            <button
              type="submit"
              className="btn btn-outline-secondary me-4"
              onClick={resetFilters}
            >
              Reiniciar filtros
            </button>
            <p className="me-4">Filtrar por categoría</p>
            <CategoryDropdown
              categories={categories}
              setCategoryId={setCategoryId}
              bootstrap={"rounded flex-fill form-control-sm"}
              required={true}
              selectedId={categoryId}
            ></CategoryDropdown>
          </div>
          <div className="col d-flex md-6 justify-content-center">
            <p className="mx-4">Filtrar por palabras clave</p>
            <input
              type="search"
              className="flex-fill rounded form-control-sm"
              placeholder="Palabras clave"
              onChange={(e) => setKeywords(e.target.value)}
            />
            <button
              type="submit"
              className="btn btn-outline-secondary"
              onClick={filterByKeywords}
            >
              Filtrar
            </button>
          </div>
        </div>
        <div className="row mt-4 mb-4"></div>
        <div className="row mt-4">
          {publications.map((publication) => {
            return (
              <PublicationCard
                toLink={"/view_publication/" + publication._id}
                id={publication._id}
                description={publication.description}
                date={new Date(publication.date).toLocaleDateString()}
                category={publication.category.name}
                photoPath={publication.photo}
                key={publication._id}
              ></PublicationCard>
            );
          })}
        </div>
      </ClientWindow>
    );
  }
}

export default PublicationViewer;
