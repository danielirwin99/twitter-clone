import { closeLoginModal, closeSignupModal } from "@/redux/modalSlice";
import { signOutUser } from "@/redux/userSlice";
import { auth } from "@/utils/firebase";
import {
  HomeIcon,
  HashtagIcon,
  InboxIcon,
  BookmarkIcon,
  ClipboardListIcon,
  BellIcon,
  DotsCircleHorizontalIcon,
  UserIcon,
  DotsHorizontalIcon,
} from "@heroicons/react/outline";
import { signOut } from "firebase/auth";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

const Sidebar = () => {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  async function handleSignOut() {
    await signOut(auth);

    // Signs out the user
    dispatch(signOutUser());
    // Closes the Signup modal when we sign out
    dispatch(closeSignupModal());
    // Closes the Login modal when we sign out
    dispatch(closeLoginModal());
  }

  return (
    <div className="hidden sm:flex flex-col fixed h-full xl:ml-20">
      <nav className="space-y-1.5 relative h-full">
        <div className="py-3 xl:p-3 flex justify-center items-center xl:justify-start">
          <Image
            src={"/assets/twitter-logo.png"}
            width={34}
            height={34}
            alt="Twitter Logo"
          />
        </div>
        <SidebarLink Icon={HomeIcon} text={"Home"} />
        <SidebarLink Icon={HashtagIcon} text={"Explore"} />
        <SidebarLink Icon={BellIcon} text={"Notifications"} />
        <SidebarLink Icon={InboxIcon} text={"Messages"} />
        <SidebarLink Icon={BookmarkIcon} text={"Bookmarks"} />
        <SidebarLink Icon={UserIcon} text={"Profile"} />
        <SidebarLink Icon={DotsCircleHorizontalIcon} text={"More"} />
        <button className="hidden xl:inline bg-[#1d9bf0] rounded-full h-[53px] w-[200px] text-lg font-bold mt-2 hover:opacity-80 transition-all duration-150 ease-in-out">
          Tweet
        </button>
        <div
          onClick={handleSignOut}
          className="absolute bottom-0 flex justify-center items-center space-x-3 ml-3 pb-3 xl:p-3 hover:bg-white hover:bg-opacity-10 rounded-full cursor-pointer"
        >
          <img
            className="w-10 h-10 rounded-full object-cover"
            src={user.photoUrl || "/assets/kylie.png"}
            alt=""
          />
          <div className="hidden xl:inline w-24">
            <h1 className="font-bold whitespace-nowrap">{user.name}</h1>
            <h1 className="text-gray-500 hidden xl:inline">@{user.username}</h1>
          </div>
          <DotsHorizontalIcon className="h-5 hidden xl:inline-block absolute right-0" />
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;

function SidebarLink({ text, Icon }) {
  return (
    <li className="flex mb-3 items-center justify-center text-xl space-x-3 hoverAnimation xl:p-3 xl:justify-start">
      <Icon className="h-7" />
      <span className="hidden xl:inline">{text}</span>
    </li>
  );
}
