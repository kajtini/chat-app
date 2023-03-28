import { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import ChatRoomThumbnail from "./ChatRoomThumbnail";
import { ChatRoom } from "../../types/types";
import { useAppSelector } from "../../app/hooks";
import { selectUser } from "../../features/user/userSlice";
import AddChatModal from "./AddChat/AddChatModal";
import Backdrop from "./AddChat/Backdrop";
import { selectIsOpen } from "../../features/modal/modalSlice";
import LoadingIcon from "../Loading/LoadingIcon";

const Chats = () => {
  const user = useAppSelector(selectUser);
  const isOpen = useAppSelector(selectIsOpen);
  const [chats, setChats] = useState<Array<ChatRoom> | null>(null);
  const [chatRoomsLoading, setChatRoomsLoading] = useState(false);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        if (user) {
          setChatRoomsLoading(true);
          const chatsQuery = query(
            collection(db, "users", user.uid, "chats"),
            orderBy("latestMessage.createdAt", "desc")
          );
          const chatsUserIds = await getDocs(chatsQuery);
          const chatsDataPromises = chatsUserIds.docs.map(async (chat) => {
            const chatUser = await getDoc(doc(db, "users", chat.id));

            return {
              user: chatUser.data(),
              ...chat.data(),
            } as ChatRoom;
          });

          const chatsData = await Promise.all(chatsDataPromises);
          setChats(chatsData);
          setChatRoomsLoading(false);
        }
      } catch (error) {
        console.error(error);
        setChatRoomsLoading(false);
      }
    };

    fetchChats();
  }, [user]);

  return (
    <div className="flex-grow w-full p-5 flex flex-col">
      <h2 className="text-3xl sm:text-5xl mb-5">Your Chats</h2>
      <LoadingIcon loading={chatRoomsLoading} size={70} />

      {!chatRoomsLoading && (
        <ul className="flex flex-col gap-3 w-full">
          {chats?.map((chat) => (
            <ChatRoomThumbnail key={chat.user.uid} chat={chat} />
          ))}
        </ul>
      )}

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
