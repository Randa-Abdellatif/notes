import React, { useContext, useEffect, useState } from "react";
import style from "./Login.module.css";
import LoginImage from "../../assets/images/login.webp";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup"
import axios from "axios";
import { UserContext } from "../../Context/UserContext";

export default function Login() {

  const [emailErr, setemailErr] = useState(null);
  const [passwordErr, setpasswordErr] = useState(null);
  let navigate = useNavigate();
  const {token, settoken ,userInfo, setuserInfo} = useContext(UserContext)


  let validationSchema = Yup.object({
    
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
    email:"",
    password:"3",
    
  },
  validationSchema,
  onSubmit:handleLogin,
})

async function handleLogin(values){
  let{data}= await axios.post("http://localhost:5000/user/login", values);
  // console.log(data);
  if(data.message == "success"){
    // console.log(data);
    // console.log(data.user.id);
    
    localStorage.setItem("token" , data.user.id);
    settoken(data.user.id);
    localStorage.setItem("userInfo",JSON.stringify(data.user))
    setuserInfo(data.user)
    // console.log(data.token ,data.user.id)
  //   function alertAfter3Seconds() {
  //     alert("3 Second completed hi!");
  //     console.log(token,userInfo)
  //     navigate("/")
  // }
  // setTimeout(alertAfter3Seconds, 30000);
    navigate("/")
   
  }

  if(data.error == "Invalid email or password"){
    setemailErr(data.error)
  }
 
  // if(data.message == "incorrect password"){
  //   setpasswordErr(data.message)
  // }
  // if(data.message == "email doesn't exist"){
  //   setemailErr(data.message)
  // }
 
}

useEffect(() => {
  if(token == null) return;
  navigate("/")
},[token])

  return (
    <section className="min-vh-100 d-flex align-items-center justify-content-center">
      <div className={`${style.container} row`}>
        <figure className="col-md-8 m-0 p-md-0">
          <div className="image-container">
            <img src={LoginImage} className="w-100" alt="Regsiter Image" />
          </div>
        </figure>
        <form
        onSubmit={formik.handleSubmit} 
        className="col-md-4 d-flex flex-column justify-content-center px-5">
          <h2 className="m-0 fw-bold font-Montserrat">
            Welcome Back <i className="fa-solid fa-heart ms-0 text-main"></i>
          </h2>
          <p className="mb-3">
            Thanks for returning! Please sign in to access your account.
          </p>
          <div className="form-group d-flex flex-column gap-2 justify-content-center">
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

               {emailErr? <div className="error">{emailErr}</div>: null}

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

{passwordErr? <div className="error">{passwordErr}</div>: null}

            <button type="submit" className="btn btn-main">
              Login
            </button>
            <p>
              You don't have account yet ?
              <Link to="/signup" className="text-decoration-underline">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
