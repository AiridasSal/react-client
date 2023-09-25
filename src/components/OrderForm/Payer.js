import React, { useState } from "react";

const InformationForInvoice = ({ onChange }) => {
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [vat, setVat] = useState("");
    const [address, setAddress] = useState("");
    const [postCode, setPostcode] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [currency, setCurrency] = useState("");

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
            currency: event.target.value,
        });
    };
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };
    return (
        <div 
        className="payer">
            <div>
                <label htmlFor="toggleVisibility">Invoice is required:</label>
                <input
                    type="checkbox"
                    name="toggleVisibility"
                    id="toggleVisibility"
                    checked={isVisible}
                    onChange={toggleVisibility}
                />
            </div>
            {isVisible && (
                <>
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            name="name"
                            id="informationForInvoiceName"
                            value={name}
                            onChange={handleNameChange}
                            placeholder="John Doe"
                            required />
                    </div><div>
                        <label htmlFor="code">Code:</label>
                        <input
                            type="text"
                            name="code"
                            id="informationForInvoiceCode"
                            value={code}
                            onChange={handleCodeChange}
                            placeholder="123456789"
                            required />
                    </div><div>
                        <label htmlFor="vat">VAT:</label>
                        <input
                            type="text"
                            name="vat"
                            id="informationForInvoiceVat"
                            value={vat}
                            onChange={handleVatChange}
                            placeholder="LT123456789"
                            required />
                    </div><div>
                        <label htmlFor="address">Address:</label>
                        <input
                            type="text"
                            name="address"
                            id="informationForInvoiceAddress"
                            value={address}
                            onChange={handleAddressChange}
                            placeholder="Street, City, Country"
                            required />
                    </div><div>
                        <label htmlFor="postcode">Postcode:</label>
                        <input
                            type="text"
                            name="postcode"
                            id="informationForInvoicePostcode"
                            value={postCode}
                            onChange={handlePostCodeChange}
                            placeholder="LT-12345"
                            required />
                    </div><div>
                        <label htmlFor="city">City:</label>
                        <input
                            type="text"
                            name="city"
                            id="informationForInvoiceCity"
                            value={city}
                            onChange={handleCityChange}
                            placeholder="Vilnius"
                            required />
                    </div><div>
                        <label htmlFor="country">Country:</label>
                        <input
                            type="text"
                            name="country"
                            id="informationForInvoiceCountry"
                            value={country}
                            onChange={handleCountryChange}
                            placeholder="Lithuania"
                            required />
                    </div><div>
                        <label htmlFor="currency">Currency:</label>
                        <select
                            name="currency"
                            id="payer"
                            value={currency}
                            onChange={handleCurrencyChange}
                            required
                        >
                            <option value="">Select a payer:</option>
                            <option value="USD">Sender</option>
                            <option value="EUR">Receiver</option>
                            <option value="GBP">Orderer</option>
                        </select>
                    </div><div>
                        <label htmlFor="currency">Select a payment method</label>
                        <select
                            name="currency"
                            id="payerMethod"
                            value={currency}
                            onChange={handleCurrencyChange}
                            required
                        >
                            <option value="">Select a payment method</option>
                            <option value="USD">Cash</option>
                            <option value="EUR">Bank card</option>
                            <option value="GBP">Bank transfer</option>
                            <option value="GBP">Instant payment</option>
                        </select>
                    </div>
                    
                </>
            )}
        </div>
    );
}

export default InformationForInvoice;