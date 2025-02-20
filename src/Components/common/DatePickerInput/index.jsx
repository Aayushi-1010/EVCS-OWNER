import React from "react";
import { IoCalendarOutline } from "react-icons/io5";
import style from "./date.module.scss";
// import DatePicker from "react-datepicker";
import { DatePicker } from "antd";

const { RangePicker } = DatePicker;

function DatePickerInput(props) {
  const { label, value, onChange, error } = props;
  return (
    <div className={style["date-picker"]}>
      <p>{label} *</p>
      <RangePicker onChange={onChange} value={value}/>
      <IoCalendarOutline className={error && style.error} />
      <p className={`${style["error-message"]} ${error && style.active}`}>
        {error}
      </p>
    </div>
  );
}

export default DatePickerInput;
