import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import Link from '@/components/Link'

import { API_URL } from "@/config/index"

import styles from './navigator.styles'

function Navigator(props) {
    const { classes, ...other } = props;
    const [categories, setCategories] = useState([]);

    useEffect(async () => {
        const res = await fetch(`${API_URL}/categories/tree`)
        const data = await res.json()
        setCategories(data)
    }, [])

    return (
        <Drawer variant="permanent" {...other}>
            <List disablePadding>
                <ListItem className={clsx(classes.firebase, classes.item, classes.itemCategory)}>
                    Next Store
                </ListItem>
                <ListItem className={clsx(classes.item, classes.itemCategory)}>
                    <ListItemIcon className={classes.itemIcon}>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText classes={{
                        primary: classes.itemPrimary,
                    }}

                    >
                        <Link href="/" className={classes.item}>
                            All Products
                        </Link>
                    </ListItemText>
                </ListItem>
                {categories.map(({ id, name, children, slug }) => (
                    <React.Fragment key={id}>
                        <ListItem className={classes.categoryHeader}>
                            <ListItemText
                                classes={{
                                    primary: classes.categoryHeaderPrimary,
                                }}
                            >
                                <Link className={classes.categoryHeaderPrimary} href={`/categories/${slug}`}>{name}</Link>
                            </ListItemText>
                        </ListItem>
                        {children?.map(({ id, name, slug }) => (
                            <ListItem
                                key={id}
                                button

                            >
                                {/* <ListItemIcon className={classes.itemIcon}>{icon}</ListItemIcon> */}
                                <ListItemText
                                    classes={{
                                        primary: classes.itemPrimary,
                                    }}
                                >
                                    <Link className={classes.item} href={`/categories/${slug}`}>{name}</Link>
                                </ListItemText>
                            </ListItem>
                        ))}
                        <Divider className={classes.divider} />
                    </React.Fragment>
                ))}
            </List>
        </Drawer>
    );
}

Navigator.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navigator);