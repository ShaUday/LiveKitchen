import React, { useEffect, useState } from "react";
import { db } from "../components/firebase";
import { useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import SingleMuiCard from "./SingleMuiCard";
import Navbar from "./Navbar";

export const SingleProfile = ({ Suser, uid }) => {
  const navigate = useNavigate();
  const { parameterFromChild } = useParams();
  const [data, setData] = useState([]);
  // console.log("singel user data", data);
  const getData = async () => {
    const valRef = collection(db, parameterFromChild);
    const dataDb = await getDocs(valRef);
    const allData = dataDb.docs.map((val) => ({ ...val.data(), id: val.id }));
    setData(allData);
    // console.log(dataDb);
  };

  useEffect(() => {
    getData();
  });

  // console.log("uid", uid);
  const onAddToCart = (product) => {
    if (uid !== null) {
      // Set the quantity of the product
      product.qty = 1;

      // Calculate the total product price
      const totalProductPrice = product.price * product.qty;
      const updatedProduct = {
        ...product,
        TotalProductPrice: totalProductPrice,
      };
      const cartRef = doc(db, uid, product.id);

      setDoc(cartRef, updatedProduct)
        .then(() => {
          console.log("successfully added to cart");
        })
        .catch((error) => {
          console.error("Error adding product to cart: ", error);
        });
    } else {
      navigate("/login");
    }
  };
  const [datum, setDatum] = useState([]);
  useEffect(() => {
    if (uid) {
      const unsubscribe = onSnapshot(collection(db, uid), (snapshot) => {
        const newData = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setDatum(newData);
      });
      return () => unsubscribe();
    } else {
      setDatum([]);
    }
  }, [uid]);
  // console.log("from home ", datum);
  const qty = datum.map((cartProcuts) => {
    return cartProcuts.qty;
  });
  // reducing the qty in a single value
  const reducerOfQty = (accumulator, currentValue) =>
    accumulator + currentValue;

  const totalQty = qty.reduce(reducerOfQty, 0);
  // console.log("total qty from s", totalQty);
  // console.log("s", qty);
  return (
    <div>
      <Navbar user={Suser} totalQty={totalQty}></Navbar>
      <Grid container spacing={2}>
        {data.map((ele) => (
          <Grid
            key={ele.id}
            item
            lg={4}
            className=" transform hover:scale-105 transition-all drop-shadow-md"
          >
            <SingleMuiCard
              key={ele.id}
              data={ele}
              onAddToCart={onAddToCart}
            ></SingleMuiCard>{" "}
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
