"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useContext, useState } from "react";
import { signIn } from "next-auth/react";
import { Formik } from "formik";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import { Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";
import { RestaurantContext } from "@context/RestaurantContext";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const postData = async (data) => {
  const Response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return Response;
};

const page = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { restaurantIntent } = useContext(RestaurantContext);
  const [viewPassword, setViewPassword] = useState(false);
  const [viewConfirmPassword, setViewConfirmPassword] = useState(false);

  useEffect(() => {
    if (session?.user) {
      router.push("/user");
    }
  }, [session]);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0f0f23",
        backgroundImage:
          "radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "450px",
          backgroundColor: "#1a1a2e",
          border: "1px solid #2d2d44",
          borderRadius: "16px",
          padding: "40px",
          boxShadow:
            "0 20px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(139, 92, 246, 0.1)",
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <h1
            style={{
              fontSize: "24px",
              fontWeight: "700",
              color: "#8b5cf6",
              margin: "0 0 8px 0",
            }}
          >
            Premium Store
          </h1>
          <h2
            style={{
              fontSize: "28px",
              fontWeight: "600",
              color: "#ffffff",
              margin: "0 0 8px 0",
            }}
          >
            Create your account
          </h2>
          <p
            style={{
              fontSize: "14px",
              color: "#9ca3af",
              margin: "0",
            }}
          >
            Join us today and get started
          </p>
        </div>

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
              errors.email = "Email is required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            if (!values.username) {
              errors.username = "Username is required";
            } else if (values.username.length < 3) {
              errors.username = "Username must be at least 3 characters";
            }
            if (!values.password) {
              errors.password = "Password is required";
            } else if (values.password.length < 6) {
              errors.password = "Password must be at least 6 characters";
            }
            if (!values.confirmPassword) {
              errors.confirmPassword = "Please confirm your password";
            }
            if (
              values.password &&
              values.confirmPassword &&
              values.password !== values.confirmPassword
            ) {
              errors.confirmPassword = "Passwords don't match";
              errors.password = "Passwords don't match";
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
                toast.error(res.message || "Registration failed", {
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
              toast.error("Something went wrong. Please try again.", {
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
          }) => (
            <form onSubmit={handleSubmit}>
              {/* Username Input */}
              <div style={{ marginBottom: "20px" }}>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    backgroundColor: "#2d2d44",
                    border:
                      errors.username && touched.username
                        ? "2px solid #ef4444"
                        : "2px solid #3d3d5c",
                    borderRadius: "8px",
                    color: "#ffffff",
                    fontSize: "16px",
                    outline: "none",
                    transition: "all 0.2s ease",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#8b5cf6";
                    e.target.style.backgroundColor = "#363654";
                  }}
                  onBlur={(e) => {
                    handleBlur(e);
                    if (!errors.username || !touched.username) {
                      e.target.style.borderColor = "#3d3d5c";
                      e.target.style.backgroundColor = "#2d2d44";
                    }
                  }}
                />
                {errors.username && touched.username && (
                  <div
                    style={{
                      color: "#ef4444",
                      fontSize: "13px",
                      marginTop: "6px",
                      fontWeight: "500",
                    }}
                  >
                    {errors.username}
                  </div>
                )}
              </div>

              {/* Email Input */}
              <div style={{ marginBottom: "20px" }}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    backgroundColor: "#2d2d44",
                    border:
                      errors.email && touched.email
                        ? "2px solid #ef4444"
                        : "2px solid #3d3d5c",
                    borderRadius: "8px",
                    color: "#ffffff",
                    fontSize: "16px",
                    outline: "none",
                    transition: "all 0.2s ease",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#8b5cf6";
                    e.target.style.backgroundColor = "#363654";
                  }}
                  onBlur={(e) => {
                    handleBlur(e);
                    if (!errors.email || !touched.email) {
                      e.target.style.borderColor = "#3d3d5c";
                      e.target.style.backgroundColor = "#2d2d44";
                    }
                  }}
                />
                {errors.email && touched.email && (
                  <div
                    style={{
                      color: "#ef4444",
                      fontSize: "13px",
                      marginTop: "6px",
                      fontWeight: "500",
                    }}
                  >
                    {errors.email}
                  </div>
                )}
              </div>

              {/* Password Input */}
              <div style={{ marginBottom: "20px" }}>
                <div style={{ position: "relative" }}>
                  <input
                    type={viewPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    onBlur={(e) => {
                      handleBlur(e);
                      if (!errors.password || !touched.password) {
                        e.target.style.borderColor = "#3d3d5c";
                        e.target.style.backgroundColor = "#2d2d44";
                      }
                    }}
                    value={values.password}
                    autoComplete="new-password"
                    style={{
                      width: "100%",
                      padding: "14px 50px 14px 16px",
                      backgroundColor: "#2d2d44",
                      border:
                        errors.password && touched.password
                          ? "2px solid #ef4444"
                          : "2px solid #3d3d5c",
                      borderRadius: "8px",
                      color: "#ffffff",
                      fontSize: "16px",
                      outline: "none",
                      transition: "all 0.2s ease",
                      boxSizing: "border-box",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#8b5cf6";
                      e.target.style.backgroundColor = "#363654";
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setViewPassword((prev) => !prev)}
                    style={{
                      position: "absolute",
                      right: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      color: "#9ca3af",
                      cursor: "pointer",
                      padding: "4px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "#8b5cf6")}
                    onMouseLeave={(e) => (e.target.style.color = "#9ca3af")}
                  >
                    {viewPassword ? (
                      <VisibilityIcon fontSize="small" />
                    ) : (
                      <VisibilityOffIcon fontSize="small" />
                    )}
                  </button>
                </div>
                {errors.password && touched.password && (
                  <div
                    style={{
                      color: "#ef4444",
                      fontSize: "13px",
                      marginTop: "6px",
                      fontWeight: "500",
                    }}
                  >
                    {errors.password}
                  </div>
                )}
              </div>

              {/* Confirm Password Input */}
              <div style={{ marginBottom: "24px" }}>
                <div style={{ position: "relative" }}>
                  <input
                    type={viewConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm password"
                    onChange={handleChange}
                    onBlur={(e) => {
                      handleBlur(e);
                      if (!errors.confirmPassword || !touched.confirmPassword) {
                        e.target.style.borderColor = "#3d3d5c";
                        e.target.style.backgroundColor = "#2d2d44";
                      }
                    }}
                    value={values.confirmPassword}
                    autoComplete="new-password"
                    style={{
                      width: "100%",
                      padding: "14px 50px 14px 16px",
                      backgroundColor: "#2d2d44",
                      border:
                        errors.confirmPassword && touched.confirmPassword
                          ? "2px solid #ef4444"
                          : "2px solid #3d3d5c",
                      borderRadius: "8px",
                      color: "#ffffff",
                      fontSize: "16px",
                      outline: "none",
                      transition: "all 0.2s ease",
                      boxSizing: "border-box",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#8b5cf6";
                      e.target.style.backgroundColor = "#363654";
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setViewConfirmPassword((prev) => !prev)}
                    style={{
                      position: "absolute",
                      right: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      color: "#9ca3af",
                      cursor: "pointer",
                      padding: "4px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "#8b5cf6")}
                    onMouseLeave={(e) => (e.target.style.color = "#9ca3af")}
                  >
                    {viewConfirmPassword ? (
                      <VisibilityIcon fontSize="small" />
                    ) : (
                      <VisibilityOffIcon fontSize="small" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && touched.confirmPassword && (
                  <div
                    style={{
                      color: "#ef4444",
                      fontSize: "13px",
                      marginTop: "6px",
                      fontWeight: "500",
                    }}
                  >
                    {errors.confirmPassword}
                  </div>
                )}
              </div>

              {/* Sign Up Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  width: "100%",
                  padding: "14px 24px",
                  backgroundColor: isSubmitting ? "#6d28d9" : "#8b5cf6",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                  transition: "all 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "24px",
                }}
                onMouseEnter={(e) => {
                  if (!isSubmitting) {
                    e.target.style.backgroundColor = "#7c3aed";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSubmitting) {
                    e.target.style.backgroundColor = "#8b5cf6";
                  }
                }}
              >
                {isSubmitting ? (
                  <CircularProgress size={20} sx={{ color: "white" }} />
                ) : (
                  "Create Account"
                )}
              </button>
            </form>
          )}
        </Formik>

        {/* Footer Links */}
        <div
          style={{
            textAlign: "center",
            paddingTop: "20px",
            borderTop: "1px solid #2d2d44",
            fontSize: "14px",
            color: "#9ca3af",
          }}
        >
          Already have an account?{" "}
          <Link
            href="login"
            style={{
              color: "#8b5cf6",
              textDecoration: "none",
              fontWeight: "500",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#7c3aed")}
            onMouseLeave={(e) => (e.target.style.color = "#8b5cf6")}
          >
            Sign in here
          </Link>
        </div>
      </div>

      <ToastContainer
        theme="dark"
        toastStyle={{
          backgroundColor: "#1a1a2e",
          color: "#ffffff",
          border: "1px solid #2d2d44",
        }}
      />

      {/* Copyright */}
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          color: "#6b7280",
          fontSize: "13px",
        }}
      >
        Copyright © 2025 Premium Store. All rights reserved.
      </div>
    </div>
  );
};

export default page;
