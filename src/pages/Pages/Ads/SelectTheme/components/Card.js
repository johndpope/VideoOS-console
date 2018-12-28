import React from "react";

const ThemeCard = ({ info = {}, style }) => {
  const { interactionTypeName, imgUrl } = info;
  return (
    <div
      style={{
        ...style,
        width: "calc(33.333% - 1rem)",
        maxWidth: "22rem",
        marginLeft: "1rem",
        marginBottom: "1.5rem",
        border: "1px solid #f0f0f0",
        backgroundColor: "#fff",
        borderRadius: "4px"
      }}
    >
      <div
        style={{
          height: "9.5rem",
          backgroundColor: "#f0f0f0",
          backgroundImage: `url(${imgUrl})`,
          backgroundSize: "cover"
        }}
      />
      <div
        style={{
          padding: "0.75rem",
          fontSize: "1rem"
        }}
      >
        {interactionTypeName || ""}
      </div>
    </div>
  );
};

export default ThemeCard;
