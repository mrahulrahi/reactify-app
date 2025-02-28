import React from 'react'
import { sort } from 'fast-sort';

interface User {
    id: number;
    name: string;
    email: string;
}

interface Props {
    sortOrder: string
}


const UserTable = async ({ sortOrder }: Props) => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users', { cache: 'no-store' });
    const users: User[] = await res.json();

    const sortedUsers = sort(users).asc(sortOrder === 'email' ? user => user.email : user => user.name)

    return (

        <div className="content-container">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h3>Member List</h3>
                        <div className="custom-table table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th style={{ width: '30%' }}>
                                            <a href="/users?sortOrder=name">Name of Members</a>
                                        </th>
                                        <th style={{ width: '30%' }}>
                                            <a href="/users?sortOrder=email">Email</a>
                                        </th>
                                        <th style={{ width: '25%' }}><a href="/users?sortOrder=mobile">Mobile No.</a></th>
                                        <th style={{ width: '15%' }}><a href="/users?sortOrder=books">No. of Books Issued</a></th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {sortedUsers.map(user => <tr key={user.id}>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{Math.floor(Math.random() * 9000000000) + 1000000000}</td>
                                        <td>{Math.floor(Math.random() * 10) + 1}</td>
                                    </tr>)}
                                </tbody>
                                <tbody>
                                    <tr>
                                        <td>Anil Kumar</td>
                                        <td>anilkumar@gmail.com</td>
                                        <td>8891547583</td>
                                        <td>6</td>
                                    </tr>
                                    <tr>
                                        <td>Ajay Singh</td>
                                        <td>ajaysingh@gmail.com</td>
                                        <td>9475215486</td>
                                        <td>5</td>
                                    </tr>
                                    <tr>
                                        <td>Babali</td>
                                        <td>babali@gmail.com</td>
                                        <td>6854745932</td>
                                        <td>2</td>

                                    </tr>
                                    <tr>
                                        <td>Chetan</td>
                                        <td>chetan@gmail.com</td>
                                        <td>9857145458</td>
                                        <td>7</td>
                                    </tr>
                                    <tr>
                                        <td>Dinesh</td>
                                        <td>dinesh@gmail.com</td>
                                        <td>6574589633</td>
                                        <td>3</td>
                                    </tr>
                                    <tr>
                                        <td>Ramesh</td>
                                        <td>ramesh@gmail.com</td>
                                        <td>9587423656</td>
                                        <td>8</td>
                                    </tr>
                                    <tr>
                                        <td>Nikhil</td>
                                        <td>nikhil@gmail.com</td>
                                        <td>8949745833</td>
                                        <td>1</td>
                                    </tr>
                                    <tr>
                                        <td>Rahul</td>
                                        <td>rahul@gmail.com</td>
                                        <td>8687546566</td>
                                        <td>4</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserTable