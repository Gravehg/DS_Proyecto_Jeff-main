import React, { useEffect, useState } from "react";
import AdminWindow from "../components/AdminWindow";
import ProductCard from "../components/ProductCard";
import ClientWindow from "../components/ClientWindow";
import Axios from "axios";
import { BACKEND_ROUTE } from "../scripts/constants";

function ProductViewer({ forUser }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    Axios.get(BACKEND_ROUTE + "/general/get_products", {
      withCredentials: true,
    }).then((res) => {
      if (!res.data.error) {
        setProducts(res.data.result);
      }
    });
  }, []);

  if (forUser === "admin") {
    return (
      <AdminWindow>
        <div className="row mt-4 mb-4"></div>
        <div className="row mt-4">
          {products.map((product) => {
            return (
              <ProductCard
                toLink={"/edit_product/" + product._id}
                name={product.name}
                price={product.price}
                photoPath={product.photo}
                key={product._id}
              ></ProductCard>
            );
          })}
        </div>
      </AdminWindow>
    );
  } else {
    return (
      <ClientWindow>
        <div className="row mt-4 mb-4"></div>
        <div className="row mt-4">
          {products.map((product) => {
            return (
              <ProductCard
                toLink={"/view_product/" + product._id}
                name={product.name}
                price={product.price}
                photoPath={product.photo}
                key={product._id}
              ></ProductCard>
            );
          })}
        </div>
      </ClientWindow>
    );
  }
}

export default ProductViewer;
