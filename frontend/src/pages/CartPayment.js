import React, { useState, useEffect } from "react";
import ClientWindow from "../components/ClientWindow";
import Axios from "axios";
import axios from "axios";
import { BACKEND_ROUTE, DELIVERY_FEE } from "../scripts/constants";
import { provinces, getCantons, getDistricts } from "../scripts/locations";
import { Link } from "react-router-dom";
import MessageModal from "../components/MessageModal";

function CartPayment() {
  const [products, setProducts] = useState([]);
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState(0);
  const [photo, setPhoto] = useState(null);
  const [cantons, setCantons] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    // Obtenemos los productos del carrito
    Axios.get(BACKEND_ROUTE + "/client/get_cart", {
      withCredentials: true,
    }).then((res) => {
      const response = res.data;
      if (!response.error) {
        setProducts(res.data.result.products);
      }
    });
  }, []);

  useEffect(() => {
    // Calculamos el precio total del carrito
    var auxCartPrice = 0;
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      auxCartPrice += product.price * product.units;
    }

    setPrice(auxCartPrice);
  }, [products]);

  const updateCantons = (provinceId) => {
    const newCantons = getCantons(provinceId);
    setCantons(newCantons);
  };

  const updateDistricts = (cantonId) => {
    const newDistricts = getDistricts(cantonId);
    setDistricts(newDistricts);
  };

  const sendForm = (event) => {
    event.preventDefault();

    const province =
      document.getElementById("provinceSelect").options[
        document.getElementById("provinceSelect").selectedIndex
      ].text;

    const canton =
      document.getElementById("cantonSelect").options[
        document.getElementById("cantonSelect").selectedIndex
      ].text;

    const district =
      document.getElementById("districtSelect").options[
        document.getElementById("districtSelect").selectedIndex
      ].text;

    const sanitizedAddress = address.trim();

    const completeAddress =
      province + "-" + canton + "-" + district + "-" + sanitizedAddress;

    axios({
      method: "post",
      data: {
        photo: photo,
        address: completeAddress,
        totalPrice: price + DELIVERY_FEE,
      },
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
      url: BACKEND_ROUTE + "/client/confirm_order",
    }).then((res) => {
      handleResponse(res.data);
    });
  };

  const handleResponse = (response) => {
    if (response.error) {
      setError(true);
      setShowModal(true);
      setModalMessage(response.message);
    } else {
      setError(false);
    }
    setShowModal(true);
    setModalMessage(response.message);
  };

  const closeModal = () => {
    setShowModal(false);
    if (!error) {
      window.location.href = "/client_orders";
    }
  };

  return (
    <ClientWindow>
      <MessageModal
        message={modalMessage}
        is_open={showModal}
        close={closeModal}
        error={error}
      ></MessageModal>
      <div className="mt-4 mb-4">
        <div className="row">
          <div className="col md-4">
            <h3>Dirección de entrega</h3>
            <form id="paymentForm" onSubmit={sendForm}>
              <div className="row mt-4">
                <div className="col">
                  <select
                    className="form-select mt-4 mb-4"
                    onChange={(event) => updateCantons(event.target.value)}
                    required
                    id="provinceSelect"
                  >
                    <option value="">Provincia</option>
                    {provinces.map((province) => {
                      return (
                        <option key={province.id} value={province.id}>
                          {province.name}
                        </option>
                      );
                    })}
                  </select>
                  <select
                    className="form-select mt-4 mb-4"
                    required
                    id="districtSelect"
                  >
                    <option value="">Distrito</option>
                    {districts.map((district) => {
                      return (
                        <option key={district.id} value={district.id}>
                          {district.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="col">
                  <select
                    className="form-select mt-4 m4"
                    onChange={(event) => updateDistricts(event.target.value)}
                    required
                    id="cantonSelect"
                  >
                    <option value="">Cantón</option>
                    {cantons.map((canton) => {
                      return (
                        <option key={canton.id} value={canton.id}>
                          {canton.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              <div className="form-outline mb-2">
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
                <label className="form-label">Detalles</label>
              </div>

              <div>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) =>
                    setPhoto(e.target.files ? e.target.files[0] : null)
                  }
                  accept=".png,.jpg,.jpeg"
                  required
                />
                <label className="form-label">Foto</label>
              </div>
            </form>
            <p className="fs-5 mt-2 mb-4">
              Precio del carrito: ₡{Intl.NumberFormat("en-US").format(price)}
            </p>
            <p className="fs-5 mb-4">
              Precio con envío: ₡
              {Intl.NumberFormat("en-US").format(price + DELIVERY_FEE)}
            </p>

            <div className="d-flex mt-4">
              <Link to="/my_cart" className="btn btn-danger me-4">
                Cancelar
              </Link>
              <button
                type="submit"
                form="paymentForm"
                className="btn me-4"
                style={{ backgroundColor: "#73E2A7" }}
              >
                Confirmar
              </button>
            </div>
          </div>
          <div className="col md-8">
            <h4 className="mb-4">Productos</h4>
            {products.map((product) => {
              return (
                <p className="mt-4">
                  {product.name} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Unidades:{" "}
                  {product.units} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Subtotal:
                  ₡
                  {Intl.NumberFormat("en-US").format(
                    product.price * product.units
                  )}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </ClientWindow>
  );
}

export default CartPayment;
