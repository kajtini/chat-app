import { User } from "../../../types/types";
import { Link } from "react-router-dom";

interface UserThumbnailProps {
  user: User;
}

const UserThumbnail = ({ user }: UserThumbnailProps) => {
  return (
    <Link to={`/chats/${user.uid}`}>
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
