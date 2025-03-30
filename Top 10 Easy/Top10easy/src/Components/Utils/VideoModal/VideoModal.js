import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { currentVideoModalState } from '../../../context/appState';

export default function VideoModal(){
    const [videoPrev, setVideoPrev] = useRecoilState(currentVideoModalState)
    const [videoId, setVideoId] = useState('');
    const [frameLoaded, setFrameLoaded] = useState(false)

    useEffect(() => {
        if(videoPrev?.link){
            const videoLink = videoPrev?.link ?? 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
            const videoUrl = new URL(videoLink);
            if(videoUrl.searchParams.has('v')){
                setVideoId(videoUrl.searchParams.get('v'))
            }
        }
    }, [videoPrev])
    
  function closeModal() {
    setFrameLoaded(false)
    setVideoPrev({...videoPrev, open: false})
  }
  function videoLoaded(){
      setFrameLoaded(true)
  }
  function loadingFrame(){
      return (!frameLoaded) ?
        <div className="w-full h-full flex flex-col items-center">
        <div className="flex flex-row h-3/4 items-center justify-center space-x-2">
            <div className="w-8 h-8 bg-green-200 rounded-full delay-75 animate-bounce"></div>
            <div className="w-8 h-8 bg-green-400 rounded-full delay-200 animate-bounce"></div>
            <div className="w-8 h-8 bg-green-600 rounded-full delay-500 animate-bounce"></div>
        </div>
        <div className="flex items-center "> Loading video</div>
    </div>
    : null
  }

  return (
    <>
      <Transition appear show={videoPrev?.open ?? false} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-800 opacity-60" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full md:w-2/5 h-96 p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                </Dialog.Title>
                <div className="mt-2 w-full h-full">
                    {
                        loadingFrame()
                    }
                    {  
                        <iframe title="top10Easy promo" onLoad={(e)=> videoLoaded(e)} className="w-full h-full" src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`}>
                        </iframe>                                 
                    }
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}