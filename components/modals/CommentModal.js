import { closeCommentModal } from "@/redux/modalSlice";
import { db } from "@/utils/firebase";
import {
  CalendarIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  LocationMarkerIcon,
  PhotographIcon,
  XIcon,
} from "@heroicons/react/outline";
import { Modal } from "@mui/material";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const CommentModal = () => {
  // Re routes us to where we want
  const router = useRouter();
  // Comment Modal
  const isOpen = useSelector((state) => state.modals.commentModalOpen);
  // Changing the Image on the user inside the modal
  const userImg = useSelector((state) => state.user.photoUrl);
  // Displays the tweet comments
  const tweetDetails = useSelector((state) => state.modals.commentTweetDetails);
  // This gives us the user to use below
  const user = useSelector((state) => state.user);
  // Changes our comments
  const [comment, setComment] = useState("");
  // Dispatches actions
  const dispatch = useDispatch();

  async function sendComment() {
    // Pass in your collection --> posts and the id of the post (we got this from tweetDetails above)
    const docRef = doc(db, "posts", tweetDetails.id);
    const commentDetails = {
      // Username of the person currently logged in --> They are sending the comment
      username: user.username,
      name: user.name,
      photoUrl: user.photoUrl,
      comment: comment,
    };
    await updateDoc(docRef, {
      comments: arrayUnion(commentDetails),
    });

    // Closes the modal after you comment your tweet on a post
    dispatch(closeCommentModal())
    // Pushes us to the comment page of that comment.id
    router.push("/" + tweetDetails.id);
  }

  return (
    <>
      <Modal
        className="flex justify-center items-center"
        open={isOpen}
        onClose={() => dispatch(closeCommentModal())}
      >
        <div className=" relative bg-black rounded-lg w-full h-full sm:w-[600px] sm:h-[386px] border border-gray-500 text-white sm:p-10 p-4">
          <div className="absolute w-[2px] h-[91px] bg-gray-500 ml-6 mt-12"></div>
          <div
            onClick={() => dispatch(closeCommentModal())}
            className="absolute top-3.5 sm:left-4 right-4 cursor-pointer hover:opacity-75"
          >
            <XIcon className="w-6" />
          </div>
          <div>
            <div className="flex space-x-3 w-full">
              <img
                className="w-12 h-12 rounded-full object-cover"
                src={tweetDetails.photoUrl || "/assets/kylie.png"}
              />
              <div>
                <div className="flex space-x-1.5">
                  <h1 className="font-bold">{tweetDetails.name}</h1>
                  <h1 className="text-gray-500">@{tweetDetails.username}</h1>
                </div>
                <p className="mt-1">{tweetDetails.tweet}</p>
                <h1 className="text-gray-500 text-[15px] mt-2">
                  Replying to{" "}
                  <span className="text-[#1b9bf0]">
                    @{tweetDetails.username}
                  </span>
                </h1>
              </div>
            </div>
          </div>
          <div className="mt-11">
            <div className="flex space-x-3">
              <img
                className="w-12 h-12 rounded-full object-cover"
                src={userImg}
              />
              <div className="w-full pt-1.5">
                <textarea
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full bg-transparent resize-none text-lg pl-1.5 outline-none"
                  placeholder="Tweet your reply"
                ></textarea>
                <div className="flex justify-between border-t border-gray-500 pt-4">
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
                    onClick={() => sendComment}
                    // If there is no coment we want to disable the button
                    disabled={!comment}
                    className="bg-[#1d9bf0] rounded-full px-4 py-1.5 text-center font-bold disabled:opacity-50"
                  >
                    Tweet
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CommentModal;
