import React from "react";
import "./submit-button.scss";

const SubmitButton = (props) => {
  return (
    <div className="container__submit">
      <button onClick={props.onClick} className="button__submit">
        {props.children}
      </button>
    </div>
  );
};

export default SubmitButton;
