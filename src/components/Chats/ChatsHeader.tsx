import RefreshIcon from "@mui/icons-material/Refresh";

interface ChatsHeaderProps {
  fetchChats: () => Promise<void>;
}

const ChatsHeader = ({ fetchChats }: ChatsHeaderProps) => {
  return (
    <div className="flex items-end justify-between mb-5">
      <h2 className="text-2xl sm:text-5xl">Your Chats</h2>
      <button
        className="flex items-center gap-2 bg-accent  rounded-full px-5 self-stretch"
        onClick={fetchChats}
      >
        <RefreshIcon />
        Refresh Chats
      </button>
    </div>
  );
};

export default ChatsHeader;
