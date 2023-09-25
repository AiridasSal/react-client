import React, { useState, useEffect } from "react";
import senderValidationSchema from "./senderValidationSchema";
import { useTranslation } from 'react-i18next';


function Receiver({ onChange }) {
  const { t } = useTranslation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [postCode, setPostcode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState({});

  const handleNameChange = (event) => {
    setName(event.target.value);
    onChange({ name: event.target.value, email, address, postCode, phoneNumber })

  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    onChange({ name, email: event.target.value, address, postCode, phoneNumber })

  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
    onChange({ name, email, address: event.target.value, postCode, phoneNumber })

  };

  const handlePostCodeChange = (event) => {
    setPostcode(event.target.value);
    onChange({ name, email, address, postCode: event.target.value, phoneNumber })

  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
    onChange({ name, email, address, postCode, phoneNumber: event.target.value })

  };
  useEffect(() => {
    senderValidationSchema
      .validate({ name, email, address, postCode, phoneNumber }, { abortEarly: false })
      .then(() => {
        setErrors({});
      })
      .catch((error) => {
        const validationErrors = error.inner.reduce((acc, curr) => {
          acc[curr.path] = curr.message;
          return acc;
        }, {});
        setErrors(validationErrors);
      });
  }, [name, email, address, postCode, phoneNumber]);

  return (
    <div
    className="receiver"
    >
      <h2>{t('Receiver_Information')}</h2>

      <div>
        <label htmlFor="name" >
        {t('Name')} 
        </label>
        <input
          type="text"
          name="name"
          id="receiverName"
          value={name}
          onChange={handleNameChange}
          placeholder="John Doe"
          required
        />
         {errors.name && <p className="error">{errors.name}</p>}
      </div>
      <div>
        <label htmlFor="email" >
        {t('Email')}
        </label>
        <input
          type="email"
          name="email"
          id="receiverEmail"
          value={email}
          onChange={handleEmailChange}
          placeholder="example@gmail.com"
          required
        />
        {errors.email && <p className="error">{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="address" >
        {t('Address')} 
        </label>
        <input
          type="text"
          name="address"
          id="receiverAdress"
          value={address}
          onChange={handleAddressChange}
          placeholder="Street, City, Country"
          required
        />
        {errors.address && <p className="error">{errors.address}</p>}
      </div>
      <div>
        <label htmlFor="postcode" >
        {t('Postcode')}
        </label>
        <input
          type="text"
          name="postcode"
          id="receiverPostcode"
          value={postCode}
          onChange={handlePostCodeChange}
          placeholder="LT-12345"
          required
        />
        {errors.postCode && <p className="error">{errors.postCode}</p>}
      </div>
      <div>
        <label htmlFor="phone" >
        {t('Phone_Number')} 
        </label>
        <input
          type="tel"
          name="phone"
          id="receiverPhone"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          placeholder="+37065742248"
          required
        />
        {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
      </div>
    </div>
  );
}

export default Receiver;
