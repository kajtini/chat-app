interface BackdropProps {
  closeModal: () => void;
}

const Backdrop = ({ closeModal }: BackdropProps) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-[1]"
      onClick={closeModal}
    ></div>
  );
};

export default Backdrop;
