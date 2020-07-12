import React, { Component } from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import './NewPost.css';

class NewPost extends Component {
    state = {
        title: '',
        content: '',
        author: 'Jishan',
        dataSubmitted : false
    }

    postDataHandler =() => {
        const newPost = {
            title: this.state.title,
            content: this.state.content,
            author: this.state.author
        }
        axios.post("/posts" , newPost)
        .then(postData => {
            /*
            this.setState({
                dataSubmitted : true
            });
            */
           this.props.history.replace('/');
           //this.props.history.push('/');
            console.log(postData);
        });   
    }
    render () {
        /*
        let redirect = null;
        if(this.state.dataSubmitted)
        {
            redirect = <Redirect to='/posts' />
        }
        */
        return (
            <div className="NewPost">
                {/*redirect */}
                <h1>Add a Post</h1>
                <label>Title</label>
                <input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
                <label>Content</label>
                <textarea rows="4" value={this.state.content} onChange={(event) => this.setState({content: event.target.value})} />
                <label>Author</label>
                <select value={this.state.author} onChange={(event) => this.setState({author: event.target.value})}>
                    <option value="Max">Max</option>
                    <option value="Manu">Manu</option>
                    <option value="Jishan">Jishan</option>
                </select>
                <button onClick={this.postDataHandler}>Add Post</button>
            </div>
        );
    }
}

export default NewPost;