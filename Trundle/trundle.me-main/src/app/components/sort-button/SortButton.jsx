import './SortButton.css';
import Image from 'next/image'
import SortIcon from './sort-icon.svg'

const SortButton = () => {
  return (
    <div className="dropdown">
      <button className="sort-btn d-flex align-items-center justify-content-center dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        <div className="sort-btn-icon d-flex align-items-center justify-content-center"><Image src={SortIcon} alt="sort icon" width={16} height={16} /></div>
        Sort
      </button>
      <ul className="dropdown-menu dropdown-menu-end">
        <li><a className="dropdown-item" href="#">Ascending Price</a></li>
        <li><a className="dropdown-item" href="#">Descending Price</a></li>
      </ul>
    </div>
  )
}

export default SortButton