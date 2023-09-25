import React, { useState, useEffect } from "react";
import PayforGoodsSchema from "./payForGoodsSchema";
import { useTranslation } from 'react-i18next';


const InformationForInvoice = ({ onChange }) => {
    const { t } = useTranslation();
    const [title, setTitle] = useState("");
    const [currency, setCurrency] = useState("");
    const [price, setPrice] = useState("");
    const [errors, setErrors] = useState({});

    const handletitleChange = (event) => {
        setTitle(event.target.value);
        onChange({
            title: event.target.value,
            price,
            currency,
        });
    };
    const handleCurrencyChange = (event) => {
        setCurrency(event.target.value);
        onChange({
            title,
            price,
            currency: event.target.value,
        });
    };
    const handlePriceChange = (event) => {
        setPrice(event.target.value);
        onChange({
            title,
            price: event.target.value,
            currency
        });
    };
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    useEffect(() => {
        PayforGoodsSchema
          .validate({ title, currency, price }, { abortEarly: false })
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
      }, [title, currency, price]);
    return (
        <div
            className="payForGoods"
        >
            <h2>{t('Additional_services')}</h2>
            <div className="toggleVisibility">
                <label htmlFor="toggleVisibility">{t('Paying_for_goods_is_requered')}</label>
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
                        <label htmlFor="title">{t('Title')}</label>
                        <input
                            type="text"
                            name="title"
                            id="payforGoodsTitle"
                            value={title}
                            onChange={handletitleChange}
                            placeholder={t('Goods_title')}
                            required />
                            {errors.title && <p className="error">{errors.title}</p>}
                    </div>
                    <div>
                        <label htmlFor="currency">{t('Currency')}</label>
                        <select
                            name="currency"
                            id="payforGoodsCurrency"
                            value={currency}
                            onChange={handleCurrencyChange}
                            required
                        >
                            <option value=""disabled >{t('Select_Currency')}</option>
                            <option value="EUR">EUR</option>
                            <option value="GBP">GBP</option>
                        </select>
                        {errors.currency && <p className="error">{errors.currency}</p> }
                    </div>
                    <div>
                        <label htmlFor="price">{t('Price')}</label>
                        <input
                            type="text"
                            name="price"
                            id="payforGoodsPrice"
                            value={price}
                            onChange={handlePriceChange}
                            placeholder={t('Price_of_the_goods')}
                            required />
                            {errors.price && <p className="error">{errors.price}</p>}
                    </div>
                </>
            )}
        </div>
    );
}

export default InformationForInvoice;