import React , {Component} from 'react';
import {connect} from 'react-redux';
import Button from '../../../Component/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../Component/UI/Spinner/Spinner';
import Input from '../../../Component/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actionsTypes from '../../../store/actions/index';
class ContactData extends Component {
    state={
        ingredients : {},
        orderForm : {
            name : {
                elementType : 'input',
                elementConfig : {
                    type: 'text',
                    placeholder : 'Your Name'
                },
                value : '',
                validation : {
                    required : true
                },
                valid : false,
                touched : false
            },
            street : {
                elementType : 'input',
                elementConfig : {
                    type: 'text',
                    placeholder : 'Street'
                },
                value : '',
                validation : {
                    required : true
                },
                valid : false,
                touched : false
            },
            zipCode : {
                elementType : 'input',
                elementConfig : {
                    type: 'text',
                    placeholder : 'ZIP Code'
                },
                value : '',
                validation : {
                    required : true,
                    minLength : 5,
                    maxLength : 5
                },
                valid : false,
                touched : false
            },
            country : {
                elementType : 'input',
                elementConfig : {
                    type: 'text',
                    placeholder : 'Country'
                },
                value : '',
                validation : {
                    required : true
                },
                valid : false,
                touched : false
            },
            email : {
                elementType : 'input',
                elementConfig : {
                    type: 'text',
                    placeholder : 'your Email'
                },
                value : '',
                validation : {
                    required : true
                },
                valid : false,
                touched : false
            },
            deliveryMethod : {
                elementType : 'select',
                elementConfig : {
                    options : [
                        { value: 'fastest' , displayValue : 'Fastest'},
                        { value: 'cheapest' , displayValue : 'Cheapest'}
                    ]
                },
                value : 'fastest',
                valid : true,
                touched : false
            }
        },
        formIsValid : false,
        loading:false
    }

    orderHandler=(event)=>{
        event.preventDefault();

        const formData ={};

        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        
        let order = {
            ingredients : this.props.ings,
            price : this.props.finalPrice,
            orderData : formData,
            userId : this.props.userId
        };

        this.props.onOrderBurger(order,this.props.token);   
    }
    checkValidity (value , rules){
        let isValid = true;
        if(rules){
            if(rules.required){
                isValid = value.trim() !== '' && isValid;
            }
            if(rules.minLength){
                isValid = value.length >= rules.minLength && isValid;
            }
            if(rules.maxLength){
                isValid =value.length <= rules.maxLength && isValid;
            }
        }
        return isValid;
    }
    inputChangeHandler = (event , inputIdentifier) => {
        const updatedOrderForm ={
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value , updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        //check for overall Form validity
        let formIsValid = true;
        for(let inputIdentifier in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({
            orderForm : updatedOrderForm,
            formIsValid : formIsValid
        });
    }
    render(){
        const formsElementArray =[];
        for (let key in this.state.orderForm){
            formsElementArray.push({
                id : key,
                config : this.state.orderForm[key]
            });
        }
        let form= (
                <form onSubmit={this.orderHandler}>
                    {formsElementArray.map(formElement =>{
                        return (
                            <Input 
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            changed={(event)=>this.inputChangeHandler(event , formElement.id)}
                            inValid={!formElement.config.valid}
                            shouldValidate={formElement.config.validation}
                            touched ={formElement.config.touched}
                            />
                        );
                    })
                    }
                    <Button btnType="Success" disabled={!this.state.formIsValid}>Order</Button>
                </form>);
        if(this.props.loading){
            form= <Spinner />
        }
        return(
        <div className={classes.ContatcData}>
            <h1>Enter your Contact Data</h1>
            {form}
        </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings : state.burgerBuilderReducer.ingredients,
        finalPrice : state.burgerBuilderReducer.totalPrice,
        loading : state.orderReducer.loading,
        token : state.authReducer.token,
        userId : state.authReducer.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger : (orderData,token) => dispatch(actionsTypes.purchaseBurgerStart(orderData,token))
    }
}

export default connect(mapStateToProps , mapDispatchToProps) (withErrorHandler(ContactData , axios));