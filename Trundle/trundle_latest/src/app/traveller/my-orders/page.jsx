import { getServerSession } from 'next-auth';
import React from 'react';
import { authOptions } from '../../api/auth/authOptions';
import MyOrderContent from "./MyOrderContent"
import { getMyOrderedList } from '../../lib/traveller/traveller';

export default async function Page() {
    const session = await getServerSession(authOptions);

    const access_token = session?.user?.access_token

    const ordersList = await getMyOrderedList({ access_token });

    return <MyOrderContent session={session} ordersList={ordersList?.order_data} />
}
