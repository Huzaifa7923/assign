import React from "react";
import spinner from "../assets/Circles-menu-3.gif";
function Spinner() {
  return (
    <div className="w-100 mt-20">
      <img
        width={100}
        className="text-center mx-auto"
        src={spinner}
        alt="...loading"
      />
    </div>
  );
}

export default Spinner;
