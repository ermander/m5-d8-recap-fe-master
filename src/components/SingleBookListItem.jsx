import React, { Component } from 'react'
import { Media, Button} from "react-bootstrap"
import { Link } from 'react-router-dom'

class SingleBookListItem extends Component {

    deleteBook = async (asin) =>{
        const booksResp = await fetch("http://localhost:3001/books/" + asin, {
            method: "DELETE"
        })
        if (booksResp.ok){
            this.props.onDelete(asin)
        }
    }

 
    render() {
        const { title, img, category, price, asin } = this.props.item

        return (
            <Media>
            <img
              width={64}
              height={64}
              className="mr-3"
              src={img}
              alt="Generic placeholder"
            />
            <Media.Body>
              <h5>{title}</h5>
              <p>
                {category} - {price}
                <Button className="ml-5" variant="danger" onClick={() => this.deleteBook(asin) } >X</Button>
                <Button className="ml-5" variant="warning"><Link to={"/details/" + asin}>Edit</Link></Button>
              </p>
            </Media.Body>
          </Media>
        )
    }
}

export default SingleBookListItem
