import React, { Component } from 'react'
import CreateComment from "./CreateComment"

class CommentsList extends Component {
   state={
       comments: []
   }

    render() {
        return (
            <div>
                {this.state.comments.map(comment => <div>{comment.text} - {comment.username}</div>)}

                <CreateComment 
                onNewComment={comment=> this.setState({ comments: this.state.comments.concat(comment)})}
                asin={this.props.asin} />
            </div>
        )
    }

    componentDidMount = async () => {
        
        const commentsResp = await fetch("http://localhost:3001/books/" + this.props.asin + "/comments")
        const comments = await commentsResp.json()
        this.setState({
            comments: comments
        })
    }
}

export default CommentsList
