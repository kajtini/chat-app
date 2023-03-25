import { User } from "../../../types/types";
import WestIcon from "@mui/icons-material/West";
import { Link } from "react-router-dom";

interface ChatRoomHeaderProps {
  interlocutor: User;
}

const ChatRoomHeader = ({ interlocutor }: ChatRoomHeaderProps) => {
  return (
    <div className="bg-secondary w-full p-5 shadow-md rounded-b-[2rem]">
      <div className="flex items-center gap-3">
        <Link to="/chats">
          <WestIcon />
        </Link>
        <img
          className="max-h-11 rounded-full"
          src={interlocutor.photoURL}
          alt="user image"
        />
        <p className="font-bold">{interlocutor.displayName}</p>
      </div>
    </div>
  );
};

export default ChatRoomHeader;
