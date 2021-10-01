import React,{Component} from 'react';
import classes from './Modal.module.css';
import Aux from '../../../hoc/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component{
    shouldComponentUpdate(nextProps,nextState){
        return nextProps.show!==this.props.show||nextProps.children!=this.props.children;  ///due to this the modal is rendered only when the ordernow button is clicked and not rendered everytime when we add an item
    }//also the when the children of modal is updated the component renders
    componentWillUpdate(){
        console.log('[modal] is rendered');
    }

    render(){
        return(
            <Aux>
            <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
            <div className={classes.Modal}
                style={{transform: this.props.show? 'translateY(0)' : 'trasnlateY(-400vh)',
                opacity: this.props.show? '1': '0'}}>
                {this.props.children}
            </div>
        </Aux>
        )
    }

}

export default Modal;