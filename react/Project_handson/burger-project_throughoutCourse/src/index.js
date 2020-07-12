import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import ReactDOM from 'react-dom';
import {createStore , applyMiddleware ,compose , combineReducers} from 'redux';
import thunk from 'redux-thunk';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';
import orderHistoryReducer from './store/reducers/orderHistory';
import authReducer from './store/reducers/auth';
import {Provider} from 'react-redux';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
 
const rootReducer = combineReducers(
    {
        burgerBuilderReducer : burgerBuilderReducer,
        orderReducer : orderReducer,
        orderHistoryReducer: orderHistoryReducer,
        authReducer : authReducer
    }
);

const store=createStore(rootReducer , composeEnhancers(applyMiddleware(thunk)));
 
const app = (
<Provider store={store}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
</Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
