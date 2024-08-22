import React from "react";
import { auth } from "./firebase-config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

function GoogleSignIn() {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        console.log("Google sign in success: ", result.user);
        console.log("Google sign in success: ", result.user.accessToken);

      })
      .catch((error) => {
        // Handle Errors here.
        console.log(error.message);
      });
  };

  return <button onClick={signInWithGoogle}>Sign in with Google</button>;
}

export default GoogleSignIn;
