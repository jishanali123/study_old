import React from 'react';
import classes from './Order.css';

const order = (props) => {
    const ingredients = [];
    for (let ingredient in props.ingredients){
        ingredients.push({
            name:ingredient,
            amount:props.ingredients[ingredient]
        });
    }
    var ingredientDetail = ingredients
                            .map(ingredient =>{
                                return (
                                    <span key={ingredient.name}>{ingredient.name}: {ingredient.amount} ,</span>
                                );
                            });
    return(
    <div className={classes.Order}>
        <p>Ingrdients Detail - {ingredientDetail} </p>
        <p><strong>Total price : USD {Number.parseFloat(props.price.toFixed(2))}</strong></p>
    </div>
)};

export default order;