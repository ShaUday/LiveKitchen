import React, { useState } from "react";
import { auth, db } from "../components/firebase";
import { Link, useNavigate } from "react-router-dom"; // Changed to useNavigate
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

export const SignUp = (props) => {
  const navigate = useNavigate(); // Changed to useNavigate
  // defining state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccessMsg] = useState("");

  // Signup function
  const signup = async (e) => {
    e.preventDefault();

    try {
      // Create user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential);

      // Create a new document in the "SignedUpUsersData" collection (excluding password)
      const usersRef = collection(db, "signed");
      addDoc(usersRef, {
        Name: name,
        Email: email,
        Password: password,
      });

      // Clear form fields and error message
      setSuccessMsg(
        "SignUp Successful . You will be now automatically get redirect to the login page"
      );
      setName("");
      setEmail("");
      setPassword("");
      setError("");

      setTimeout(() => {
        setSuccessMsg("");
        // Redirect to login page on successful signup
        navigate("/login"); // Changed to navigate
      }, 5000);
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-xl font-bold text-center mb-8">Sign up</h2>
      {success && (
        <div>
          <h1 className=" bg-green-400 border-2 rounded-md">{success}</h1>
        </div>
      )}
      <form autoComplete="off" className="space-y-4" onSubmit={signup}>
        <div className="flex flex-col">
          <label htmlFor="name" className="text-sm font-medium mb-2">
            Name
          </label>
          <input
            type="text"
            className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="text-sm font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700"
        >
          SUBMIT
        </button>
      </form>
      {error && <span className="text-red-500 text-sm">{error}</span>}
      <br />
      <span className="text-sm">
        Already have an account? Login
        <Link to="/login" className="text-blue-500 underline">
          {" "}
          Here
        </Link>
      </span>
    </div>
  );
};
