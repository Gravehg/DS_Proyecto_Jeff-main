import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ClientWindow from "../components/ClientWindow";
import { BACKEND_ROUTE } from "../scripts/constants";
import { MAX_PRODUCT_AMOUNT } from "../scripts/constants";
import Axios from "axios";
import axios from "axios";
import MessageModal from "../components/MessageModal";

function CartView() {
  const [cartPrice, setCartPrice] = useState(0);
  const [products, setProducts] = useState([]);
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

    setCartPrice(auxCartPrice);
  }, [products]);

  const increaseProduct = (productId) => {
    axios({
      method: "post",
      data: {
        productId: productId,
        units: 1,
      },
      withCredentials: true,
      url: BACKEND_ROUTE + "/client/add_product_to_cart",
    }).then((res) => {
      handleResponse(res.data);
    });
  };

  const decreaseProduct = (productId) => {
    axios({
      method: "post",
      data: {
        productId: productId,
        units: 1,
      },
      withCredentials: true,
      url: BACKEND_ROUTE + "/client/delete_product_from_cart",
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
      window.location.reload();
    }
  };

  const closeModal = () => {
    setShowModal(false);
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
        <div className="d-flex justify-content-between">
          <div className="d-flex">
            <h1 className="me-4">Carrito</h1>
            <div className="mt-2">
              <p className="fs-3">
                Precio del carrito: ₡
                {Intl.NumberFormat("en-US").format(cartPrice)}
              </p>
            </div>
          </div>
          <div className="float-end">
            {products.length > 0 ? (
              <Link
                to="/pay_cart"
                className="btn"
                style={{ backgroundColor: "#73E2A7", width: "150px" }}
              >
                Comprar carrito
              </Link>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="mt-4">
          <h2>Productos</h2>
        </div>
        <div className="mt-4">
          {products.map((product) => {
            return (
              <div className="card mb-3" key={product._id}>
                <div className="row g-0">
                  <div
                    className="col-md-4"
                    style={{
                      height: "200px",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={BACKEND_ROUTE + product.photo}
                      className="card-img"
                      style={{
                        objectFit: "scale-down",
                        width: "100%",
                        height: "100%",
                        objectPosition: "left",
                      }}
                      alt="..."
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <div>
                          <h5 className="card-title">{product.name}</h5>
                        </div>
                        <div className="float-end">
                          <div className="d-flex justify-content-between">
                            <div className="d-flex me-4">
                              <button
                                className="btn btn-outline-secondary text-center me-1"
                                style={{ width: "35px" }}
                                onClick={() => {
                                  decreaseProduct(product._id);
                                }}
                              >
                                -
                              </button>
                              <div>
                                <input
                                  className="form-control text-center"
                                  value={product.units}
                                  style={{ width: "75px" }}
                                  disabled
                                />
                              </div>
                              <button
                                className="btn btn-outline-secondary text-center ms-1"
                                style={{ width: "35px" }}
                                onClick={
                                  product.units < MAX_PRODUCT_AMOUNT
                                    ? () => {
                                        increaseProduct(product._id);
                                      }
                                    : null
                                }
                              >
                                +
                              </button>
                            </div>
                            <div style={{ width: "200px" }}>
                              <p className="card-text">
                                ₡
                                {Intl.NumberFormat("en-US").format(
                                  product.price * product.units
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="card-text">
                        ₡{Intl.NumberFormat("en-US").format(product.price)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </ClientWindow>
  );
}

export default CartView;
