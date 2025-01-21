"use client";
import React, { useContext, useState } from "react";
import "@components/Banner/banner.css";
import { RestaurantContext } from "@context/RestaurantContext";
import { useRouter } from "next/navigation";

export const Banner = () => {
  const router = useRouter();
  const { search, setSearch, myCountry } = useContext(RestaurantContext);
  myCountry && console.log(myCountry);
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = () => {
    router.push("/restaurants");
  };
  const [value, setValue] = useState();
  const handleKeyPress = () => {};
  return (
    <div className="banner clearfix new_banner_style" id="banner">
      <div id="bannerCarousole" className="carousel slide" data-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item banner-max-height active item-bg">
            <img
              className="d-block w-100 h-100"
              src="img/banner/img-2.jpg"
              alt="banner"
            />
            <div className="carousel-caption banner-slider-inner d-flex text-center"></div>
          </div>
        </div>
      </div>
      <div className="banner-inner-2">
        <div className="container">
          <div className="text-center">
            <h1>Discover the Best Restaurants</h1>
            <p>
              Discover Culinary Delights Near You: Your Gateway to Great Eats!
            </p>
            <div className="inline-search-area ml-auto mr-auto">
              <div className="search-boxs lskdf">
                <div className="search-col">
                  <input
                    type="text"
                    name="search"
                    onChange={handleChange}
                    value={search}
                    className="form-control has-icon b-radius"
                    placeholder="What are you looking for?"
                  />
                </div>
                <div className="search-col">
                  <i className="fa fa-map-marker icon-append"></i>
                  <input
                    type="text"
                    name="location"
                    className="form-control has-icon b-radius"
                    placeholder="Location"
                    // onChange={(e) => setValue("York")}
                    defaultValue={myCountry}
                  />
                </div>
                <div className="find">
                  <button
                    onClick={handleSubmit}
                    className="btn button-theme btn-search btn-block b-radius"
                  >
                    <i className="fa fa-search"></i>
                    <strong>Find</strong>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
