import { useContext } from "react";
import GlobalContext from '@/context/GlobalContext';
import Link from '@/components/Link'
import Layout from '@/components/Layout';


const WithProtected = Component => ({ ...props }) => {
    const { user } = useContext(GlobalContext);
    return !user ?
        (<Layout>
            <h1>Not Allowed</h1>
            <Link href="/">Home Page</Link>
        </Layout>
        ) : (
            <Component {...props} />
        )
};


export default WithProtected
