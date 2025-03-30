import './AddButton.css';
import Image from 'next/image'
import AddButtonIcon from './add-button-icon.svg'

const AddButton = (props) => {
    return (
        <button className="add-btn d-flex align-items-center justify-content-center">
            <div className="add-btn-icon d-flex align-items-center justify-content-center"><Image src={AddButtonIcon} alt="add icon" width={20} height={20} /></div>
            {props.title}
        </button>
    )
}

export default AddButton