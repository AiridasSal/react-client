import * as yup from "yup";

const InformationForInvoiceSchema = yup.object().shape({
  payer: yup
    .string()
    .oneOf(["Sender", "Receiver", "Orderer"], "Select a valid payer")
    .required("Payer is required"),
  payerMethod: yup
    .string()
    .oneOf(
      ["Cash", "Card", "Transfer", "Instant"],
      "Select a valid payment method"
    )
    .required("Payment method is required"),
  currency: yup
    .string()
    .oneOf(["USD", "EUR", "GBP"], "Select a valid currency")
    .required("Currency is required"),
  name: yup.string().required("Name is required"),
  code: yup.string().required("Code is required"),
  address: yup.string().required("Address is required"),
  postCode: yup.string().required("Postcode is required"),
  city: yup.string().required("City is required"),
  country: yup.string().required("Country is required"),
});

export default InformationForInvoiceSchema;
