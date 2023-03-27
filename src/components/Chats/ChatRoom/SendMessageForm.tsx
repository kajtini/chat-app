import SendIcon from "@mui/icons-material/Send";
import { useRef, useEffect } from "react";

interface SendMessageFormProps {
  handleSendMessage: (content: string) => void;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  message: string;
  sendMessageLoading: boolean;
}

const SendMessageForm = ({
  handleSendMessage,
  setMessage,
  message,
  sendMessageLoading,
}: SendMessageFormProps) => {
  const canSend = Boolean(message);
  const messageInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!sendMessageLoading) {
      if (messageInputRef.current) {
        console.log(12);
        messageInputRef.current.focus();
      }
    }
  }, [sendMessageLoading]);

  return (
    <form
      className="flex items-center gap-5 px-5"
      onSubmit={(e) => {
        handleSendMessage(message);
        e.preventDefault();
      }}
    >
      <input
        placeholder="Message..."
        className="focus:outline-none placeholder:text-gray p-3 bg-secondary rounded-xl shadow-md w-full lg:p-5 lg:text-lg"
        disabled={sendMessageLoading ? true : false}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        ref={messageInputRef}
      />

      <button
        className="bg-accent self-stretch rounded-full px-3 disabled:bg-gray transition-all w-full max-w-[100px] lg:max-w-[150px]"
        disabled={!sendMessageLoading && canSend ? false : true}
      >
        <SendIcon sx={{ color: "white" }} />
      </button>
    </form>
  );
};

export default SendMessageForm;
