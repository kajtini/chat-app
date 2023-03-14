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

const Chats = () => {
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
    <>
      <div className="flex-grow w-full p-7 flex flex-col">
        <ul className="flex flex-col w-full">
          {chats?.map((chat) => (
            <ChatRoomExcerpt key={chat.id} chat={chat} />
          ))}
        </ul>

        <button
          className=" self-end mt-auto bg-accent p-4 rounded-full"
          onClick={openModal}
        >
          <AddIcon />
        </button>

        {isOpen && (
          <>
            <AddChatModal closeModal={closeModal} />
            <Backdrop closeModal={closeModal} />
          </>
        )}
      </div>
    </>
  );
};

export default Chats;
