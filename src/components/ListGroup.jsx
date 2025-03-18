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
            <div className='text-2xl font-bold mb-2'>{heading}</div>
            <ul className="list-group flex flex-col rounded-md">
                {items.map((item) => <li key={item.id} className={`list-group-item relative block py-2 px-4 ${selectedIndex === item.id ? ' active' : ''}`} onClick={() => {
                    setSelectedIndex(item.id);
                    onSelectItem(item);
                }}>{item.name}</li>)}
            </ul>
        </div>
    )
}

export default ListGroup