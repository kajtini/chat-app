import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { modalOpened } from "../../features/modal/modalSlice";

const HeaderAddButton = () => {
  const dispatch = useAppDispatch();

  return (
    <Link
      to="/chats"
      className="p-4 lg:p-5 shadow-2xl absolute  bg-accent rounded-full text-secondary top-0 left-[50%] translate-x-[-50%] translate-y-[-50%]"
      onClick={(e) => dispatch(modalOpened())}
    >
      <AddIcon className="text-gray-light" />
    </Link>
  );
};

export default HeaderAddButton;
