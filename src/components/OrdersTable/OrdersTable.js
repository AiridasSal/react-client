import React, { useState, useEffect } from "react";
import { getToken } from "../../api";
import { NavLink } from "react-router-dom";

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Token ${getToken()}`);
      myHeaders.append("Content-Type", "application/json");

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      try {
        const response = await fetch(
          "http://localhost:3005/api/order/",
          requestOptions
        );
        const result = await response.json();
        setOrders(result);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="orders-table table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th data-label="Order ID">Order ID</th>
            <th data-label="Route">Route</th>
            <th data-label="Date">Date</th>
            <th data-label="Parcels">Parcels</th>
            <th data-label="Orderer">Orderer</th>
            <th data-label="Sender">Sender</th>
            <th data-label="Receiver">Receiver</th>
            <th data-label="Price">Price</th>
            <th data-label="View Details">View Details</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td data-label="Order ID">{order._id}</td>
              <td data-label="Route">{order.orderSpecs.route}</td>
              <td data-label="Date">{order.orderSpecs.date}</td>
              <td data-label="Parcels">{order.orderSpecs.parcels.join(", ")}</td>
              <td data-label="Orderer">{order.orderer.name}</td>
              <td data-label="Sender">{order.sender.name}</td>
              <td data-label="Receiver">{order.receiver.name}</td>
              <td data-label="Price">{order.estimatedPrice}</td>
              <td data-label="View Details">
                <button className="orders-table__button">
                  <NavLink to={`/order/${order._id}`}>
                    View Details
                  </NavLink>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;
