import { current } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { loggedIn } from "../../features/user/userSlice";
import { auth, db } from "../../firebase/config";
import SignWithGoogle from "./SignWithGoogle";

const LogInWithCredentials = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const canLogin = Boolean(email && password);

  const logIn = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);

      if (user.user.email && user.user.uid) {
        dispatch(
          loggedIn({
            displayName: user.user.email,
            email: user.user.email,
            photoURL: "https://i.stack.imgur.com/34AD2.jpg",
            uid: user.user.uid,
          })
        );

        setEmail("");
        setPassword("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    logIn();
  };

  return (
    <form
      className="flex flex-col w-full max-w-xs sm:max-w-md gap-4"
      onSubmit={handleFormSubmit}
    >
      <h2 className="text-4xl">Log in!</h2>

      <input
        className="bg-gray p-4 rounded-md bg-opacity-20"
        type="text"
        placeholder="Email..."
        value={email}
        onChange={handleEmailChange}
      />
      <input
        className="bg-gray p-4 rounded-md bg-opacity-20"
        type="password"
        placeholder="Password..."
        value={password}
        onChange={handlePasswordChange}
      />

      <button
        className="rounded-full py-3 w-full bg-accent max-w-[128px] transition-all text-gray-light shadow-2xl text-lg hover:scale-105 self-end disabled:bg-gray disabled:bg-opacity-50"
        disabled={!canLogin}
      >
        Log In
      </button>

      <div className="flex gap-2 items-center">
        <p className="text-sm">Don't have an account?</p>
        <Link
          to="/signup"
          className="text-sm bg-accent bg-opacity-10 py-2 rounded-full px-5"
        >
          Sign up
        </Link>
      </div>

      <p className="text-center text-xl">or</p>

      <SignWithGoogle />
    </form>
  );
};

export default LogInWithCredentials;
