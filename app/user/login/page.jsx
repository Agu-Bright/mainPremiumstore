"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { Avatar, CircularProgress, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import { Bounce } from "react-toastify"; // Import the Bounce transition if it's provided by your toast library
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Spinner from "@components/Spinner";
const page = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [viewPassword, setViewPassword] = useState(false);

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
      <>
        <div
          className="contact-section overview-bgi"
          style={{ flexDirection: "column" }}
        >
          <div
            className="container"
            style={{ backgroundColor: "#7247ff !important" }}
          >
            <div className="row">
              <div className="col-lg-12">
                <div className="form-content-box">
                  <div className="details">
                    <Avatar
                      src="/img/logo.png"
                      sx={{ width: "auto", height: "150px" }}
                    />

                    <h3 style={{ fontWeight: "700", color: "white" }}>
                      Login your account{" "}
                    </h3>

                    <Formik
                      initialValues={{ email: "", password: "" }}
                      validate={(values) => {
                        const errors = {};
                        if (!values.email) {
                          errors.email = "Required";
                        }
                        return errors;
                      }}
                      onSubmit={async (values, { setSubmitting }) => {
                        const status = await signIn("credentials", {
                          redirect: false,
                          email: values.email,
                          password: values.password,
                          callbackUrl: "/",
                        });
                        if (status.ok) {
                          console.log("routign");
                          location.reload();
                          // router.push("/");
                          // setSubmitting(false);
                        }
                        if (!status.ok) {
                          toast.error(status.error, {
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

                        /* and other goodies */
                      }) => (
                        <form onSubmit={handleSubmit}>
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
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                backgroundColor: "white",
                                borderRadius: "3px",
                              }}
                            >
                              <input
                                type={viewPassword ? "text" : "password"}
                                name="password"
                                className="input-text"
                                style={{ borderRight: "none" }}
                                placeholder="Enter your password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                                autoComplete="on"
                              />
                              <span
                                style={{
                                  borderLeft: "none",
                                  height: "100%",
                                  padding: "5px",
                                }}
                                onClick={() => setViewPassword((prev) => !prev)}
                                className="text-xl absolute font-bold right-[23px] top-[5px]"
                              >
                                {viewPassword ? (
                                  <VisibilityIcon
                                    sx={{ color: "#8075ff" }}
                                    fontSize="small"
                                    className="size-4 text-gray-500"
                                  />
                                ) : (
                                  <VisibilityOffIcon
                                    fontSize="small"
                                    className="size-4 text-gray-500"
                                  />
                                )}
                              </span>
                            </div>
                            <span style={{ color: "red" }}>
                              {errors.password &&
                                touched.password &&
                                errors.password}
                            </span>
                          </div>

                          <div className="form-group mb-0">
                            <button
                              style={{
                                border: "3px solid #9e95fc",
                                background: "#8b81fd",
                              }}
                              type="submit"
                              className="btn-md button-theme btn-block"
                              disabled={isSubmitting}
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
                                  Sign In
                                </Typography>
                              )}
                            </button>
                          </div>
                        </form>
                      )}
                    </Formik>
                    <Stack
                      direction="row"
                      sx={{
                        padding: "10px",
                        marginTop: "10px",
                      }}
                      justifyContent="space-between"
                    >
                      <Typography sx={{ fontSize: "11px", color: "white" }}>
                        {" "}
                        Don't have an account?{" "}
                        <Link
                          href="signup"
                          style={{
                            textDecoration: "underline",
                            fontWeight: "700",
                            color: "white",
                          }}
                        >
                          Register here
                        </Link>{" "}
                      </Typography>
                      <Typography sx={{ fontSize: "11px", color: "white" }}>
                        {" "}
                        <Link
                          href="/user/forgotPassword"
                          style={{
                            textDecoration: "underline",
                            fontWeight: "700",
                            color: "white",
                          }}
                        >
                          Forgot Password
                        </Link>
                      </Typography>
                    </Stack>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ToastContainer />
          <p style={{ color: "white", zIndex: "999", marginTop: "30px" }}>
            Copyright @2024 Premium Store.
          </p>
        </div>
      </>
    );
};

export default page;
