import React , {Component} from 'react';
import {connect} from 'react-redux';
import Order from '../../Component/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../Component/UI/Spinner/Spinner';

import * as allActions from '../../store/actions/index';

class Orders extends Component {
    componentDidMount () {
        this.props.startFetchingOrders(this.props.token , this.props.userId);
    }
    render(){
        let orderDetail = <Spinner />
        if(!this.props.loading){
            orderDetail = this.props.orders
            .map(order =>{
                return (<Order
                        key={order.id}
                        ingredients= {order.ingredients}
                        price={+order.price}
                        />);
            }); 
        }
        return (
            <div>
                {orderDetail}
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        orders : state.orderHistoryReducer.fetchedOrders,
        loading : state.orderHistoryReducer.loading,
        token : state.authReducer.token,
        userId : state.authReducer.userId
    }
}
const mapDispatchToProps = dispatch => {
    return{
        startFetchingOrders : (token , userId) => dispatch(allActions.fetchOrderHistory(token,userId))
    }
}

export default connect(mapStateToProps , mapDispatchToProps) (Orders);