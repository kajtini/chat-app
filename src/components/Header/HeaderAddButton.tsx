import AddIcon from "@mui/icons-material/Add";

const HeaderAddButton = () => {
  return (
    <button className="p-4 shadow-2xl absolute  bg-accent rounded-full text-secondary top-0 left-[50%] translate-x-[-50%] translate-y-[-50%]">
      <AddIcon />
    </button>
  );
};

export default HeaderAddButton;
