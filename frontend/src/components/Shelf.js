import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

const Shelf = (props) => {
  const { shelfs, id, shelfOptionSelected, selectingOption, selectMenuDisabled } = props;
  const requiredShelf = shelfs[id];

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{requiredShelf.uiName}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {requiredShelf.data.length > 0 ? (
            requiredShelf.data.map((book) => (
              <li key={Math.random()}>
                <Book
                  book={book}
                  shelfOptionSelected={shelfOptionSelected}
                  selectingOption={selectingOption}
                  selectMenuDisabled={selectMenuDisabled}
                />
              </li>
            ))
          ) : (
            <div>There are No {requiredShelf.uiName} Books Here :(</div>
          )}
        </ol>
      </div>
    </div>
    
  );
};

Shelf.propTypes = {
  shelfs: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  shelfOptionSelected: PropTypes.func.isRequired,
  selectingOption: PropTypes.func.isRequired,
  selectMenuDisabled: PropTypes.bool.isRequired,
};

export default Shelf;
