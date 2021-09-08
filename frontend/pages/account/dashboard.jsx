import React, { useEffect, useContext } from 'react';
import Layout from "@/components/Layout";
import Protected from '@/components/Protected/';
import { API_URL } from '@/config/index';
import AuthContext from '@/context/AuthContext';

export default function Dashboard() {
    const { user, error } = useContext(AuthContext);

    useEffect(() => {
        console.log(user);
    }, [user])

    return (
        <Layout title="User Dashboard">
            <Protected>
                <h1>Dashboard: {user && user.username}</h1>
            </Protected>
        </Layout>
    )
}