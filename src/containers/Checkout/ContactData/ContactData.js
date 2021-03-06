import { React,Component } from "react";
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component{
    state={
        orderForm:{
            name:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Name'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false

            },        
            street:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Street'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            pincode:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Pincode'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:6,
                    maxLength:6
                },
                valid:false,
                touched:false
            },
            country:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Country'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            }, 
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Email'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            deliverymethod:{
                elementType:'select',
                elementConfig:{
                    options:[
                        {value:'fastest', displayValue:'Fastest'},
                        {value:'cheapest', displayValue:'Cheapest'}
                    ]
                },
                value:'fastest',
                valid:true
            },
        
        },
        loading:false,
        formIsValid:false,
        
    }
    orderHandler=(event)=>{ //event object is passed automatically by react in form submission
        event.preventDefault();
        this.setState({loading:true})
        const formData={};
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier]=this.state.orderForm[formElementIdentifier].value; //making key value pairs like name:kartik,sreet:mumbai,etc..
        }
        console.log(this.props.ingredients);
        
        const order={
        ingredients:this.props.ingredients,
           price:this.props.price,
           orderData:formData
           
     }
       axios.post('/orders.json',order).then(
        response=>{
            this.setState({loading:false});
            this.props.history.push('/'); 
        }
    ).catch(error=>{
           this.setState({loading:false})
    })
    }

    checkValidity=(value,rules)=>{
        let isValid=true;
        console.log(value);
        if(value=='fastest' || value=='cheapest'){
            return isValid;
        }
        else{
            if(rules.required){
                isValid=value.trim() !=='' &&isValid; //means if both true then only isvalid is true
            }
            if(rules.minLength){
                isValid=value.length>=rules.minLength && isValid;
            }
            if(rules.maxLength){
                isValid=value.length<=rules.maxLength && isValid;
            }
            return isValid;
        }
  

    }

    inputChangedHandler=(event, inputIdentifier)=>{ //advantage of changing value like this is that the state updates side by side
        const updatedOrderForm={
            ...this.state.orderForm   //however this does not create a deep copy of the state due to multiple  nested objects
        }
        const updatedFormElement={
            ...updatedOrderForm[inputIdentifier]}
        updatedFormElement.value=event.target.value; //event contains the value passed through form
        updatedFormElement.valid=this.checkValidity(updatedFormElement.value,updatedFormElement.validation);
        updatedFormElement.touched=true;
        updatedOrderForm[inputIdentifier]=updatedFormElement;

        let formIsValid=true;
        for(let inputIdentifier in updatedOrderForm){
            formIsValid=updatedOrderForm[inputIdentifier].valid && formIsValid;   
        }

        console.log(updatedFormElement);
        this.setState({orderForm:updatedOrderForm, formIsValid:formIsValid});

    }
    render(){
        const formElementsArray=[];
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id:key,
                config:this.state.orderForm[key]
            })
        }
        let form=(
            <form>
            {formElementsArray.map(formElement=>(
                <Input 
                key={formElement.id}
                elementType={formElement.config.elementType} 
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                validation={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event)=>this.inputChangedHandler(event,formElement.id)}/>
            ))}
            <Button btnType="Success" disabled={!this.state.formIsValid}clicked={this.orderHandler}>ORDER</Button>
        </form>
        );
        if(this.state.loading){
            form=<Spinner/>;
        }
        return(
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;