import React from 'react';

import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
                              .map(igKey => {
                                  return (
                                      <li key={igKey}>
                                          <span style={{textTransform:'capitalize'}}> {igKey} : {props.ingredients[igKey]} </span>
                                      </li>
                                  )
                              })
    return (
        <Aux>
            <h3>Your Order </h3>
            <p>your Delicious Order with Following Ingredients : </p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price : {props.totalPrice.toFixed(2)}</strong></p>
            <p> Proceed to Checkout ? </p>
            <Button btnType="Danger" clicked={props.purchaseCancelled}>Cancel</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>Continue</Button>
        </Aux>
    );

}

export default orderSummary;