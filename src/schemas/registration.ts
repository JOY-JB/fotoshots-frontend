import * as yup from "yup";

export const registrationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Passwords must match")
    .required("Confirm Password is required"),
  contactNo: yup
    .string()
    .matches(/^\d{7,15}$/, "Contact number should be between 7 and 15 digits")
    .required("Contact number is required"),
  address: yup.string().required("Address is required"),
  role: yup
    .string()
    .oneOf(
      ["photographer", "client"],
      "Role must be either 'photographer' or 'client"
    )
    .required("Role is required"),
});
