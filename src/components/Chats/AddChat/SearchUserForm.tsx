import SearchIcon from "@mui/icons-material/Search";

const SearchUserForm = () => {
  return (
    <form className="flex items-center rounded-lg  bg-secondary overflow-hidden py-3 px-4 shadow-sm w-full">
      <input
        type="text"
        placeholder="Search Users..."
        className="w-full focus:outline-none placeholder:text-gray"
      />
      <SearchIcon className="text-gray" fontSize="medium" />
    </form>
  );
};

export default SearchUserForm;