import { Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectUser } from "../../features/user/userSlice";

const ProtectedRoutes = () => {
  const user = useAppSelector(selectUser);
  const auth = user ? true : false;

  return auth ? <Outlet /> : <Navigate to="/signup" />;
};

export default ProtectedRoutes;
