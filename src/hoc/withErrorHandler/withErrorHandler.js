import React,{Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary';

const witherrorhandler=(Wrappedcomponent,axios)=>{ //wrappedcomponent is burgerbuilder
    return class extends Component{
        state={
            error:null
        }
        componentWillMount(){ //because componentwillmount will be called before the child components are rendered hence we can set the interceptors
            this.reqinterceptors= axios.interceptors.request.use(req=>{
                this.setState({error: null});   //clears the error message
                return req;
            })
            this.resinterceptors=axios.interceptors.response.use(res=>res,error=>{
                this.setState({error: error});   //gets error from server and sets the error message to that message
            });
        }
        componentWillUnmount(){
            console.log('will unmount',this.reqinterceptors,this.resinterceptors);
            axios.interceptors.request.eject(this.reqinterceptors); //this is used to remove interceptors if the burgerbuildercomponent is not required which helps in saving memory
            axios.interceptors.response.eject(this.resinterceptors);
  

        }
        errorconfirmedHandler=()=>{
            this.setState({error:null});
        }
        render(){
            return(
                <Aux>
                    <Modal show={this.state.error}
                    modalClosed={this.errorconfirmedHandler}>
                        {this.state.error? this.state.error.message : null}
                    </Modal>
                    <Wrappedcomponent {...this.props}/>  {/* it is the burgerbuilder component and we are using this props to copy all props that this component might be using */}
                </Aux>
            )
            
        }
    }
}

export default witherrorhandler;