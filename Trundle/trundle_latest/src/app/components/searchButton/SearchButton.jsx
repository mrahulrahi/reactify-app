import { useState, useEffect } from 'react';
import './SearchButton.css';
import { IoMdSearch } from "react-icons/io";


const SearchButton = () => {

    const [isButtonClicked, setIsButtonClicked] = useState(false);

    useEffect(() => {
        if (isButtonClicked) {
            document.body.classList.toggle('open-search'); // Replace with the class you want to toggle
        }
    }, [isButtonClicked]);

    const handleButtonClick = () => {
        setIsButtonClicked(!isButtonClicked);
    };

    return (
        <button className="search-btn rounded-circle cursor-pointer d-flex align-items-center justify-content-center" onClick={handleButtonClick}>
            <div className="search-btn-icon d-flex align-items-center justify-content-center rounded-circle">
                <IoMdSearch />
            </div>
        </button>

    )
}

export default SearchButton