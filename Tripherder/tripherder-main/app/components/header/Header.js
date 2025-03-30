import HeaderContent from './HeaderContent';
import { authOptions } from '../../api/auth/authOptions';
import { getServerSession } from 'next-auth';

export default async function Header() {

  const session = await getServerSession(authOptions);

  return <HeaderContent session={session} />
}
