import ChatIcon from "@mui/icons-material/Chat";
import { signOut } from "firebase/auth";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { loggedOut, selectUser } from "../../features/user/userSlice";
import { auth } from "../../firebase/config";
import { Link, NavLink, useNavigate } from "react-router-dom";
import ForumIcon from "@mui/icons-material/Forum";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddIcon from "@mui/icons-material/Add";

const Header = () => {
  return (
    <header className="w-full justify-between p-5 flex items-center bg-secondary rounded-t-[2rem] shadow-2xl relative">
      <ul className="flex justify-between w-full">
        <li>
          <Link to="/chats">
            <ForumIcon fontSize="large" className="text-gray-light" />
          </Link>
        </li>
        <li>
          <Link to="/user">
            <AccountCircleIcon fontSize="large" className="text-gray-light" />
          </Link>
        </li>
      </ul>

      <button className="p-4 shadow-2xl absolute  bg-accent rounded-full text-secondary top-0 left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <AddIcon />
      </button>
    </header>
  );
};

export default Header;
