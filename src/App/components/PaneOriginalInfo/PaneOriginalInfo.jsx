import React from "react";
import "./PaneOriginalInfo.css";

import PaneTitle from "../PaneTitle/PaneTitle.jsx";

export default function PaneOriginalInfo(props) {
  return (
    <section className={props.className}>
      <PaneTitle title="Original Information" />
      <div className="info-details">
        The code is added to a git repository at
        <br />
        <a
          href="https://github.com/sujeetkrjaiswal/soroco"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://github.com/sujeetkrjaiswal/soroco
        </a>
        <br />
        -----
        <br />
        You can see the hosted version at
        <br />
        <a
          href="https://github.sujeetjaiswal.com/soroco/"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://github.sujeetjaiswal.com/soroco/
        </a>
      </div>
      <div>
        <button className="action-btn reject-btn" type="button">
          Reject
        </button>
      </div>
    </section>
  );
}
