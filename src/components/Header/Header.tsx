import ChatIcon from "@mui/icons-material/Chat";
import { signOut } from "firebase/auth";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { loggedOut, selectUser } from "../../features/user/userSlice";
import { auth } from "../../firebase/config";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(loggedOut());
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="w-full justify-between p-5 flex items-center border-b border-opacity-10 border-white">
      <div className="flex items-center gap-3">
        <ChatIcon />
        <p className="text-xl">Chatty</p>
      </div>

      {!user ? (
        <Link to="/" className="bg-accent py-2 px-4 rounded-xl block">
          Sign Up
        </Link>
      ) : (
        <div className="flex items-center gap-4">
          <button
            className="bg-accent py-2 px-4 rounded-xl"
            onClick={handleLogout}
          >
            Log Out
          </button>

          <img
            className="max-h-10 rounded-full"
            src={user.photoURL}
            alt="user image"
          />
        </div>
      )}
    </header>
  );
};

export default Header;
