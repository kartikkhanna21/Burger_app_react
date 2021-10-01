import { Component } from "react";
import CheckoutSummary from '../../components/Order/ChechoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData'

class Checkout extends Component{
    state={
        ingredients:null,
        totalPrice:0

    }
    componentWillMount(){
        const query=new URLSearchParams(this.props.location.search); //beacuse component is rendered using route we can use location
        const ingredients={};
        let price=0;
        for(let param of query.entries()){
            //['salad','1']
            if(param[0]==='price'){
                price=param[1];
            }
            else{
                ingredients[param[0]]= +param[1]; //here param[1] s string so +param[1] is integer
            }

        }
        this.setState({ingredients:ingredients,totalPrice:price});
    }

    CheckoutCancelledHandler=()=>{
        this.props.history.goBack();
    }
    CheckoutContinuedHandler=()=>{
        this.props.history.replace('/checkout/contact-data');
    }
    render(){
        return(
            <div>
                <CheckoutSummary ingredients={this.state.ingredients}
                checkoutCancelled={this.CheckoutCancelledHandler}
                checkoutContinued={this.CheckoutContinuedHandler}/>
                <Route path={this.props.match.path + '/contact-data'} render={(props)=>(<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props}/>)}/>
                {/* USing render property to render component the history object is lost in props so we send a copy of current component props to the ContactData component*/}
            </div>

        );
    }
}
export default Checkout;