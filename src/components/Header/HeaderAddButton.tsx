import AddIcon from "@mui/icons-material/Add";
import { useAppDispatch } from "../../app/hooks";
import { modalOpened } from "../../features/modal/modalSlice";

const HeaderAddButton = () => {
  const dispatch = useAppDispatch();

  return (
    <button
      className="p-4 shadow-2xl absolute  bg-accent rounded-full text-secondary top-0 left-[50%] translate-x-[-50%] translate-y-[-50%]"
      onClick={(e) => dispatch(modalOpened())}
    >
      <AddIcon />
    </button>
  );
};

export default HeaderAddButton;
