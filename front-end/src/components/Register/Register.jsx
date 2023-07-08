import React, { useState } from "react";
import style from "./Register.module.css";
import regsiterImage from "../../assets/images/register.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup"
import axios from "axios";

export default function Register() {

  let navigate = useNavigate();
 const [validationErr, setvalidationErr] = useState(null);
 const [isLoading, setisLoading] = useState(false)


  let validationSchema = Yup.object({
    name:Yup.string()
    .required("First Name is required")
    .min(3,"First Name must be more than 3")
    .max(25,"First Name must be less than 25"),

    age:Yup.number()
    .required("age is required")
    .min(18, "your age must be greater than 18"),
    
    email:Yup.string()
    .required("email is required")
    .email("please enter a valid name"),

    password:Yup.string()
    .required("password is required")
    .matches(/^[A-Z]/, "password must start with capital latter")
    .min(8, "password must be at least 8 characters")
    .max(25, "password must be at most 25 characters")
  })

let formik = useFormik({
  initialValues:{
    name:"",
    email:"",
    password:"",
    age:""  
  },
  validationSchema,
  onSubmit:handleRegisteration,
})

// console.log(formik);

async function handleRegisteration(values){
  // console.log(values)
  // setisLoading(true)
  let{data} = await axios.post(
    "http://localhost:5000/user/signup",
     values);
  console.log(data);
  if(data.message == "Done"){
    setisLoading(false)
    navigate("/login")
  }

  if(data.message == "Email Exist"){
    setisLoading(false)

    setvalidationErr("email already registered");

  }
}

return (
    <section className="min-vh-100 d-flex align-items-center justify-content-center">
      <div className={`${style.container} row`}>
        <figure className="col-md-8 m-0 p-md-0">
          <div className="image-container">
            <img src={regsiterImage} className="w-100" alt="Regsiter Image" />
          </div>
        </figure>
        <form onSubmit={formik.handleSubmit} className="col-md-4 d-flex flex-column justify-content-center px-5">
          <h2 className="m-0 fw-bold font-Montserrat">Create an account</h2>
          <p className="mb-3">Let's get started for free</p>
          <div className="form-group d-flex flex-column gap-2 justify-content-center">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              name="name"
              id="name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            {formik.errors.name && formik.touched.name?  <div className="error">{formik.errors.name}</div> : null}

            <input
              type="email"
              className="form-control"
              placeholder="Email"
              name="email"
              id="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.errors.email && formik.touched.email?
              <div className="error">{formik.errors.email}</div>
               : null}
               {validationErr?<div className="error">{validationErr}</div>
               : null}

            <input
              type="password"
              className="form-control"
              placeholder="Password"
              name="password"
              id="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {formik.errors.password && formik.touched.password?  <div className="error">{formik.errors.password}</div> : null}

            <input
              type="text"
              inputMode="numeric"
              className="form-control"
              placeholder="Age"
              name="age"
              id="age"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.age}
            />
            {formik.errors.age && formik.touched.age?  <div className="error">{formik.errors.age}</div> : null}

            <button type="submit" className="btn btn-main">
              {isLoading? <i className="fa-solid fa-spinner fa-spin"></i>
              : " Create account"}
             
            </button>
            <p>
              Already have account ?{" "}
              <Link to="/login" className="text-decoration-underline">
                Log in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
