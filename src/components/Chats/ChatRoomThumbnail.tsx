import { ChatRoom } from "../../types/types";

interface ChatRoomThumbnailProps {
  chat: ChatRoom;
}

// https://lh3.googleusercontent.com/a/AGNmyxYCTpBeGyDsE_BiQDc2jTCEsioQpK_7jd0SPe0V=s96-c

const ChatRoomThumbnail = ({ chat }: ChatRoomThumbnailProps) => {
  return (
    <li className="w-full px-4 py-5 bg-secondary rounded-lg shadow-sm">
      <div className="flex items-center gap-3">
        <img
          className="max-h-11 rounded-full"
          src="https://mui.com/static/images/avatar/1.jpg"
          alt="user image"
        />

        <div>
          <p className="text-sm font-bold">John Smith</p>
          <p className="text-sm text-gray ">Hey man, are you here? </p>
        </div>

        <p className="text-gray text-sm self-start ml-auto">13:32 PM</p>
      </div>
    </li>
  );
};

export default ChatRoomThumbnail;
