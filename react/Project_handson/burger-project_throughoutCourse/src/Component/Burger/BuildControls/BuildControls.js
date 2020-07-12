import React from 'react';

import classes from './BuildControls.css';

import BuildControl from './BuildControl/BuildControl';

const BuildControls = (props) => {
    const controls = [
        {label:'Salad' , type:'salad'},
        {label:'Bacon' , type:'bacon'},
        {label:'Cheese' , type:'cheese'},
        {label:'Meat' , type:'meat'}
    ]

    return (
        <div className={classes.BuildControls}>
        <p>Current Price : <strong>{props.price.toFixed(2)}</strong> </p>
        {controls.map(control =>{
               return <BuildControl 
                        key={control.label} 
                        label={control.label} 
                        added = {() => props.ingredientAdded(control.type)} 
                        removed = {() => props.ingredientRemoved(control.type)}
                        disabled = {props.disabled[control.type]}
                        />
            })
        }
        <button 
        className={classes.OrderButton} 
        disabled={props.purchasable} 
        //disabled = {props.purchasing ? props.purchasing : props.purchasable}
        onClick={props.ordered}>
        {props.isAuthenticated ? 'ORDER NOW' : 'SignIn To Continue'}</button>
        </div>
    );
}

export default BuildControls;