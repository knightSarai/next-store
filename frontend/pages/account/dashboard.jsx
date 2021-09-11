import React, { useEffect, useContext } from 'react';
import Layout from "@/components/Layout";
import WithProtected from '@/components/Protected/';
import { API_URL } from '@/config/index';
import GlobalContext from '@/context/GlobalContext';
import WithSpinner from "@/components/Spinner";

function Dashboard() {
    const { user, error } = useContext(GlobalContext);

    return (
        <Layout title="User Dashboard">
            <h1>Dashboard: {user && user.username}</h1>
        </Layout>
    )
}

export default WithSpinner(WithProtected(Dashboard));