import { useParams } from 'react-router';

const UserDetailPage = () => {
  // Get the 'id' parameter from the URL
  const { id } = useParams();

  // Convert id to a number for comparison
  const userId = parseInt(id, 10);

  if (userId > 10) {
    return <div>User not found</div>;
  }

  return (
    <div>UserDetailPage {userId}</div>
  );
}

export default UserDetailPage;
