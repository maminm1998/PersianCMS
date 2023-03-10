import React from "react";
import "./DetailsModal.css";
import { useEffect } from "react";

export default function DetailsModal({ onHide,children }) {
  useEffect(() => {
    const checkKey = (e) => {
      if (e.keyCode === 27) {
        onHide();
      }
    };
    window.addEventListener("keydown", checkKey);
    return () => window.removeEventListener("keydown", checkKey);
  });
  return (
    <>

    {children}
    </>
  );
}
