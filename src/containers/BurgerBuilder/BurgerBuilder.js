import React ,{ Component } from "react";
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildCotrols/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const INGREDIENT_PRICES={
    salad:0.5,
    cheese:1,
    meat:0.6,
    bacon:0.8,
}
class BurgerBuilder extends Component{

    state={
        ingredients:null,
        totalPrice:4,
        purchaseable:false,
        purchasing:false,
        loading:false,
        error:false
    }

    componentDidMount(){
        axios.get('/ingredients.json').then(
            response=>{
                this.setState({ingredients:response.data})
            }).catch(error=>{
                this.setState({error:true})
            })
    }

    updatePurchaseState=(ingredientCPY)=>{
        const sum=Object.keys(ingredientCPY) //
        .map(igKey =>{
            return ingredientCPY[igKey];   //ingredientCPY[igKEy] contains value of each individual ingredient which is being returned
        })
        .reduce((sum,el)=>{
            return sum+el;
        },0); //here sum initial value is 0 and it is added with el where el is the value of each individual ingredient 
        this.setState({purchaseable:sum>0})
    }
    purchasehHandler=()=>{
        this.setState({purchasing:true})
    }
    purchasehCancelHandler=()=>{
        this.setState({purchasing:false})
    }
    purchasehConfirmHandler=()=>{
       // this.setState({loading:true})
       // const order={
        //    ingredients:this.state.ingredients,
         //   price:this.state.totalPrice,
        //    customer:{
         //       name:'kartik khanna',
         //       address:{
        //            street:'sec-20',
         //           pincode:'410210',
         //           country:'India'
        //        },
         //       email:'abcd@gmail.com',
         //   },
         //   deliverymethod:'fastest'
       // }
       // axios.post('/orders.json',order).then(
        //    response=>{
        //        this.setState({loading:false,purchasing:false});
        //    }
        //).catch(error=>{
         //   this.setState({loading:false,purchasing:false})
        //})

        const queryParams=[];
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString=queryParams.join('&');
        this.props.history.push({
            pathname:'/checkout',
            search:'?'+ queryString
        });
    }
    addIngredientHandler=(type)=>{
        const oldCount=this.state.ingredients[type];
      ///here type is meat,salad,etc and this staement returns the count of meat,salad,etc
        const updatedCount = oldCount+1;
        const updatedIngredients={  //creates a copy of ingredients state.
            ...this.state.ingredients
        };
        updatedIngredients[type]=updatedCount;
        const priceAddition=INGREDIENT_PRICES[type];
        const oldPrice=this.state.totalPrice;
        const newPrice=oldPrice+priceAddition;
        this.setState({ingredients: updatedIngredients,totalPrice: newPrice});
        this.updatePurchaseState(updatedIngredients);


    }
    removeIngredientHandler=(type)=>{
        const oldCount=this.state.ingredients[type];
        if(oldCount<=0){
            return null;
        }  ///here type is meat,salad,etc and this staement returns the count of meat,salad,etc
        const updatedCount = oldCount-1;
        const updatedIngredients={
            ...this.state.ingredients
        };
        updatedIngredients[type]=updatedCount;
        const priceDeduction=INGREDIENT_PRICES[type];
        const oldPrice=this.state.totalPrice;
        const newPrice=oldPrice-priceDeduction;
        this.setState({ingredients: updatedIngredients,totalPrice: newPrice});
        this.updatePurchaseState(updatedIngredients);
    }
render(){
    const disabledInfo={
        ...this.state.ingredients
    };
    for(let key in disabledInfo){
        disabledInfo[key]=disabledInfo[key]<=0 ;
 ////here disabledInfo[key] is the value of no of each ingredient so if it is less than 0 it will become 'true' for that ingredient loke salad:true,meat:false,etc.
    }
    let ordersummary=null


    if(this.state.loading){
        ordersummary=<Spinner/>
    }

    let burger=this.state.error ? <p className={{textAlign:'center'}}>Ingredient can't be displayed</p>:<Spinner/>
    if(this.state.ingredients){
        burger=(
            <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        purchaseable={this.state.purchaseable}
                        order={this.purchasehHandler}/>
            </Aux>
        )

        ordersummary=<OrderSummary 
        ingredients={this.state.ingredients}
        purchaseCanceled={this.purchasehCancelHandler}
        purchaseConfirm={this.purchasehConfirmHandler}/>
    }

    
    return(
    
        <Aux>
            <Modal show={this.state.purchasing} modalClosed={this.purchasehCancelHandler} >
                {ordersummary}
            </Modal>
            {burger}
            

        </Aux>
    )
}
}

export default WithErrorHandler(BurgerBuilder,axios);