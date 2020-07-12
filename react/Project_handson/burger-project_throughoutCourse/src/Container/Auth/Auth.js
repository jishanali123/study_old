import React , {Component} from 'react';
import {connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import Input from '../../Component/UI/Input/Input';
import Button from '../../Component/UI/Button/Button';
import * as allActions from '../../store/actions/index';
import classes from './Auth.css';
import Spinner from '../../Component/UI/Spinner/Spinner';

class Auth extends Component {
    state ={
        controls : {
            email : {
                elementType : 'input',
                elementConfig : {
                    type: 'email',
                    placeholder : 'Your email'
                },
                value : '',
                validation : {
                    required : true,
                    isEmail : true
                },
                valid : false,
                touched : false
            },
            password : {
                elementType : 'input',
                elementConfig : {
                    type: 'password',
                    placeholder : 'password'
                },
                value : '',
                validation : {
                    required : true,
                    minLength : 8
                },
                valid : false,
                touched : false
            }
        },
        isSignup : true
    }

    componentDidMount() {
        if(! this.props.building && this.props.authRedirectPath !='/'){
            this.onSetAuthRedirectPath();
        }
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
    inputChangeHandler = (event , controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName] : {
                ...this.state.controls[controlName],
                value : event.target.value,
                valid : this.checkValidity(event.target.value , this.state.controls[controlName].validation),
                touched : true
            }
        }
        this.setState({
            controls : updatedControls
        });
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value , this.state.controls.password.value ,this.state.isSignup);
        /*
        if(this.props.isAuth){
            this.props.history.push(this.props.authRedirectPath);
        }
        */
    }

    onIsSignUpHandler = () => {
        this.setState((prevState)=>{
            return{
                isSignup : !prevState.isSignup
            }
        });
    }

    render(){
        const formsElementArray =[];
        for (let key in this.state.controls){
            formsElementArray.push({
                id : key,
                config : this.state.controls[key]
            });
        }
        
        const form = formsElementArray.map((formElement) => {
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
            });

        let errorExists = null;
        if(this.props.error){
            errorExists = <p>{this.props.error.message}</p>;
        }

        let autoRedirect = null;
        if(this.props.isAuth){
            autoRedirect = <Redirect to={this.props.authRedirectPath} />
        } 
        
        let authForm = <Spinner />
        if(!this.props.loading){
        authForm = (
        <div className={classes.Auth}>
            {autoRedirect}
            {errorExists}
            <form onSubmit={this.submitHandler}>
            {form}
            <Button btnType="Danger" >Cancel</Button>
            <Button btnType="Success" >Submit</Button>
            </form>
            <Button btnType="Danger" clicked={this.onIsSignUpHandler}>Switch to {this.state.isSignup ? 'SignIn' : 'SignUp'}</Button>
        </div>
            )
        } 

        return authForm;
    }
}

const mapStateToProps = (state) => {
    return {
        loading : state.authReducer.loading,
        error : state.authReducer.error,
        isAuth : state.authReducer.token !==null,
        building : state.burgerBuilderReducer.building,
        authRedirectPath : state.authReducer.authRedirectPath
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        onAuth : (email , password , isSignUp) => {dispatch(allActions.auth(email , password , isSignUp))},
        onSetAuthRedirectPath : () => {dispatch(allActions.setAuthRedirectPath('/'))}
    }
}

export default connect(mapStateToProps , mapDispatchToProps) (Auth);