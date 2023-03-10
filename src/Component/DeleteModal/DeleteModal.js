import React from "react";
import "./DeleteModal.css";
import  ReactDOM from "react-dom";
export default function DeleteModal({submit , cancel , title}) {
  return ReactDOM.createPortal(
    <div className="modal-parent active">

      <div className="delete-modal">
        <h1>{title}</h1>
        <div className="delete-modal-btn">
          <button className="delete-btn delete-modal-accept" onClick={()=>submit()}>بله</button>
          <button className="delete-btn delete-modal-reject" onClick={()=>cancel()}>خیر</button>
        </div>
      </div>
    </div>,document.getElementById('modal-parent')
  );
}
