import SendIcon from "@mui/icons-material/Send";

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
        className="focus:outline-none placeholder:text-gray p-3 bg-secondary rounded-xl shadow-md flex-grow"
        disabled={sendMessageLoading ? true : false}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button
        className="bg-accent self-stretch rounded-full px-3 disabled:bg-gray transition-all"
        disabled={!sendMessageLoading && canSend ? false : true}
      >
        <SendIcon sx={{ color: "white" }} />
      </button>
    </form>
  );
};

export default SendMessageForm;
