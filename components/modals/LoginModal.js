import { closeLoginModal, openLoginModal } from "@/redux/modalSlice";
import { auth } from "@/utils/firebase";
import { Modal } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const LoginModal = () => {
  const isOpen = useSelector((state) => state.modals.loginModalOpen);
  // Dispatches an action given
  const dispatch = useDispatch();
  console.log(isOpen);
  // Our state when the user creates an email
  const [email, setEmail] = useState("");
  // Same for password
  const [password, setPassword] = useState("");

  async function handleSignin() {
    await signInWithEmailAndPassword(auth, email, password);
  }

  async function handleGuestSignin(email, password) {
    await signInWithEmailAndPassword(auth, "guest1111@gmail.com", "123456");
  }

  return (
    <>
      <button
        onClick={() => dispatch(openLoginModal())}
        className="bg-transparent border border-white text-white w-[160px] rounded-full h-[40px] hover:bg-[#cbd2d7] hover:text-black"
      >
        Login
      </button>

      <Modal
        open={isOpen}
        onClose={() => dispatch(closeLoginModal())}
        className="flex justify-center items-center"
      >
        <div className="flex flex-col items-center w-[90%] h-fit bg-black text-white md:w-[560px] md:h-[640px] border border-gray-700 rounded-lg ">
          <div className="w-[90%] mt-5">
            <h1 className="mt-4 font-bold text-3xl">Sign In to your Account</h1>
            <div className="flex flex-col ">
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
                onClick={handleSignin}
                className="bg-white text-black w-full font-bold text-lg p-2 rounded-lg hover:opacity-80"
              >
                Sign In
              </button>
              <h1 className="text-center font-bold text-lg my-4">or</h1>
              <button
                onClick={handleGuestSignin}
                className="bg-white text-black w-full font-bold text-lg p-2 rounded-lg hover:opacity-80"
              >
                Sign in as Guest
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default LoginModal;
