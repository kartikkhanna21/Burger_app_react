import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar =(props)=>(
    <header className={classes.Toolbar}>
        <DrawerToggle clicked={props.drawerToggleClicked}/>
        <Logo height="80%"/> {/* using this height is passed to logo component and height property is cahnged */}
        <nav className={classes.DesktopOnly}>
            <NavigationItems/>
        </nav>
    

    </header>
);

export default toolbar;