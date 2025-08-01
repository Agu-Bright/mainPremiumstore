"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { createContext, useEffect, useState } from "react";
export const RestaurantContext = createContext();

const RestaurantContextProvider = ({ children }) => {
  const { data: session, status } = useSession();
  const [myWallet, setMyWallet] = useState(null);
  const [user, setUser] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [search, setSearch] = useState("");
  const [amount, setAmount] = useState("");
  const [page, setPage] = useState(1);
  const [refreshed, setRefreshed] = useState(false);
  const [restaurantIntent, setRestaurantIntent] = useState(false);
  const [state, setState] = useState("reservation");
  const [task, setTask] = useState(false);
  const [myCountry, setMyCountry] = useState("");
  const [sidebar2, setSideBar2] = useState(false);
  const [globalCat, setGlobalCat] = useState([]);
  const [activeLoading, setActiveLoading] = useState(false);
  //reservation Data
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [activeSub, setActiveSub] = useState();
  const [togggleWallet, setToggleWallet] = useState(true);
  const [toggle, setToggle] = useState(true);
  const [catType, setCatType] = useState("");
  const [logId, setLogId] = useState("");

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState(false);
  const [type2, setType2] = useState("");
  const handleOpen = () => setOpen(false);
  const handleClose = () => {
    setActiveLog("");
    setOpen(false);
  };
  const [activeLog, setActiveLog] = useState("");

  const clearFilter = () => {
    setCuisine("");
    setSearch("");
  };
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`/api/auth/me`);
        setUser(data?.user);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [toggle]);

  //==================== score box =====================
  function formatDate(date) {
    const padZero = (num) => num.toString().padStart(2, "0");

    const year = date.getFullYear();
    const month = padZero(date.getMonth() + 1); // Months are zero-based
    const day = padZero(date.getDate());
    const hours = padZero(date.getHours());
    const minutes = padZero(date.getMinutes());
    const seconds = padZero(date.getSeconds());

    return `${year}-${month}-${day} 00:00:00`;
  }

  const [active, setActive] = useState("home");
  const [totalP, setTotalp] = useState("home");

  const [rate, setRate] = useState("");
  const [percentage, setPercentage] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/api/get-rate");
        console.log("data", data);
        setPercentage(data?.rate?.percentage);
        setRate(data?.rate);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [state]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`/api/get-wallet`);
        setMyWallet(data?.wallet);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [togggleWallet, state]);

  useEffect(() => {
    const today = new Date();
    const day = formatDate(today);
    console.log(day);

    (async () => {
      try {
        // const { data } = await axios.post("/api/get-today-profit", {
        //   date: day,
        // });
        setTotalp(12);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [togggleWallet]);

  function formatMoney(number) {
    if (number === undefined || number === null) {
      console.error("Invalid value provided to formatMoney");
      return "₦0.00"; // Return a default value or handle the error as needed
    }

    const numericValue = Number(number);

    if (isNaN(numericValue)) {
      console.error("Value provided to formatMoney is not a number");
      return "₦0.00"; // Return a default value or handle the error as needed
    }

    return numericValue.toLocaleString("en-US", {
      style: "currency",
      currency: "NGN",
    });
  }

  function formatDateToReadable(dateString) {
    const date = new Date(dateString);
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const day = date.getDate();
    const hour = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();

    return `${day} ${month} ${year}: ${hour}:${min}:${sec}`;
  }

  function formatDollar(number) {
    if (number === undefined || number === null) {
      console.error("Invalid value provided to formatMoney");
      return "$0.00";
    }

    const numericValue = Number(number);

    if (isNaN(numericValue)) {
      console.error("Value provided to formatMoney is not a number");
      return "$0.00";
    }

    return numericValue.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  return (
    <RestaurantContext.Provider
      value={{
        cuisine,
        setCuisine,
        search,
        setSearch,
        page,
        setPage,
        clearFilter,
        date,
        setDate,
        time,
        setTime,
        refreshed,
        setRefreshed,
        restaurantIntent,
        setRestaurantIntent,
        activeSub,
        setActiveSub,
        state,
        setState,
        user,
        setUser,
        myCountry,
        //==================score box =========
        active,
        setActive,
        open,
        setOpen,
        handleOpen,
        handleClose,
        myWallet,
        setMyWallet,
        task,
        setTask,
        setToggleWallet,
        totalP,
        setTotalp,
        formatMoney,
        formatDateToReadable,
        toggle,
        setToggle,
        type,
        setType,
        catType,
        setCatType,
        activeLog,
        setActiveLog,
        logId,
        setLogId,
        loading,
        setLoading,
        sidebar2,
        setSideBar2,
        globalCat,
        setGlobalCat,
        type2,
        setType2,
        rate,
        formatDollar,
        activeLoading,
        setActiveLoading,
        percentage,
        setPercentage,
        amount,
        setAmount,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};

export default RestaurantContextProvider;
