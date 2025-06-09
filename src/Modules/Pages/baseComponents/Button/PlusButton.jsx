import React from "react";
import { PlusOutlined } from "@ant-design/icons";

const PlusButton = ({ text, onClick, type, disabled, darkMode, icon = <PlusOutlined className="text-sm md:text-lg font-bold" /> }) => {
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`!text-white sm:text-xs text-sm !rounded-xl !h-10 px-4 !flex !items-center !border-none gap-2 
          ${darkMode ? "bg-[#2C2C2C] !border !border-gray-700" : "bg-[#6452ec]"}
          ${disabled 
            ? "cursor-not-allowed opacity-50"
            : "cursor-pointer"} 
       
        //     }`
        }
      >
        {icon} {text}
      </button>
    );
  };
  
  export default PlusButton;
