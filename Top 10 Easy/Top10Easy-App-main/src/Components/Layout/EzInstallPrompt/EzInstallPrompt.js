import './EzInstallPrompt.css';
import { useEffect, useState } from "react";

export default function EzInstallPrompt() {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState(null);

  useEffect(() => {
    const handler = e => {
      e.preventDefault();
      console.log('handler invoked')
      setSupportsPWA(true);
      const addBtn = document.querySelector('div.install-banner');
      addBtn.classList.remove("hidden")
      setPromptInstall(e);

    };
    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("transitionend", handler);
  }, []);

  const addApp = evt => {
    evt.preventDefault();
    if (!promptInstall) {
      return;
    }
    promptInstall.prompt();
  };
  if (!supportsPWA) {
    return null;
  }
  return <div className="w-full h-full m-0 p-0 text-gray-700 bg-green-500 hover:bg-green-600 shadow-md fade-in install-banner hidden">
    <div className="flex content-center justify-center py-5 mx-auto md:flex-row max-w-7xl cursor-pointer hover:shadow-xl text-2xl text-white" onClick={addApp}>
      Install Top 10 Easy on your device
    </div>
  </div>
};