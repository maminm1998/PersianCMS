import React, { useState } from "react";
import { useEffect } from "react";
import ErorrBox from "../ErorrBox/ErorrBox";
import DeleteModal from "../DeleteModal/DeleteModal";
import EditModal from "../EditModal/EditModal";
import DetailsModal from "../DetailsModal/DetailsModal";
import { AiOutlineDollarCircle } from "react-icons/ai";
export default function Users() {
  const [allUsers, setAllUsers] = useState([]);
  const [currntUserID, setCurrntUserID] = useState([]);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [isShowDetailModal, setIsShowDetailModal] = useState(false);
  const [clickedUser, setClickedUser] = useState(null);

  //state for edit info
  const [firstname, setFirstname] = useState(null);
  const [lastname, setLastname] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [phone, setPhone] = useState(null);
  const [city, setCity] = useState(null);
  const [email, setEmail] = useState(null);
  const [address, setAddress] = useState(null);
  const [score, setScore] = useState(null);
  const [buy, setBuy] = useState(null);

  const closeEditModal = () => {
    setIsShowEditModal(false);
  };

  const updataProductInfo = (e) => {
    e.preventDefault();
    let newUserInfo = {
      firsname: firstname,
      lastname: lastname,
      username: username,
      password: password,
      phone: phone,
      city: city,
      email: email,
      address: address,
      score: score,
      buy: buy,
    };
    fetch(`http://localhost:8000/api/users/${currntUserID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUserInfo),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        getAllUser();
        setIsShowEditModal(false);
      });
  };
  const closeDetailsModal = () => {
    setIsShowDetailModal(false);
  };
  const deleteHandler = () => {
    fetch(`http://localhost:8000/api/users/${currntUserID}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        getAllUser();
        setIsShowDeleteModal(false);
      });
  };
  const deleteCancelHandler = () => setIsShowDeleteModal(false);
  useEffect(() => {
    getAllUser();
  }, []);
  function getAllUser() {
    fetch("http://localhost:8000/api/users")
      .then((res) => res.json())
      .then((data) => setAllUsers(data));
  }
  return (
    <div className="cms-main">
      <h1 className="cms-title">کاربران</h1>
      {allUsers.length ? (
        <table className="cms-table">
          <thead>
            <tr>
              <th>نام و نام خانوادگی</th>
              <th>نام کاربری</th>
              <th>رمز عبور</th>
              <th>شماره تماس</th>
              <th>ایمیل</th>
            </tr>
          </thead>

          {allUsers.map((user) => (
            <tr key={user.id}>
              <td>
                {user.firsname} {user.lastname}
              </td>
              <td>{user.username}</td>
              <td>{user.password}</td>
              <td>{user.phone}</td>
              <td>{user.email}</td>
              <td>
                <button
                  className="products-table-btn"
                  onClick={() => {
                    setIsShowDeleteModal(true);
                    setCurrntUserID(user.id);
                  }}
                >
                  حذف
                </button>
                <button
                  className="products-table-btn"
                  onClick={() => {
                    setClickedUser(user)
                    setIsShowDetailModal(true);
                  }}
                >
                  جزئیات
                </button>
                <button
                  className="products-table-btn"
                  onClick={() => {
                    setIsShowEditModal(true);
                    setClickedUser(user);
                    setCurrntUserID(user.id);
                    setFirstname(user.firsname);
                    setLastname(user.lastname);
                    setUsername(user.username);
                    setPassword(user.password);
                    setPhone(user.phone);
                    setCity(user.city);
                    setEmail(user.email);
                    setAddress(user.address);
                    setScore(user.score);
                    setBuy(user.buy);
                  }}
                >
                  ویرایش
                </button>
              </td>
            </tr>
          ))}
        </table>
      ) : (
        <ErorrBox msg={"هیچ کاربری یافت نشد"} />
      )}
      {isShowDeleteModal && (
        <DeleteModal
          title="آیا از حذف کاربر مورد نظر اطمینان دارید؟"
          submit={deleteHandler}
          cancel={deleteCancelHandler}
        />
      )}

      {isShowEditModal && (
        <EditModal onClose={closeEditModal} onSubmit={updataProductInfo}>
          <div className="edit-products-form-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              placeholder={clickedUser.firsname}
              className="edit-product-input"
              onChange={(e) => setFirstname(e.target.value)}
            />
          </div>
          <div className="edit-products-form-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              placeholder={clickedUser.lastname}
              className="edit-product-input"
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>
          <div className="edit-products-form-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              placeholder={clickedUser.username}
              className="edit-product-input"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="edit-products-form-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              placeholder={clickedUser.password}
              className="edit-product-input"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="edit-products-form-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              placeholder={clickedUser.phone}
              className="edit-product-input"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="edit-products-form-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              placeholder={clickedUser.city}
              className="edit-product-input"
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="edit-products-form-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              placeholder={clickedUser.email}
              className="edit-product-input"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="edit-products-form-group">
            <span>
              <AiOutlineDollarCircle />
            </span>

            <textarea
              type="text"
              placeholder={clickedUser.address}
              className="edit-product-input"
              onChange={(e) => setAddress(e.target.value)}
            ></textarea>
          </div>
          <div className="edit-products-form-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              placeholder={clickedUser.score}
              className="edit-product-input"
              onChange={(e) => setScore(e.target.value)}
            />
          </div>
          <div className="edit-products-form-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              placeholder={clickedUser.buy}
              className="edit-product-input"
              onChange={(e) => setBuy(e.target.value)}
            />
          </div>
        </EditModal>
      )}

      {isShowDetailModal && (
        <DetailsModal onHide={closeDetailsModal}>
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
                    <td>{clickedUser.address}</td>
                    <td>{clickedUser.score}</td>
                    <td>{clickedUser.buy}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </DetailsModal>
      )}
    </div>
  );
}
