/* eslint-disable react/prop-types */
import  { useEffect, useState } from 'react'

const ListGroup = ({ items, heading, onSelectItem }) => {
    const initial = items[0];
    let [selectedIndex , setSelectedIndex] = useState(0);

    const onStart = () =>{setSelectedIndex(initial.id);
        onSelectItem(initial);}
    
        useEffect(() => {
            onStart();
          }, []);

    return (
        <div className='w-1/2'>
            <div className='fs-4 fw-bold mb-2'>{heading}</div>
            <ul className="list-group">
                {items.map((item) => <li key={item.id} className={selectedIndex === item.id ? 'list-group-item active' : 'list-group-item'} onClick={() => {
                    setSelectedIndex(item.id);
                    onSelectItem(item);
                }}>{item.name}</li>)}
            </ul>
        </div>
    )
}

export default ListGroup