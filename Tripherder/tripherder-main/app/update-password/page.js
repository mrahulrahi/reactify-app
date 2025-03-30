
import { getUserDetails } from '../lib/auth';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/authOptions';
import UpdatePasswordContent from './UpdatePasswordContent';

export const metadata = {
  title: 'Update Password | Tripherder',
};

export default async function UpdatePasswordPage() {

  const session = await getServerSession(authOptions);

  const access_token = session?.user?.access_token;

  // if (!access_token) {
  //   redirect("/");
  // }

  const userDetails = await getUserDetails({ access_token });

  return <UpdatePasswordContent
    access_token={access_token}
    profilePic={userDetails?.data?.photo}
  />
}
