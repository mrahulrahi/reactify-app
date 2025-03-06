/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { sort } from 'fast-sort';

const UserTable = ({ sortOrder }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetching data when component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/users', { cache: 'no-store' });
      const data = await res.json();
      setUsers(data);
      setLoading(false);
    };

    fetchUsers();
  }, []); // Empty dependency array means this effect runs only once on mount

  // Sorting users based on the sortOrder
  const sortedUsers = sort(users).asc(sortOrder === 'email' ? user => user.email : user => user.name);

  if (loading) {
    return <p>Loading...</p>;
  }

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
                  {sortedUsers.map(user => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{Math.floor(Math.random() * 9000000000) + 1000000000}</td>
                      <td>{Math.floor(Math.random() * 10) + 1}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTable;
