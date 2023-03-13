import GoogleIcon from "@mui/icons-material/Google";
import { useAppSelector } from "../app/hooks";
import SignUp from "../components/SignUp";
import { selectUser } from "../features/user/userSlice";

const SignUpPage = () => {
  const user = useAppSelector(selectUser);

  return (
    <>
      <SignUp />
    </>
  );
};

export default SignUpPage;
