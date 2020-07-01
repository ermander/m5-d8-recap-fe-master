import React, { Component } from 'react'
import { Modal, Button, Form } from "react-bootstrap"

class CreateBook extends Component {

    state = {
        title: "",
        category: "",
        asin: "",
        price: 0,
        img: ""
    }

    createBook = async () => {
        const newBook = {
            ...this.state
        }

        const booksResp = await fetch("http://localhost:3001/books", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newBook)
        })

        if (booksResp.ok) {// check if the response is ok
            this.props.onNewBook(newBook)// tell the parent we have a new kid in town
        }
    }

    render() {
        const { onClose, show } = this.props

        return (
            <Modal show={show} onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Insert Book in catalogue</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="asin">
                            <Form.Label>ASIN</Form.Label>
                            <Form.Control type="text"
                                onChange={(e) => this.setState({ asin: e.currentTarget.value })}
                                value={this.state.asin}
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
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.createBook}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default CreateBook
