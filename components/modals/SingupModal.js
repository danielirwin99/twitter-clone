import { closeSignupModal, openSignupModal } from "@/redux/modalSlice";
import { Modal } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/utils/firebase";
import { useState } from "react";

const SingupModal = () => {
  const isOpen = useSelector((state) => state.modals.signupModalOpen);
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignUp() {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
  }

  return (
    <>
      <button
        onClick={() => dispatch(openSignupModal())}
        className="bg-white text-black w-[160px] rounded-full h-[40px] hover:bg-[#cbd2d7]"
      >
        Sign Up
      </button>

      <Modal
        open={isOpen}
        onClose={() => dispatch(closeSignupModal())}
        className="flex justify-center items-center"
      >
        <div className="flex flex-col items-center w-[90%] h-fit bg-black text-white md:w-[560px] md:h-[640px] border border-gray-700 rounded-lg ">
          <div className="w-[90%] mt-8 ">
            <button className="bg-white text-black w-full font-bold text-lg p-2 rounded-lg hover:opacity-80">
              Sign in as Guest
            </button>
            <h1 className="text-center mt-4 font-bold text-lg">or</h1>
            <h1 className="mt-4 font-bold text-3xl">Create your Account</h1>
            <div className="flex flex-col">
              <input
                className="h-10 rounded-md bg-transparent border border-gray-700 p-6 my-4"
                type="text"
                placeholder="Full Name"
              />
              <input
                className="h-10 rounded-md bg-transparent border border-gray-700 p-6 my-4"
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="h-10 rounded-md bg-transparent border border-gray-700 p-6 my-4"
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                onClick={handleSignUp}
                className="bg-white text-black w-full font-bold text-lg p-2 mb-6 rounded-lg hover:opacity-80"
              >
                Create Account
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SingupModal;
