import React from "react";
import { useRef } from "react";
import "./dropdown.scss";
import { useState } from "react";
import { useEffect } from "react";

function DropDownMenu({ children, content }) {
  const ref = useRef();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleNotiMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClickOutside = (event) => {
    if (ref.current && !ref?.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };
  useEffect(() => document.addEventListener("click", handleClickOutside), []);
  return (
    <div ref={ref} className="dropdown-menu">
      <div onClick={toggleNotiMenu}>{children}</div>
      <div className={`dropdown-content ${isMenuOpen && "active"}`}>
        {content}
      </div>
    </div>
  );
}

export default DropDownMenu;
