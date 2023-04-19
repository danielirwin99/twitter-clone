import {
  ChartBarIcon,
  ChatIcon,
  HeartIcon,
  UploadIcon,
} from "@heroicons/react/outline";

const Tweet = () => {
  return (
    <div className="border-b border-gray-700">
      <TweetHeader />
      <div className="p-3 ml-16 flex items-center text-gray-500 space-x-16">
        <ChatIcon className="w-5 cursor-pointer hover:text-pink-500 " />
        <HeartIcon className="w-5 cursor-pointer hover:text-green-400 " />
        <ChartBarIcon className="w-5 cursor-not-allowed" />
        <UploadIcon className="w-5 cursor-not-allowed" />
      </div>
    </div>
  );
};

export default Tweet;

export function TweetHeader() {
  return (
    <div className="flex space-x-3 p-3 ">
      <img
        src="/assets/kylie.png"
        alt=""
        className="h-11 w-11 rounded-full object-cover"
      />
      <div>
        <div className=" text-gray-500 flex items-center space-x-2">
          <span>@kylie</span>
          <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
          <span>2 hours ago</span>
        </div>
        <span>Text</span>
      </div>
    </div>
  );
}
