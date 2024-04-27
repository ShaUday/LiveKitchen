import { useEffect, useState } from "react";
import { db } from "../components/firebase";
import Navbar from "./Navbar";

import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { Grid } from "@mui/material";
import MuiCard from "./MuiCard";
import Transition from "./Transiton";

const Home = ({ sendParameterToApp, user, uid }) => {
  //in miss of this log sometimes user does not show up
  console.log("user form home", user);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const kitchenRef = collection(db, "kitchenData"); // Cache the reference for efficiency
      const snapshot = await getDocs(kitchenRef); // Use snapshot for cleaner handling
      const allData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setData(allData);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle errors gracefully
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  // after clicking the see dishes the particular kitchen id will be given by this function
  // parameter: This parameter represents the data passed from the child component to the parent component (Home).
  const handleChildParameter = (parameter) => {
    // Do something with the parameter received from the child component
    sendParameterToApp(parameter);
    console.log(parameter, "from home");
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
  console.log("total qty", totalQty);

  return (
    <div>
      <Navbar user={user} totalQty={totalQty} />
      <Transition data={data} />
      <Grid container spacing={2}>
        {data.map((ele) => (
          <Grid
            key={ele.id}
            item
            lg={4}
            className=" transform hover:scale-105 transition-all drop-shadow-md"
          >
            <MuiCard
              key={ele.id}
              data={ele}
              sendParameterToParent={handleChildParameter}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Home;
