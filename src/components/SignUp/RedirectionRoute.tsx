import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectUser } from "../../features/user/userSlice";

const RedirectionRoute = () => {
  const user = useAppSelector(selectUser);

  return user ? <Navigate to="/" /> : <Outlet />;
};

export default RedirectionRoute;
