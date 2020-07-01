import React, { Component } from 'react';
import { Modal, Button, Row, Col, Image, Container } from "react-bootstrap"
import "../stylesheets/BookDetails.css"

class BookDetails extends Component {

    state = {
        show: false,
        comments: []
    }
    
    render() {
        const { onClose, show } = this.props
        const { title, img, category, price, asin, comments } = this.props.item

    return (
        <Modal size="xl" show={show} onHide={onClose}>
            <Modal.Body >
                <Row>
                    <Col xs={6}>
                    <Image className="modalImage" src={img} />
                    </Col>
                    <Col xs={6}>
                        <Container className="singleBookDetails">
                            <div>
                                <h4 className="firstDiv">Title :</h4>
                                <h3>{title}</h3>
                            </div>
                            <div>
                                <h4>Category:</h4>
                                <h3>{category}</h3>
                            </div>
                            <div>
                                <h4>Price</h4>
                                <h3>{price}€</h3>
                            </div>
                            <div>
                                <h4>ASIN</h4>
                                <h3>{asin}</h3>
                            </div>
                            <div>
                                <h4>Reviews</h4>
                            </div>
                            {this.state.comments.map(comment => <> <p>{comment.text} by -> {comment.username}</p></>)}
                        </Container>
                    </Col>
                </Row>
                
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>    
    )
}

componentDidMount = async () => {
        
    const commentsResp = await fetch("http://localhost:3001/books/" + this.props.item.asin + "/comments")
    const comments = await commentsResp.json()
    this.setState({
        comments: comments
    })
    console.log(this.state.comments)
}

}




export default BookDetails;