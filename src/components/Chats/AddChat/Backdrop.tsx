import { useAppDispatch } from "../../../app/hooks";
import { modalClosed } from "../../../features/modal/modalSlice";

const Backdrop = () => {
  const dispatch = useAppDispatch();

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 z-[1]"
      onClick={(e) => dispatch(modalClosed())}
    ></div>
  );
};

export default Backdrop;
