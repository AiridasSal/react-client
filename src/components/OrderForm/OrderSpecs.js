import React, { useState, useEffect } from "react";
import ReactDatePicker from "react-datepicker";
import Validation from "./Validation";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from "react-i18next";

const OrderSpecs = ({ onChange }) => {
  const { t } = useTranslation();
  const [route, setRoute] = useState("");
  const [date, setDate] = useState(null);
  const [parcels, setParcels] = useState([""]);
  const [estimatedPrice, setEstimatedPrice] = useState(0);
  const initialDate = date !== null ? new Date(date) : null;
  const [errors, setErrors] = useState({});

  const handleRouteChange = (e) => {
    setRoute(e.target.value);
    setDate(null);
    const updatedEstimatedPrice = calculateEstimatedPrice(parcels);
    setEstimatedPrice(updatedEstimatedPrice);
    onChange({
      route: e.target.value,
      date,
      parcels,
      estimatedPrice: updatedEstimatedPrice,
    });
  };
  const isDateEnabled = (date) => {
    // Define your date rules for each route here
    const ltUkDays = [3]; // Mondays, Wednesdays, and Fridays
    const ukLtDays = [5, 6]; // Tuesdays and Thursdays

    // Check if the date is the specific date "2023-04-02"
    const specificDate = new Date("2023-04-02");
    if (
      date.getFullYear() === specificDate.getFullYear() &&
      date.getMonth() === specificDate.getMonth() &&
      date.getDate() === specificDate.getDate() &&
      route === "LT-UK"
    ) {
      return true;
    }

    if (route === "LT-UK") {
      return ltUkDays.includes(date.getDay());
    } else if (route === "UK-LT") {
      return ukLtDays.includes(date.getDay());
    } else {
      return false;
    }
  };
  const handleDateChange = (date) => {
    setDate(date);
    const updatedEstimatedPrice = calculateEstimatedPrice(parcels);
    setEstimatedPrice(updatedEstimatedPrice);
    onChange({ route, date, parcels, estimatedPrice: updatedEstimatedPrice });
  };
  const handleParcelWeightChange = (index, weight) => {
    const newParcels = [...parcels];
    newParcels[index] = Number(weight);
    setParcels(newParcels);
    const updatedEstimatedPrice = calculateEstimatedPrice(newParcels);
    setEstimatedPrice(updatedEstimatedPrice);
    onChange({
      route,
      date,
      parcels: newParcels,
      estimatedPrice: updatedEstimatedPrice,
    });
  };
  const updateEstimatedPrice = (newParcels) => {
    // Calculate the estimated price and update the state
    const newEstimatedPrice = calculateEstimatedPrice(newParcels);
    setEstimatedPrice(newEstimatedPrice);
  };
  const handleAddParcel = () => {
    const newParcels = [...parcels, 0];
    setParcels(newParcels);
    const updatedEstimatedPrice = calculateEstimatedPrice(newParcels);
    setEstimatedPrice(updatedEstimatedPrice);
    onChange({
      route,
      date,
      parcels: newParcels,
      estimatedPrice: updatedEstimatedPrice,
    });
  };

  const handleRemoveParcel = (index) => {
    const newParcels = parcels.filter((_, i) => i !== index);
    setParcels(newParcels);

    // Update the estimated price
    const updatedEstimatedPrice = calculateEstimatedPrice(newParcels);
    setEstimatedPrice(updatedEstimatedPrice);

    onChange({
      route,
      date,
      parcels: newParcels,
      estimatedPrice: updatedEstimatedPrice,
    });
  };

  const calculateEstimatedPrice = (parcels) => {
    // Define your pricing rules here
    const priceUpTo5kg = 35;
    const price5to30kg = 40;

    // Calculate the price for each parcel
    const parcelPrices = parcels.map((weight) => {
      if (weight <= 5) {
        return priceUpTo5kg;
      } else if (weight > 5 && weight <= 30) {
        return price5to30kg;
      } else if (weight > 30 && weight <= 50) {
        return price5to30kg + (weight - 30) * 1.33;
      } else if (weight > 50 && weight <= 100) {
        return price5to30kg + (weight - 30) * 1.3;
      } else if (weight > 100 && weight <= 200)
        return price5to30kg + (weight - 30) * 1.2;
      else if (weight > 200 && weight <= 400) {
        return price5to30kg + (weight - 30) * 1;
      } else if (weight > 400 && weight <= 600) {
        return price5to30kg + (weight - 30) * 0.93;
      } else {
        return price5to30kg + (weight - 30) * 0.85;
      }
    });

    // Calculate the total price without discount
    const totalPrice = parcelPrices.reduce((sum, price) => sum + price, 0);

    // Apply a discount based on the total number of parcels
    const discount = getDiscount(parcelPrices.length);

    // Calculate the final price with discount
    const finalPrice = totalPrice * (1 - discount);
    const roundedPrice = parseFloat(finalPrice.toFixed(2));

    return roundedPrice;
  };

  const getDiscount = (numberOfParcels) => {
    // Define your discount rules here
    if (numberOfParcels >= 5) {
      return 0.2; // 20% discount
    } else if (numberOfParcels >= 4) {
      return 0.15; // 15% discount
    } else if (numberOfParcels >= 3) {
      return 0.1; // 10% discount
    } else if (numberOfParcels >= 2) {
      return 0.05; // 5% discount
    } else {
      return 0; // No discount
    }
  };

  const addDays = (date, days) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    return newDate;
  };

  const formatedDate = (date) => {
    if (date !== null) {
      const year = date.getFullYear();
      const month = date.toLocaleString("default", { month: "short" });
      const day = date.getDate();
      const dayOfWeek = date.toLocaleString("default", { weekday: "long" });
      return `${year} ${month} ${day < 10 ? "0" + day : day} ${dayOfWeek}`;
    } else {
      return "Select Date";
    }
  };

  const dateToString = () => {
    if (date === null) {
      return t(`Select_a_date`);
    } else if (date !== null && route === "LT-UK") {
      return formatedDate(date);
    } else if (route === "UK-LT" && date !== null) {
      if (date.getDay() === 5) {
        const formattedDate = formatedDate(date);
        const nextDay = addDays(date, 1);
        const formattedNextDay = formatedDate(nextDay);
        return `${formattedDate}-${formattedNextDay}`;
      } else if (date.getDay() === 6) {
        const formattedDate = formatedDate(date);
        const prevDay = addDays(date, -1);
        const formattedPrevDay = formatedDate(prevDay);
        return `${formattedPrevDay}-${formattedDate}`;
      } else {
        return formatedDate(date);
      }
    }
  };

  const newDate = () => {
    if (route === "LT-UK" && date !== null) {
      const deliveryDate1 = addDays(initialDate, 2);
      const deliveryDate2 = addDays(initialDate, 3);
      return `${formatedDate(deliveryDate1)}-${formatedDate(deliveryDate2)}`;
    } else if (route === "UK-LT" && date !== null) {
      const deliveryDate = addDays(initialDate, 3);
      return formatedDate(deliveryDate);
    } else {
      return t(`Select_a_date`);
    }
  };

  console.log(dateToString());
  console.log(newDate());

  const totalWeight =
    parcels.reduce((sum, weight) => sum + weight, 0) === 0
      ? t("type_in_the_pracels_weight")
      : parcels.reduce((sum, weight) => sum + weight, 0);
  const discountPercent = getDiscount(parcels.length) * 100;
  const discount = getDiscount(parcels.length) * estimatedPrice;

  useEffect(() => {
    Validation.validate({ route, date, parcels }, { abortEarly: false })
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
  }, [route, date, parcels]);
  useEffect(() => {
    updateEstimatedPrice(parcels);
  }, [route, date, parcels]);
  return (
    <div className="orderSpecs">
      <h2>{t("Order_Specifications")}</h2>

      <div>
        <label htmlFor="route">{t("Route")}</label>
        <select
          name="route"
          num="route"
          value={route}
          onChange={handleRouteChange}
          required
        >
          <option value="" disabled>
            {t("Select_a_route")}
          </option>
          <option value="LT-UK">{t("Lithuania_to_United_Kingdom")}</option>
          <option value="UK-LT">{t("United_Kingdom_to_Lithuania")}</option>
        </select>
        {errors.route && <p className="error">{errors.route}</p>}
      </div>
      <div>
        <label htmlFor="date">{t("Date")}</label>
        <ReactDatePicker
          type="date"
          placeholderText={t(`Select_a_date`)}
          selected={date}
          onChange={handleDateChange}
          dateFormat="yyyy-MM-dd"
          filterDate={isDateEnabled}
          required
          {...(errors.date && <p className="error">{errors.date}</p>)}
        />
      </div>
      <div>
        <label> {t("Parcel_Weight")}</label>
        {parcels.map((weight, index) => (
          <div className="parcelWeightContainer" key={index}>
            <input
              type="number"
              placeholder={t("Parcel_Weight")}
              name={`parcelWeight${index}`}
              num={`parcelWeight${index}`}
              className="parcelWeight"
              {...(errors.parcels && <p className="error">{errors.parcels}</p>)}
              onChange={(e) => handleParcelWeightChange(index, e.target.value)}
              required
            />

            {index !== 0 && (
              <button
                type="button"
                className="dangerButton"
                onClick={() => handleRemoveParcel(index)}
              >
                {t("Remove")}
              </button>
            )}
            {index === parcels.length - 1 && (
              <button
                type="button"
                className="successButton"
                onClick={handleAddParcel}
              >
                {t("Add")}
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="orderSummaryContainer">
        <h3> {t("Order_Summary")}</h3>
        <div className="">
          <label>
            {" "}
            {t("Date_of_the_pick_up")}
            <span>{dateToString()}</span>
          </label>
        </div>
        <div className="">
          <label>
            {" "}
            {t("Date_of_the_delivery_up")}
            <span>{newDate()}</span>
          </label>
        </div>
        <div className="">
          <label>
            {" "}
            {t("Total_weight_of_the_order_is")}
            <span>{totalWeight}</span>
          </label>
        </div>
        <div className="">
          <label>
            {" "}
            {t("Estimated_total_price")}
            <span>{estimatedPrice.toFixed(2)}</span>
          </label>
        </div>
        <div className="">
          <label>
            {discountPercent} {t("%_discount_for_multiple_parcels_saved")}
            <span>{discount.toFixed(2)}</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default OrderSpecs;
