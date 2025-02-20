import React, { useEffect, useState } from "react";
import "./switch.scss";

function SwitchButton({ isToggled, onToggle, label }) {
  const [toggle, setToggle] = useState(false);
  const handleToggle = () => {
    setToggle(!toggle);
    onToggle();
  };
  useEffect(() => {
    setToggle(isToggled);
  }, [isToggled]);
  return (
    <div>
      <p className="switch-label">
        {label}
      </p>
      <label className="switch">
        <input type="checkbox" checked={toggle} onChange={handleToggle} />
        <span className="slider" />
      </label>
    </div>
  );
}

export default SwitchButton;
