import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import * as BooksAPI from '../BooksAPI';
import defaultBook from '../icons/default_book.jpg';

export default function Book(props) {
    let {book, shelfOptionSelected, selectingOption, selectMenuDisabled} = props;
    const onSelectShelfOption = (bookObject, shelfName) => {
        selectingOption();
        BooksAPI.update(bookObject, shelfName).then(result => shelfOptionSelected(bookObject, shelfName));
    }

    return (
        <div className="book">
            <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 174, backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail : defaultBook})`}}></div>
                <div className="book-shelf-changer">
                    <select 
                        onChange={(e) => onSelectShelfOption(book, e.target.value)}
                        disabled={selectMenuDisabled}
                        defaultValue={book.shelf || "currentlyReading"}
                    >
                        <option 
                            value="move" 
                            disabled
                        >Move to...</option>
                        <option 
                            value="currentlyReading" 
                        >Currently Reading</option>
                        <option 
                            value="wantToRead" 
                        >Want to Read</option>
                        <option 
                            value="read" 
                        >Read</option>
                        <option 
                            value="none"
                        >None</option>
                    </select>
                </div>
                {book.averageRating && (
                    <div className="book-rating">
                        <span><span className="rate-number">{book.averageRating}</span><FontAwesomeIcon icon={faStar} style={{color: "yellow", fontSize: "40px", textShadow: "2px 2px 4px #000000"}}/></span>
                    </div>
                )}
            </div>
            <div className="book-title">{book.title}</div>
            {book.categories && (<div className="book-category">{book.categories?.map(category => <span key={category}><span>{category}</span><span className="separator"> / </span></span>)}</div>)}
            {book.authors && (<div className="book-authors">{book.authors?.map(author => <span key={author}><span>{author}</span><span className="separator"> / </span></span>)}</div>)}
        </div>
    )
}

Book.propTypes = {
    book: PropTypes.object.isRequired
};
