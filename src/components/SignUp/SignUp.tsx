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
      <div className="text-center">
        <h1 className="text-6xl mb-5 leading-[1.2]">Begin Your Journey!</h1>
        <p className="font-medium text-[#808080] max-w-[300px] mx-auto text-lg">
          Start chatting with your friends and people around the world right
          away.
        </p>
      </div>

      <button
        className="rounded-full py-4 w-full bg-accent max-w-[256px] flex items-center gap-2 justify-center transition-all text-primary shadow-2xl text-lg hover:scale-105"
        onClick={signUpWithGoogle}
      >
        <GoogleIcon fontSize="medium" />
        Get Started
      </button>
    </div>
  );
};

export default SignUp;
