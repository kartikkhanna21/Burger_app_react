import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import {Route,Switch} from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth'

class App extends Component {
  state={
    show:true
  }
  //componentDidMount(){  this was used to check if interceptors are removed after componentwillunmount is called in witherrorhandler
  //  setTimeout(() => {          
  //    this.setState({show:false});
  //  }, 5000);
  //}

  render(){
    return(
      <div className="App">
      <Layout>
        <Switch>
          <Route path='/checkout' component={Checkout}/>
          <Route path='/orders' component={Orders}/>
          <Route path='/auth' component={Auth}/>
          <Route path='/' exact component={BurgerBuilder}/>
          
        </Switch>
      </Layout>
     </div>
    )    
  }
}


export default App;
