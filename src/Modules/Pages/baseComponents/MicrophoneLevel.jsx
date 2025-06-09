import React from "react";
import { Progress } from "antd";

const MicrophoneLevel = ({ micLevel }) => {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "200px", // Adjust the width as needed
        marginBottom: "8px"
      }}
    >
      <div
        style={{
          borderRadius: "10px",
          overflow: "hidden",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)"
        }}
      >
        <Progress
          percent={micLevel}
          steps={6}
          strokeColor={["red", "yellow", "yellow", "green", "green", "green"]}
          showInfo={false}
        />
      </div>
    </div>
  );
};

export default MicrophoneLevel;
