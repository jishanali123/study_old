import React , {Component} from 'react';
import {Link , Route , Switch} from 'react-router-dom';
import Users from './containers/Users';
import asyncComponent from './hoc/asyncComponent';

const AsyncPizza = asyncComponent(() =>{
    console.log('kya hai yaar');
    return import('./containers/Pizza');
});

class App extends Component{
    render() {
        return (<div>
            <div>
            <Link to='/'>Users</Link> <Link to='/pizza'>Pizza</Link>
            </div>

            <div>
            <Switch>
                <Route to='/pizza' exact component={AsyncPizza} />  
                <Route to='/' exact component={Users} />
            </Switch>    
            </div>
        </div> );
    }
}

export default App;