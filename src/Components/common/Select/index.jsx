import React from "react";
import style from "./select.module.scss";
import { Select } from "antd";

function SelectDropdown(props) {
  const { label, value, placeholder, options, onChange, error } = props;
  return (
    <div className={`${style["select-container"]}`}>
      <p>{label} : </p>
      <Select
        {...props}
        value={value}
        options={options}
        placeholder={placeholder}
        onChange={onChange}
        rootClassName={error && "ant-select-error"}
      />
      <p className={`${style["error-message"]} ${error && style.active}`}>
        {error}
      </p>
    </div>
  );
}

export default SelectDropdown;
