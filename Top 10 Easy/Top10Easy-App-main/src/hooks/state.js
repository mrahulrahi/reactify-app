import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { currentBusinessState, globalSearchFocusState } from '../context/appState';
import { useLocation  } from "react-router-dom";

const useBusiness = () => {
    const [business, setBusiness] = useRecoilState(currentBusinessState);

    useEffect(() => {
       // check business state
       // if (deepEqual(business !== JSON.parse(localStorage.business))) setBusiness(JSON.parse(localStorage.business));
    }, [])
}
const useLoseFocus = (ref) => {
    const setHasFocus = useSetRecoilState(globalSearchFocusState)
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setHasFocus(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, setHasFocus]);
}
const useScrollTop = () =>{
    const location = useLocation();
    useEffect(() => {
        window.scrollTo(0,0)
    }, [location]);
    
}
export { useBusiness, useScrollTop, useLoseFocus };