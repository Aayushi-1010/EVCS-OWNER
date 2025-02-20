import { Radio } from "antd";
import React from "react";
import style from "./radio.module.scss";

function RadioInput(props) {
  const { label, onChange, value, options, error } = props;
  return (
    <div className={style["radio-input-container"]}>
      <p>{label} : </p>
      <Radio.Group value={value} onChange={onChange}>
        {options.map((data, i) => (
          <Radio value={data.value} key={i}>
            {data.name}
          </Radio>
        ))}
      </Radio.Group>
      <p className={`${style["error-message"]} ${error && style.active}`}>
        {error}
      </p>
    </div>
  );
}

export default RadioInput;
