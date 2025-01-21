"use client";

import React, { createContext, useState } from "react";

export const FilterContext = createContext();

const FilterContextProvider = ({ children }) => {
  const [url, setUrl] = useState();
  const [pageType, setType] = useState();
  return (
    <FilterContext.Provider
      children={children}
      value={{ url, setUrl, pageType, setType }}
    />
  );
};

export default FilterContextProvider;
