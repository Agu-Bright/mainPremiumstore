import { Avatar, Rating } from "@mui/material";
import Image from "next/image";
import React from "react";
import ImageComponent from "./ImageComponent";
import { useRouter } from "next/navigation";

function truncateString(str, maxLength) {
  if (str.length <= maxLength) {
    return str;
  } else {
    return str.slice(0, maxLength) + "..."; // Otherwise, truncate the string and append '...'
  }
}

const Card = ({ item, style, map }) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/${item?._id}`)}
      // style={{ }}
    >
      <div
        className="listing-item-box"
        style={{
          marginBottom: style ? "0px" : "40px",
          borderRadius: "5px",
          overflow: "hidden",
          border: "1px solid #beb8b8",
          minHeight: `${map ? "150px !important" : "322px !important"}`,
        }}
      >
        {!map && (
          <div className="listing-thumbnail">
            <a href="#" className="listing-photo">
              {/* <div
                className="tag rest_status_open res_status_closed"
                style={{ color: "white", background: "#1a53ef" }}
              >
                {item?.open || "open"}
              </div> */}
              {/* <img
              className="d-block w-100"
              src={item?.photos[0].url}
              alt="listing-photo"
            /> */}

              <ImageComponent
                src={item?.photos[0]?.url}
                alt="listing-photo"
                className="d-block w-100"
                style={{ height: "180px" }}
              />

              {/* <div className="user">
              <div className="avatar">
                <img
                  src="img/avatar/avatar-1.png"
                  alt="avatar"
                  className="img-fluid rounded-circle"
                />
              </div>
              <div className="name">
                <h5>Rx Vodro</h5>
              </div>
            </div> */}
            </a>
          </div>
        )}
        {map && (
          <Avatar
            src={item?.photos[0]?.url}
            alt="listing-photo"
            style={{ borderRadius: "2px", width: "100%", height: "100px" }}
          />
        )}
        <div className="detail">
          <div className="top">
            <h3
              className="title"
              style={{ display: `${map ? "flex" : "block"}` }}
            >
              <a href="#">{truncateString(`${item.name}`, 25)}</a>
            </h3>
            <div
              className="location"
              style={{ display: `${map ? "flex" : "block"}` }}
            >
              <a href="#">
                <i className="flaticon-pin"></i>{" "}
                {truncateString(`${item.addressLine}, ${item.city}`, 25)},
              </a>
            </div>
            {!map && (
              <div
                style={{
                  fontSize: "13px",
                  color: "#535353",
                }}
              >
                <span style={{ display: "inline-block" }}>
                  <Image width={20} height={20} src="/img/icons/booking.png" />
                </span>{" "}
                {truncateString(
                  `Booked ${item?.dailyBookedCount} ${
                    item?.dailyBookedCount > 1 ? "times" : "time"
                  } today`,
                  25
                )}
              </div>
            )}
            {!map && (
              <div
                style={{
                  fontSize: "13px",
                  color: "#535353",
                  margin: "5px 0px 0px 0px",
                }}
              >
                {item?.cuisine || "not specified"}{" "}
                <span style={{ fontWeight: "800" }}>.</span> &pound;
                {item?.priceRange[0]} - &pound;{item?.priceRange[1]}
              </div>
            )}
            {/* <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            </p> */}
          </div>

          <div
            className="ratings"
            style={{ display: `${map ? "flex" : "block"}` }}
          >
            <Rating
              name="read-only"
              value={item.rating}
              size="small"
              readOnly
              sx={{ color: "#faaf00 !important" }}
            />

            <span className="t_gray">( {item?.reviews.length} Reviews )</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
