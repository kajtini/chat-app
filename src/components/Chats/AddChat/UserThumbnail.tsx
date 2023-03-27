import { User } from "../../../types/types";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../app/hooks";
import { modalClosed } from "../../../features/modal/modalSlice";

interface UserThumbnailProps {
  user: User;
}

const UserThumbnail = ({ user }: UserThumbnailProps) => {
  const dispatch = useAppDispatch();

  return (
    <Link to={`/chats/${user.uid}`} onClick={() => dispatch(modalClosed())}>
      <li className="flex items-center gap-5 bg-secondary p-3 rounded-lg shadow-sm cursor-pointer">
        <img
          className="max-h-11 rounded-full"
          src={user.photoURL}
          alt="user image"
        />

        <p>{user.displayName}</p>
      </li>
    </Link>
  );
};

export default UserThumbnail;
