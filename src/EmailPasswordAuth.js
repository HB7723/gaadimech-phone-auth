import React, { useState } from "react";
import { auth } from "./firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

function EmailPasswordAuth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // User created
        const user = userCredential.user;
        console.log("User created: ", user);

        // Send verification email
        sendEmailVerification(user)
          .then(() => {
            // Email verification sent
            alert("Verification email sent. Please check your inbox.");
          })
          .catch((error) => {
            // Handle any errors encountered while sending the verification email
            console.error("Error sending verification email:", error);
            alert("Failed to send verification email. Please try again later.");
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // Handle errors from user creation, such as email already in use
        alert(errorMessage);
      });
  };

  const login = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("User logged in: ", user);

        // Optional: Check if email is verified
        if (!user.emailVerified) {
          alert("Please verify your email before logging in.");
          // You might want to log them out or disable certain features until they verify their email
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // Handle errors from sign in, such as wrong password
        alert(errorMessage);
      });
  };

  return (
    <div>
      <form>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" onClick={register}>
          Register
        </button>
        <button type="submit" onClick={login}>
          Login
        </button>
      </form>
    </div>
  );
}

export default EmailPasswordAuth;
