import React from 'react';
import burgerlogo from '../../assets/images/burger-logo.png';
import classes from './Logo.module.css';

const logo =(props)=>(
    <div className={classes.Logo} style={{height:props.height}}> {/* Using this the height property of Logo class is changed dynamically*/}
        <img src={burgerlogo} alt="my-burger"/>
    </div>
);

export default logo;