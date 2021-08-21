import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import Link from '@/components/Link';
import Navigator from '@/components/Navigator';
import Content from '@/components/Content';
import Header from '@/components/Header';
import styles from './paperbase.styles';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="">
                Next Store
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}



const drawerWidth = 256;

function Paperbase(props) {
    const { classes } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <div className={classes.root}>
            <nav className={classes.drawer}>
                <Hidden smUp implementation="js">
                    <Navigator
                        PaperProps={{ style: { width: drawerWidth } }}
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                    />
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Navigator PaperProps={{ style: { width: drawerWidth } }} />
                </Hidden>
            </nav>
            <div className={classes.app}>
                <Header onDrawerToggle={handleDrawerToggle} />
                <main className={classes.main}>
                    <Content />
                </main>
                <footer className={classes.footer}>
                    <Copyright />
                </footer>
            </div>
        </div>
    );
}

Paperbase.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Paperbase);