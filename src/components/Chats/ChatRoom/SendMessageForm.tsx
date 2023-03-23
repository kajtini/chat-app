import SendIcon from "@mui/icons-material/Send";

const SendMessageForm = () => {
  return (
    <form className="flex items-center gap-5 p-5">
      <input
        placeholder="Message..."
        className="focus:outline-none placeholder:text-gray p-3 bg-secondary rounded-xl shadow-md flex-grow"
      />

      <button className="bg-accent self-stretch rounded-full px-3">
        <SendIcon sx={{ color: "white" }} />
      </button>
    </form>
  );
};

export default SendMessageForm;
