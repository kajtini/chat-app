import GoogleIcon from "@mui/icons-material/Google";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { loggedIn, selectUser } from "../../features/user/userSlice";
import { auth } from "../../firebase/config";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
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
      navigate("/chats");
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center gap-5 w-full">
      <h1 className="text-5xl font-medium">Sign Up</h1>

      <button
        className="rounded-xl py-3 w-full border-solid border-[1px] border-accent max-w-[220px] flex items-center gap-2 justify-center hover:bg-accent transition-all "
        onClick={signUpWithGoogle}
      >
        <GoogleIcon fontSize="small" />
        Sign Up with google
      </button>
    </div>
  );
};

export default SignUp;
