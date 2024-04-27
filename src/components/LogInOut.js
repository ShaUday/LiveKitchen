import React, { useState } from "react";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from "./firebase";
export const LogInOut = () => {
  const provider = new GoogleAuthProvider();
  const [user, setUser] = useState([]);
  const handleClick = () => {
    signInWithPopup(auth, provider).then((data) => {
      const { displayName, email, photoURL } = data.user;
      const loggedInUser = {
        name: displayName,
        email: email,
        photo: photoURL,
      };
      setUser(loggedInUser);
    });
  };
  const handleSignOut = () => {
    signOut(auth).then(() => {
      setUser({});
    });
  };
  return (
    <div>
      {!user.name ? (
        <button onClick={handleClick}>Sign in with Google</button>
      ) : (
        <button onClick={handleSignOut}>Sign Out</button>
      )}

      <br />
      {user.email && (
        <div>
          <h1>Welcome {user.name} </h1>
          <p>Your email is {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      )}
    </div>
  );
};
