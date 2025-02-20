import React from "react";
import style from "./input.module.scss";

function InputField(props) {
  const { label, type, value, name, placeholder, error, onChange } = props;
  return (
    <div className={style["input-container"]}>
      <p>{label}<span>*</span></p>
      <input
        value={value}
        name={name}
        type={type}
        placeholder={placeholder}
        className={`${style["text-input"]} ${error && style["error"]}`}
        onChange={onChange}
      />
      <p className={`${style["error-message"]} ${error && style.active}`}>
        {error}
      </p>
    </div>
  );
}

export default InputField;
