import React from "react";
import { useSelector } from "react-redux";
import './PostsPage.css';

const PostsPage = () => {


    const posts = useSelector(state => state.posts)
    
    return (
      
        <div className="posts">
            {Object.values(posts).map(post => 
            <div className="post">
                <div>{post.content}</div>
                <div>{post.created_at}</div>
            </div>
            )}
            </div>
    )

}

export default PostsPage;
