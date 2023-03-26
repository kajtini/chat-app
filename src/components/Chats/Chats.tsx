import { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import ChatRoomThumbnail from "./ChatRoomThumbnail";
import { ChatRoom } from "../../types/types";
import ChatsSearchForm from "./ChatsSearchForm";
import { useAppSelector } from "../../app/hooks";
import { selectUser } from "../../features/user/userSlice";
import AddChatModal from "./AddChat/AddChatModal";
import Backdrop from "./AddChat/Backdrop";
import { selectIsOpen } from "../../features/modal/modalSlice";
import { User } from "firebase/auth";

const Chats = () => {
  const user = useAppSelector(selectUser);
  const isOpen = useAppSelector(selectIsOpen);

  const [chats, setChats] = useState<Array<ChatRoom> | null>(null);
  const [chatsSearch, setChatsSearch] = useState("");

  useEffect(() => {
    const fetchChats = async () => {
      try {
        if (user) {
          const chatsRef = collection(db, "users", user.uid, "chats");
          const chatsUserIds = await getDocs(chatsRef);
          const chatsDataPromises = chatsUserIds.docs.map(async (chat) => {
            const chatUser = await getDoc(doc(db, "users", chat.id));

            return {
              user: chatUser.data(),
              ...chat.data(),
            } as ChatRoom;
          });

          const chatsData = await Promise.all(chatsDataPromises);

          setChats(chatsData);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchChats();
  }, [user]);

  return (
    <div className="flex-grow w-full p-5 flex flex-col">
      <ChatsSearchForm
        chatsSearch={chatsSearch}
        setChatsSearch={setChatsSearch}
      />

      <ul className="flex flex-col gap-3 w-full">
        {chats?.map((chat) => (
          <ChatRoomThumbnail key={chat.user.uid} chat={chat} />
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
