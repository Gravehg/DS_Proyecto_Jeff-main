import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OrderCard from "../components/OrderCard";
import AdminWindow from "../components/AdminWindow";
import Axios from "axios";
import axios from "axios";
import { BACKEND_ROUTE } from "../scripts/constants";
import { getState } from "../scripts/orderStates";
import MessageModal from "../components/MessageModal";

function AdminOrderView() {
  const [order, setOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const { id } = useParams(null);

  useEffect(() => {
    // Obtenemos el pedido del cliente
    Axios.get(BACKEND_ROUTE + "/general/get_order/" + id, {
      withCredentials: true,
    }).then((res) => {
      const response = res.data;
      if (!response.error) {
        setOrder(response.result);
      }
    });
  }, [id]);

  const cancelOrder = () => {
    axios({
      method: "post",
      data: {
        orderId: id,
        newState: 4,
      },
      withCredentials: true,
      url: BACKEND_ROUTE + "/admin/set_order_state",
    }).then((res) => {
      handleResponse(res.data);
    });
  };

  const confirmOrder = () => {
    axios({
      method: "post",
      data: {
        orderId: id,
      },
      withCredentials: true,
      url: BACKEND_ROUTE + "/admin/confirm_order",
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
      <div className="mt-4 mb-4">
        {order ? (
          <>
            <div className="mb-4">
              <OrderCard
                state={getState(order.state)}
                key={order._id}
                orderId={order._id}
                orderDate={new Date(order.orderDate).toLocaleDateString()}
                deliveryDate={
                  order.deliveryDate
                    ? new Date(order.deliveryDate).toLocaleDateString()
                    : "No entregado"
                }
                direction={order.address}
                totalPrice={order.price}
                photoLink={order.photoOfPayment}
                name={order.userInfo.name}
                email={order.userInfo.email}
                phone={order.userInfo.phone}
              ></OrderCard>
            </div>
            <div className="d-flex mt-4 mb-4">
              {order.state !== 4 ? (
                <button
                  type="button"
                  className="btn btn-danger me-4"
                  onClick={() => {
                    cancelOrder();
                  }}
                >
                  Cancelar
                </button>
              ) : (
                <></>
              )}
              {order.state !== 2 && order.state !== 4 ? (
                <button
                  type="button"
                  className="btn me-4"
                  style={{ backgroundColor: "#73E2A7" }}
                  onClick={() => {
                    confirmOrder();
                  }}
                >
                  Confirmar
                </button>
              ) : (
                <></>
              )}
            </div>
            <div>
              <div className="card">
                <h5 className="card-header">Productos</h5>
                <div className="card-body">
                  {order.lineProducts.map((product) => {
                    return (
                      <p className="mt-4" key={product.id}>
                        {product.name}{" "}
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Unidades:{" "}
                        {product.units}{" "}
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Subtotal: ₡
                        {Intl.NumberFormat("en-US").format(
                          product.price * product.units
                        )}
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </AdminWindow>
  );
}

export default AdminOrderView;
