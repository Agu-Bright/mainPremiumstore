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
        theme: "light",
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
            {/* <!-- Form content box start --> */}
            <div className="form-content-box">
              {/* <!-- details --> */}
              <div className="details">
                {/* <!-- Logo --> */}
                <a href="/" style={{ fontWeight: "900", fontSize: "1.5em" }}>
                  {/* <img
                    src="img/logos/white-logo.png"
                    className="cm-logo"
                    alt="black-logo"
                  /> */}
                  Executive Taskbox office
                </a>
                {/* <!-- Name --> */}
                <h3>Recover your password</h3>
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
                        style={{ background: "orange", color: "white" }}
                      >
                        Send Me Email
                      </button>
                    )}
                    {loading && (
                      <button className="btn-md button-theme btn-block">
                        <CircularProgress size={25} sx={{ color: "white" }} />
                      </button>
                    )}
                  </div>
                </form>
                {/* <!-- Social List --> */}
              </div>
              {/* <!-- Footer --> */}
              <div className="footer">
                <span>
                  Already a member? <Link href="/login">Login here</Link>
                </span>
              </div>
            </div>
            {/* <!-- Form content box end --> */}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default page;
