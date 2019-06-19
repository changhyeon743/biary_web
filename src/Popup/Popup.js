import React from 'react';
import './Popup.css';
import Book from '../Book/Book'

export default class Popup extends React.Component {
    render() {
        return (
            <div className='popup'>
                <div className='popup_inner'>
                <button onClick={this.props.closePopup}>X</button>
                    {this.props.bookDatas != null && this.props.bookDatas[0].data.books.map(book => {
                        if (book.isPublic) {
                            return <Book
                            key={book.token}
                            imgLink={book.imageURL}
                            title={book.title}
                        />
                        }
                    })}
                    

                </div>
            </div>
        );
    }
}  