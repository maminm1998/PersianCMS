import React from "react";
import "./Header.css";
import {AiOutlineBell} from 'react-icons/ai'
import {BsBrightnessLow} from 'react-icons/bs'
export default function Header() {
  return (
    <div className="header">
      <div className="admin-profile">
        <img
          src="https://membersearch.irimc.org/member/personalphoto?id=4845a814-c3d3-47b5-8c94-2a342fa83195"
          alt=""
        />
        <div>
          <h1>محمد امین محمدی</h1>
          <h3>مدیر</h3>
        </div>
      </div>
      <div className="header-left-section">
        <div className="search-box">
          <input type="text" placeholder="اینجا سرچ کنید"/>
          <button>سرچ</button>

        </div>
        <button className="header-left-icon"><AiOutlineBell /></button>
        <button className="header-left-icon"><BsBrightnessLow /></button>
      </div>
    </div>
  );
}
