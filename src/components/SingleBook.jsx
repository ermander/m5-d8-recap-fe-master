import React, { Component } from 'react'
import { Card, Button } from "react-bootstrap"
import BookDetails from "./BookDetails"
import "../SingleBook.css"

class SingleBook extends Component {
    state = {
        openModal: false
    }

    render() {
        const { title, img, category, price, asin } = this.props.item

        return (
            <Card className="my-2">
                <Card.Img className="cardImg" variant="top" src={img} />
                <Card.Body className="cardBody">
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>
                        {category} - {price}
                    </Card.Text>
                    <Button className="mx-5" onClick={() => this.setState({ openModal: true})}>Show more details</Button>
                    <BookDetails 
                                item={{title, img, category, price, asin}}
                                show={this.state.openModal} 
                                onClose={() => this.setState({ openModal: false})}
                                onNewBook={(book)=> this.setState({
                                books: this.state.books.concat(book),
                                openModal: false
                            })}
                            />
                </Card.Body>
            </Card>
        )
    }
}

export default SingleBook
