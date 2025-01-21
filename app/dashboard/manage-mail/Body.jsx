import InfoCards from "@components/InfoCard";
import Sidebar from "@components/Sidebar";
import { useSession } from "next-auth/react";
import React from "react";
import SendEmails from "./BulkMail";

const Body = () => {
  const { data: session } = useSession();
  const summary = {};
  return (
    <div className="dashboard">
      <div className="container-fluid ">
        <div className="row">
          <Sidebar />
          <div
            className="dashboard-content dashboard_row"
            style={{
              width: "100%",
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
                            Email Service
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
                              mail
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </>
              <SendEmails />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
