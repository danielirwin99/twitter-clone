import {
  HomeIcon,
  HashtagIcon,
  InboxIcon,
  BookmarkIcon,
  ClipboardListIcon,
  BellIcon,
  DotsCircleHorizontalIcon,
  UserIcon,
} from "@heroicons/react/outline";
import Image from "next/image";

const Sidebar = () => {
  return (
    <div className="hidden sm:flex flex-col fixed h-full xl:ml-20">
      <nav className="space-y-1.5 relative h-full">
        <div className="py-3 xl:p-3 flex justify-center items-center xl:justify-start">
          <Image src={"/assets/twitter-logo.png"} width={34} height={34} />
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
        <div className="absolute bottom-0 ">User</div>
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
