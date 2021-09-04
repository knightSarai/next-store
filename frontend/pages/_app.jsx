import { useEffect } from 'react';
import '@/styles/globals.css';
import { AuthProvider } from '@/context/AuthContext'


function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    jssStyles?.parentElement.removeChild(jssStyles);
  }, []);

  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )

}

export default MyApp;
