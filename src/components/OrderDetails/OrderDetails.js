// OrderDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getToken } from "../../api";
import {useNavigate} from "react-router-dom"

const OrderDetails = () => {
  const [order, setOrder] = useState(null);
  const { id } = useParams();
    const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      // ...fetch data logic for a single order
      // Replace the URL with the appropriate endpoint to fetch a single order by ID
      const response = await fetch(`http://localhost:3005/api/order/${id}`,{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${getToken()}`,
        },
      });
      const result = await response.json();
      setOrder(result);
    };

    fetchData();
  }, [id]);

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div className="order-details">
      <h1>Order Details</h1>
      <button className="backButton" onClick={() => navigate(-1)}>
        Back
      </button>
      <div className="column">
        <h3>Orderer</h3>
        <p>Name: {order.orderer.name}</p>
        <p>Email: {order.orderer.email}</p>
        <p>Address: {order.orderer.address}</p>
        <p>Phone Number: {order.orderer.phoneNumber}</p>
        <p>Post Code: {order.orderer.postCode}</p>

        <h3>Sender</h3>
        <p>Name: {order.sender.name}</p>
        <p>Email: {order.sender.email}</p>
        <p>Address: {order.sender.address}</p>
        <p>Phone Number: {order.sender.phoneNumber}</p>
        <p>Post Code: {order.sender.postCode}</p>
      </div>
      <div className="column">
        <h3>Receiver</h3>
        <p>Name: {order.receiver.name}</p>
        <p>Email: {order.receiver.email}</p>
        <p>Address: {order.receiver.address}</p>
        <p>Phone Number: {order.receiver.phoneNumber}</p>
        <p>Post Code: {order.receiver.postCode}</p>

        <h3>Order Specs</h3>
        <p>Route: {order.orderSpecs.route}</p>
        <p>Date: {order.orderSpecs.date}</p>
        <p>Parcels: {JSON.stringify(order.orderSpecs.parcels)}</p>
      </div>
      {order.PayForGoods && (
        <>
          <h3>Pay for Goods</h3>
          <p>Title: {order.PayForGoods.title}</p>
          <p>Price: {order.PayForGoods.price}</p>
          <p>Currency: {order.PayForGoods.currency}</p>
        </>
      )}
      {order.informationForInvoice && (
        <>
          <h3>Information for Invoice</h3>
          <p>Name: {order.informationForInvoice.name}</p>
          <p>Address: {order.informationForInvoice.address}</p>
          <p>City: {order.informationForInvoice.city}</p>
          <p>Country: {order.informationForInvoice.country}</p>
          <p>Post Code: {order.informationForInvoice.postCode}</p>
          <p>Currency: {order.informationForInvoice.currency}</p>
          <p>Payer: {order.informationForInvoice.payer}</p>
          <p>Payer Method: {order.informationForInvoice.payerMethod}</p>
          <p>VAT: {order.informationForInvoice.vat}</p>
          <p>Code: {order.informationForInvoice.code}</p>
        </>
      )}
    </div>
  );
};
export default OrderDetails;