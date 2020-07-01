import React, { Component } from 'react'
import SingleBook from "./SingleBook"
import { Col, Container, Row } from 'react-bootstrap'

class HomePage extends Component {
   state = {
       books: [],
       openModal: false,
   }

    render() {
        return (
            <Container>
                <Row>
                {this.state.books.map(book => 
                <Col sm={4} lg={4} >
                    <SingleBook item={book} /> 
                </Col>
                )} 
                </Row>
            </Container>
        )
    }

    componentDidMount = async () => {
        const booksResp = await fetch("http://localhost:3001/books")
        const books = await booksResp.json()
        this.setState({
            books: books.data.slice(0, 50)
        })
    }
}

export default HomePage
