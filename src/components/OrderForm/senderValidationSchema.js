import * as yup from "yup";

const senderValidationSchema = yup.object().shape({
    name: yup
    .string()
    .required("Name is required")
    .test(
      "full-name",
      "Please enter your full name",
      (value) => value && value.trim().split(" ").length >= 2
    )
    .min(2, "Name and Surename must be at least 2 characters each")
    .max(50, "Name and Surename must be less than 50 characters each"),
    email: yup
        .string()
        .email("Invalid email format")
        .required("Email is required"),
    address: yup
        .string()
        .required("Address is required")
        .min(5, "Address must be at least 5 characters")
        .max(100, "Address must be less than 100 characters"),
    postCode: yup
        .string()
        .required("Postcode is required")
        .min(5, "Postcode must be at least 5 characters")
        .max(10, "Postcode must be less than 10 characters"),
    phoneNumber: yup
        .string()
        .required("Phone number is required")
        .matches(
            /^\+?\d{1,4}[-\s]?\d{1,4}[-\s]?\d{1,4}[-\s]?\d{1,4}$/,
            "Invalid phone number format"
        ),
});

export default senderValidationSchema;