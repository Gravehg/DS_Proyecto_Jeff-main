import React, { useState, useEffect } from "react";
import { BACKEND_ROUTE } from "../scripts/constants";
import ClientWindow from "../components/ClientWindow";
import OrderCard from "../components/OrderCard";
import Axios from "axios";
import { getState } from "../scripts/orderStates";

function ClientOrderViewer() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Obtenemos los pedidos del client
    Axios.get(BACKEND_ROUTE + "/client/get_orders", {
      withCredentials: true,
    }).then((res) => {
      const response = res.data;
      if (!response.error) {
        setOrders(response.result);
      }
    });
  }, []);

  return (
    <ClientWindow>
      <div className="mt-4 mb-4">
        {orders.map((order) => {
          return (
            <OrderCard
              key={order._id}
              orderId={order._id}
              state={getState(order.state)}
              orderDate={new Date(order.orderDate).toLocaleDateString()}
              deliveryDate={
                order.deliveryDate
                  ? new Date(order.deliveryDate).toLocaleDateString()
                  : "No entregado"
              }
              direction={order.address}
              totalPrice={order.price}
              toLink={"/client_order_detail/" + order._id}
            ></OrderCard>
          );
        })}
      </div>
    </ClientWindow>
  );
}

export default ClientOrderViewer;
