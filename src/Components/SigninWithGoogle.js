import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";
import GoogleButton from "react-google-button";
import { auth, db } from "./Firebase";
import { toast } from "react-toastify";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
export default function SigninWithGoogle() {
  const navigate = new useNavigate();

  const GoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        console.log(result);
        toast.success("User Login Successfully.", { position: "top-center" });
        const user = result.user;
        if (user) {
          await setDoc(doc(db, "User", user.uid), {
            email: user.email,
            Username: user.displayName,
            Password: "",
            logo: user.photoURL,
          });
          navigate("/profile");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <p>or SigninWithGoogle</p>
      <GoogleButton onClick={GoogleLogin}></GoogleButton>
    </div>
  );
}
