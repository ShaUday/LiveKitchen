// import { useEffect, useState } from "react";

import Home from "./components/Home";

import { Routes, Route } from "react-router-dom";
import { LogIn } from "./components/LogIn";
import { SignUp } from "./components/SignUp";
import { NotFound } from "./components/NotFound";
import { SingleProfile } from "./components/SingleProfile";
import StoreImageTextFirebase from "./components/StoreImageTextFirebase";
import { useEffect, useState } from "react";
import AddSingleProfile from "./components/AddSingleProfile";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./components/firebase";
import { Cart } from "./components/Cart";

function App() {
  const [authUser, setAuthUser] = useState(null);
  const [authUserEmail, setAuthUserEmail] = useState(null);
  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user.displayName);
        setAuthUserEmail(user.email);
      } else {
        setAuthUser(null);
      }
    });

    return () => {
      listen();
    };
  }, []);
  console.log(authUserEmail, "from app");

  const [parameterFromChild, setParameterFromChild] = useState(null);

  const handleChildParameter = (parameter) => {
    // Do something with the parameter received from the child component in App.js
    setParameterFromChild(parameter);
  };
  // console.log("from app", parameterFromChild);

  function GetUserUid() {
    const [uid, setUid] = useState(null);
    useEffect(() => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          setUid(user.uid);
        }
      });
    }, []);
    return uid;
  }
  console.log("user form home", authUser);

  const uid = GetUserUid();
  return (
    <div>
      <Routes>
        <Route
          path="*"
          element={
            <Home
              sendParameterToApp={handleChildParameter}
              user={authUser}
              uid={uid}
            ></Home>
          }
        ></Route>
        <Route path="/login" element={<LogIn></LogIn>}></Route>
        <Route path="/signup" element={<SignUp></SignUp>}></Route>
        <Route
          path="/add"
          element={<StoreImageTextFirebase></StoreImageTextFirebase>}
        ></Route>
        <Route element={<NotFound></NotFound>}></Route>
        <Route
          path="/indi/:parameterFromChild"
          element={
            <SingleProfile
              data={parameterFromChild}
              Suser={authUser}
              uid={uid}
            />
          } // Pass data to SingleProfile
        />
        <Route
          path="/add/:parameterFromChild"
          element={
            <AddSingleProfile Sid={parameterFromChild}></AddSingleProfile>
          } // Pass data to SingleProfile
        />
        <Route
          path="/cart"
          element={
            <Cart Suser={authUser} email={authUserEmail} uid={uid}></Cart>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
