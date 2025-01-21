"use client";
import { CircularProgress, Typography } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const page = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e, _emial) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(`/api/auth/forgot-password`, {
        email: _emial,
      });
      setLoading(false);
      setEmail("");
      toast.success(data?.message, {
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
    } catch (error) {
      setLoading(false);
      toast.error("Error sending Email", {
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
    }
  };
  return (
    <div className="contact-section overview-bgi">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            {/* <!-- Form content box start --> */}
            <div className="form-content-box">
              {/* <!-- details --> */}
              <div className="details">
                {/* <!-- Logo --> */}

                {/* <!-- Name --> */}
                <h3 style={{ fontSize: "1.8em", color: "white" }}>
                  Recover your password
                </h3>
                {/* <!-- Form start --> */}
                <form onSubmit={(e) => handleSubmit(e, email)}>
                  <div className="form-group">
                    <input
                      type="text"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="input-text"
                      placeholder="Email Address"
                    />
                  </div>
                  <div className="form-group mb-0">
                    {!loading && (
                      <button
                        type="submit"
                        className="btn-md button-theme btn-block"
                        style={{
                          background: "#8075ff",
                          color: "white",
                          border: "3px solid #9e95fc",
                        }}
                      >
                        Send Me Email
                      </button>
                    )}
                    {loading && (
                      <button
                        className="btn-md button-theme btn-block"
                        style={{
                          background: "#8075ff",
                          color: "white",
                          border: "3px solid #9e95fc",
                        }}
                      >
                        <CircularProgress size={20} sx={{ color: "#a9a2fb" }} />{" "}
                      </button>
                    )}
                  </div>
                </form>
                <Typography
                  sx={{
                    fontSize: "11px",
                    color: "white",
                    marginTop: "10px",
                    paddingTop: "10px",
                  }}
                >
                  Already a member?{" "}
                  <Link
                    className="!text-white"
                    href="/user/login"
                    style={{
                      textDecoration: "underline",
                      fontWeight: "700",
                      color: "white",
                    }}
                  >
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
