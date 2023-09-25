import * as Yup from "yup";
import validationSchema from "./Validation";
import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
// import { useUser } from "../../UserContext";
import Sender from "./Sender";
import Receiver from "./Receiver";
import InformationForInvoice from "./InformationForInvoice";
import OrderSpecs from "./OrderSpecs";
import PayForGoods from "./PayForGoods";
import AgreementCheckbox from "./AgreementCheckbox";
import {getToken} from "../../api";
import { useTranslation } from 'react-i18next';



const OrderForm = () => {
  // const { user } = useUser();

  const { t } = useTranslation();

  const [orderData, setOrderData] = useState(() => ({
    // orderer: {
    //   name: user.name || "",
    //   email: user.email || "",
    //   address: user.address || "",
    //   phone: user.phoneNumber || "",
    // },
    sender: {},
    orderSpecs: {},
    receiver: {},
    informationForInvoice: {},
    PayForGoods: {},
  }));

  const handleSubmit = async (event) => {
    
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3005/api/order/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${getToken()}`,
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const responseData = await response.json();
      console.log(responseData);

      // Handle success case
    } catch (error) {
      console.error(error);
      // Handle error case
    }
  };

  const handleOrderSpecsChange = (newOrderSpecs) => {
    setOrderData({ ...orderData, orderSpecs: newOrderSpecs });
  };

  const handleSenderChange = (newSender) => {
    setOrderData({ ...orderData, sender: newSender });
  };

  const handleReceiverChange = (newReceiver) => {
    setOrderData({ ...orderData, receiver: newReceiver });
  };
  const handleInformationForInvoiceChange = (newInformationForInvoice) => {
    setOrderData({ ...orderData, informationForInvoice: newInformationForInvoice });
  };
  const handlePayForGoodsChange = (newPayForGoods) => {
    setOrderData({ ...orderData, PayForGoods: newPayForGoods });
  };
  return (
    <div
    className="wrapper"
    >
    <div
    className="delivery-form">
      <form
        onSubmit={handleSubmit}
      >
        <OrderSpecs onChange={handleOrderSpecsChange} />
        <Sender onChange={handleSenderChange} />
        <Receiver onChange={handleReceiverChange} />
        <InformationForInvoice onChange={handleInformationForInvoiceChange} />
        <PayForGoods onChange={handlePayForGoodsChange}/>
        <AgreementCheckbox/>
        <button
          type="submit"
        >
         {t('Submit_Order')} 
        </button>
      </form>
    </div>
    </div>
  );
};

export default OrderForm;
