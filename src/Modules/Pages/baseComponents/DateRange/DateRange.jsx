import React, { useState } from "react";
import { DatePicker } from "antd";
import "./DateRange.scss";

const { RangePicker } = DatePicker;

const CustomDateRangePicker = ({
  onChange,
  value,
  placeholder,
  style = {},
  className = "",
  setViewMonthlyDues, 
}) => {
  const [focused, setFocused] = useState(false);

  const handleFocus = (e) => {
    setFocused(true);
  };

  const handleBlur = (e) => {
    setFocused(false);
  };

  const handleChange = (value) => {
    if (onChange) {
      onChange(value);
    }
    if (!value || value.length === 0) {
      setViewMonthlyDues && setViewMonthlyDues(false);
    }
  };

  return (
    <div
      className={` ${className || ""}  w-full  mr-2 border border-gray-300 bg-white rounded-xl !h-10 flex items-center justify-center`}
      style={style}
    >
      <RangePicker
        value={value}
        onChange={handleChange}
        format="YYYY-MM-DD"
        allowClear
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`w-full h-full border-none outline-none bg-transparent`}
        variant="borderless"
        placeholder={placeholder}
      />
    </div>
  );
};

export default CustomDateRangePicker;