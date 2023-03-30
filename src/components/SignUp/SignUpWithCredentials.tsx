import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase/config";
import { useAppDispatch } from "../../app/hooks";
import { loggedIn } from "../../features/user/userSlice";
import { User } from "../../types/types";
import { doc, setDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import SignWithGoogle from "./SignWithGoogle";

const SignUpWithCredentials = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();

  const canSignUp = Boolean(email && password);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signUp();
  };

  const setUserDoc = async (user: User) => {
    try {
      const { uid, photoURL, displayName, email } = user;

      await setDoc(
        doc(db, "users", uid),
        {
          uid,
          photoURL,
          displayName,
          email,
        },
        { merge: true }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const signUp = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);

      if (user.user.email && user.user.uid) {
        await setUserDoc({
          displayName: user.user.email,
          email: user.user.email,
          photoURL: "https://i.stack.imgur.com/34AD2.jpg",
          uid: user.user.uid,
        });
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

  return (
    <form
      className="flex flex-col w-full max-w-xs sm:max-w-md gap-4"
      onSubmit={handleFormSubmit}
    >
      <h2 className="text-4xl">Sign Up!</h2>

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
        disabled={!canSignUp}
      >
        Sign Up
      </button>

      <div className="flex gap-2 items-center">
        <p className="text-sm">Already have an account?</p>
        <Link
          to="/login"
          className="text-sm bg-accent bg-opacity-10 py-2 rounded-full px-5"
        >
          Log in
        </Link>
      </div>

      <p className="text-center text-xl">or</p>

      <SignWithGoogle setUserDoc={setUserDoc} />
    </form>
  );
};

export default SignUpWithCredentials;
