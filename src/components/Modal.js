import React, { useState } from "react";
import "./modal.css";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../components/firebase";
export const Modal = ({
  totalQty,
  totalPrice,
  hideModal,
  email,
  user,
  uid,
  data,
}) => {
  console.log(email, user, "from modal");
  // form states
  const [cell, setCell] = useState(null);
  const [residentialAddress, setResidentialAddress] = useState("");
  const [cartPrice] = useState(totalPrice);
  const [cartQty] = useState(totalQty);

  const handleCloseModal = () => {
    hideModal();
  };
  const handleCashOnDelivery = async (e) => {
    e.preventDefault();
    // console.log(cell, residentialAddress, cartPrice, cartQty);
    try {
      const valRef = collection(db, "Buyer");
      await addDoc(valRef, {
        Name: user,
        Email: email,
        ID: uid,
        CellNo: cell,
        Residential: residentialAddress,
        CartPrice: cartPrice,
        CartQty: cartQty,
        data,
      });
    } catch (error) {
      console.error("Error adding data:", error);
    }

    // Delete cart data
    try {
      // Construct the reference to the cart collection for the current user
      const cartRef = collection(db, uid);

      // Loop through each document in the cart and delete it
      data.forEach(async (cartProduct) => {
        const cartProductRef = doc(cartRef, cartProduct.id);
        await deleteDoc(cartProductRef);
        console.log("Document successfully deleted!");
      });

      // Alternatively, if you want to delete the entire collection, you can use the following:
      // await deleteCollection(cartRef, { batchSize: 10 });
    } catch (error) {
      console.error("Error removing document: ", error);
    }
  };
  const Swal = require("sweetalert2");
  const handleClick = () => {
    Swal.fire({
      title: "Success",
      text: "Order Placed",
      icon: "success",
      confirmButtonText: "Okay",
    });
  };
  return (
    <div className="shade-area">
      <div className="modal-container">
        <form className="form-group" onSubmit={handleCashOnDelivery}>
          <input
            type="number"
            className="form-control"
            placeholder="Cell No"
            required
            onChange={(e) => setCell(e.target.value)}
            value={cell}
          />
          <br></br>
          <input
            type="text"
            className="form-control"
            placeholder="Residential Address"
            required
            onChange={(e) => setResidentialAddress(e.target.value)}
            value={residentialAddress}
          />
          <br></br>
          <label>Total Quantity </label>
          <input
            type="text"
            className="form-control"
            readOnly
            required
            value={totalQty}
          />
          <br></br>
          <label>Total Price </label>
          <input
            type="text"
            className="form-control"
            readOnly
            required
            value={totalPrice}
          />
          <br></br>
          <button
            type="submit"
            className="btn btn-success btn-md"
            onClick={handleClick}
          >
            Submit
          </button>
        </form>
        <div className="delete-icon" onClick={handleCloseModal}>
          x
        </div>
      </div>
    </div>
  );
};
