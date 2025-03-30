/* eslint-disable react/prop-types */

const ListItemTable = ({ data }) => {
    const keysArr = Object.keys(data);

    return (
        <table className="table table-auto table-dark rounded overflow-hidden">
            <thead>
                <tr>
                    {keysArr.map((item, index) =>
                        <th className='capitalize w-1/3' key={index} scope="col">{item}</th>
                    )}
                </tr>
            </thead>
            <tbody>
                <tr>
                    {keysArr.map((item) =>
                        <td key={item} scope='row' className="text-center">{data[item]}</td>  
                    )}
                </tr>
            </tbody>
        </table >
    );
}

export default ListItemTable;
