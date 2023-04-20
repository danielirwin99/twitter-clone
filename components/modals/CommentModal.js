import { closeCommentModal } from "@/redux/modalSlice";
import {
  CalendarIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  LocationMarkerIcon,
  PhotographIcon,
  XIcon,
} from "@heroicons/react/outline";
import { Modal } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

const CommentModal = () => {
  const isOpen = useSelector((state) => state.modals.commentModalOpen);
  const dispatch = useDispatch();
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
                src="/assets/kylie.png"
              />
              <div>
                <div className="flex space-x-1.5">
                  <h1 className="font-bold">Kylie</h1>
                  <h1 className="text-gray-500">@kylie</h1>
                </div>
                <p className="mt-1">This is awesome</p>
                <h1 className="text-gray-500 text-[15px] mt-2">
                  Replying to <span className="text-[#1b9bf0]">@xgs</span>
                </h1>
              </div>
            </div>
          </div>
          <div className="mt-11">
            <div className="flex space-x-3">
              <img
                className="w-12 h-12 rounded-full object-cover"
                src="/assets/kylie.png"
              />
              <div className="w-full pt-1.5">
                <textarea
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
                    // onClick={sendTweet}
                    // If there is not text we want to disable the button
                    // disabled={!text}
                    className="bg-[#1d9bf0] rounded-full px-4 py-1.5 text-center font-bold disabled:opacity-65"
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
