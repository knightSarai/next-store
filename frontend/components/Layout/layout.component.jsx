import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '../Header';
import Showcase from '../Showcase';
import Footer from '../Footer';
import styles from './layout.module.css';

export default function Layout({ title, keywords, description, children }) {
    const router = useRouter()
    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta name='description' content={description} />
                <meta name='keywords' content={keywords} />
            </Head>
            <Header />
            {router.pathname === '/' && <Showcase />}
            <div className={styles.container}>{children}</div>
            <Footer />
        </div>
    )
}

Layout.defaulProps = {
    title: 'Bare Knuckle',
    description: 'find the latest underground boxing fights',
    keywords: 'Boxing | Fights | Underground | Fights Event'
}