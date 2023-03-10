import React from "react";
import { useState } from "react";
import "./AddNewProduct.css";
export default function AddNewProduct({ getData }) {
  const [editTitle, setEditTitle] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editCount, setEditCount] = useState("");
  const [editImg, setEditImg] = useState("");
  const [editPopularity, setEditPopularity] = useState("");
  const [editSale, setEditSale] = useState("");
  const [editColor, setEditColor] = useState("");
  const newProduct = {
    title: editTitle,
    price: editPrice,
    count: editCount,
    img: editImg,
    popularity: editPopularity,
    sale: editSale,
    colors: editColor,
  };
  const clearInput = () => {
    setEditTitle("");
    setEditPrice("");
    setEditCount("");
    setEditImg("");
    setEditPopularity("");
    setEditSale("");
    setEditColor("");
  };
  const addNewProductHandler = (e) => {
    e.preventDefault();
    console.log(newProduct);
    fetch(`http://localhost:8000/api/products/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        getData();
        clearInput();
      });
  };
  return (
    <div className="product-main">
      <h1 className="product-title">افزودن محصول جدید</h1>
      <form action="" className="add-products-form">
        <div className="add-products-from-wrap">
          <div className="add-product-form-group">
            <input
              type="text"
              className="add-product-input"
              placeholder="اسم محصول"
              onChange={(e) => setEditTitle(e.target.value)}
              value={editTitle}
            />
          </div>
          <div className="add-product-form-group">
            <input
              type="text"
              className="add-product-input"
              placeholder="قیمت محصول"
              onChange={(e) => setEditPrice(e.target.value)}
              value={editPrice}
            />
          </div>
          <div className="add-product-form-group">
            <input
              type="text"
              className="add-product-input"
              placeholder="موجودی محصول"
              onChange={(e) => setEditCount(e.target.value)}
              value={editCount}
            />
          </div>
          <div className="add-product-form-group">
            <input
              type="text"
              className="add-product-input"
              placeholder="دامنه عکس محصول"
              onChange={(e) => setEditImg(e.target.value)}
              value={editImg}
            />
          </div>
          <div className="add-product-form-group">
            <input
              type="text"
              className="add-product-input"
              placeholder="میزان محبوبیت محصول"
              onChange={(e) => setEditPopularity(e.target.value)}
              value={editPopularity}
            />
          </div>
          <div className="add-product-form-group">
            <input
              type="text"
              className="add-product-input"
              placeholder="میزان فروش محصول"
              onChange={(e) => setEditSale(e.target.value)}
              value={editSale}
            />
          </div>
          <div className="add-product-form-group">
            <input
              type="text"
              className="add-product-input"
              placeholder="تعداد رنگ بندی محصول"
              onChange={(e) => setEditColor(e.target.value)}
              value={editColor}
            />
          </div>
        </div>
        <button
          className="add-products-submit"
          onClick={(e) => addNewProductHandler(e)}
        >
          ثبت محصول
        </button>
      </form>
    </div>
  );
}
