import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";
import ChatRoomThumbnail from "./ChatRoomThumbnail";
import { ChatRoom } from "../../types/types";
import ChatSearchForm from "./ChatSearchForm";

const Chats = () => {
  const [chats, setChats] = useState<Array<ChatRoom>>([]);
  const [chatsSearch, setChatsSearch] = useState("");

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

  return (
    <div className="flex-grow w-full p-5 flex flex-col">
      <ChatSearchForm
        chatsSearch={chatsSearch}
        setChatsSearch={setChatsSearch}
      />

      <ul className="flex flex-col gap-3 w-full">
        {chats?.map((chat) => (
          <ChatRoomThumbnail key={chat.id} chat={chat} />
        ))}
      </ul>
    </div>
  );
};

export default Chats;
