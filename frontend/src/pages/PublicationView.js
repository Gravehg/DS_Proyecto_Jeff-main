import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BACKEND_ROUTE } from "../scripts/constants";
import Axios from "axios";
import ClientWindow from "../components/ClientWindow";
import { Link } from "react-router-dom";

function PublicationView() {
  const [photoURL, setPhotoURL] = useState(null);
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const { id } = useParams(null);

  useEffect(() => {
    Axios.get(BACKEND_ROUTE + "/general/get_publication/" + id, {
      withCredentials: true,
    }).then((res) => {
      if (!res.data.error) {
        const publication = res.data.result;
        console.log(publication.category);
        setDescription(publication.description);
        setCategory(publication.category.name);
        setPhotoURL(publication.photo);
        setKeywords(publication.tags.join(", "));
        setDate(publication.date);
      }
    });
  }, [id]);

  return (
    <ClientWindow>
      <div className="row mt-4 mb-4">
        <div
          className="mt-4 col-md-6 d-flex flex-column"
          style={{ maxHeight: "487px" }}
        >
          <img
            src={
              photoURL
                ? BACKEND_ROUTE + photoURL
                : "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/310px-Placeholder_view_vector.svg.png"
            }
            className="img-fluid rounded"
            style={{
              height: "100%",
              objectFit: "contain",
            }}
            alt=""
          />
        </div>
        <div className="mt-4 col-md-6 d-flex flex-column">
          <div className="row mb-4">
            <h4>Descripción</h4>
            <p style={{ textAlign: "justify" }}>{description}</p>
          </div>
          <div className="row mb-4">
            <h4>Categoría</h4>
            <p>{category}</p>
          </div>
          <div className="row mb-4">
            <h4>Fecha de publicación</h4>
            <p>{new Date(date).toLocaleDateString()}</p>
          </div>
          <div className="row mb-4">
            <h4>Palabras clave</h4>
            <p style={{ textAlign: "justify" }}>{keywords}</p>
          </div>
          <div className="row d-flex">
            <Link
              to={"/send_message_to_admin/" + id}
              className="btn btn-block me-4"
              style={{ backgroundColor: "#73E2A7", width: "150px" }}
            >
              Solicitar
            </Link>
            <Link
              to="/client_publications"
              className="btn btn-block me-4"
              style={{ backgroundColor: "#73E2A7", width: "150px" }}
            >
              Regresar
            </Link>
          </div>
        </div>
      </div>
    </ClientWindow>
  );
}

export default PublicationView;
