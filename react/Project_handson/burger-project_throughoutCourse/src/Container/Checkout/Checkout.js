import React , {Component} from 'react';
import {Route , Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import CheckoutSummary from '../../Component/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    checkoutCancelHandler = () =>{
        this.props.history.goBack();
    }
    checkoutContinuedHandler = () =>{
        this.props.history.replace('/checkout/contact-data');
    }
    render(){
        let summary = <Redirect to="/" />;
        if(this.props.ings){
            summary = <div>
                        <CheckoutSummary 
                        ingredients={this.props.ings}
                        checkoutCancelled = {this.checkoutCancelHandler}
                        checkoutContinued = {this.checkoutContinuedHandler}
                        />
                        <Route 
                        path={this.props.match.path+'/contact-data'} 
                        component={ContactData} />
                    </div> ;
        }
        console.log(summary);
        return summary ;
    }
}

const mapStateToProps = state =>{
    return {
        ings : state.burgerBuilderReducer.ingredients
    }
}

export default connect(mapStateToProps) (Checkout);