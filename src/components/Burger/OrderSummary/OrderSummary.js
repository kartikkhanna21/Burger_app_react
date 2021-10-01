import React, { Component } from 'react';
import Aux from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component{
    componentWillUpdate(){
        console.log('[ordersummary] is rendered');
    }
    render(){
        const ingredientSummary=Object.keys(this.props.ingredients)
        .map(igKey=>{
            return (
                <li key={igKey}><span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]} {/* Here igkey is s=name of each ingredient*/}
                </li>);
        })
        return(
            <Aux>
            <h3>YOUR ORDER</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
              {ingredientSummary}
            </ul>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={this.props.purchaseCanceled}>CANCEL</Button>
            <Button btnType="Success" clicked={this.props.purchaseConfirm}>CONFIRM</Button>
        </Aux>
        )
    }
}
export default OrderSummary;