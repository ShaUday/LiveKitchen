import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { db } from "../components/firebase";
import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { IndividualCartProduct } from "./IndividualCartProduct";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import { Modal } from "./Modal";
export const Cart = ({ Suser, uid, email }) => {
  // State Hooks
  //   data: State variable to store the cart data fetched from Firestore.
  // showModal: State variable to control the visibility of the modal.
  const [data, setData] = useState([]);
  // show modal state
  const [showModal, setShowModal] = useState(false);
  //   useEffect Hook:
  // It fetches the cart data from Firestore when the uid prop changes. If uid is provided, it subscribes to real-time updates using onSnapshot. When the data changes in Firestore, it updates the data state with the new data.
  // If uid is not provided or becomes null, it sets the data state to an empty array.
  console.log(uid, "from cart");
  useEffect(() => {
    if (uid) {
      const unsubscribe = onSnapshot(collection(db, uid), (snapshot) => {
        const newData = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setData(newData);
      });
      return () => unsubscribe();
    } else {
      setData([]);
    }
  }, [uid]);

  const updateProduct = async (cartProduct, updatedFields) => {
    const cartRef = doc(db, uid, cartProduct.id);
    try {
      await updateDoc(cartRef, updatedFields);
      console.log("Product updated successfully");
    } catch (error) {
      console.error("Error updating product: ", error);
    }
  };

  const cartProductIncrease = (cartProduct) => {
    const updatedQty = cartProduct.qty + 1;
    const updatedTotalProductPrice = updatedQty * cartProduct.price;
    updateProduct(cartProduct, {
      qty: updatedQty,
      TotalProductPrice: updatedTotalProductPrice,
    });
  };

  const cartProductDecrease = (cartProduct) => {
    if (cartProduct.qty > 1) {
      const updatedQty = cartProduct.qty - 1;
      const updatedTotalProductPrice = updatedQty * cartProduct.price;
      updateProduct(cartProduct, {
        qty: updatedQty,
        TotalProductPrice: updatedTotalProductPrice,
      });
    }
  };
  const qty = data.map((cartProcuts) => {
    return cartProcuts.qty;
  });
  // reducing the qty in a single value
  const reducerOfQty = (accumulator, currentValue) =>
    accumulator + currentValue;

  const totalQty = qty.reduce(reducerOfQty, 0);

  console.log("from cart ", totalQty);
  console.log("from cart ", data);

  // console.log(qty);
  const price = data.map((cartProduct) => {
    return cartProduct.TotalProductPrice;
  });

  // reducing the price in a single value
  const reducerOfPrice = (accumulator, currentValue) =>
    accumulator + currentValue;

  const totalPrice = price.reduce(reducerOfPrice, 0);

  // trigger modal
  const triggerModal = () => {
    setShowModal(true);
  };
  // hide model
  const hideModal = () => {
    setShowModal(false);
  };
  return (
    <div>
      <Navbar user={Suser} totalQty={totalQty}></Navbar>
      <br />
      {data.length > 0 ? (
        <Grid container spacing={2}>
          {data.map((ele) => (
            <Grid key={ele.id} item lg={4}>
              <IndividualCartProduct
                key={ele.id}
                data={ele}
                uid={uid}
                cartProductIncrease={cartProductIncrease}
                cartProductDecrease={cartProductDecrease}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <div>
          <h1 className=" text-center text-2xl">No Products to Show!</h1>
        </div>
      )}
      <div className=" flex justify-center">
        <Box
          height={200}
          width={250}
          my={4}
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap={4}
          p={2}
          sx={{ border: "2px solid grey" }}
        >
          <div>
            <h5 className=" text-2xl">Cart Summary</h5>

            <br></br>
            <div>
              Total No of Products: <span>{totalQty}</span>
            </div>
            <div>
              Total Price to Pay: <span>$ {totalPrice}</span>
            </div>
            <br></br>
            <button
              className=" border-2 border-black rounded-lg bg-yellow-200 p-2"
              onClick={() => triggerModal()}
            >
              Cash on Delivery
            </button>
          </div>
        </Box>
      </div>
      {showModal === true && (
        <Modal
          totalPrice={totalPrice}
          totalQty={totalQty}
          hideModal={hideModal}
          user={Suser}
          email={email}
          uid={uid}
          data={data}
        ></Modal>
      )}
    </div>
  );
};
