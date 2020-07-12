import React , {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import * as allActions from '../../store/actions/index';

class logout extends Component {
    componentDidMount(){
        this.props.logoutHandler();
    }
    render(){
        return (
            <Redirect to='/' />
        );
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        logoutHandler : () => dispatch(allActions.logoutStart())
    }
}

export default connect(null,mapDispatchToProps) (logout);