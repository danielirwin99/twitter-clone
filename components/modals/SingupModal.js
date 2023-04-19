import { Modal } from "@mui/material";
import { useState } from "react";

const SingupModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);

  return (
    <>
      <button
        onClick={handleOpen}
        className="bg-white text-black w-[160px] rounded-full h-[40px] hover:bg-[#cbd2d7]"
      >
        Sign Up
      </button>

      <Modal
        open={isOpen}
        onClose={handleClose}
        className="flex justify-center items-center"
      >
        <div className="w-[400px] h-[200px] bg-white ">Signup Over Here</div>
      </Modal>
    </>
  );
};

export default SingupModal;
