import React from "react";

export const Featured = () => {
  return (
    <div className="categories content-area-7">
      <div className="container">
        {/* <!-- Main title --> */}
        <div className="main-title text-center">
          <h1>Trending Dishes in York City</h1>
        </div>
        <div className="row">
          <div className="col-lg-5 col-md-12 col-sm-12 col-pad">
            <div className="category">
              <div
                className="category_bg_box category_long_bg "
                style={{
                  backgroundImage: `url(../img/popular-places/popular-places-1.jpg)`,
                }}
              >
                <div className="category-overlay">
                  <div className="icon">
                    <i className="flaticon-guitar"></i>
                  </div>
                  <div className="category-content">
                    <h3 className="category-title">
                      <a href="#">The Cheesecake Factory</a>
                    </h3>
                    <h4 className="category-subtitle">52 Listings</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-7 col-md-12 col-sm-12">
            <div className="row">
              <div className="col-sm-6 col-pad">
                <div className="category">
                  <div
                    className="category_bg_box"
                    style={{
                      backgroundImage: `url(../img/popular-places/popular-places-2.jpg)`,
                    }}
                  >
                    <div className="category-overlay">
                      <div className="icon">
                        <i className="flaticon-shop"></i>
                      </div>
                      <div className="category-content">
                        <h3 className="category-title">
                          <a href="#">Olive Garden</a>
                        </h3>
                        <h4 className="category-subtitle">40 Listings</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-pad">
                <div className="category">
                  <div
                    className="category_bg_box"
                    style={{
                      backgroundImage: `url(../img/popular-places/popular-places-3.jpg)`,
                    }}
                  >
                    <div className="category-overlay">
                      <div className="icon">
                        <i className="flaticon-hotel"></i>
                      </div>
                      <div className="category-content">
                        <h3 className="category-title">
                          <a href="#">Red Lobster</a>
                        </h3>
                        <h4 className="category-subtitle">32 Listings</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-pad">
                <div className="category">
                  <div
                    className="category_bg_box "
                    style={{
                      backgroundImage: `url(../img/popular-places/popular-places-4.jpg)`,
                    }}
                  >
                    <div className="category-overlay">
                      <div className="icon">
                        <i className="flaticon-cook"></i>
                      </div>
                      <div className="category-content">
                        <h3 className="category-title">
                          <a href="#">Shake Shack</a>
                        </h3>
                        <h4 className="category-subtitle">24 Listings</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-pad">
                <div className="category">
                  <div
                    className="category_bg_box"
                    style={{
                      backgroundImage: `url(../img/popular-places/popular-places-5.jpg)`,
                    }}
                  >
                    <div className="category-overlay">
                      <div className="icon">
                        <i className="flaticon-gym"></i>
                      </div>
                      <div className="category-content">
                        <h3 className="category-title">
                          <a href="#">Ruth's Chris Steak House</a>
                        </h3>
                        <h4 className="category-subtitle">48 Listings</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
