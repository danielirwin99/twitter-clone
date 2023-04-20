import { closeSignupModal, openSignupModal } from "@/redux/modalSlice";
import { Modal } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/utils/firebase";
import { useEffect, useState } from "react";
import { setUser } from "@/redux/userSlice";
import { useRouter } from "next/router";

const SingupModal = () => {
  // Opens the modal
  const isOpen = useSelector((state) => state.modals.signupModalOpen);
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  //
  const router = useRouter();

  async function handleSignUp() {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Second parameter is an object of things you want to change
    await updateProfile(auth.currentUser, {
      displayName: name,
      // Picking a random photo of the 6 profile pictures in the assets folder --> Math.ceil rounds it up from a decimal
      photoURL: `./assets/profilePictures/pfp${Math.ceil(
        Math.random() * 6
      )}.png`,
    });

    router.reload();
  }

  async function handleGuestSignin(email, password) {
    await signInWithEmailAndPassword(auth, "guest1111@gmail.com", "123456");
  }

  useEffect(() => {
    // This is a listening that listens to a user being signed up
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        return;
      }
      dispatch(
        setUser({
          // This splits the string of the email at the @ --> Makes the first part the username i.e danielirwin@gmail.com --> @danielirwin
          username: currentUser.email.split("@")[0],
          name: currentUser.displayName,
          email: currentUser.email,
          uid: currentUser.uid,
          photoUrl: currentUser.photoURL,
        })
      );
      //  handle redux actions
      console.log(currentUser);
    });
    // Turns off the listener --> So our website isnt slowed down
    return unsubscribe;
  }, []);

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
            <button
              onClick={handleGuestSignin}
              className="bg-white text-black w-full font-bold text-lg p-2 rounded-lg hover:opacity-80"
            >
              Sign in as Guest
            </button>
            <h1 className="text-center mt-4 font-bold text-lg">or</h1>
            <h1 className="mt-4 font-bold text-3xl">Create your Account</h1>
            <div className="flex flex-col">
              <input
                className="h-10 rounded-md bg-transparent border border-gray-700 p-6 my-4"
                type="text"
                placeholder="Full Name"
                onChange={(e) => setName(e.target.value)}
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
