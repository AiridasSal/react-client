import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    route: Yup.string().required("Route is required"),
    date: Yup.date().required("Date is required"),
    parcels: Yup.array().of(
      Yup.number()
        .min(0, "Weight must be greater than or equal to 0")
        .required("Weight is required")
    ),
  });

  export default validationSchema