import React, { useState, useEffect } from "react";
import InformationForInvoiceSchema from "./InformationForInvoiceSchema";
import { useTranslation } from 'react-i18next';

const InformationForInvoice = ({ onChange }) => {
    const { t } = useTranslation();
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [vat, setVat] = useState("");
    const [address, setAddress] = useState("");
    const [postCode, setPostcode] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [currency, setCurrency] = useState("");
    const [payer, setPayer] = useState("");
    const [payerMethod, setPayerMethod] = useState("");
    const [errors, setErrors] = useState({});

    const handleNameChange = (event) => {
        setName(event.target.value);
        onChange({
            name: event.target.value,
            code,
            vat,
            address,
            postCode,
            city,
            country,
            payer,
            payerMethod,
            currency,
        });
    };

    const handleCodeChange = (event) => {
        setCode(event.target.value);
        onChange({
            name,
            code: event.target.value,
            vat,
            address,
            postCode,
            city,
            country,
            payer,
            payerMethod,
            currency,
        });
    };

    const handleVatChange = (event) => {
        setVat(event.target.value);
        onChange({
            name,
            code,
            vat: event.target.value,
            address,
            postCode,
            city,
            country,
            payer,
            payerMethod,
            currency,
        });
    };

    const handleAddressChange = (event) => {
        setAddress(event.target.value);
        onChange({
            name,
            code,
            vat,
            address: event.target.value,
            postCode,
            city,
            country,
            payer,
            payerMethod,
            currency,
        });
    };

    const handlePostCodeChange = (event) => {
        setPostcode(event.target.value);
        onChange({
            name,
            code,
            vat,
            address,
            postCode: event.target.value,
            city,
            country,
            payer,
            payerMethod,
            currency,
        });
    };

    const handleCityChange = (event) => {
        setCity(event.target.value);
        onChange({
            name,
            code,
            vat,
            address,
            postCode,
            city: event.target.value,
            country,
            payer,
            payerMethod,
            currency,
        });
    };

    const handleCountryChange = (event) => {
        setCountry(event.target.value);
        onChange({
            name,
            code,
            vat,
            address,
            postCode,
            city,
            country: event.target.value,
            payer,
            payerMethod,
            currency,
        });
    };

    const handleCurrencyChange = (event) => {
        setCurrency(event.target.value);
        onChange({
            name,
            code,
            vat,
            address,
            postCode,
            city,
            country,
            payer,
            payerMethod,
            currency: event.target.value,
        });
    };
    const handlepayerChange = (event) => {
        setPayer(event.target.value);
        onChange({
            name,
            code,
            vat,
            address,
            postCode,
            city,
            country,
            currency,
            payerMethod,
            payer: event.target.value,
        });
    };
    const handlepayerMethodChange = (event) => {
        setPayerMethod(event.target.value);
        onChange({
            name,
            code,
            vat,
            address,
            postCode,
            city,
            country,
            currency,
            payer,
            payerMethod: event.target.value,
        });
    };
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    useEffect(() => {
        InformationForInvoiceSchema
          .validate({ name, payer,currency,code,vat,city,country, address, postCode, payerMethod}, { abortEarly: false })
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
      }, [name, payer,currency,code,vat,city,country, address, postCode,payerMethod ]);
    return (
        <div
        className="informationForTheInvoice">
            <h2>Payment information</h2>
            <div>
                <label htmlFor="payer">{t('Payer')}</label>
                <select
                    name="payer"
                    id="payer"
                    value={payer}
                    onChange={handlepayerChange}
                    required
                >
                    <option value="" disabled >{t('Select_a_payer')}</option>
                    <option value="Sender">{t('Sender')}</option>
                    <option value="Receiver">{t('Receiver')}</option>
                    <option value="Orderer">{t('Orderer')}</option>
                </select>
                {errors.payer && <p className="error">{errors.payer}</p>}
            </div><div>
                <label htmlFor="payerMethod">{t('Payment_method')}</label>
                <select
                    name="payerMethod"
                    id="payerMethod"
                    value={payerMethod}
                    onChange={handlepayerMethodChange}
                    required
                >
                    <option value=""disabled >{t('Select_a_payment_method')}</option>
                    <option value="Cash">{t('Cash')}</option>
                    <option value="Card">{t('Bank_card')}</option>
                    <option value="Transfer">{t('Bank_transfer')}</option>
                    <option value="Instant">{t('Instant_payment')}</option>
                </select>
                {errors.payerMethod && <p className="error">{errors.payerMethod}</p>}   
            </div>
            <div>
                <label htmlFor="currency">{t('Currency')}</label>
                <select
                    name="currency"
                    id="informationForInvoiceCurrency"
                    value={currency}
                    onChange={handleCurrencyChange}
                    required
                >
                    <option value=""disabled >{t('Select_Currency')}</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                </select>
                {errors.currency && <p className="error">{errors.currency}</p>}
            </div>
            <div className="toggleVisibility">
                <label htmlFor="toggleVisibilityForInvoice">{t('Invoice_is_required')}</label>
                <input
                    type="checkbox"
                    name="toggleVisibilityForInvoice"
                    id="toggleVisibilityForInvoice"
                    checked={isVisible}
                    onChange={toggleVisibility}
                />
            </div>
            {isVisible && (
                <>
                    <div>
                        <label htmlFor="name">{t('Name')}</label>
                        <input
                            type="text"
                            name="name"
                            id="informationForInvoiceName"
                            value={name}
                            onChange={handleNameChange}
                            placeholder="John Doe"
                            required />
                        {isVisible && errors.name && <p className="error">{errors.name}</p>}
                    </div><div>
                        <label htmlFor="code">{t('Code')}</label>
                        <input
                            type="text"
                            name="code"
                            id="informationForInvoiceCode"
                            value={code}
                            onChange={handleCodeChange}
                            placeholder="123456789"
                            required />
                        {isVisible && errors.code && <p className="error">{errors.code}</p>}
                    </div><div>
                        <label htmlFor="vat">{t('VAT')}</label>
                        <input
                            type="text"
                            name="vat"
                            id="informationForInvoiceVat"
                            value={vat}
                            onChange={handleVatChange}
                            placeholder="LT123456789"
                            />
                        {isVisible && errors.vat && <p className="error">{errors.vat}</p>}
                    </div><div>
                        <label htmlFor="address">{t('Address')}</label>
                        <input
                            type="text"
                            name="address"
                            id="informationForInvoiceAddress"
                            value={address}
                            onChange={handleAddressChange}
                            placeholder="Street, City, Country"
                            required />
                            {isVisible && errors.address && <p className="error">{errors.address}</p>}
                    </div><div>
                        <label htmlFor="postcode">{t('City')}Postcode:</label>
                        <input
                            type="text"
                            name="postcode"
                            id="informationForInvoicePostcode"
                            value={postCode}
                            onChange={handlePostCodeChange}
                            placeholder="LT-12345"
                            required />
                            {isVisible && errors.postCode && <p className="error">{errors.postCode}</p>}
                    </div><div>
                        <label htmlFor="city">{t('City')}</label>
                        <input
                            type="text"
                            name="city"
                            id="informationForInvoiceCity"
                            value={city}
                            onChange={handleCityChange}
                            placeholder="Vilnius"
                            required />
                            {isVisible && errors.city && <p className="error">{errors.city}</p>}
                    </div><div>
                        <label htmlFor="country">{t('Country')}</label>
                        <input
                            type="text"
                            name="country"
                            id="informationForInvoiceCountry"
                            value={country}
                            onChange={handleCountryChange}
                            placeholder="Lithuania"
                            required={isVisible}  />
                            {isVisible && errors.country && <p className="error">{errors.country}</p>}
                    </div>
                </>
            )}
        </div>
    );
}

export default InformationForInvoice;