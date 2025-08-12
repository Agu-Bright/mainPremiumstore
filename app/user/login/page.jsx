"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
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
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0f0f23",
        }}
      >
        <CircularProgress style={{ color: "#8b5cf6" }} />
      </div>
    );
  }
  
  if (status === "authenticated") {
    router.push("/user");
  } else
    return (
      <div style={{
        minHeight: "100vh",
        backgroundColor: "#0f0f23",
        backgroundImage: "radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
      }}>
        <div style={{
          width: "100%",
          maxWidth: "420px",
          backgroundColor: "#1a1a2e",
          border: "1px solid #2d2d44",
          borderRadius: "16px",
          padding: "40px",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(139, 92, 246, 0.1)",
        }}>
          {/* Logo */}
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <h1 style={{
              fontSize: "24px",
              fontWeight: "700",
              color: "#8b5cf6",
              margin: "0 0 8px 0"
            }}>
              Premium Store
            </h1>
            <h2 style={{
              fontSize: "28px",
              fontWeight: "600",
              color: "#ffffff",
              margin: "0 0 8px 0"
            }}>
              Welcome back!
            </h2>
            <p style={{
              fontSize: "14px",
              color: "#9ca3af",
              margin: "0"
            }}>
              Sign in to your account to continue
            </p>
          </div>

          <Formik
            initialValues={{ email: "", password: "" }}
            validate={(values) => {
              const errors = {};
              if (!values.email) {
                errors.email = "Email is required";
              } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                errors.email = "Invalid email address";
              }
              if (!values.password) {
                errors.password = "Password is required";
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
                console.log("routing");
                location.reload();
              }
              if (!status.ok) {
                toast.error(status.error || "Invalid credentials", {
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
                      border: errors.email && touched.email ? "2px solid #ef4444" : "2px solid #3d3d5c",
                      borderRadius: "8px",
                      color: "#ffffff",
                      fontSize: "16px",
                      outline: "none",
                      transition: "all 0.2s ease",
                      boxSizing: "border-box"
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#8b5cf6";
                      e.target.style.backgroundColor = "#363654";
                    }}
                    // onBlur={(e) => {
                    //   handleBlur(e);
                    //   if (!errors.email || !touched.email) {
                    //     e.target.style.borderColor = "#3d3d5c";
                    //     e.target.style.backgroundColor = "#2d2d44";
                    //   }
                    // }}
                  />
                  {errors.email && touched.email && (
                    <div style={{
                      color: "#ef4444",
                      fontSize: "13px",
                      marginTop: "6px",
                      fontWeight: "500"
                    }}>
                      {errors.email}
                    </div>
                  )}
                </div>

                {/* Password Input */}
                <div style={{ marginBottom: "24px" }}>
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
                      autoComplete="current-password"
                      style={{
                        width: "100%",
                        padding: "14px 50px 14px 16px",
                        backgroundColor: "#2d2d44",
                        border: errors.password && touched.password ? "2px solid #ef4444" : "2px solid #3d3d5c",
                        borderRadius: "8px",
                        color: "#ffffff",
                        fontSize: "16px",
                        outline: "none",
                        transition: "all 0.2s ease",
                        boxSizing: "border-box"
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
                        justifyContent: "center"
                      }}
                      onMouseEnter={(e) => e.target.style.color = "#8b5cf6"}
                      onMouseLeave={(e) => e.target.style.color = "#9ca3af"}
                    >
                      {viewPassword ? (
                        <VisibilityIcon fontSize="small" />
                      ) : (
                        <VisibilityOffIcon fontSize="small" />
                      )}
                    </button>
                  </div>
                  {errors.password && touched.password && (
                    <div style={{
                      color: "#ef4444",
                      fontSize: "13px",
                      marginTop: "6px",
                      fontWeight: "500"
                    }}>
                      {errors.password}
                    </div>
                  )}
                </div>

                {/* Sign In Button */}
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
                    marginBottom: "24px"
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
                    "Sign In"
                  )}
                </button>
              </form>
            )}
          </Formik>

          {/* Footer Links */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "20px",
            borderTop: "1px solid #2d2d44",
            fontSize: "14px"
          }}>
            <div style={{ color: "#9ca3af" }}>
              New here?{" "}
              <Link
                href="signup"
                style={{
                  color: "#8b5cf6",
                  textDecoration: "none",
                  fontWeight: "500"
                }}
                onMouseEnter={(e) => e.target.style.color = "#7c3aed"}
                onMouseLeave={(e) => e.target.style.color = "#8b5cf6"}
              >
                Create account
              </Link>
            </div>
            <Link
              href="/user/forgotPassword"
              style={{
                color: "#8b5cf6",
                textDecoration: "none",
                fontWeight: "500"
              }}
              onMouseEnter={(e) => e.target.style.color = "#7c3aed"}
              onMouseLeave={(e) => e.target.style.color = "#8b5cf6"}
            >
              Forgot password?
            </Link>
          </div>
        </div>

        <ToastContainer 
          theme="dark"
          toastStyle={{
            backgroundColor: "#1a1a2e",
            color: "#ffffff",
            border: "1px solid #2d2d44"
          }}
        />

        {/* Copyright */}
        <div style={{
          position: "fixed",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          color: "#6b7280",
          fontSize: "13px"
        }}>
          Copyright © 2025 Premium Store. All rights reserved.
        </div>
      </div>
    );
};

export default page;