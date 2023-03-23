import SearchIcon from "@mui/icons-material/Search";

interface ChatsSearchFormProps {
  chatsSearch: string;
  setChatsSearch: React.Dispatch<React.SetStateAction<string>>;
}

const ChatsSearchForm = ({
  chatsSearch,
  setChatsSearch,
}: ChatsSearchFormProps) => {
  return (
    <form className="flex items-center rounded-lg  bg-secondary overflow-hidden py-3 px-4 mb-3">
      <input
        type="text"
        placeholder="Search Chats..."
        className="w-full focus:outline-none placeholder:text-gray"
        value={chatsSearch}
        onChange={(e) => setChatsSearch(e.target.value)}
      />
      <SearchIcon className="text-gray" fontSize="medium" />
    </form>
  );
};

export default ChatsSearchForm;
