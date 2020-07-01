import React, { Component } from 'react'
import SingleBookListItem from "./SingleBookListItem"
import {Container, Button } from 'react-bootstrap'
import CreateBook from './CreateBook'

class BackOffice extends Component {
   state = {
       books: [],
       openModal: false
   }

    render() {
        return (
            <Container>
                <h1 className="my-4">
                    Welcome to the backoffice 
                    <Button className="mx-5" onClick={() => this.setState({ openModal: true})}>Create Book</Button></h1>
                <CreateBook show={this.state.openModal} 
                            onClose={() => this.setState({ openModal: false})}
                            onNewBook={(book)=> this.setState({
                                books: this.state.books.concat(book),
                                openModal: false
                            })}
                            />

                {this.state.books.map(book => 
                    <SingleBookListItem item={book}
                        onDelete={(asin) => 
                            this.setState({
                            books: this.state.books.filter(book => book.asin !== asin)
                        }) }                
                    /> 
                )} 
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

export default BackOffice
