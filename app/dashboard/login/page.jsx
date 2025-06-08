"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect } from "react";
import { Formik } from "formik";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import { Bounce } from "react-toastify"; // Import the Bounce transition if it's provided by your toast library
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";
import { RestaurantContext } from "@context/RestaurantContext";
const page = () => {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user) {
      router.push("/");
    }
  }, [session]);

  return (
    <>
      <div
        className="contact-section overview-bgi"
        style={{ flexDirection: "column" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              {/* <!-- Form content box start --> */}
              <div className="form-content-box">
                {/* <!-- details --> */}
                <div className="details">
                  {/* <!-- Logo --> */}
                  <a href="/" style={{ fontWeight: "900", fontSize: "1.5em" }}>
                    Active Store{" "}
                  </a>
                  {/* <!-- Name --> */}
                  <h2 style={{ fontWeight: "800", color: "#8075ff" }}>
                    Good To see you!!
                  </h2>
                  <h3 style={{ fontSize: "0.8em" }}>
                    Welcome back, let's get started{" "}
                  </h3>

                  {/* <!-- Form start --> */}
                  <Formik
                    initialValues={{ username: "", password: "" }}
                    validate={(values) => {
                      const errors = {};
                      if (!values.username) {
                        errors.username = "Required";
                      }
                      return errors;
                    }}
                    onSubmit={async (values, { setSubmitting }) => {
                      const status = await signIn("credentials", {
                        redirect: false,
                        accountName: values.username,
                        password: values.password,
                        callbackUrl: "/",
                      });
                      if (status.ok) {
                        router.push("/dashboard");
                        setSubmitting(false);
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
                          theme: "light",
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
                            type="text"
                            name="username"
                            className="input-text"
                            placeholder="Account Name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.username}
                          />
                          <span style={{ color: "red" }}>
                            {" "}
                            {errors.username &&
                              touched.username &&
                              errors.username}
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
                            {errors.password &&
                              touched.password &&
                              errors.password}
                          </span>
                        </div>

                        <div className="form-group mb-0">
                          <button
                            type="submit"
                            className="btn-md button-theme btn-block"
                            disabled={isSubmitting}
                            style={{ background: "orange", color: "white" }}
                          >
                            {isSubmitting ? (
                              <CircularProgress
                                size={20}
                                sx={{ color: "white" }}
                              />
                            ) : (
                              "Sign In Now"
                            )}
                          </button>
                        </div>
                      </form>
                    )}
                  </Formik>
                  {/* googel signin */}
                  {/* <button
                  onClick={() =>
                    signIn("google", {
                      callbackUrl: `${
                        restaurantIntent
                          ? "http://localhost:3000/pricing"
                          : "http://localhost:3000"
                      }`,
                    })
                  }
                  className="btn-md btn-block"
                  style={{
                    padding: "0px",
                    height: "auto",
                    marginTop: "7px",
                    background: "white",
                    color: "black",
                    fontWeight: "600",
                    border: "1px solid #b6afaf",
                  }}
                >
                  <span>
                    <Image
                      height={30}
                      width={30}
                      alt="svgImg"
                      src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiPgo8cGF0aCBmaWxsPSIjZjllNjVjIiBkPSJNODQuNDY3LDQ0SDUwdjEzaDIwLjg1NkM2Ny45MzEsNjUuNzE3LDU5LjcwMiw3Miw1MCw3MmMtMTIuMTUsMC0yMi05Ljg1LTIyLTIyczkuODUtMjIsMjItMjIJYzQuNzk5LDAsOS4yMzUsMS41NDEsMTIuODUxLDQuMTQ5bDkuMjY5LTkuMjY5QzY2LjA5MSwxNy45NTYsNTguMzkxLDE1LDUwLDE1Yy0xOS4zMywwLTM1LDE1LjY3LTM1LDM1czE1LjY3LDM1LDM1LDM1CXMzNS0xNS42NywzNS0zNUM4NSw0Ny45NTIsODQuODA2LDQ1Ljk1MSw4NC40NjcsNDR6Ij48L3BhdGg+PHBhdGggZmlsbD0iIzc4YTJkMiIgZD0iTTUwLDU3aDIwLjg1NmMtMS41NzcsNC42OTktNC43MDQsOC42NzktOC43NjMsMTEuMzZsOS44Nyw4Ljg4NEM3OS45MTEsNzAuODI4LDg1LDYxLjAxLDg1LDUwCWMwLTIuMDQ4LTAuMTk0LTQuMDQ5LTAuNTMzLTZINTBWNTd6Ij48L3BhdGg+PHBhdGggZmlsbD0iIzYwYmU5MiIgZD0iTTYyLjA5Myw2OC4zNkM1OC42MjIsNzAuNjUzLDU0LjQ3Miw3Miw1MCw3MmMtOC45OTcsMC0xNi43MjctNS40MDMtMjAuMTM3LTEzLjEzOUwxOC44MTgsNjUuODkJQzI0LjYwOSw3Ny4yMywzNi4zOTMsODUsNTAsODVjOC4zMiwwLDE1Ljk1Ny0yLjkwOCwyMS45NjMtNy43NTZMNjIuMDkzLDY4LjM2eiI+PC9wYXRoPjxwYXRoIGZpbGw9IiNmMTViNmMiIGQ9Ik0yOS42NzcsNDEuNTY5QzMyLjk4NSwzMy42MDMsNDAuODM3LDI4LDUwLDI4YzQuNzk5LDAsOS4yMzUsMS41NDEsMTIuODUxLDQuMTQ5bDkuMjY5LTkuMjY5CUM2Ni4wOTEsMTcuOTU2LDU4LjM5MSwxNSw1MCwxNWMtMTMuNzcyLDAtMjUuNjgxLDcuOTU4LTMxLjM5NCwxOS41MjRMMjkuNjc3LDQxLjU2OXoiPjwvcGF0aD48cGF0aCBmaWxsPSIjMWYyMTJiIiBkPSJNNTAsODZjLTE5Ljg1MSwwLTM2LTE2LjE0OS0zNi0zNnMxNi4xNDktMzYsMzYtMzZjOC4yNzEsMCwxNi4zNTMsMi44NzgsMjIuNzUzLDguMTA1CWMwLjIxOSwwLjE3OSwwLjM1MiwwLjQ0MiwwLjM2NiwwLjcyNGMwLjAxNCwwLjI4Mi0wLjA5MiwwLjU1OC0wLjI5MiwwLjc1N2wtOS4yNjksOS4yNjljLTAuMzQ3LDAuMzQ3LTAuODk1LDAuMzkxLTEuMjkyLDAuMTA0CUM1OC42NzUsMzAuMzY5LDU0LjQzMywyOSw1MCwyOWMtMTEuNTc5LDAtMjEsOS40Mi0yMSwyMXM5LjQyMSwyMSwyMSwyMWM4LjU2MywwLDE2LjE5Ni01LjE2OCwxOS40MTctMTNINTBjLTAuNTUzLDAtMS0wLjQ0OC0xLTFWNDQJYzAtMC41NTIsMC40NDctMSwxLTFoMzQuNDY3YzAuNDg2LDAsMC45MDIsMC4zNSwwLjk4NSwwLjgyOUM4NS44MTUsNDUuOTIyLDg2LDQ3Ljk5OSw4Niw1MEM4Niw2OS44NTEsNjkuODUxLDg2LDUwLDg2eiBNNTAsMTYJYy0xOC43NDgsMC0zNCwxNS4yNTItMzQsMzRzMTUuMjUyLDM0LDM0LDM0czM0LTE1LjI1MiwzNC0zNGMwLTEuNjI0LTAuMTI5LTMuMzAyLTAuMzg0LTVINTF2MTFoMTkuODU2CWMwLjMyMiwwLDAuNjI0LDAuMTU1LDAuODEyLDAuNDE2YzAuMTg4LDAuMjYxLDAuMjM5LDAuNTk3LDAuMTM3LDAuOTAyQzY4LjY1Nyw2Ni42OTgsNTkuODk1LDczLDUwLDczYy0xMi42ODMsMC0yMy0xMC4zMTgtMjMtMjMJczEwLjMxNy0yMywyMy0yM2M0LjU2OSwwLDguOTU0LDEuMzI5LDEyLjczNSwzLjg1MWw3Ljg4My03Ljg4M0M2NC43MiwxOC40NjcsNTcuNDQyLDE2LDUwLDE2eiI+PC9wYXRoPjxwYXRoIGZpbGw9IiMxZjIxMmIiIGQ9Ik03MS41LDc4Yy0wLjExOSwwLTAuMjM5LTAuMDQyLTAuMzM1LTAuMTI4bC00LTMuNmMtMC4yMDUtMC4xODUtMC4yMjItMC41MDEtMC4wMzctMC43MDYJYzAuMTg3LTAuMjA1LDAuNTAyLTAuMjIxLDAuNzA3LTAuMDM3bDQsMy42YzAuMjA1LDAuMTg1LDAuMjIyLDAuNTAxLDAuMDM3LDAuNzA2QzcxLjc3Miw3Ny45NDQsNzEuNjM3LDc4LDcxLjUsNzh6Ij48L3BhdGg+PHBhdGggZmlsbD0iIzFmMjEyYiIgZD0iTTY1LjUsNzIuNmMtMC4xMTksMC0wLjIzOS0wLjA0Mi0wLjMzNS0wLjEyOGwtMS43NzctMS42Yy0wLjIwNS0wLjE4NS0wLjIyMi0wLjUwMS0wLjAzNy0wLjcwNgljMC4xODctMC4yMDUsMC41MDItMC4yMjEsMC43MDctMC4wMzdsMS43NzcsMS42YzAuMjA1LDAuMTg1LDAuMjIyLDAuNTAxLDAuMDM3LDAuNzA2QzY1Ljc3Miw3Mi41NDQsNjUuNjM3LDcyLjYsNjUuNSw3Mi42eiI+PC9wYXRoPjxwYXRoIGZpbGw9IiMxZjIxMmIiIGQ9Ik0yNy45MjksNjBjLTAuMTY1LDAtMC4zMjYtMC4wODItMC40MjItMC4yMzFjLTAuMTQ4LTAuMjMzLTAuMDc5LTAuNTQyLDAuMTUzLTAuNjlsMS41NzEtMQljMC4yMzEtMC4xNDYsMC41NDEtMC4wOCwwLjY5LDAuMTUzYzAuMTQ4LDAuMjMzLDAuMDc5LDAuNTQyLTAuMTUzLDAuNjlsLTEuNTcxLDFDMjguMTE0LDU5Ljk3NSwyOC4wMjEsNjAsMjcuOTI5LDYweiI+PC9wYXRoPjxwYXRoIGZpbGw9IiMxZjIxMmIiIGQ9Ik0yMy41LDYyLjgxOGMtMC4xNjUsMC0wLjMyNi0wLjA4Mi0wLjQyMi0wLjIzMWMtMC4xNDgtMC4yMzMtMC4wNzktMC41NDIsMC4xNTMtMC42OWwyLTEuMjczCWMwLjIzMS0wLjE0NiwwLjU0MS0wLjA4MSwwLjY5LDAuMTUzYzAuMTQ4LDAuMjMzLDAuMDc5LDAuNTQyLTAuMTUzLDAuNjlsLTIsMS4yNzNDMjMuNjg2LDYyLjc5MywyMy41OTMsNjIuODE4LDIzLjUsNjIuODE4eiI+PC9wYXRoPjxwYXRoIGZpbGw9IiMxZjIxMmIiIGQ9Ik0xOC41LDY2Yy0wLjE2NSwwLTAuMzI2LTAuMDgyLTAuNDIyLTAuMjMxYy0wLjE0OC0wLjIzMy0wLjA3OS0wLjU0MiwwLjE1My0wLjY5bDMtMS45MDkJYzAuMjMtMC4xNDYsMC41NDEtMC4wOCwwLjY5LDAuMTUzYzAuMTQ4LDAuMjMzLDAuMDc5LDAuNTQyLTAuMTUzLDAuNjlsLTMsMS45MDlDMTguNjg2LDY1Ljk3NSwxOC41OTMsNjYsMTguNSw2NnoiPjwvcGF0aD48cGF0aCBmaWxsPSIjMWYyMTJiIiBkPSJNMjQuNSwzOC4xODJjLTAuMDkzLDAtMC4xODYtMC4wMjUtMC4yNjktMC4wNzhsLTUtMy4xODJjLTAuMjMyLTAuMTQ4LTAuMzAyLTAuNDU4LTAuMTUzLTAuNjkJYzAuMTQ5LTAuMjMzLDAuNDYtMC4yOTksMC42OS0wLjE1M2w1LDMuMTgyYzAuMjMyLDAuMTQ4LDAuMzAyLDAuNDU4LDAuMTUzLDAuNjlDMjQuODI2LDM4LjEsMjQuNjY1LDM4LjE4MiwyNC41LDM4LjE4MnoiPjwvcGF0aD48cGF0aCBmaWxsPSIjMWYyMTJiIiBkPSJNMjcuNSw0MC4wOTFjLTAuMDkzLDAtMC4xODYtMC4wMjUtMC4yNjktMC4wNzhsLTEtMC42MzZjLTAuMjMyLTAuMTQ4LTAuMzAyLTAuNDU4LTAuMTUzLTAuNjkJYzAuMTUtMC4yMzMsMC40Ni0wLjI5OSwwLjY5LTAuMTUzbDEsMC42MzZjMC4yMzIsMC4xNDgsMC4zMDIsMC40NTgsMC4xNTMsMC42OUMyNy44MjYsNDAuMDA5LDI3LjY2NSw0MC4wOTEsMjcuNSw0MC4wOTF6Ij48L3BhdGg+Cjwvc3ZnPg=="
                    />
                  </span>{" "}
                  login with Google
                </button> */}
                </div>
                {/* <!-- Footer --> */}
                <div className="footer">
                  <span>
                    <Link href="/dashboard/forgotPassword">
                      Forgot Password
                    </Link>
                  </span>
                </div>
              </div>
              {/* <!-- Form content box end --> */}
            </div>
          </div>
        </div>
        <ToastContainer />
        <p style={{ color: "white", zIndex: "999", marginTop: "30px" }}>
          Copyright @2024 Active Store.
        </p>
      </div>
    </>
  );
};

export default page;
