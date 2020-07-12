import React, { Component , Suspense} from 'react';
import {Route ,NavLink , Switch , Redirect} from 'react-router-dom';
import './Blog.css';
import Posts from './Posts/Posts';
//import NewPost from './NewPost/NewPost';
//import asyncComponent from '../../hoc/asyncComponent/asyncComponent';

const AsyncNewPost = asyncComponent(() => {
    return import('./NewPost/NewPost');
});

class Blog extends Component {
    render () {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink 
                                to="/posts" 
                                exact
                                activeClassName="my-active">Home</NavLink></li>
                            <li><NavLink to={{
                                pathname : '/new-post',
                                hash : '#submit',
                                search : '?quick-submit=true'
                            }} exact>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                {/*
                <Route path="/" exact render={() => <Posts />} />
                                <Route path="/" exact render={() => <Posts abc="abcde"/>} />
                */}
                <Switch>
                    <Route path="/new-post" exact component={AsyncNewPost} />
                    <Route path="/posts" component={Posts} />
                    <Redirect from="/" to="/posts" />
                    {/* <Route path="/" component={Posts} /> */}
                </Switch>
                
            </div>
        );
    }
}

export default Blog;