import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OrderCard from "../components/OrderCard";
import ClientWindow from "../components/ClientWindow";
import Axios from "axios";
import { BACKEND_ROUTE } from "../scripts/constants";
import { getState } from "../scripts/orderStates";

function ClientOrderView() {
  const [order, setOrder] = useState(null);
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

  return (
    <ClientWindow>
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
              ></OrderCard>
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
    </ClientWindow>
  );
}

export default ClientOrderView;
