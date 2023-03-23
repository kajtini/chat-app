import GoogleIcon from "@mui/icons-material/Google";

interface SignUpGetStartedBtnProps {
  signUpWithGoogle: () => Promise<void>;
}

const SignUpGetStartedBtn = ({
  signUpWithGoogle,
}: SignUpGetStartedBtnProps) => {
  return (
    <button
      className="rounded-full py-4 w-full bg-accent max-w-[256px] flex items-center gap-2 justify-center transition-all text-primary shadow-2xl text-lg hover:scale-105"
      onClick={signUpWithGoogle}
    >
      <GoogleIcon fontSize="medium" />
      Get Started
    </button>
  );
};

export default SignUpGetStartedBtn;
