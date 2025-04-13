/* eslint-disable react/prop-types */

const ListItemTable = ({ data }) => {
    if (!data || Object.keys(data).length === 0) {
        return <p>No data available to display.</p>;
    }

    const keysArr = Object.keys(data);

    return (
        <div className="overflow-x-auto overflow-y-hidden">
            <table className="table table-auto table-dark rounded overflow-hidden">
                <thead>
                    <tr>
                        {keysArr.map((key, index) => (
                            <th className="capitalize" key={index} scope="col">
                                {key}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {keysArr.map((key) => (
                            <td key={key} scope="row" className="text-center">
                                {typeof data[key] === 'object' ? JSON.stringify(data[key]) : data[key]}
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>

    );
};

export default ListItemTable;
