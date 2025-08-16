"use client";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const page = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Input validation
    if (!email.trim()) {
      toast.error("Please enter your email address", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return;
    }

    try {
      setLoading(true);
      
      // Configure axios with timeout and proper headers
      const response = await axios.post(
        `/api/auth/forgot-password`,
        { email: email.trim().toLowerCase() },
        {
          timeout: 30000, // 30 second timeout
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      
      setLoading(false);
      setEmail("");
      
      toast.success(response.data?.message || "Password reset email sent successfully!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } catch (error) {
      setLoading(false);
      
      // Better error handling
      let errorMessage = "Error sending email";
      
      if (error.response) {
        // Server responded with error status
        errorMessage = error.response.data?.message || `Server error: ${error.response.status}`;
      } else if (error.request) {
        // Network error
        errorMessage = "Network error. Please check your connection and try again.";
      } else if (error.code === 'ECONNABORTED') {
        // Timeout error
        errorMessage = "Request timed out. Please try again.";
      }
      
      console.error("Forgot password error:", error);
      
      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  return (
    <div className="contact-section overview-bgi">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            {/* Form content box start */}
            <div className="form-content-box">
              {/* details */}
              <div className="details">
                {/* Logo */}
                <Link href="/" style={{ fontWeight: "900", fontSize: "1.5em" }}>
                  Premium Store
                </Link>
                {/* Name */}
                <h3 style={{ fontSize: "0.8em" }}>Recover your password</h3>
                {/* Form start */}
                <form onSubmit={handleSubmit} noValidate>
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="input-text"
                      placeholder="Email Address"
                      required
                      autoComplete="email"
                      disabled={loading}
                    />
                  </div>
                  <div className="form-group mb-0">
                    <button
                      type="submit"
                      className="btn-md button-theme btn-block"
                      style={{ background: "#8075ff", color: "white" }}
                      disabled={loading}
                    >
                      {loading ? (
                        <CircularProgress size={25} sx={{ color: "white" }} />
                      ) : (
                        "Send Me Email"
                      )}
                    </button>
                  </div>
                </form>
              </div>
              {/* Footer */}
              <div className="footer">
                <span>
                  Already a member?{" "}
                  <Link
                    href="/user/login"
                    style={{
                      textDecoration: "underline",
                      fontWeight: "700",
                    }}
                  >
                    Login here
                  </Link>
                </span>
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