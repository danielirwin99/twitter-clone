import { db } from "@/utils/firebase";
import {
  CalendarIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  LocationMarkerIcon,
  PhotographIcon,
} from "@heroicons/react/outline";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { useSelector } from "react-redux";

const TweetInput = () => {
  // Getting our user from redux
  const user = useSelector((state) => state.user);

  // Our State for firestore data
  const [text, setText] = useState("");

  async function sendTweet() {
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

    // After we press the button to tweet --> The textarea becomes an emptry string
    setText("");
  }

  return (
    <div className="flex space-x-3 p-3 border-b border-gray-700">
      <img
        className="w-11 h-11 rounded-full object-cover"
        src={user.photoUrl || "/assets/twitter-logo.png"}
        alt=""
      />
      <div className="w-full">
        <textarea
          onChange={(e) => setText(e.target.value)}
          className="bg-transparent resize-none outline-none w-full min-h-[50px] text-lg"
          placeholder="What's on your mind?"
          value={text}
        ></textarea>

        <div className="flex justify-between border-t border-gray-700 pt-4">
          {/* Icons Div */}
          <div className="flex space-x-0">
            <div className="iconsAnimation">
              <PhotographIcon className="h-[22px] text-[#1d9bf0]" />
            </div>
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
            // If there is not text we want to disable the button
            disabled={!text}
            className="bg-[#1d9bf0] rounded-full px-4 py-1.5 text-center font-bold disabled:opacity-65"
          >
            Tweet
          </button>
        </div>
      </div>
    </div>
  );
};

export default TweetInput;
