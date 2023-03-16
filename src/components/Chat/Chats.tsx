import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import AddChatModal from "./AddChatModal";
import Backdrop from "./Backdrop";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";
import { Link } from "react-router-dom";
import ChatBubble from "@mui/icons-material/ChatBubble";
import ChatRoomExcerpt from "./ChatRoomExcerpt";
import { ChatRoom } from "../../types/types";
import SearchIcon from "@mui/icons-material/Search";
import { useAppSelector } from "../../app/hooks";
import { selectUser } from "../../features/user/userSlice";

const Chats = () => {
  const user = useAppSelector(selectUser);
  const [isOpen, setIsOpen] = useState(false);
  const [chats, setChats] = useState<Array<ChatRoom>>([]);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  useEffect(() => {
    const chatsRef = collection(db, "chats");

    onSnapshot(chatsRef, (querySnapshot) => {
      const chatsIds: Array<ChatRoom> = [];
      querySnapshot.docs.forEach((doc) => {
        chatsIds.push({
          ...doc.data(),
          id: doc.id,
        } as ChatRoom);
      });

      setChats(chatsIds);
    });
  }, []);

  console.log(chats);

  return (
    <div className="flex-grow w-full p-5 flex flex-col">
      <form className="flex items-center rounded-lg  bg-secondary overflow-hidden py-3 px-4 mb-3">
        <input
          type="text"
          placeholder="Search Chats..."
          className="w-full focus:outline-none placeholder:text-gray"
        />
        <SearchIcon className="text-gray" fontSize="medium" />
      </form>

      <ul className="flex flex-col gap-3 w-full">
        {chats?.map((chat) => (
          <ChatRoomExcerpt key={chat.id} chat={chat} />
        ))}
      </ul>
    </div>
  );
};

export default Chats;
