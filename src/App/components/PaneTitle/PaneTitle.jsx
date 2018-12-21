import React from "react";
import "./PaneTitle.css";

export default function PaneTitle(props) {
  return <h4 className="pane-title">{props.title}</h4>;
}
