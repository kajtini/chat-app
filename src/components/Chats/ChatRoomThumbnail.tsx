import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectUser } from "../../features/user/userSlice";
import { ChatRoom, User } from "../../types/types";

interface ChatRoomThumbnailProps {
  chat: ChatRoom;
}

const ChatRoomThumbnail = ({ chat }: ChatRoomThumbnailProps) => {
  const user = useAppSelector(selectUser);

  const latestMessageDate = new Date(
    chat.latestMessage.createdAt.seconds * 1000 +
      chat.latestMessage.createdAt.nanoseconds / 1000000
  );

  const latestMessageDateConverted = latestMessageDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const latestMessageContentFormatted = `${chat.latestMessage.content.slice(
    0,
    20
  )}${chat.latestMessage.content.length > 20 ? "..." : ""}`;

  return (
    <Link to={`/chats/${chat.user.uid}`}>
      <li className="w-full px-4 py-5 bg-secondary rounded-lg shadow-sm">
        <div className="flex items-center gap-3">
          <img
            className="max-h-11 lg:max-h-14 rounded-full"
            src={chat.user.photoURL}
            alt="user image"
          />

          <div>
            <p className="text-sm lg:text-base font-bold">
              {chat.user.displayName}
            </p>
            <p className="text-sm lg:text-base text-gray ">
              {`
            ${
              chat.latestMessage.uid === user?.uid
                ? `You: ${latestMessageContentFormatted}`
                : latestMessageContentFormatted
            }
           `}
            </p>
          </div>

          <p className="text-gray text-sm self-start ml-auto lg:text-base">
            {latestMessageDateConverted}
          </p>
        </div>
      </li>
    </Link>
  );
};

export default ChatRoomThumbnail;
