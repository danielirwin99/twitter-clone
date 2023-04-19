import { DotsHorizontalIcon, SearchIcon } from "@heroicons/react/outline";
import { BadgeCheckIcon } from "@heroicons/react/solid";

const Trending = () => {
  return (
    <div className="hidden lg:flex flex-col p-3">
      Trending
      <div className="flex space-x-3 bg-white bg-opacity-10 w-[300px] h-[50px] p-3 rounded-3xl ">
        <SearchIcon className="w-6 text-gray-600" />
        <input
          className="bg-transparent focus:outline-none placeholder:text-gray-600"
          type="text"
          placeholder="Search Twitter"
        />
      </div>
      <div className="w-[300px] h-[500px] bg-white bg-opacity-10 rounded-3xl mt-3">
        <h1 className="font-bold text-xl p-3">Whats happening</h1>
        <div className="relative p-3">
          <DotsHorizontalIcon className="w-5 text-gray-600 absolute right-4 cursor-pointer" />
          <p className="text-xs text-gray-500">Trending in Australia</p>
          <h1 className="text-[15] font-bold">China</h1>
          <p className="text-xs text-gray-500">230K Tweets</p>
        </div>
        <div className="relative p-3">
          <DotsHorizontalIcon className="w-5 text-gray-600 absolute right-4 cursor-pointer" />
          <p className="text-xs text-gray-500">Business & Finance</p>
          <h1 className="text-[15] font-bold">$ICP</h1>
          <p className="text-xs text-gray-500">6,000 Tweets</p>
        </div>
        <div className="relative p-3">
          <DotsHorizontalIcon className="w-5 text-gray-600 absolute right-4 cursor-pointer" />
          <p className="text-xs text-gray-500">NBA Live</p>
          <h1 className="text-[15] font-bold">Clippers at Suns</h1>
          <p className="text-xs text-gray-500">24K Tweets</p>
        </div>
        <div className="relative p-3">
          <DotsHorizontalIcon className="w-5 text-gray-600 absolute right-4 cursor-pointer" />
          <p className="text-xs text-gray-500">Trending in Australia</p>
          <h1 className="text-[15] font-bold">Father Bob Maguire</h1>
          <p className="text-xs text-gray-500">2,530 Tweets</p>
        </div>
      </div>
      <div className="w-[300px] h-[300px] bg-white bg-opacity-10 rounded-3xl mt-3 overflow-x-hidden scrollBar ">
        <h1 className="font-bold text-xl p-3">Who to follow</h1>

        <div className="flex justify-between p-3">
          <div className="flex space-x-3">
            <img
              className="w-11 h-11 object-cover rounded-full"
              src="/assets/samwise.jpg"
              alt=""
            />
            <div>
              <div className="flex space-x-1 items-center relative">
                <h1 className="font-bold">Samwise Gamgee</h1>
                <BadgeCheckIcon className="w-[18px] absolute right-2 text-blue-400" />
              </div>
              <h1 className="text-[12px] text-gray-500 mt-0.5">@samwise</h1>
            </div>
          </div>
          <button className="bg-white text-black text-sm w-20 h-8 rounded-3xl font-bold">
            Follow
          </button>
        </div>
        <div className="flex justify-between p-3">
          <div className="flex space-x-3">
            <img
              className="w-11 h-11 object-cover rounded-full"
              src="/assets/samwise.jpg"
              alt=""
            />
            <div>
              <div className="flex space-x-1 items-center relative">
                <h1 className="font-bold">Samwise Gamgee</h1>
                <BadgeCheckIcon className="w-[18px] absolute right-2 text-blue-400" />
              </div>
              <h1 className="text-[12px] text-gray-500 mt-0.5">@samwise</h1>
            </div>
          </div>
          <button className="bg-white text-black text-sm w-20 h-8 rounded-3xl font-bold">
            Follow
          </button>
        </div>
        <div className="flex justify-between p-3">
          <div className="flex space-x-3">
            <img
              className="w-11 h-11 object-cover rounded-full"
              src="/assets/samwise.jpg"
              alt=""
            />
            <div>
              <div className="flex space-x-1 items-center relative">
                <h1 className="font-bold">Samwise Gamgee</h1>
                <BadgeCheckIcon className="w-[18px] absolute right-2 text-blue-400" />
              </div>
              <h1 className="text-[12px] text-gray-500 mt-0.5">@samwise</h1>
            </div>
          </div>
          <button className="bg-white text-black text-sm w-20 h-8 rounded-3xl font-bold">
            Follow
          </button>
        </div>
      </div>
    </div>
  );
};

export default Trending;
