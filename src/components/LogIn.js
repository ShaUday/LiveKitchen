import React, { useState } from "react";
import { auth } from "../components/firebase";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, updateProfile } from "firebase/auth"; // Import signInWithEmailAndPassword from firebase/auth

export const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      ); // signInWithEmailAndPassword requires auth as the first parameter
      // Set display name after successful login
      await updateProfile(userCredential.user, {
        displayName: displayName,
      });

      // Signed in
      const user = userCredential.user;
      console.log("Logged in user:", user);
      setSuccessMsg("Login is Successfull");
      setEmail("");
      setPassword("");
      setError("");
      setTimeout(() => {
        setSuccessMsg("");
        navigate("/"); // Redirect to home page on successful login
      }, 4000);
      navigate("/"); // Redirect to home page on successful login
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <div>
        {success && (
          <div>
            <h1 className=" bg-green-400 border-2 rounded-md">{success}</h1>
          </div>
        )}
      </div>
      <form autoComplete="off" className="space-y-4" onSubmit={login}>
        <div>
          <div>
            <label
              htmlFor="displayName"
              className="block text-gray-700 font-bold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="displayName"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
              onChange={(e) => setDisplayName(e.target.value)}
              value={displayName}
            />
          </div>

          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-gray-700 font-bold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            LOGIN
          </button>
        </div>
        {error && <span className="text-red-500 text-xs italic">{error}</span>}
        <div className="text-center mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 underline">
            Register Here
          </Link>
        </div>
      </form>
    </div>
  );
};
