import { openCommentModal } from "@/redux/modalSlice";
import {
  ChartBarIcon,
  ChatIcon,
  HeartIcon,
  UploadIcon,
} from "@heroicons/react/outline";
import Moment from "react-moment";
import { useDispatch } from "react-redux";

const Tweet = ({ data }) => {
  // Redux tool to call the modal
  const dispatch = useDispatch();
  return (
    <div className="border-b border-gray-700">
      <TweetHeader
        username={data?.username}
        name={data?.name}
        timestamp={data?.timestamp?.toDate()}
        text={data?.tweet}
      />
      <div className="p-3 ml-16 flex items-center text-gray-500 space-x-16">
        <div onClick={() => dispatch(openCommentModal())}>
          <ChatIcon className="w-5 cursor-pointer hover:text-pink-500 " />
        </div>
        <HeartIcon className="w-5 cursor-pointer hover:text-green-400 " />
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
        src={photoUrl || "/assets/kylie.png"}
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
