"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { signIn } from "next-auth/react";
import { Formik } from "formik";
import { CircularProgress, Typography, Avatar } from "@mui/material";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import { Bounce } from "react-toastify"; // Import the Bounce transition if it's provided by your toast library
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";
import Spinner from "@components/Spinner";

const postData = async (data) => {
  const Response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return Response;
};

const page = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session?.user) {
      router.push("/user");
    }
  }, [session]);

  if (status === "loading") {
    return <Spinner />;
  }
  if (status === "authenticated") {
    router.push("/user");
  } else
    return (
      <div className="contact-section overview-bgi">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="form-content-box">
                <div className="details">
                  <Avatar
                    src="/img/logo.png"
                    sx={{ width: "auto", height: "150px" }}
                  />
                  <h2 style={{ fontWeight: "800", color: "white" }}>
                    Sign up your account{" "}
                  </h2>

                  <h3 style={{ fontSize: "0.8em" }}> </h3>

                  <Formik
                    initialValues={{
                      username: "",
                      email: "",
                      password: "",
                      confirmPassword: "",
                    }}
                    validate={(values) => {
                      const errors = {};
                      if (!values.email) {
                        errors.email = "Required";
                      } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                          values.email
                        )
                      ) {
                        errors.email = "Invalid email address";
                      }
                      if (!values.username) {
                        errors.username = "Required";
                      }
                      if (!values.password) {
                        errors.password = "Required";
                      }
                      if (!values.confirmPassword) {
                        errors.confirmPassword = "Required";
                      }
                      if (
                        values.password &&
                        values.confirmPassword &&
                        values.password !== values.confirmPassword
                      ) {
                        errors.confirmPassword = "passwords dont match";
                        errors.password = "passwords dont match";
                      }
                      return errors;
                    }}
                    onSubmit={async (values, { setSubmitting }) => {
                      try {
                        const data = await postData(values);

                        if (data.ok) {
                          const status = await signIn("credentials", {
                            redirect: false,
                            email: values.email,
                            password: values.password,
                            callbackUrl: "/",
                          });
                          if (status.ok) {
                            router.push("/user");
                            setSubmitting(false);
                          }
                        }
                        if (!data.ok) {
                          const res = await data.json();
                          console.log(res);
                          toast.error(res.message, {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                            transition: Bounce,
                          });
                          setSubmitting(false);
                        }
                      } catch (error) {
                        console.log(error);
                      }
                    }}
                  >
                    {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                    }) => (
                      <form onSubmit={handleSubmit}>
                        <div className="form-group">
                          <input
                            type="text"
                            name="username"
                            className="input-text"
                            placeholder="Username"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.username}
                          />
                          <span style={{ color: "red" }}>
                            {errors.username &&
                              touched.username &&
                              errors.username}
                          </span>
                        </div>

                        <div className="form-group">
                          <input
                            type="email"
                            name="email"
                            className="input-text"
                            placeholder="Email Address"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                          />
                          <span style={{ color: "red" }}>
                            {" "}
                            {errors.email && touched.email && errors.email}
                          </span>
                        </div>
                        <div className="form-group">
                          <input
                            type="password"
                            name="password"
                            className="input-text"
                            placeholder="Password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                          />
                          <span style={{ color: "red" }}>
                            {" "}
                            {errors.password &&
                              touched.password &&
                              errors.password}
                          </span>
                        </div>
                        <div className="form-group">
                          <input
                            type="password"
                            name="confirmPassword"
                            className="input-text"
                            placeholder="Confirm Password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.confirmPassword}
                          />
                          <span style={{ color: "red" }}>
                            {" "}
                            {errors.confirmPassword &&
                              touched.confirmPassword &&
                              errors.confirmPassword}
                          </span>
                        </div>
                        <div className="form-group mb-0">
                          <button
                            style={{
                              border: "3px solid #9e95fc",
                              background: "#8075ff",
                              color: "white",
                            }}
                            type="submit"
                            className="btn-md button-theme btn-block"
                            // disabled={isSubmitting}
                          >
                            {isSubmitting ? (
                              <CircularProgress
                                size={20}
                                sx={{ color: "#a9a2fb" }}
                              />
                            ) : (
                              <Typography
                                sx={{ color: "white", fontWeight: "700" }}
                              >
                                Sign up
                              </Typography>
                            )}
                          </button>
                        </div>
                      </form>
                    )}
                  </Formik>
                  <Typography
                    className="mt-4"
                    sx={{ fontSize: "11px", color: "white" }}
                  >
                    Already a member?{" "}
                    <Link className="text-white" href="login">
                      Login here
                    </Link>
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    );
};

export default page;
