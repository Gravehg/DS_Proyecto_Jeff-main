import React, { useState, useEffect } from "react";
import { BACKEND_ROUTE } from "../scripts/constants";
import AdminWindow from "../components/AdminWindow";
import OrderCard from "../components/OrderCard";
import Axios from "axios";
import { getState } from "../scripts/orderStates";

function AdminOrderViewer() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Obtenemos los pedidos del client
    Axios.get(BACKEND_ROUTE + "/admin/get_ordes", {
      withCredentials: true,
    }).then((res) => {
      const response = res.data;
      if (!response.error) {
        setOrders(response.result);
      }
    });
  }, []);

  return (
    <AdminWindow>
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
              toLink={"/admin_order_detail/" + order._id}
              name={order.userInfo.name}
              email={order.userInfo.email}
              phone={order.userInfo.phone}
            ></OrderCard>
          );
        })}
      </div>
    </AdminWindow>
  );
}

export default AdminOrderViewer;
