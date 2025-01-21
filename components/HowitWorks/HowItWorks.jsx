import React from "react";

export const HowItWorks = () => {
  return (
    <div className="services content-area">
      <div className="container">
        {/* <!-- Main title --> */}
        <div className="main-title text-center">
          <h1 style={{ textAlign: "center" }}>How It Works</h1>
        </div>
        <div className="row">
          <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12">
            <div className="service-info">
              <div className="icon">
                <i className="flaticon-find-1"></i>
              </div>
              <h3>Find Interesting Restaurants</h3>
              <p>
                Browse through our listings to find the perfect spot for your
                next culinary adventure.
              </p>
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12">
            <div className="service-info">
              <div className="icon">
                <i className="flaticon-mail"></i>
              </div>
              <h3>Contact a Few Owners</h3>
              <p>
                Reach out to restaurant owners directly to inquire about
                reservations, special requests, or menu options.
              </p>
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12">
            <div className="service-info">
              <div className="icon">
                <i className="flaticon-user"></i>
              </div>
              <h3>Make a Reservation</h3>
              <p>
                Enjoy peace of mind knowing that your reservation is confirmed
                and your dining plans are set.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
