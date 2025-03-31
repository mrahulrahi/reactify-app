import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import ReactPlayer from 'react-player';

export default function VideoModal({ videoUrl, isOpen, setIsOpen }) {
  const [frameLoaded, setFrameLoaded] = useState(false);

  function loadingFrame() {
    return !frameLoaded ? (
      <div className="w-full h-full flex flex-col items-center">
        <div className="flex flex-row h-3/4 items-center justify-center space-x-2">
          <div className="w-8 h-8 bg-green-200 rounded-full delay-75 animate-bounce"></div>
          <div className="w-8 h-8 bg-green-400 rounded-full delay-200 animate-bounce"></div>
          <div className="w-8 h-8 bg-green-600 rounded-full delay-500 animate-bounce"></div>
        </div>
        <div className="flex items-center">Loading video...</div>
      </div>
    ) : null;
  }

  return (
    <Transition appear show={isOpen === true ? true : false} as={Fragment}>
      <Dialog onClose={() => setIsOpen(false)} className="relative z-50">
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-800 opacity-60" />
        </Transition.Child>

        {/* Centered Modal */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full md:w-2/5 h-96 p-6 overflow-hidden bg-white shadow-xl rounded-2xl">
              <div className="mt-2 w-full h-full">
                {loadingFrame()}
                {/* {frameLoaded && */}
                <>
                  {videoUrl ? (
                    <ReactPlayer
                      className="d-none"
                      url={videoUrl}
                      width="100%"
                      height="100%"
                      controls
                      playing={true}
                      onReady={() => setFrameLoaded(true)}
                    />
                  ) : (
                    <p className="text-center text-red-500">No video available</p>
                  )}
                </>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
