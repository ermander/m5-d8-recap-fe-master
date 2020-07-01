import React, { Component } from 'react'
import { Button, Form } from 'react-bootstrap'

class CreateComment extends Component {
    state = {
        text: "",
        username: ""
    }

    addComment = async()=>{
        try{
            const obj = {...this.state, BookID: this.props.asin}
        const commentsResp = await fetch("http://localhost:3001/books/" + this.props.asin + "/comments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })
        this.props.onNewComment(obj)
    }
    catch(Exx){
        console.log(Exx)
    }

        //tell the parent there is a new kid in town
        // this.setState({
        //     comments: comments
        // })
    }

    render() {
        return (
            <div>
                  <Form>
                        <Form.Group controlId="text">
                            <Form.Label>text</Form.Label>
                            <Form.Control type="text"
                                onChange={(e) => this.setState({ text: e.currentTarget.value })}
                                value={this.state.text}
                                placeholder="Your comment" />
                        </Form.Group>
                        <Form.Group controlId="username">
                            <Form.Label>username</Form.Label>
                            <Form.Control
                                value={this.state.username}
                                onChange={(e) => this.setState({ username: e.currentTarget.value })}
                                type="text" placeholder="username" />
                        </Form.Group>

                        <Button onClick={this.addComment}>Add Comment</Button>
                        
                    </Form>                
            </div>
        )
    }
}

export default CreateComment
