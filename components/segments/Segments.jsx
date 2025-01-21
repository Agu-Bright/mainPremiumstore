"use client";

import React, { useEffect, useState, useContext } from "react";
import CardList from "./components/CardList";
import "@components/segments/segment.css";
import Button from "@components/Button/Button";
import { Skeleton } from "@mui/material";
import CardListLoading from "./components/CardListLoading";
import { FilterContext } from "@context/FilterContext";
import { useRouter } from "next/navigation";
import { RestaurantContext } from "@context/RestaurantContext";
export const Segments = () => {
  //fetch popular restaurants
  const { setUrl, setType } = useContext(FilterContext);
  const { clearFilter } = useContext(RestaurantContext);
  const [loadingPop, setLoadingPop] = useState(true);
  const [loadingNew, setLoadingNew] = useState(true);
  const [loadingFeatured, setLoadingFeatured] = useState(true);

  const [popular, setPopular] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [newRes, setNewRes] = useState([]);

  const router = useRouter();
  useEffect(() => {
    (async () => {
      setLoadingPop(true);
      const res = await fetch(
        "/api/restaurant?sortBy=dailyBookedCount&order=-1"
      );
      const data = await res.json();
      setPopular(data?.restaurants);
      setLoadingPop(false);
    })();

    (async () => {
      setLoadingFeatured(true);
      const res = await fetch("/api/restaurant?featured=true");
      const data = await res.json();
      setFeatured(data?.restaurants);
      setLoadingFeatured(false);
    })();

    (async () => {
      setLoadingNew(true);
      const res = await fetch("/api/restaurant?new=true");
      const data = await res.json();
      setNewRes(data?.restaurants);
      setLoadingNew(false);
    })();
  }, []);

  const handleClickP = () => {
    clearFilter();
    router.push("/restaurants?value=Popular");
    setUrl("/api/restaurant?sortBy=dailyBookedCount&order=-1");
    setType("popular");
  };
  const handleClickF = () => {
    clearFilter();
    router.push("/restaurants?value=Featured");
    setUrl("/api/restaurant?featured=true");
    setType("featured");
  };
  const handleClickN = () => {
    clearFilter();
    router.push("/restaurants?value=New");
    setUrl("/api/restaurant?new=true");
    setType("new");
  };
  return (
    <>
      <div className="listing-item content-area-14 bg-grea-3">
        <div className="container">
          {/* <!-- Main title --> */}
          {popular.length > 0 && (
            <div className="main-title flex-up">
              <h1>Popular Restaurants in York City</h1>

              <Button text="See More" handleClick={handleClickP} />
            </div>
          )}
          {loadingPop ? (
            <CardListLoading />
          ) : (
            <>
              {popular ? (
                <CardList restaurants={popular} />
              ) : (
                <div>Nothing to see here</div>
              )}
            </>
          )}
        </div>
      </div>
      {featured.length > 0 && (
        <div className="listing-item content-area-14 bg-grea-3">
          <div className="container">
            {/* <!-- Main title --> */}
            <div className="main-title flex-up">
              {featured && <h1>Featured Restaurants in York City</h1>}
              <Button text="See More" handleClick={handleClickF} />
            </div>
            {loadingFeatured ? (
              <CardListLoading />
            ) : (
              <>
                {featured ? (
                  <CardList restaurants={featured} />
                ) : (
                  <div>Nothing to see here</div>
                )}
              </>
            )}
          </div>
        </div>
      )}
      <div className="listing-item content-area-14 bg-grea-3">
        <div className="container">
          {/* <!-- Main title --> */}
          {newRes.length > 0 && (
            <div className="main-title flex-up">
              <h1>New Restaurants to RedTable in York City</h1>

              <Button text="See More" handleClick={handleClickN} />
            </div>
          )}
          {loadingNew ? (
            <CardListLoading />
          ) : (
            <>
              {featured ? (
                <CardList restaurants={newRes} />
              ) : (
                <div>Nothing to see here</div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};
