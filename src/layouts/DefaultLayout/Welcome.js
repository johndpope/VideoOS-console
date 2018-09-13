import React from "react";

import main_bg from "./assets/main_bg.png";
import main_bg_txt from "./assets/main_bg_txt.png";

const Welcome = () => (
  <div
    style={{
      position: "relative",
      height: "100%",
      backgroundImage: `url(${main_bg})`,
      backgroundSize: "cover"
    }}
  >
    <img
      src={main_bg_txt}
      style={{
        position: "absolute",
        top: "22%",
        left: "50%",
        height: "116px",
        transform: "translate3d(-50%, 0, 0)",
        WebkitUserSelect: "none",
        WebkitUserDrag: "none"
      }}
      alt=""
    />
  </div>
);

export default Welcome;
