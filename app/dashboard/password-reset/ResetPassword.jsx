"use client";
import { useSearchParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import { Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

const ResetPassword = () => {
  const router = useRouter();
  const params = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [token] = params.getAll("token");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e, _password, _confirmPassword) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      toast.error("Fields Required", {
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
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords Don't match", {
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
      return;
    }
    try {
      setLoading(true);
      const { data } = await axios.post(`/api/auth/password-reset`, {
        password: _password,
        confirmPassword: _confirmPassword,
        token,
      });
      setLoading(false);
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
      router.push("/login");
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error?.response?.data?.message, {
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
                <a href="/" style={{ fontWeight: "900", fontSize: "1.5em" }}>
                  {/*
                   <img
                    src="img/logos/white-logo.png"
                    className="cm-logo"
                    alt="black-logo"
                  /> 
                  */}
                  Reset Password{" "}
                </a>
                {/* <!-- Name --> */}
                <form
                  onSubmit={(e) => handleSubmit(e, password, confirmPassword)}
                >
                  <div className="form-group">
                    <input
                      type="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="input-text"
                      placeholder="New Password"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="input-text"
                      placeholder="Confirm Password"
                    />
                  </div>
                  <div className="form-group mb-0">
                    {!loading && (
                      <button
                        type="submit"
                        className="btn-md button-theme btn-block"
                      >
                        Reset Password
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
                  Already a member? <Link href="user/login">Login here</Link>
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

export default ResetPassword;
