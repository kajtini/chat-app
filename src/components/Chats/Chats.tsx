import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";
import ChatRoomThumbnail from "./ChatRoomThumbnail";
import { ChatRoom } from "../../types/types";
import ChatsSearchForm from "./ChatsSearchForm";
import { useAppSelector } from "../../app/hooks";
import { selectUser } from "../../features/user/userSlice";
import AddChatModal from "./AddChat/AddChatModal";
import Backdrop from "./AddChat/Backdrop";
import { selectIsOpen } from "../../features/modal/modalSlice";

const Chats = () => {
  const user = useAppSelector(selectUser);
  const isOpen = useAppSelector(selectIsOpen);

  const [chats, setChats] = useState<Array<ChatRoom>>([]);
  const [chatsSearch, setChatsSearch] = useState("");

  useEffect(() => {
    if (!user) return;

    const chatsRef = collection(db, "users", user.uid, "chats");
  }, []);

  return (
    <div className="flex-grow w-full p-5 flex flex-col">
      <ChatsSearchForm
        chatsSearch={chatsSearch}
        setChatsSearch={setChatsSearch}
      />

      <ul className="flex flex-col gap-3 w-full">
        {chats?.map((chat) => (
          <ChatRoomThumbnail key={chat.id} chat={chat} />
        ))}
      </ul>

      {isOpen && (
        <>
          <AddChatModal />
          <Backdrop />
        </>
      )}
    </div>
  );
};

export default Chats;
