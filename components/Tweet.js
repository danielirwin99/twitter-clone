import {
  openCommentModal,
  openLoginModal,
  setCommentTweet,
} from "@/redux/modalSlice";
import { db } from "@/utils/firebase";
import {
  ChartBarIcon,
  ChatIcon,
  HeartIcon,
  TrashIcon,
  UploadIcon,
} from "@heroicons/react/outline";

import { HeartIcon as FilledHeartIcon } from "@heroicons/react/solid";
import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";

const Tweet = ({ data, id }) => {
  // Redux tool to call the modal
  const dispatch = useDispatch();
  const router = useRouter();
  // Grabs the user details
  const user = useSelector((state) => state.user);

  // Sets the likes
  const [likes, setLikes] = useState([]);
  // Sets the comments
  const [comments, setComments] = useState([]);

  // Deletes tweet
  async function deleteTweet(e) {
    e.stopPropagation();
    await deleteDoc(doc(db, "posts", id));
  }

  async function likeComment(e) {
    // Stops us routing to the comments page after we click the HeartIcon
    e.stopPropagation();

    if (!user.username) {
      dispatch(openLoginModal());
      return;
    }

    // includes --> Checks if an element is an array or not
    if (likes.includes(user.uid)) {
      await updateDoc(doc(db, "posts", id), {
        // Removes the like from the user
        likes: arrayRemove(user.uid),
      });
    } else {
      // Directing to the path, second parameter is what you want to change/update
      await updateDoc(doc(db, "posts", id), {
        // Want to change the likes by pulling it from the uid
        likes: arrayUnion(user.uid),
      });
    }
  }

  // Listener that listens to changes in the document
  useEffect(() => {
    if (!id) return;

    const unsubscribe = onSnapshot(doc(db, "posts", id), (doc) => {
      setLikes(doc.data()?.likes);
      setComments(doc.data()?.comments);
    });
    return unsubscribe;
  }, []);

  return (
    <div
      onClick={() => router.push("/" + id)}
      className="border-b border-gray-700 cursor-pointer"
    >
      <TweetHeader
        // All of these values are dynamic
        username={data?.username}
        name={data?.name}
        timestamp={data?.timestamp?.toDate()}
        text={data?.tweet}
        photoUrl={data?.photoUrl}
      />
      <div className="p-3 ml-16 flex items-center text-gray-500 space-x-16">
        <div
          className="flex space-x-2 text-sm justify-center items-center"
          onClick={(e) => {
            e.stopPropagation();
            if (!user.username) {
              dispatch(openLoginModal());
            }
            dispatch(
              setCommentTweet({
                id: id,
                tweet: data?.tweet,
                photoUrl: data?.photoUrl,
                name: data?.name,
                username: data?.username,
              })
            );
            dispatch(openCommentModal());
          }}
        >
          <ChatIcon className="w-5 cursor-pointer hover:text-pink-500 " />
          {comments?.length > 0 && <span>{comments?.length}</span>}
        </div>
        <div
          className="flex space-x-2 text-sm justify-center items-center"
          onClick={likeComment}
        >
          {likes.includes(user.uid) ? (
            <FilledHeartIcon className="w-5 cursor-pointer text-pink-500" />
          ) : (
            <HeartIcon className="w-5 cursor-pointer hover:text-green-400 " />
          )}
          {likes.length > 0 && <span>{likes.length}</span>}
        </div>
        {user.uid === data?.uid && (
          <div
            className="cursor-pointer hover:text-red-600"
            onClick={deleteTweet}
          >
            <TrashIcon className="w-5" />
          </div>
        )}
        <ChartBarIcon className="w-5 cursor-not-allowed" />
        <UploadIcon className="w-5 cursor-not-allowed" />
      </div>
    </div>
  );
};

export default Tweet;

export function TweetHeader({ username, name, timestamp, text, photoUrl }) {
  return (
    <div className="flex space-x-3 p-3 ">
      <img
        src={photoUrl}
        alt=""
        className="h-11 w-11 rounded-full object-cover"
      />
      <div>
        <div className=" text-gray-500 flex items-center space-x-2">
          <h1 className="text-white font-bold">{name}</h1>
          <span>@{username}</span>
          <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
          <Moment fromNow>{timestamp}</Moment>
        </div>
        <span>{text}</span>
      </div>
    </div>
  );
}
