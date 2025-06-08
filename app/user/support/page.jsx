"use client";
import LiveChatScript from "@components/LiveChat";
import NavPage from "@components/navPage/NavPage";
import {
  Box,
  CircularProgress,
  Stack,
  Typography,
  Grid,
  Paper,
  IconButton,
  Avatar,
} from "@mui/material";
import Image from "@node_modules/next/image";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import { Bounce } from "react-toastify"; // Import the Bounce transition if it's provided by your toast library
import "react-toastify/dist/ReactToastify.css";
export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleCopy = (address) => {
    // const referralCode = session?.user?.referalCode;
    if (address) {
      navigator.clipboard
        .writeText(address)
        .then(() => {
          toast.success("Copied to Clipboard", {
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
          // Optionally, display a notification or toast here
        })
        .catch((err) => {
          toast.error("copy failed", {
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
        });
    }
  };

  if (status === "loading") {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#EC5766",
        }}
      >
        <CircularProgress style={{ color: "#CDC5B4" }} />
      </div>
    );
  }

  if (status === "unauthenticated") {
    router.push("/user/login");
  } else
    return (
      <NavPage>
        <div
          className="container min-vh-100"
          style={{ paddingBottom: "400px" }}
        >
          <div className=" flex">
            <div className="d-flex justify-content-center">
              <svg
                width="70"
                height="70"
                viewBox="0 0 152 147"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse
                  cx="76"
                  cy="73.5"
                  rx="76"
                  ry="73.5"
                  fill="#D9D9D9"
                ></ellipse>
                <path
                  d="M72.8096 85.9893L72.7877 85.9415C72.347 85.8443 71.9089 85.7372 71.4736 85.6203L71.4408 85.6101C67.2765 84.4913 63.431 82.5175 60.1842 79.8323C56.6123 76.8827 53.8654 73.1599 52.1831 68.9885C50.5007 64.8171 49.9341 60.3237 50.5324 55.9003C51.1308 51.4769 52.876 47.2576 55.616 43.6104C58.3559 39.9632 62.0074 36.9988 66.252 34.9757C70.4966 32.9526 75.2055 31.9322 79.968 32.0035C84.7305 32.0748 89.4021 33.2356 93.5754 35.3847C97.7488 37.5338 101.297 40.606 103.911 44.3334C106.525 48.0607 108.125 52.3301 108.572 56.7692C108.715 58.1803 107.477 59.3317 105.963 59.3317C104.451 59.3317 103.243 58.1803 103.068 56.7726C102.586 52.8887 101.016 49.1929 98.5187 46.0588C96.0212 42.9247 92.684 40.4634 88.8445 38.9237C85.0051 37.3839 80.7994 36.8204 76.6527 37.2899C72.506 37.7595 68.5652 39.2455 65.2287 41.5979C61.8922 43.9502 59.2782 47.0854 57.6511 50.6866C56.0239 54.2877 55.4413 58.2272 55.962 62.1068C56.4827 65.9863 58.0883 69.6684 60.6165 72.7809C63.1447 75.8933 66.506 78.3258 70.3604 79.8323L70.5064 79.8904C71.2364 80.1706 71.9883 80.4166 72.7548 80.6319C73.4008 79.1705 74.5683 77.9642 76.0583 77.2186C77.5482 76.4729 79.2682 76.2341 80.9252 76.5429C82.5822 76.8517 84.0734 77.6889 85.1447 78.9118C86.216 80.1347 86.801 81.6676 86.8 83.2491C86.8016 84.8196 86.2253 86.3427 85.1681 87.5621C84.1108 88.7815 82.6372 89.6228 80.995 89.9444C79.3529 90.266 77.6426 90.0484 76.1518 89.328C74.6609 88.6077 73.4807 87.4287 72.8096 85.9893ZM69.2106 90.3355C62.7279 88.4452 56.9793 84.8173 52.6762 79.9007C50.0106 80.1929 47.5525 81.3914 45.7687 83.2684C43.985 85.1454 42.9997 87.5704 43 90.0826V92.5256C43 105.229 58.3665 114 79.5 114C100.634 114 116 104.747 116 92.5256V90.0826C116 87.3641 114.846 84.7569 112.793 82.8346C110.739 80.9123 107.954 79.8323 105.05 79.8323H91.7457C92.6067 82.5317 92.4221 85.4289 91.2243 88.0133C90.0265 90.5977 87.8926 92.7033 85.1986 93.9589C82.5047 95.2145 79.4236 95.5395 76.4987 94.8766C73.5738 94.2137 70.9928 92.6055 69.2106 90.3355ZM97.75 59.3317C97.75 54.1656 95.3045 49.5359 91.4318 46.4027C89.4888 44.8336 87.214 43.6657 84.7561 42.9753C82.2982 42.2849 79.7124 42.0875 77.1674 42.396C74.6225 42.7045 72.1757 43.5119 69.9867 44.7656C67.7977 46.0193 65.9157 47.691 64.4637 49.6717C63.0116 51.6523 62.0221 53.8974 61.5597 56.2603C61.0974 58.6231 61.1725 61.0508 61.7803 63.3846C62.3881 65.7185 63.5148 67.9061 65.087 69.8047C66.6592 71.7033 68.6414 73.2702 70.9043 74.4031C73.2533 72.3965 76.3199 71.286 79.5 71.2904C82.6811 71.2865 85.7487 72.3968 88.0994 74.4031C91.0155 72.9448 93.4536 70.7724 95.1533 68.1179C96.8531 65.4634 97.7506 62.4266 97.75 59.3317Z"
                  fill="#8075ff"
                ></path>
              </svg>
            </div>

            <div className="d-flex justify-content-center mt-3 mb-2">
              <strong> Customer Care </strong>
            </div>

            <div className="card my-3">
              <div className="card-body">
                {/* <div className="d-flex justify-content-start col-lg-12  col-sm-12 p-3 my-3 text-black-50">
                  <svg
                    className="mr-3"
                    width="40"
                    height="40"
                    viewBox="0 0 126 126"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      opacity="0.05"
                      cx="63"
                      cy="63"
                      r="63"
                      fill="#0601B4"
                    ></circle>
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M65 35C49.5356 35 37 47.5356 37 63C37 68.292 38.47 73.248 41.0264 77.4704L38.5288 85.96C38.3854 86.4474 38.376 86.9645 38.5015 87.4568C38.627 87.9491 38.8829 88.3986 39.2421 88.7579C39.6014 89.1171 40.0508 89.373 40.5432 89.4985C41.0355 89.624 41.5526 89.6146 42.04 89.4712L50.5296 86.9736C54.8939 89.6142 59.899 91.0069 65 91C80.4644 91 93 78.4644 93 63C93 47.5356 80.4644 35 65 35ZM58.6664 69.3364C64.3308 74.998 69.7376 75.7456 71.6472 75.8156C74.5508 75.922 77.3788 73.7044 78.4792 71.1312C78.6181 70.8111 78.6686 70.4595 78.6252 70.1133C78.5819 69.767 78.4463 69.4388 78.2328 69.1628C76.6984 67.2028 74.6236 65.7944 72.5964 64.3944C72.1731 64.1017 71.653 63.9843 71.1451 64.0668C70.6372 64.1493 70.1809 64.4252 69.872 64.8368L68.192 67.3988C68.1037 67.5365 67.966 67.6353 67.8073 67.6748C67.6485 67.7144 67.4806 67.6918 67.338 67.6116C66.1984 66.9592 64.538 65.8504 63.3452 64.6576C62.1524 63.4648 61.1108 61.88 60.5256 60.8132C60.453 60.6777 60.4321 60.5204 60.4666 60.3706C60.5011 60.2208 60.5887 60.0886 60.7132 59.9984L63.3004 58.0776C63.6696 57.7566 63.9079 57.3109 63.9699 56.8256C64.0318 56.3403 63.9131 55.8491 63.6364 55.4456C62.382 53.6088 60.9204 51.2736 58.8008 49.7252C58.5273 49.527 58.2068 49.4034 57.871 49.3665C57.5352 49.3297 57.1956 49.381 56.8856 49.5152C54.3096 50.6184 52.0808 53.4464 52.1872 56.3556C52.2572 58.2652 53.0048 63.672 58.6664 69.3364Z"
                      fill="#4B3459"
                    ></path>
                  </svg>

                  <div className="lh-100">
                    <h6 className="mb-0 text-black lh-100">
                      Whatsapp Announcement Group
                    </h6>
                    <a href="https://chat.whatsapp.com/LotGhr8csOs3pAYbkK14Eb">
                      <small>Click to join group</small>
                    </a>
                  </div>
                </div> */}

                <div className="d-flex align-items-center p-3 my-3 text-black-50 bg-purple rounded box-shadow">
                  <svg
                    className="mr-3"
                    width="40"
                    height="40"
                    viewBox="0 0 126 126"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      opacity="0.05"
                      cx="63"
                      cy="63"
                      r="63"
                      fill="#0601B4"
                    ></circle>
                    <path
                      d="M63 35C78.4644 35 91 47.5356 91 63C91 78.4644 78.4644 91 63 91C47.5356 91 35 78.4644 35 63C35 47.5356 47.5356 35 63 35ZM75.4376 51.8C74.3708 51.8196 72.7328 52.3796 64.8564 55.6136C59.3278 57.9217 53.8144 60.2662 48.3168 62.6472C46.9728 63.1764 46.2728 63.6916 46.2084 64.1956C46.0852 65.1644 47.4964 65.464 49.2716 66.0352C50.7192 66.5 52.668 67.0432 53.6816 67.0656C54.6 67.0852 55.6248 66.71 56.756 65.9456C64.484 60.7936 68.4684 58.1924 68.7204 58.1364C68.8968 58.0972 69.1404 58.0468 69.3084 58.1924C69.4736 58.338 69.4568 58.6124 69.4372 58.688C69.2972 59.2788 62.0424 65.7944 61.6252 66.2228L61.4236 66.4244C59.8836 67.9448 58.3296 68.9388 61.012 70.6832C63.4368 72.2596 64.848 73.2648 67.34 74.8832C68.936 75.9136 70.1876 77.1372 71.834 76.9888C72.5928 76.9188 73.374 76.216 73.7744 74.116C74.7124 69.16 76.5604 58.4136 76.986 53.984C77.0117 53.6166 76.9958 53.2474 76.9384 52.8836C76.9038 52.5899 76.7599 52.3199 76.5352 52.1276C76.1964 51.8532 75.67 51.7972 75.4376 51.8Z"
                      fill="#4B3459"
                    ></path>
                  </svg>

                  <div className="lh-100">
                    <h6 className="mb-0 text-black lh-100">
                      Telegram Announcement Group
                    </h6>
                    <a href="https://t.me/activest0re">
                      <small>Click to join group</small>
                    </a>
                  </div>
                </div>

                <div className="d-flex align-items-center p-3 my-3 text-black-50 bg-purple rounded box-shadow">
                  <a href="https://t.me/active_storee" target="_blank">
                    <svg
                      className="mr-3"
                      width="40"
                      height="40"
                      viewBox="0 0 126 126"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        opacity="0.05"
                        cx="63"
                        cy="63"
                        r="63"
                        fill="#0601B4"
                      ></circle>
                      <path
                        d="M63 35C78.4644 35 91 47.5356 91 63C91 78.4644 78.4644 91 63 91C47.5356 91 35 78.4644 35 63C35 47.5356 47.5356 35 63 35ZM75.4376 51.8C74.3708 51.8196 72.7328 52.3796 64.8564 55.6136C59.3278 57.9217 53.8144 60.2662 48.3168 62.6472C46.9728 63.1764 46.2728 63.6916 46.2084 64.1956C46.0852 65.1644 47.4964 65.464 49.2716 66.0352C50.7192 66.5 52.668 67.0432 53.6816 67.0656C54.6 67.0852 55.6248 66.71 56.756 65.9456C64.484 60.7936 68.4684 58.1924 68.7204 58.1364C68.8968 58.0972 69.1404 58.0468 69.3084 58.1924C69.4736 58.338 69.4568 58.6124 69.4372 58.688C69.2972 59.2788 62.0424 65.7944 61.6252 66.2228L61.4236 66.4244C59.8836 67.9448 58.3296 68.9388 61.012 70.6832C63.4368 72.2596 64.848 73.2648 67.34 74.8832C68.936 75.9136 70.1876 77.1372 71.834 76.9888C72.5928 76.9188 73.374 76.216 73.7744 74.116C74.7124 69.16 76.5604 58.4136 76.986 53.984C77.0117 53.6166 76.9958 53.2474 76.9384 52.8836C76.9038 52.5899 76.7599 52.3199 76.5352 52.1276C76.1964 51.8532 75.67 51.7972 75.4376 51.8Z"
                        fill="#4B3459"
                      ></path>
                    </svg>
                  </a>

                  <div className="lh-100">
                    <h6 className="mb-0 text-black lh-100">Complaints</h6>
                    <a href="https://t.me/active_storee">
                      <small>Click here to log your complaints</small>
                    </a>
                  </div>
                </div>

                <div className="d-flex align-items-center p-3 my-3 text-black-50 bg-purple rounded box-shadow">
                  <a href="#" target="_blank" style={{ marginRight: "20px" }}>
                    {/* <svg
                      className="mr-3"
                      width="40"
                      height="40"
                      viewBox="0 0 126 126"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        opacity="0.05"
                        cx="63"
                        cy="63"
                        r="63"
                        fill="#0601B4"
                      ></circle>
                      <path
                        d="M63 35C78.4644 35 91 47.5356 91 63C91 78.4644 78.4644 91 63 91C47.5356 91 35 78.4644 35 63C35 47.5356 47.5356 35 63 35ZM75.4376 51.8C74.3708 51.8196 72.7328 52.3796 64.8564 55.6136C59.3278 57.9217 53.8144 60.2662 48.3168 62.6472C46.9728 63.1764 46.2728 63.6916 46.2084 64.1956C46.0852 65.1644 47.4964 65.464 49.2716 66.0352C50.7192 66.5 52.668 67.0432 53.6816 67.0656C54.6 67.0852 55.6248 66.71 56.756 65.9456C64.484 60.7936 68.4684 58.1924 68.7204 58.1364C68.8968 58.0972 69.1404 58.0468 69.3084 58.1924C69.4736 58.338 69.4568 58.6124 69.4372 58.688C69.2972 59.2788 62.0424 65.7944 61.6252 66.2228L61.4236 66.4244C59.8836 67.9448 58.3296 68.9388 61.012 70.6832C63.4368 72.2596 64.848 73.2648 67.34 74.8832C68.936 75.9136 70.1876 77.1372 71.834 76.9888C72.5928 76.9188 73.374 76.216 73.7744 74.116C74.7124 69.16 76.5604 58.4136 76.986 53.984C77.0117 53.6166 76.9958 53.2474 76.9384 52.8836C76.9038 52.5899 76.7599 52.3199 76.5352 52.1276C76.1964 51.8532 75.67 51.7972 75.4376 51.8Z"
                        fill="#4B3459"
                      ></path>
                    </svg> */}
                    <Image
                      src="/img/gmail.png"
                      alt="gmail"
                      width={25}
                      height={25}
                    />
                  </a>

                  <div className="lh-100">
                    <h6 className="mb-0 text-black lh-100">
                      Payment Complaints
                    </h6>
                    <p
                      onClick={() => handleCopy("paymentactivestore@gmail.com")}
                      style={{ textDecoration: "underline", cursor: "pointer" }}  
                    >
                      paymentactivestore@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ height: "100px" }}></div>
          </div>
        </div>
        <ToastContainer />
      </NavPage>
    );
}
