import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { NEXT_URL, API_URL } from "@/config/index";
import Cookies from 'js-cookie'
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    // useEffect(() => checkUserLoggedInState(), [])

    const router = useRouter();

    const getCsrf = async () => {

        const res = await fetch(`${API_URL}/account/csrf/`, {
            credentials: 'include',
            headers: {
                "Content-Type": 'application/json'
            },
        });

        if (!res.ok) {
            setError(data.message)
            setError(null);
            return;
        }
    }

    const login = async ({ username, password }) => {
        const res = await fetch(`${API_URL}/account/login/`, {
            method: 'POST',
            credentials: "include",
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify({
                username,
                password
            })
        });

        const data = await res.json();

        if (!res.ok) {
            setError(data.message)
            setError(null);
            return;
        }

        setUser(data.user);

    }

    const logout = async () => {
        const res = await fetch(`${API_URL}/account/logout/`, {
            credentials: "include",
            headers: {
                "Content-Type": 'application/json',
            },
        });

        if (res.ok) {
            setUser(null);
            router.push('/')
        }

    }

    const register = async user => {
        const res = await fetch(`${NEXT_URL}/api/auth/register`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(user),
        });

        const data = await res.json();

        if (!res.ok) {
            setError(data.message)
            setError(null);
            return;
        }

        setUser(data.user);
        router.push('/account/dashboard');
    }

    const checkUserLoggedInState = async () => {
        const res = await fetch(`${API_URL}/account/check-logged-in/`, {
            credentials: "include",
            headers: {
                "Content-Type": 'application/json',
            }
        });


        const data = await res.json();

        if (res.ok) {
            setUser(data.user);
            return
        }
        setError(data)
        setUser(null);
    }


    const context = {
        user,
        error,
        login,
        logout,
        // register, 
        getCsrf,
        checkUserLoggedInState
    }

    return (
        <AuthContext.Provider value={context}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;