import { useEffect } from 'react';
import '@/styles/globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { GlobalStateProvider } from '@/context/GlobalContext';


function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    jssStyles?.parentElement.removeChild(jssStyles);
  }, []);

  return (
    <GlobalStateProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </GlobalStateProvider>
  )

}

export default MyApp;
