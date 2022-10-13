import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as yup from "yup";
import Input from "../Common/Input";
import RadioInput from "../Common/RadioInput";
import "./signUp.css";
import SelectOption from "../Common/SelectOption";
import CheckBox from "../Common/CheckBox";
import Terms from "../Common/Terms";
const radioOptions = [
  { name: "Male", value: "male" },
  { name: "Female", value: "female" },
  { name: "Not answer", value: "Not-answer" },
];
const selectOptions = [
  { name: "Select Nationality ...", value: "" },
  { name: "Persian", value: "IR" },
  { name: "Germany", value: "GER" },
  { name: "USA", value: "USA" },
];
const checkBoxOptions = [
  { name: "Javascript", value: "Javascript" },
  { name: "React.js", value: "React.js" },
  { name: "Next.js", value: "Next.js" },
];

const initialValues = {
  id: "",
  username: "",
  email: "",
  number: "",
  password: "",
  cofirmPassword: "",
  gender: "",
  nationality: "",
  intrests: [],
  terms: false,
};

const validationSchema = yup.object({
  username: yup.string().max(12, "its too long!").required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  number: yup
    .string()
    .required("Invalid phone number")
    .matches(/^[0-9]{11}$/, "Invalid phone number")
    .nullable(),
  password: yup
    .string()
    .required("Please Enter your password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  cofirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  gender: yup.string().required("Gender is required"),
  nationality: yup.string().required("Nationality is required"),
  intrests: yup.array().min(1).required("Intrests is required"),
  terms: yup.bool().oneOf([true], "You must accept the terms and conditions"),
});

const SignUp = () => {
  const [formValues, setFormValues] = useState(null);
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3001/users/1")
  //     .then((res) => {
  //       setFormValues(res.data);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  const onSubmit = (values) => {
    axios
      .post("http://localhost:3001/users", values)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const formik = useFormik({
    initialValues: formValues || initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
    enableReinitialize: true,
  });
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Input formik={formik} label="Username" name="username" />
        <Input formik={formik} label="Phone Number" name="number" />
        <Input formik={formik} label="Email" name="email" />
        <Input
          formik={formik}
          label="Password"
          name="password"
          type="password"
        />
        <Input
          formik={formik}
          label="Cofirm Password"
          name="cofirmPassword"
          type="password"
        />
        <SelectOption
          formik={formik}
          selectOptions={selectOptions}
          name="nationality"
        />

        <RadioInput formik={formik} radioOptions={radioOptions} name="gender" />
        <CheckBox
          formik={formik}
          checkBoxOptions={checkBoxOptions}
          name="intrests"
        />
        <Terms
          handleChange={formik.handleChange}
          terms={formik.values.terms}
          errors={formik.errors}
          _terms={formik.touched.terms}
        />
        <button type="submit" disabled={!formik.isValid}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignUp;
