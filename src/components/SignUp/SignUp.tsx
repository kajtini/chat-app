import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { loggedIn, selectUser } from "../../features/user/userSlice";
import { auth, db } from "../../firebase/config";
import { User } from "../../types/types";
import SignUpGetStartedBtn from "./SignUpGetStartedBtn";
import SignUpTitleMessage from "./SignUpTitleMessage";

const SignUp = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const navigate = useNavigate();

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

  const signUpWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const user = await signInWithPopup(auth, provider);
      if (user) {
        const { email, displayName, photoURL, uid } = user.user;

        const canLogin = email && displayName && photoURL && uid;

        if (canLogin) {
          await setUserDoc({ email, displayName, photoURL, uid });
          dispatch(loggedIn({ email, displayName, photoURL, uid }));
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center gap-5 w-full">
      <SignUpTitleMessage />
      <SignUpGetStartedBtn signUpWithGoogle={signUpWithGoogle} />
    </div>
  );
};

export default SignUp;
