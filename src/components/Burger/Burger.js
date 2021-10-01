import React from 'react';
import classes from "./Burger.module.css";
import BurgerIngredient from './BurgerIngredients/BurgerIngredients';
import {withRouter} from 'react-router-dom';

const burger = (props) =>{
    console.log(props);
 ///transforming ingredients object into an array and then 
        ///creating seperate array for each value in that 
        ///array and using the value to pass multiple elements of that array
    let transformedIngredients=Object.keys(props.ingredients).map(igkey=>{ 
        return[...Array(props.ingredients[igkey])].map((_,i)=>{
            return <BurgerIngredient key={igkey+i} type={igkey}/>;

        })
    }).reduce(              
        (arr,el)=>{  //arr takes the previous element as arguement,el contains the value
            return arr.concat(el)
        },[]);  //this returns the new array in transformedIngredients
        console.log(transformedIngredients);
    if(transformedIngredients.length === 0){
        transformedIngredients=<p>Please add Ingredients</p>;
    }
    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );


};

export default withRouter(burger); //withrouter passes parameters to the props of burger component like history,match and location,...