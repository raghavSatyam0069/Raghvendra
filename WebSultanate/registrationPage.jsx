import React, { useState, useEffect, useRef } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import httpService from "../services/httpService";
import authPassportService from "../services/authPassportService";
function RegistrationPage(props) {
  let { person } = props;
  let { mode } = props.match.params;
  if (mode === "New") person = {};
  const [img, setImg] = useState(null);
  const inputRef = useRef(null);

  const personValidationSchema = yup.object().shape({
    username: yup
      .string()
      .required("Username is Required")
      .min(6, "Userame must be greater than 6 characters"),
    password: yup
      .string()
      .required("Password is Required")
      .min(6, "Password must be greater than 6 characters"),
    bio: yup
      .string()
      .required("Bio is Required")
      .min(5, "Bio must be greater than 6 characters"),
    location: yup
      .string()
      .required("Location is Required")
      .min(3, "Bio must be greater than 6 characters"),
    occupation: yup
      .string()
      .required("Occupation is Required")
      .min(6, "Bio must be greater than 6 characters"),
  });
  const handleImg = (e) => {
    inputRef.current.click();
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(URL.createObjectURL(file));
    setImg(file);
  };
  const handleRegister = async (values) => {
    let response = await httpService.post("/myDetails", values);
    console.log(response.data);
    alert(response.data);
  };
  const handleEdit = async (values) => {
    let response = await httpService.put("/myDetails", values);
    console.log(response.data);
  };
  return (
    <div
      className="container bg-light border p-4 my-4 rounded-5"
      style={{ width: "600px" }}
    >
      <Formik
        initialValues={{
          username: person.username || "",
          img: person.img || "",
          password: person.password || "",
          bio: person.bio || "",
          location: person.location || "",
          occupation: person.occupation || "",
        }}
        validationSchema={personValidationSchema}
        onSubmit={(values) => {
          values.img = img;
          let { mode } = props.match.params;
          console.log(mode);
          mode === "New" ? handleRegister(values) : handleEdit(values);
          authPassportService.removeToken();
          props.history.push("/");
        }}
      >
        {() => (
          <Form>
            <div className="text-center">
              <img
                src={
                  img
                    ? URL.createObjectURL(img)
                    : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                }
                width={"100px"}
                height={"100px"}
                style={{ cursor: "pointer", borderRadius: "100%" }}
                onClick={handleImg}
              />
              <br />
              <input
                type="file"
                value={""}
                onChange={handleImageChange}
                ref={inputRef}
                style={{ display: "none" }}
              />
            </div>

            <div className="form-group">
              <label>Username</label>
              <Field name="username" type="text" className="form-control" />
              <div className="text-danger">
                <ErrorMessage name="username" />
              </div>
            </div>
            <div className="form-group">
              <label>Password</label>
              <Field name="password" type="password" className="form-control" />
              <div className="text-danger">
                <ErrorMessage name="password" />
              </div>
            </div>
            <div className="form-group">
              <label>Bio</label>
              <Field name="bio" type="text" className="form-control" />
              <div className="text-danger">
                <ErrorMessage name="bio" />
              </div>
            </div>
            <div className="form-group">
              <label>Location</label>
              <Field name="location" type="text" className="form-control" />
              <div className="text-danger">
                <ErrorMessage name="location" />
              </div>
            </div>
            <div className="form-group">
              <label>Occupation</label>
              <Field name="occupation" type="text" className="form-control" />
              <div className="text-danger">
                <ErrorMessage name="occupation" />
              </div>
            </div>
            <div className="form-group text-center">
              <button type="submit" className="btn btn-primary m-2">
                {props.match.params.mode === "Edit"
                  ? "Update Details"
                  : "Register"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
export default RegistrationPage;
