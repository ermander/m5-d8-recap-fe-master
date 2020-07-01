import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import { Row, Col, Form, Button, Image} from "react-bootstrap"
import CommentsList from './CommentsList'
import "../stylesheets/EditBooks.css"

class EditBook extends Component {
   state = {
       img: "",
       title: "",
       price: 0,
       category: "",
       asin: "",
       selectedFile: null
    }

   editBook = async () =>{
    const update = {...this.state}
    delete update.selectedFile

    const booksResp = await fetch("http://localhost:3001/books/" + this.state.asin, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(update)
    })
    const book = await booksResp.json()
    console.log(book)
   }

   uploadCover = async () =>{ 
       const formData = new FormData()
       formData.append("avatar", this.state.selectedFile)

        const booksResp = await fetch("http://localhost:3001/books/" + this.state.asin + "/upload", {
            method: "POST",
            body: formData
    })

}


    render() {
        const { title, img, category, price, asin } = this.state
        return (
            <Row className="editBookRow">
                <Col>
                <Image className="editImage" fluid src={img} /> </Col>
                <Col>
                <Form>
                        <Form.Group controlId="asin">
                            <Form.Label>ASIN</Form.Label>
                            <Form.Control type="text"
                                onChange={(e) => this.setState({ asin: e.currentTarget.value })}
                                value={this.state.asin}
                                disabled
                                placeholder="ASIN - Unique Amazon ID" />
                        </Form.Group>
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                value={this.state.title}
                                onChange={(e) => this.setState({ title: e.currentTarget.value })}
                                type="text" placeholder="Title" />
                        </Form.Group>
                        <Form.Group controlId="category">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                value={this.state.category}
                                onChange={(e) => this.setState({ category: e.currentTarget.value })}
                                type="text" placeholder="Category" />
                        </Form.Group>
                        <Form.Group controlId="price">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                value={this.state.price}
                                onChange={(e) => this.setState({ price: e.currentTarget.value })}
                                type="number" placeholder="Price" />
                        </Form.Group>
                        <Form.Group controlId="image">
                            <Form.Label>Image URL</Form.Label>
                            <Form.Control
                                value={this.state.img}
                                onChange={(e) => this.setState({ img: e.currentTarget.value })}
                                type="text" placeholder="Image URL" />
                        </Form.Group>
                        <Button variant="success" onClick={this.editBook}>Save Changes</Button>


                        <input type="file" onChange={e => this.setState({ selectedFile: e.currentTarget.files[0]}) } />
                        <Button variant="success" onClick={this.uploadCover}>Upload cover</Button>
                    </Form>

                    <CommentsList asin={this.props.match.params.asin} />
                </Col>

            </Row>
        )
    }
    
    componentDidMount = async ()=>{
        const asin = this.props.match.params.asin;
        const booksResp = await fetch("http://localhost:3001/books/" + asin)
        const book = await booksResp.json()
        console.log("BEFORE COMPONENT DID MOUNT", this.state)

        this.setState({...book})
    }
}

export default withRouter(EditBook)
