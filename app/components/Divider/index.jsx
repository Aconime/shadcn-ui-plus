import React from "react";

const index = ({ vertical = false }) => {
  const baseStyles = "bg-gray-200";
  const horizontalStyles = "h-px w-full";
  const verticalStyles = "w-px h-full";

  const styles = vertical
    ? `${baseStyles} ${verticalStyles}`
    : `${baseStyles} ${horizontalStyles}`;

  return <div className={styles}></div>;
};

export default index;
