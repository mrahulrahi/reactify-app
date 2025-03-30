import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { localeState } from "../../../context/appState";
import logo from '../../../imgs/LogoTop10.jpg';
import LocaleSelection from "../../Utils/LocaleSelection/LocaleSelection";
import locales from "../../../locales/locales";

export default function Navigation() {
    const currentLocale = useRecoilValue(localeState);
    const [labels, setLabels] = useState(locales[currentLocale]?.navigationLabels);

    useEffect(() => {
        setLabels(locales[currentLocale]?.navigationLabels);
    }, [currentLocale]);

    const { pathname } = useLocation();

    // Function to determine if a link is active
    const isActive = (linkPath) => pathname === linkPath;

    return (
        <section className="w-full px-5 text-gray-700 bg-white border-b-2 shadow-md">
            <div className="container w-full flex flex-col flex-wrap items-center py-5 mx-auto md:flex-row max-w-7xl">
                <div className="relative flex flex-col md:flex-row w-full items-center justify-center">
                    <Link to="/" className="flex items-center my-5 font-medium justify-center text-gray-900 w-[184px] md:my-0">
                        <span className="mx-auto text-xl font-black leading-none text-gray-900 select-none">
                            <img src={logo} alt="Top10easy" />
                        </span>
                    </Link>
                    <nav className="flex flex-wrap self-center justify-center lg:justify-end text-base md:pl-8 md:ml-8 md:border-l md:border-gray-200">
                        <Link
                            to="/"
                            className={`mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900 ${isActive('/') ? 'border-b-2 border-green-500 transition-all duration-300' : 'border-b-2 border-transparent hover:border-green-500 transition-all duration-300'}`}
                        >
                            {labels?.home}
                        </Link>
                        <Link
                            to="/about"
                            className={`mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900 ${isActive('/about') ? 'border-b-2 border-green-500 transition-all duration-300' : 'border-b-2 border-transparent hover:border-green-500 transition-all duration-300'}`}
                        >
                            {labels?.aboutUs}
                        </Link>
                        <Link
                            to="/contact"
                            className={`mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900 ${isActive('/contact') ? 'border-b-2 border-green-500 transition-all duration-300' : 'border-b-2 border-transparent hover:border-green-500 transition-all duration-300'}`}
                        >
                            {labels?.contactUs}
                        </Link>
                    </nav>
                    <div className="inline-flex w-[68px] self-center space-x-6 shrink-0 md:ms-auto absolute -top-4 right-0 md:relative md:top-auto md:right-auto">
                        <LocaleSelection />
                    </div>
                </div>
            </div>
        </section>
    );
}
