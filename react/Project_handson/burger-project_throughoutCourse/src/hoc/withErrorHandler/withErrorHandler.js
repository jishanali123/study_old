import React , {Component} from 'react';
import Aux from '../Aux';
import Modal from '../../Component/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent,axios) => {
    return class extends Component {
        state = {
            error : null
        }
        componentWillMount(){
            this.reqInterceptor = axios.interceptors.request.use(config => {
                this.setState({
                    error : null
                });
                return config;
            });
            this.reqInterceptor = axios.interceptors.response.use(response => response , error =>{
                this.setState({
                    error : error
                });
                return Promise.reject(error);
            });
        }
        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.reqInterceptor);
        }
        errorConfirmedHandler = () => {
            this.setState({
                error : null
            });
        }
        render(){
            return (
                <Aux>
                    <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
}

export default withErrorHandler;