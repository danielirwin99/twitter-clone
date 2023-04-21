import { openLoginModal } from "@/redux/modalSlice";
import { db, storage } from "@/utils/firebase";
import {
  CalendarIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  LocationMarkerIcon,
  PhotographIcon,
  XIcon,
} from "@heroicons/react/outline";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const TweetInput = () => {
  // Getting our user from redux
  const user = useSelector((state) => state.user);

  // Our State for firestore data
  const [text, setText] = useState("");

  // Our state for the storing photos/images
  const [image, setImage] = useState(null);

  // Loading State
  const [loading, setLoading] = useState(false);

  // Allows us to click the Photograph and reference to the input element below it
  const filePickerRef = useRef(null);

  const dispatch = useDispatch()

  async function sendTweet() {

    // If the user is not logged in
    if(!user.username) {
      // Procs the Login Modal if not logged in
      dispatch(openLoginModal())
      return
    }

    setLoading(true);
    const docRef = await addDoc(collection(db, "posts"), {
      username: user.username,
      name: user.name,
      photoUrl: user.photoUrl,
      uid: user.uid,
      // Gives a timestamp from firebase when the tweet was uploaded
      timestamp: serverTimestamp(),
      likes: [],
      tweet: text,
    });

    // Storing the images in firebase/storage
    if (image) {
      // Two arguments -> 1st. Your Storage,  2nd. A string that is a path to your firebase storage
      const imageRef = ref(storage, `tweetImages/${docRef.id}`);
      // Uploading the image to your storage
      // Pass in three things 1. Your const above, 2. the Image from the useState hook, 3.Data format
      const uploadImage = await uploadString(imageRef, image, "data_url");
      // Downloads the URL onto the storage for the browser to hold
      const downloadURL = await getDownloadURL(imageRef);
      await updateDoc(doc(db, "posts", docRef.id), {
        image: downloadURL,
      });
    }

    // After we press the button to tweet --> The textarea becomes an emptry string
    setText("");
    setImage(null);
    setLoading(false);
  }

  // Displaying the image on the browser
  function addImageToTweet(e) {
    // FileReader --> Allows the browser to read the file
    const reader = new FileReader();
    // Checking if the user did select a file --> The first file will be [0]
    if (e.target.files[0]) {
      // Converts the file into a URL
      reader.readAsDataURL(e.target.files[0]);
    }
    // Converts it into an Image
    reader.addEventListener("load", (e) => setImage(e.target.result));
  }

  return (
    <div className="flex space-x-3 p-3 border-b border-gray-700">
      <img
        className="w-11 h-11 rounded-full object-cover"
        src={user.photoUrl || "/assets/twitter-logo.png"}
        alt=""
      />
      {loading && <h1 className="text-2xl text-gray-500">Uploading post...</h1>}
      {!loading && (
        <div className="w-full">
          <textarea
            onChange={(e) => setText(e.target.value)}
            className="bg-transparent resize-none outline-none w-full min-h-[50px] text-lg"
            placeholder="What's on your mind?"
            value={text}
          ></textarea>

          {image && (
            <div className="relative mb-4">
              <div
                onClick={() => setImage(null)}
                className="absolute top-2 left-2 cursor-pointer w-8 h-8 bg-[#272c26] rounded-full flex items-center justify-center hover:bg-white hover:bg-opacity-10"
              >
                <XIcon className="h-6 " />
              </div>
              <img
                src={image}
                alt=""
                className="rounded-2xl m-h-80 object-contain "
              />
            </div>
          )}

          <div className="flex justify-between border-t border-gray-700 pt-4">
            {/* Icons Div */}
            <div className="flex space-x-0">
              <div
                onClick={() => filePickerRef.current.click()}
                className="iconsAnimation"
              >
                <PhotographIcon className="h-[22px] text-[#1d9bf0]" />
              </div>
              <input
                onChange={addImageToTweet}
                ref={filePickerRef}
                type="file"
                className="hidden"
              />
              <div className="iconsAnimation">
                <ChartBarIcon className="h-[22px] text-[#1d9bf0]" />
              </div>
              <div className="iconsAnimation">
                <EmojiHappyIcon className="h-[22px] text-[#1d9bf0]" />
              </div>
              <div className="iconsAnimation">
                <CalendarIcon className="h-[22px] text-[#1d9bf0]" />
              </div>
              <div className="iconsAnimation">
                <LocationMarkerIcon className="h-[22px] text-[#1d9bf0]" />
              </div>
            </div>
            <button
              onClick={sendTweet}
              // If there is no text and an image we want to disable the button
              disabled={!text && !image}
              className="bg-[#1d9bf0] rounded-full px-4 py-1.5 text-center font-bold disabled:opacity-65"
            >
              Tweet
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TweetInput;
