import * as yup from "yup";

const PayforGoodsSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  currency: yup.string().required("Currency is required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .required("Price is required")
    .positive("Price must be positive"),
});

export default PayforGoodsSchema;