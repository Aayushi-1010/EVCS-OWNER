import React from "react";
import style from "./tags.module.scss";

function Tag(props) {
  const { type } = props;
  return <span className={`${style.tag} ${style[type]}`}>{type}</span>;
}

export default Tag;
