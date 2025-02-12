'use client'
import React, { useEffect, useState } from 'react'

interface Props {
    items: ListArray;
    heading: string;
    onSelectItem: (item: Item) => void;
}

export type ListArray = Item[];

export interface Item {
    id?: number;
    name?: string;
    price?: number;
    distance?: number;
}

const ListGroup = ({ items, heading, onSelectItem }: Props) => {
    const initial = items[0];
    let [selectedIndex , setSelectedIndex] = useState<any | null>(0);

    const onStart = () =>{setSelectedIndex(initial.id);
        onSelectItem(initial);}
    
        useEffect(() => {
            onStart();
          }, []);

    return (
        <div className='w-50'>
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