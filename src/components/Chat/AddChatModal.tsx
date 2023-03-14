import { addDoc, collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase/config";
import { ChatRoom } from "../../types/types";

interface AddChatModalProps {
  closeModal: () => void;
}

const AddChatModal = ({ closeModal }: AddChatModalProps) => {
  const [chatName, setChatName] = useState("");
  const [chatPassword, setChatPassword] = useState("");

  const navigate = useNavigate();

  const handleAddChat = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const completedChat: ChatRoom = {
        title: chatName,
        password: chatPassword,
        createdAt: Timestamp.now(),
      };

      await addDoc(collection(db, "chats"), completedChat);
      setChatName("");
      closeModal();
      navigate(`/chats/${chatName}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChatNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setChatName(e.target.value);
  const handleChatPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setChatPassword(e.target.value);

  return (
    <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[2]  items-center bg-gradient-to-b from-primary-lighter to-primary border-white border-solid border-[1px] border-opacity-10 rounded-xl p-6 w-full max-w-xs">
      <form onSubmit={handleAddChat}>
        <div className="flex flex-col items-center gap-3">
          <input
            className="rounded-xl p-3 bg-primary border-white border-solid border-[1px] border-opacity-10 focus:outline-none focus:border-opacity-30 w-full"
            type="text"
            placeholder="Chatroom Name"
            value={chatName}
            onChange={handleChatNameChange}
          />
          <input
            className="rounded-xl p-3 bg-primary border-white border-solid border-[1px] border-opacity-10 focus:outline-none focus:border-opacity-30 w-full"
            type="password"
            placeholder="Room password"
            value={chatPassword}
            onChange={handleChatPasswordChange}
          />
          <button className="bg-accent py-3 rounded-xl max-w-[100px] w-full self-start">
            Add Chat
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddChatModal;
