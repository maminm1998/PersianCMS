import React from "react";
import { useState, useEffect } from "react";
import DeleteModal from "../DeleteModal/DeleteModal";
import ErorrBox from "../ErorrBox/ErorrBox";
import DetailsModal from "../DetailsModal/DetailsModal";
import EditModal from "../EditModal/EditModal";
import { AiOutlineDollarCircle } from "react-icons/ai";

export default function Comments() {
  const [isShowDetailModal, setIsShowDetailModal] = useState(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [isShowAcceptModal, setIsShowAcceptModal] = useState(false);
  const [clickedProduct, setClickedProduct] = useState(false);
  const [comment, setComment] = useState(null);
  const [commentId, setCommentId] = useState(null);
  const [editTitle, setEditTitle] = useState(null);

  const closeDetailsModal = () => {
    setIsShowDetailModal(false);
  };
  const submitEditHandler = (e) => {
    e.preventDefault();
    console.log(commentId);
    fetch(`http://localhost:8000/api/comments/${commentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        body: editTitle,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        getComment();
        setIsShowEditModal(false);
      });
  };
  const AcceptHandler = () => {
    console.log(commentId);
    fetch(`http://localhost:8000/api/comments/accept/${commentId}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setIsShowAcceptModal(false);
        getComment();
      });
  };
  const CancelAcceptHandler = () => {
    setIsShowAcceptModal(false);
  };
  const closeEditModal = () => {
    setIsShowEditModal(false);
  };
  const DeleteHandler = () => {
    fetch(`http://localhost:8000/api/comments/${commentId}`, {
      method: "DELETE",
    }).then((res) => {
      getComment();
      setIsShowDeleteModal(false);
    });
  };
  const CancelDeleteHandler = () => {
    setIsShowDeleteModal(false);
  };
  const getComment = () => {
    fetch("http://localhost:8000/api/comments/")
      .then((res) => res.json())
      .then((data) => setAllComments(data));
  };
  const [allComments, setAllComments] = useState("");
  useEffect(() => {
    getComment();
  }, []);
  return (
    <div className="cms-main">
      <h1 className="cms-title">لیست کامنت ها</h1>
      {allComments.length ? (
        <table className="cms-table">
          <thead>
            <tr>
              <th>اسم کاربر</th>
              <th>محصول</th>
              <th>کامنت</th>
              <th>تاریخ</th>
              <th>ساعت</th>
              <th>وضعیت کامنت</th>
            </tr>
          </thead>
          {allComments.map((comment) => (
            <tr key={comment.id}>
              <td>{comment.userID}</td>
              <td>{comment.productID}</td>
              <td>
                <button
                  className="products-table-btn"
                  onClick={() => {
                    setIsShowDetailModal(true);
                    setComment(comment);
                  }}
                >
                  دیدن متن
                </button>
              </td>
              <td>{comment.date}</td>
              <td>{comment.hour}</td>
              <td>
                <button
                  className="products-table-btn"
                  onClick={() => {
                    setIsShowDeleteModal(true);
                    setCommentId(comment.id);
                  }}
                >
                  حذف
                </button>
                <button
                  className="products-table-btn"
                  onClick={() => {
                    setIsShowEditModal(true);
                    setClickedProduct(comment);
                    setCommentId(comment.id);
                  }}
                >
                  ویرایش
                </button>
                <button className="products-table-btn">پاسخ</button>

                {comment.isAccept === 0 && (
                  <button
                    className="products-table-btn"
                    onClick={() => {
                      setIsShowAcceptModal(true);
                      setCommentId(comment.id);
                    }}
                  >
                    تایید
                  </button>
                )}
              </td>
            </tr>
          ))}
        </table>
      ) : (
        <ErorrBox msg={"هیچ کامنتی یافت نشد"} />
      )}
      {isShowDeleteModal && (
        <DeleteModal
          submit={DeleteHandler}
          cancel={CancelDeleteHandler}
          title="آیا از حذف مطمئن هستید؟"
        />
      )}
      {isShowAcceptModal && (
        <DeleteModal
          submit={AcceptHandler}
          cancel={CancelAcceptHandler}
          title="آیا از تایید مطمئن هستید؟"
        />
      )}

      {isShowDetailModal && (
        <DetailsModal onHide={closeDetailsModal}>
          <div className="modal-parent active">
            <div className="details-modal">
              <table className="cms-table">
                <thead>
                  <tr>
                    <th>نام کاربر</th>
                    <th>محصول</th>
                    <th>متن کامنت</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{comment.userID}</td>
                    <td>{comment.productID}</td>
                    <td>{comment.body}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </DetailsModal>
      )}
      {isShowEditModal && (
        <EditModal onClose={closeEditModal} onSubmit={submitEditHandler}>
          <div className="edit-products-form-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              placeholder={clickedProduct.body}
              className="edit-product-input"
              onChange={(e) => setEditTitle(e.target.value)}
            />
          </div>{" "}
        </EditModal>
      )}
    </div>
  );
}
