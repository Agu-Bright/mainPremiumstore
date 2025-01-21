import React, { useState, useEffect, useRef } from "react";
import { Skeleton } from "@mui/material";

const ImageComponent = ({ src, alt, className, style }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const img = new Image();
    img.onload = handleImageLoad;
    img.src = src;

    return () => {
      img.onload = null; // Clean up the event listener
    };
  }, [src]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <>
      <Skeleton
        variant="rectangular"
        width="100%"
        height={150}
        style={{ display: imageLoaded ? "none" : "block" }}
      />
      {imageLoaded && (
        <img
          ref={imgRef}
          src={src}
          loading="lazy"
          className={className}
          alt={alt}
          style={{
            ...style,
            // width: "100%",
            display: imageLoaded ? "inline" : "none",
          }}
        />
      )}
    </>
  );
};

export default ImageComponent;
