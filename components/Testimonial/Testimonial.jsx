import React from "react";

const Testimonial = () => {
  return (
    <div className="testimonial overview-bgi">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="main-title">
              <h1>Our Testimonial</h1>
            </div>
          </div>
        </div>
        <div className="slick-slider-area">
          <div
            className="row slick-carousel wow fadeInUp delay-04s"
            data-slick='{"slidesToShow": 3, "responsive":[{"breakpoint": 1024,"settings":{"slidesToShow": 2}}, {"breakpoint": 768,"settings":{"slidesToShow": 1}}]}'
          >
            <div className="slick-slide-item wow">
              <div className="testimonial-inner">
                <div className="content-box">
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever
                  </p>
                </div>
                <div className="arrow-down"></div>
                <div className="media user">
                  <a href="#">
                    <img
                      src="img/avatar/avatar-1.png"
                      alt="testimonial"
                      className="img-fluid"
                    />
                  </a>
                  <div className="media-body align-self-center">
                    <h5>Maria Blank</h5>
                    <h6>Web Developer</h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="slick-slide-item wow">
              <div className="testimonial-inner">
                <div className="content-box">
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever
                  </p>
                </div>
                <div className="arrow-down"></div>
                <div className="media user">
                  <a href="#">
                    <img
                      src="img/avatar/avatar-2.png"
                      alt="testimonial"
                      className="img-fluid"
                    />
                  </a>
                  <div className="media-body align-self-center">
                    <h5>Karen Paran</h5>
                    <h6>Support Manager</h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="slick-slide-item">
              <div className="testimonial-inner">
                <div className="content-box">
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever
                  </p>
                </div>
                <div className="arrow-down"></div>
                <div className="media user">
                  <a href="#">
                    <img
                      src="img/avatar/avatar-3.png"
                      alt="testimonial"
                      className="img-fluid"
                    />
                  </a>
                  <div className="media-body align-self-center">
                    <h5>John Pitarshon</h5>
                    <h6>Creative Director</h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="slick-slide-item">
              <div className="testimonial-inner">
                <div className="content-box">
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever
                  </p>
                </div>
                <div className="arrow-down"></div>
                <div className="media user">
                  <a href="#">
                    <img
                      src="img/avatar/avatar-4.png"
                      alt="testimonial"
                      className="img-fluid"
                    />
                  </a>
                  <div className="media-body align-self-center">
                    <h5>John Pitarshon</h5>
                    <h6>Creative Director</h6>
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

export default Testimonial;
