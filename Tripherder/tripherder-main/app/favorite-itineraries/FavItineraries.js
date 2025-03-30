import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/authOptions';
import TripsList from '../components/TripsList';

export default async function FavItineraries() {
  const session = await getServerSession(authOptions);

  const access_token = session?.user?.access_token;

  return (
    <TripsList
      type="favorite"
      access_token={access_token}
    />
  )
}
