import React, { useState, useEffect } from "react";
import "./ProductTable.css";
import DeleteModal from "../DeleteModal/DeleteModal";
import DetailsModal from "../DetailsModal/DetailsModal";
import EditModal from "../EditModal/EditModal";
import { AiOutlineDollarCircle } from "react-icons/ai";
import ErorrBox from "../ErorrBox/ErorrBox";
export default function ProductTable({ allProducts, getData }) {
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowDetailModal, setIsShowDetailModal] = useState(false);
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [editTitle, setEditTitle] = useState();
  const [editPrice, setEditPrice] = useState();
  const [editCount, setEditCount] = useState();
  const [editImg, setEditImg] = useState();
  const [editPopularity, setEditPopularity] = useState();
  const [editSale, setEditSale] = useState();
  const [editColor, setEditColor] = useState();
  const [clickedProduct, setClickedProduct] = useState();
  const [productID, setProductID] = useState(null);

  const deleteModalCancelAction = () => {
    console.log("Modal cancel.");
    setIsShowModal(false);
  };
  const deleteModalSubmitAction = () => {
    fetch(`http://localhost:8000/api/products/${productID}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        setIsShowModal(false);
        getData();
      });
  };

  const closeDetailsModal = () => {
    setIsShowDetailModal(false);
  };
  const closeEditModal = () => {
    setIsShowEditModal(false);
  };
  const updataProductInfo = (e) => {
    e.preventDefault();
    let productsNewInfos = {
      title: editTitle,
      price: editPrice,
      count: editCount,
      colors: editColor,
      img: editImg,
      popularity: editPopularity,
      sale: editSale,
    };
    fetch(`http://localhost:8000/api/products/${productID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productsNewInfos),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        getData();
        setIsShowEditModal(false);
      });
  };
  return (
    <>
      {allProducts.length ? (
        <table className="products-table">
          <thead>
            <tr className="products-table-heading-tr">
              <th>عکس</th>
              <th>اسم</th>
              <th>قیمت</th>
              <th>موجودی</th>
            </tr>
          </thead>

          <tbody>
            {allProducts.map((products) => (
              <tr className="products-table-tr" key={products.id}>
                <td>
                  <img
                    src={products.img}
                    alt=""
                    className="products-table-img"
                  />
                </td>
                <td>{products.title}</td>
                <td>{products.price} تومان </td>
                <td>{products.popularity}</td>
                <td>
                  <button
                    className="products-table-btn"
                    onClick={() => {
                      setIsShowDetailModal(true);
                      setProductID(products.id);
                    }}
                  >
                    جزئیات
                  </button>
                  <button
                    className="products-table-btn"
                    onClick={() => {
                      setIsShowModal(true);
                      setProductID(products.id);
                    }}
                  >
                    حذف
                  </button>
                  <button
                    className="products-table-btn"
                    onClick={() => {
                      setIsShowEditModal(true);
                      setProductID(products.id);
                      setClickedProduct(products);
                      setEditTitle(products.title);
                      setEditPrice(products.price);
                      setEditCount(products.count);
                      setEditColor(products.colors);
                      setEditPopularity(products.popularity);
                      setEditSale(products.sale);
                      setEditImg(products.img);
                    }}
                  >
                    ویرایش
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <ErorrBox msg={"هیچ محصولی یافت نشد"} />
      )}
      {isShowModal && (
        <DeleteModal
          submit={deleteModalSubmitAction}
          cancel={deleteModalCancelAction}
        />
      )}
      {isShowDetailModal && (
        <DetailsModal
          onHide={closeDetailsModal}
        >
          <div className="modal-parent active">
      <div className="details-modal">
        <table className="cms-table">
          <thead>
            <tr>
              <th>میزان فروش</th>
              <th>تعداد رنگ</th>
              <th>توصیف</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{allProducts[productID].sale}</td>
              <td>{allProducts[productID].colors}</td>
              <td>{allProducts[productID].productDesc}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
        </DetailsModal>
      )}
      {isShowEditModal && (
        <EditModal onClose={closeEditModal} onSubmit={updataProductInfo}>
          <div className="edit-products-form-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              placeholder={clickedProduct.title}
              className="edit-product-input"
              onChange={(e) => setEditTitle(e.target.value)}
            />
          </div>
          <div className="edit-products-form-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              placeholder={`${clickedProduct.price} تومان`}
              className="edit-product-input"
              onChange={(e) => setEditPrice(e.target.value)}
            />
          </div>
          <div className="edit-products-form-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              placeholder={clickedProduct.count}
              className="edit-product-input"
              onChange={(e) => setEditCount(e.target.value)}
            />
          </div>
          <div className="edit-products-form-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              placeholder={clickedProduct.img}
              className="edit-product-input"
              onChange={(e) => setEditImg(e.target.value)}
            />
          </div>
          <div className="edit-products-form-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              placeholder={`%${clickedProduct.popularity}`}
              className="edit-product-input"
              onChange={(e) => setEditPopularity(e.target.value)}
            />
          </div>
          <div className="edit-products-form-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              placeholder={clickedProduct.sale}
              className="edit-product-input"
              onChange={(e) => setEditSale(e.target.value)}
            />
          </div>
          <div className="edit-products-form-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              placeholder={clickedProduct.colors}
              className="edit-product-input"
              onChange={(e) => setEditColor(e.target.value)}
            />
          </div>
        </EditModal>
      )}
    </>
  );
}
