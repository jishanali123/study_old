import React , {Component} from 'react';
import {connect} from 'react-redux';
import Aux from '../../hoc/Aux';

import Burger from '../../Component/Burger/Burger';
import BuildControls from '../../Component/Burger/BuildControls/BuildControls';
import Modal from '../../Component/UI/Modal/Modal';
import OrderSummary from '../../Component/Burger/OrderSummary/OrderSummary';
import Spinner from '../../Component/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as allActions from '../../store/actions/index';

import axios from '../../axios-orders';

class BurgerBuilder extends Component {

    /*
    constructor(props){
        super(props);
        this.state ={

        }
    }
    */
   state = {
    purchasable : false,
    purchasing : false,
}

componentDidMount () {
    this.props.onInitIngredient();
    }

purchaseHandler = () => {
    if(this.props.isAuthenticated){
        this.setState({
            purchasing : true
        })
    }
    else{
        this.props.onSetAuthRedirectPath('/checkout');
        this.props.history.push('/auth');
    }
}

purchaseCancelHandler = () => {
        this.setState({
            purchasing : false
        })
}

purchaseContinueHandler = () => {
    this.props.onInitPurchase();
   this.props.history.push('/checkout');
}

updatePurchaseState = (updatedIngredients) =>{
    let sum = 0;
    for(let key in updatedIngredients){
        sum= sum + updatedIngredients[key];
    }
    return sum >0;
    /*
    this.setState({
        purchasable : sum > 0
    })*/
}

addIngredientHandler = (type) => {
    /*
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount +1;
    const updatedIngredients = {
        ...this.state.ingredients
    }
    updatedIngredients[type]=updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const newPrice = this.state.totalPrice + priceAddition;

    this.setState({
        totalPrice : newPrice,
        ingredients: updatedIngredients
    })
    //update this.state.purchasable with updated ingredients
    this.updatePurchaseState(updatedIngredients);
    */
}

removeIngredientHandler =(type) => {
    /*
    const oldCount = this.state.ingredients[type];
    if(oldCount <=0)
    {
        return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
        ...this.state.ingredients
    }
    updatedIngredients[type]=updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const newPrice = this.state.totalPrice - priceDeduction;

    this.setState({
        totalPrice : newPrice,
        ingredients: updatedIngredients
    })
    //update this.state.purchasable with updated ingredients
    this.updatePurchaseState(updatedIngredients);
    */
}

    render () {

        const disabledInfo = {
            ...this.props.ings
        }
        for(let key in disabledInfo)
        {
            disabledInfo[key]= disabledInfo[key] <= 0;
        }
        //let orderSummary = <Spinner />;
        //let burger = <Spinner />;
        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded !</p> : null;
        if(this.props.ings){
             burger = 
                    <Aux>
                        <Burger ingredients={this.props.ings}/>
                        <BuildControls 
                        ingredientAdded = {this.props.onIngredientAdded}
                        ingredientRemoved = {this.props.onIngredientRemoved}
                        disabled = {disabledInfo}
                        price={this.props.finalPrice}
                        purchasable = {!this.updatePurchaseState(this.props.ings)}
                        ordered = {this.purchaseHandler}
                        purchasing = {this.state.purchasing}
                        isAuthenticated = {this.props.isAuthenticated}
                        />
                    </Aux> ;
            orderSummary = <OrderSummary 
            ingredients={this.props.ings}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            totalPrice={this.props.finalPrice}
            /> ;
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );

    }

}

const mapStateToProps = state =>{
    return {
        ings : state.burgerBuilderReducer.ingredients,
        finalPrice : state.burgerBuilderReducer.totalPrice,
        error : state.burgerBuilderReducer.error,
        isAuthenticated : state.authReducer.token !==null
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        onInitIngredient : () => dispatch(allActions.initIngredients()),
        onIngredientAdded : (ingName) => dispatch(allActions.addIngredient({ingredientName:ingName})),
        onIngredientRemoved : (ingName) => dispatch(allActions.removeIngredient({ingredientName:ingName})),
        onInitPurchase : () => dispatch(allActions.purchaseInit()),
        onSetAuthRedirectPath : (path) => dispatch(allActions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps , mapDispatchToProps) (withErrorHandler(BurgerBuilder , axios));