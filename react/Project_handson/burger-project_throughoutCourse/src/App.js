import React, { Component } from 'react';
import {Route , Switch , Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import Layout from './Component/Layout/Layout';
import BurgerBuilder from './Container/BurgerBuilder/BurgerBuilder';
import Checkout from './Container/Checkout/Checkout';
import Orders from './Container/Orders/Orders';
import Auth from './Container/Auth/Auth';
import Logout from './Container/Logout/Logout';
import * as allActions from './store/actions/index';

class App extends Component {
  componentDidMount(){
    this.props.onTryAutoSignUp();
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={BurgerBuilder}/>
        <Redirect to="/" />
      </Switch>
    );
    if(this.props.isAuthenticated){
      routes = (
        <Switch>
          <Route path="/checkout" component={Checkout}/>
          <Route path="/orders" component={Orders} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={BurgerBuilder}/>
          <Redirect to="/" />
          </Switch>
      );
    }
    return (
      <div className="App">
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToprops = (state) =>{
  return {
    isAuthenticated : state.authReducer.token !==null
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignUp : () => { dispatch(allActions.authCheckState()) }
  }
}

export default connect(mapStateToprops , mapDispatchToProps) (App);
