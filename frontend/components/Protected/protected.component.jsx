import { useContext, useEffect } from "react";
import { useRouter } from 'next/router';
import AuthContext from '@/context/AuthContext';

export default function Protected({ children }) {
    const router = useRouter()
    const { getCsrf, checkUserLoggedInState, user } = useContext(AuthContext);

    useEffect(() => {
        getCsrf();
        checkUserLoggedInState();
    }, [])

    useEffect(() => {
        !user && router.push('/')
    }, [user])


    return (
        <div>
            {children}
        </div>
    )
}
