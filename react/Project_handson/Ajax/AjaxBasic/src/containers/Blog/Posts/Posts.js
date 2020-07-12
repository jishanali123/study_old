import React , {Component} from 'react';
import {Route , Link} from 'react-router-dom';
//import axios from 'axios';
import axios from '../../../Axios';
import Post from '../../../components/Post/Post';
import FullPost from '../FullPost/FullPost';
import './Posts.css';

class Posts extends Component {

    state ={
        posts : [],
        selectedPostId : null,
        Error : false
    };

    postSelectedHandler = (id) =>{
        this.setState({
            selectedPostId : id
        });
    }

    componentDidMount() {
        //console.log(this.props);
        axios.get("/posts")
        .then(response => {
            const posts = response.data.slice(0,4);
            const updatedPosts = posts.map(post =>{
                return {
                    ...post,
                    author : "Jishan"
                }
            });
            //console.log(updatedPosts);
            this.setState({
                posts :updatedPosts
            });
        })
        .catch(error => {
            console.log('Hey post fetched incorrectly');
            this.setState({
                Error : true
            });
        });
        
    }

    render () {
        let posts = <p style={{testAlign : 'center'}}><strong>Error - Something Went wwrong ! </strong></p>
        if(!this.state.Error){
            posts = this.state.posts
                      .map(post =>{
                        return <Link to={'/posts/'+post.id} key={post.id}>
                                <Post
                                title={post.title} 
                                author={post.author} 
                                clicked={()=>this.postSelectedHandler(post.id)}
                                />
                                </Link>
                      });
        }
        return (
        <div>
        <section className="Posts">
            {posts}
        </section>
        <Route path={this.props.match.url+'/:Id'} exact component={FullPost} />
        </div>
        );
    }
}

export default Posts;