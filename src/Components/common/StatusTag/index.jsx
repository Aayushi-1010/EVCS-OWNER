import React from "react";
import style from "./status.module.scss";

function StatusTag({ type }) {
  return <span className={`${style["status-tag"]} ${style[type]}`}></span>;
}

export default StatusTag;
