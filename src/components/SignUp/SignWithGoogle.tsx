import GoogleIcon from "@mui/icons-material/Google";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAppDispatch } from "../../app/hooks";
import { loggedIn } from "../../features/user/userSlice";
import { auth } from "../../firebase/config";
import { User } from "../../types/types";

interface SignWithGoogleProps {
  setUserDoc?: (user: User) => Promise<void>;
}

const SignWithGoogle = ({ setUserDoc }: SignWithGoogleProps) => {
  const dispatch = useAppDispatch();

  const signUpWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const user = await signInWithPopup(auth, provider);
      if (user) {
        const { email, displayName, photoURL, uid } = user.user;

        const canSignIn = email && displayName && photoURL && uid;

        if (canSignIn) {
          if (setUserDoc) {
            await setUserDoc({ email, displayName, photoURL, uid });
          }
          dispatch(loggedIn({ email, displayName, photoURL, uid }));
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      className="rounded-full py-3 w-full bg-accent  transition-all text-gray-light shadow-2xl text-lg hover:scale-105 self-end flex items-center gap-3 justify-center"
      onClick={(e) => {
        e.preventDefault();
        signUpWithGoogle();
      }}
    >
      <GoogleIcon />
      Sign Up/In with google
    </button>
  );
};

export default SignWithGoogle;
