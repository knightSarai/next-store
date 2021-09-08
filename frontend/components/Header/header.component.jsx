import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Link from '@/components/Link';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AuthContext from '@/context/AuthContext';
import { withStyles } from '@material-ui/core/styles';
import styles from './header.styles';


function Header(props) {
    const { classes, onDrawerToggle } = props;
    const { user, error, logout } = useContext(AuthContext);
    useEffect(() => {
        error && console.log(error);
    }, [error])

    const authenticationHeader = () => {
        if (user) return (
            <>
                <Grid item>
                    <Link href="/account/dashboard">
                        <Avatar alt="My Avatar" />
                    </Link>
                </Grid>
                <Grid item>
                    <Typography color="inherit" variant="h6" onClick={logout}>
                        logout
                    </Typography>
                </Grid>
            </>
        )

        return (
            <Grid item>
                <Typography variant="h6">
                    <Link href="/account/login" className={classes.headerLink}>
                        login
                    </Link>
                </Typography>
            </Grid>
        )

    }
    return (
        <React.Fragment>
            <AppBar color="primary" position="sticky" elevation={0} style={{ padding: " 20px 10px" }}>
                <Toolbar>
                    <Grid container spacing={1} alignItems="center" justifyContent="center">
                        <Hidden smUp>
                            <Grid item>
                                <IconButton
                                    color="inherit"
                                    aria-label="open drawer"
                                    onClick={onDrawerToggle}
                                    className={classes.menuButton}
                                >
                                    <MenuIcon />
                                </IconButton>
                            </Grid>
                        </Hidden>
                        <Grid item xs>
                            <Typography color="inherit" variant="h5" component="h1">
                                Shop Now!
                            </Typography>
                        </Grid>
                        <Grid item xs />
                        {authenticationHeader()}
                    </Grid>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
    onDrawerToggle: PropTypes.func.isRequired,
};

export default withStyles(styles)(Header);