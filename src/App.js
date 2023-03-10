import React from "react";
import SideBar from "./Component/SideBar/SideBar";
import "./App.css";
import Header from "./Component/Header/Header";
import { Route, Routes, useRoutes } from "react-router";
import Product from './Component/Product/Product'
import Comments from './Component/Comments/Comments'
import Users from './Component/Users/Users'
import Orders from './Component/Orders/Orders'
import Offs from './Component/Offs/Offs'
export default function App() {
  const route = useRoutes([
    {path:'/product' , element:<Product />},
    {path:'/comments' , element:<Comments />},
    {path:'/users' , element:<Users />},
    {path:'/orders' , element:<Orders />},
    {path:'/offs' , element:<Offs />}
  ])
  return (
    <>
      <SideBar />
      <div className="main">
        <Header />
          {route}
      </div>
    </>
  );
}
