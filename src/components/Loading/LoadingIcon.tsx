import { HashLoader } from "react-spinners";

interface LoadingIconProps {
  loading: boolean;
  size: number;
}

const LoadingIcon = ({ loading, size }: LoadingIconProps) => {
  return (
    <HashLoader
      size={size}
      loading={loading}
      color="#703EFE"
      className="mx-auto my-auto"
    />
  );
};

export default LoadingIcon;
