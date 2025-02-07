import { useState, useEffect } from 'react';
import axios from 'axios';

const useUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch users
  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users'); // Adjust the endpoint as necessary
      setUsers(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Create user
  const createUser = async (userData) => {
    try {
      const response = await axios.post('/api/users', userData);
      setUsers((prevUsers) => [...prevUsers, response.data]);
    } catch (err) {
      setError(err);
    }
  };

  // Update user
  const updateUser = async (id, userData) => {
    try {
      const response = await axios.put(`/api/users/${id}`, userData);
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user._id === id ? response.data : user))
      );
    } catch (err) {
      setError(err);
    }
  };

  // Delete user
  const deleteUser = async (id) => {
    try {
      await axios.delete(`/api/users/${id}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, loading, error, createUser, updateUser, deleteUser };
};

export default useUser;