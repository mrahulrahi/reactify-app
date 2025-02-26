import React from 'react'
import { Item } from './ListGroup'

interface Props {
    data: Item;
}

const ListItemTable = ({ data }: Props) => {

    const keysArr = Object.keys(data);
    return (

        <table className="table table-auto table-dark rounded overflow-hidden">
            <thead>
                <tr>
                    {keysArr.map((item, index) =>
                        <th className='text-capitalize' key={index} scope="col">{item}</th>
                    )}
                </tr>
            </thead>
            <tbody>
                <tr>
                    {keysArr.map((item) =>
                        <td key={item} scope='row'>{data[item as keyof typeof data]}</td>
                    )}
                </tr>
            </tbody>
        </table >
    )
}

export default ListItemTable