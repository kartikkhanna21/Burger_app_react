import React ,{Component} from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls=[
    {label:'Salad', type:'salad'},
    {label:'Meat', type:'meat'},
    {label:'Cheese', type:'cheese'},
    {label:'Bacon', type:'bacon'},
];


const buildControls=(props)=>{
    
        return(
        
            <div className={classes.BuildControls}>
                    <p>Total price:<strong>{props.price.toFixed(2)}</strong></p> {/*here toFixed(2) restricts the decimal places to 2 */}

            {controls.map(ctrl=>(   ////it will loop through all the elements in that
                <BuildControl 
                key={ctrl.label} 
                label={ctrl.label}
                added={ () => props.ingredientAdded(ctrl.type) }
                removed={() => props.ingredientRemoved(ctrl.type)}
                disabled={props.disabled[ctrl.type]}
              />
                
            ))}
              <button className={classes.OrderButton} disabled={!props.purchaseable} onClick={props.order}>ORDER NOW</button> {/* ie if purchaseable is false disabled will be true and the button will be disabled*/}
    
        </div>
        )

    }

  




export default buildControls;
