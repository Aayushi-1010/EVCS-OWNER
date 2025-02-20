import React, { useState } from "react";
import style from "./checkbox.module.scss";
import { FiCheck } from "react-icons/fi";

function CheckBox({ children, checked, onChange }) {
  const [active, setActive] = useState(checked || false);
  return (
    <div className="flex align-items--center">
      <div
        className={`${style.checkBox} ${active ? style.active : ""}`}
        onClick={() => {
          setActive(!active);
          onChange(!active);
        }}
      >
        <FiCheck />
      </div>
      <p className={style.text}>{children}</p>
    </div>
  );
}

export default CheckBox;
