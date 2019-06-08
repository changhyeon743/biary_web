import React from 'react';
import './book.css'

export default class Book extends React.Component {
    constructor() {
        super();
    }
    
    render() {
        return(
            <div className = "Book">
                <img src={this.props.imgLink}/>
                <span>{this.props.title}</span>
            </div>
        )
    }
}