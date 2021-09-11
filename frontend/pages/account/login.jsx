import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import Link from '@/components/Link';
import { FaUser } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_URL } from '@/config/index';
import Layout from '@/components/Layout/';
import AuthContext from '@/context/AuthContext';
import GlobalContext from '@/context/GlobalContext';
import styles from '@/styles/authForm.module.css';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const { login } = useContext(AuthContext);
    const { error, user } = useContext(GlobalContext);

    useEffect(() => {
        if (user) router.push('/account/dashboard');
    }, [user])

    useEffect(async () => {
        error && toast.error(error);
    }, [error])

    const handleSubmit = evt => {
        evt.preventDefault();
        if (user) return;
        login({ username, password });
    }

    return (
        <Layout title='User Login'>
            {/* <ToastContainer /> */}
            <div className={styles.auth}>
                <h1>
                    <FaUser /> Login
                </h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='username'>Username</label>
                        <input
                            type='text'
                            id='username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            id='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <input type='submit' value='Login' className='btn' />
                </form>
                <p>
                    Don't have an account? <Link href='/account/register'>Register</Link>
                </p>
            </div>
        </Layout>
    )
}