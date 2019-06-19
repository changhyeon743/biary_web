import React from 'react';
import './Popup.css';

export default class Popup extends React.Component {
    render() {
        return (
            <div className='popup'>
                <div className='popup\_inner'>

                    {this.props.bookDatas != null && this.props.bookDatas[0].data.books.map(book => {
                        return <Book
                            key={book.token}
                            imgLink={book.imageURL}
                            title={book.title}
                        />
                    })}
                    <button onClick={this.props.closePopup}>close me</button>

                </div>
            </div>
        );
    }
}  