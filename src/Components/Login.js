import { signInWithEmailAndPassword } from "firebase/auth";
import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "./Firebase";
import { toast } from "react-toastify";
import SigninWithGoogle from "./SigninWithGoogle";


export default function Login() {
  const [email, setEmail] = new useState("");
  const [password, setPassword] = new useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);

      toast.success("User Login Successfully", { position: "top-center" });
      navigate("/profile");
    } catch (error) {
      console.log(error.message);
      toast.error(error.messsage, { position: "bottom-center" });
      toast.error("User NOt  found", { position: "top-center" });
    }
  };
  return (
    <div>
      <form className="form-control" onSubmit={handleSubmit}>
        <h3>Login</h3>
        <label>Email</label>
        <input
          className="form-control"
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />

        <label>Password</label>
        <input
          className="form-control"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />

        <button type="submit">
          Login
        </button>
        <span>
          New User?<Link to={"/Register"}>Register</Link>
        </span>
        <SigninWithGoogle />
      </form>
    </div>
  );
}
