import React from "react";
import "@components/Button/button.css";
const Button = ({ text, handleClick, style }) => {
  return (
    <button onClick={handleClick} style={style} className="contaner">
      {text}
    </button>
  );
};

export default Button;
