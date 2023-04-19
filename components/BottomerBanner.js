import LoginModal from "./modals/LoginModal";
import SingupModal from "./modals/SingupModal";

const BottomerBanner = () => {
  return (
    <div className="flex justify-center items-center xl:space-x-[200px] fixed w-full h-[80px] bg-[#1d9bf0] bottom-0">
      <div className="hidden xl:inline">
        <h1 className="text-2xl font-bold">Don't miss what's happening</h1>
        <span className="text-[18px]">
          People on Twitter are the first to know.
        </span>
      </div>
      <div className="space-x-3">
        <LoginModal  />
        <SingupModal />
      </div>
    </div>
  );
};

export default BottomerBanner;
