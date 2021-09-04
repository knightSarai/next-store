import React, { useEffect, useContext } from 'react';
import Layout from "@/components/Layout";
import { API_URL } from '@/config/index';
import AuthContext from '@/context/AuthContext';

export default function Dashboard() {
    const { user, error, checkUserLoggedInState } = useContext(AuthContext);

    useEffect(() => {
        checkUserLoggedInState()
    }, [])

    return (
        <Layout title="User Dashboard">
            <h1>Dashboard: {user && user.username}</h1>
        </Layout>
    )
}