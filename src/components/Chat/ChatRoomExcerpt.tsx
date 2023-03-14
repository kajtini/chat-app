import ChatBubble from "@mui/icons-material/ChatBubble";
import { Link } from "react-router-dom";
import { ChatRoom } from "../../types/types";

interface ChatRoomExcerptProps {
  chat: ChatRoom;
}

const ChatRoomExcerpt = ({ chat }: ChatRoomExcerptProps) => {
  return (
    <li className="w-full py-5 px-3 border-white border-b-[1px] border-opacity-10 flex flex-col  gap-5">
      <Link to={`/chats/${chat.title}`} style={{ width: "100%" }}>
        <div className="flex items-center justify-between w-full">
          <p className="text-xl">{chat.title}</p>
          <ChatBubble />
        </div>
      </Link>
    </li>
  );
};

export default ChatRoomExcerpt;
