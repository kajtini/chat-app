import West from "@mui/icons-material/West";
import { Link } from "react-router-dom";

interface ChatHeaderProps {
  chatName: string;
}

const ChatHeader = ({ chatName }: ChatHeaderProps) => {
  return (
    <div className="w-full p-5 flex items-center justify-between bg-primary-lighter">
      <Link to="/chats">
        <West fontSize="medium" />
      </Link>

      <p className="text-xl">{chatName}</p>
    </div>
  );
};

export default ChatHeader;
