import { useContext, useState, } from "react";
import GlobalContext from '@/context/GlobalContext';
import useStyles from './spinner.styles';
import Layout from '@/components/Layout';

const WithSpinner = Component => ({ ...props }) => {
    const classes = useStyles();
    const { isLoading } = useContext(GlobalContext);
    return isLoading ?
        (
            <Layout>
                <div className={classes.spinnerOverlay}>
                    <div className={classes.spinner} />
                </div>
            </Layout>
        ) : (
            <Component {...props} />
        )
};


export default WithSpinner
