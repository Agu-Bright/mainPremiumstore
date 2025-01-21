import React from "react";

const Spinner = () => {
  return (
    <div
      style={{
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div className="spinner"></div>
      <style jsx>{`
        .spinner {
          width: 56px;
          height: 56px;
          border: 11.2px #7247ff double;
          border-left-style: solid;
          border-radius: 50%;
          animation: spinner-aib1d7 0.75s infinite linear;
        }

        @keyframes spinner-aib1d7 {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Spinner;
