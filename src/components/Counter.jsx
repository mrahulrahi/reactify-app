import { useState } from 'react'
import { FaMinus, FaPlus } from "react-icons/fa";

const Counter = () => {
    const [counter, setCounter] = useState(0)

    return (
        <>
            <div>
                <ul className="pagination pagination-lg">
                    <li className="page-item"><span className="page-link btn-secondary" onClick={() => setCounter(counter === 0 ? counter : counter - 1)}><FaMinus /></span></li>
                    <li className="page-item"><span className="page-link btn-secondary" >{counter}</span></li>
                    <li className="page-item"><span className="page-link btn-secondary" onClick={() => setCounter(counter + 1)}><FaPlus /></span></li>
                </ul>
            </div>
        </>
    )
}

export default Counter