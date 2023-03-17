import React from "react";
import { Spin } from "antd";

const Spinner = () => {
  return (
    <>
      <div className="spinner">
        <Spin color="white" style={{ color: "white" }} size="large" />
      </div>
    </>
  );
};

export default Spinner;
