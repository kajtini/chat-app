import GoogleIcon from "@mui/icons-material/Google";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { loggedIn, selectUser } from "../../features/user/userSlice";
import { auth } from "../../firebase/config";
import SignUpGetStartedBtn from "./SignUpGetStartedBtn";
import SignUpTitleMessage from "./SignUpTitleMessage";

const SignUp = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const navigate = useNavigate();

  const signUpWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const user = await signInWithPopup(auth, provider);

      if (user) {
        const { email, displayName, photoURL, uid } = user.user;

        const canLogin = email && displayName && photoURL && uid;

        if (canLogin) {
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
