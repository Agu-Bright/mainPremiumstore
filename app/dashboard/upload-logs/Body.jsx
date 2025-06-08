import InfoCards from "@components/InfoCard";
import Sidebar from "@components/Sidebar";
import { useSession } from "next-auth/react";
import React, { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Bounce } from "react-toastify"; //
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LogsUpload from "./LogsUpload";
import axios from "axios";
import Image from "next/image";
import BasicModal from "../Modal";
import { RestaurantContext } from "@context/RestaurantContext";

const Body = () => {
  const { data: session } = useSession();
  const { toggle, open, setOpen, type, setType } =
    useContext(RestaurantContext);

  const [categories, setCategories] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`/api/logs/getCategories`);
        setCategories(data?.categories);
      } catch (error) {
        toast.error(error?.response?.data?.message, {
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
    })();
  }, [toggle]);

  return (
    <div className="dashboard">
      <div className="container-fluid ">
        <div className="row">
          <Sidebar />
          <div
            className="dashboard-content dashboard_row"
            style={{
              width: "100%",
              height: "100vh",
            }}
          >
            <div>
              <>
                <div className="dashboard-header clearfix">
                  <div className="row">
                    <div className="col-sm-12 col-md-6">
                      <h4>
                        Hi &#x1F44B;, {session?.user?.accountName}{" "}
                        {session?.user?.role === "admin" && (
                          <span style={{ fontSize: "12px", color: "red" }}>
                            Admin
                          </span>
                        )}{" "}
                        {session?.user?.role === "sub-admin" && (
                          <span style={{ fontSize: "12px", color: "red" }}>
                            Customer Service
                          </span>
                        )}{" "}
                      </h4>
                    </div>
                    <div className="col-sm-12 col-md-6">
                      <div className="breadcrumb-nav">
                        <ul>
                          {/* <li>
                          <a href="/">Index</a>
                        </li> */}
                          <li>
                            <a href="#" className="active">
                              Create and manage your logs{" "}
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {categories && categories.length === 0 && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      border: "1px solid #e3dcdc",
                      borderRadius: "10px",
                      justifyContent: "center",
                      padding: "20px 0px",
                      minHeight: "70vh",
                    }}
                  >
                    <div>
                      <div>
                        <Image
                          src="/img/empty-box.png"
                          width={300}
                          height={300}
                        />
                      </div>
                      <h5 style={{ textAlign: "center", fontWeight: "100" }}>
                        You Curently have no Log
                      </h5>
                      <button
                        onClick={() => {
                          setType("createCategory");
                          setOpen(true);
                        }}
                        style={{
                          border: "none",
                          color: "white",
                          fontWeight: "800",
                          borderRadius: "10px",
                          fontSize: "1.2em",
                          background:
                            "linear-gradient(90deg, rgba(128,117,255,1) 0%, rgba(128,117,255,1) 35%, rgba(0,212,255,1) 100%)",
                        }}
                        className="btn-md  btn-block"
                      >
                        Add Log
                      </button>
                    </div>
                  </div>
                )}

                {categories && categories.length > 0 && (
                  <>
                    <div
                      style={{
                        flexDirection: "column",
                        border: "1px solid #e3dcdc",
                        borderRadius: "10px",
                        justifyContent: "flex-start",
                        padding: "20px 0px",
                        minHeight: "70vh",
                      }}
                    >
                      <div className="container">
                        <div className="row">
                          <div className="col-lg-12">
                            {/* <!-- Form content box start --> */}
                            <div>
                              {/* <!-- details --> */}
                              <a
                                href="/"
                                style={{ fontWeight: "900", fontSize: "1.5em" }}
                              >
                                Manage Logs{" "}
                              </a>
                              <div>
                                <LogsUpload categories={categories} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setType("createCategory");
                        setOpen(true);
                      }}
                      style={{
                        border: "none",
                        color: "white",
                        fontWeight: "800",
                        borderRadius: "10px",
                        fontSize: "1.2em",
                        background:
                          "linear-gradient(90deg, rgba(128,117,255,1) 0%, rgba(128,117,255,1) 35%, rgba(0,212,255,1) 100%)",
                      }}
                      className="btn-md  btn-block"
                    >
                      Add Category
                    </button>
                  </>
                )}
              </>
            </div>
          </div>
        </div>
      </div>
      <BasicModal open={open} type={type} handleClose={handleClose} />
      <ToastContainer />
    </div>
  );
};

export default Body;
