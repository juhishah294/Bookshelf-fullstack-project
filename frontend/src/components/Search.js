import React from 'react';
import {Link} from 'react-router-dom';
import Book from './Book';
import Loader from '../ui/Loader/Loader';
import * as BooksAPI from '../BooksAPI';

export default class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchInputValue: ""
		}

		this.debouncer = this.debouncer.bind(this);
	}

	componentDidMount() {
		this.props.initializeSearchLoader();
		BooksAPI.getAll().then(data =>{
            this.props.handleShelfs(data, "search");
        });
	}

	debounce() {
		let timeout = null;  
		return function (value) {
			if (timeout) {
				clearTimeout(timeout);
			}
		  	timeout = setTimeout(() => this.generatesearchScreenUI(value), 1000);
		}
	}
	
	generatesearchScreenUI(value) {
		BooksAPI.search(value).then(data => {
			if(data.error) {
				this.props.resetBooks();
			} else {
				this.props.setBooks(data);
			}
		});
	}
	
	debouncer = this.debounce();
	
	searchInputTyping(e) {
		this.props.initializeSearchLoader();
		this.setState({
			searchInputValue: e.target.value
		});
		let value = e.target.value.trim().toLowerCase();
		if (value) {
			this.debouncer(value);
		} else {
			this.props.resetBooks();
		}
	}

	render() {
		const {books, shelfOptionSelected, selectingOption, selectMenuDisabled} = this.props;
		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link to="/"><button className="close-search">Close</button></Link>
					<div className="search-books-input-wrapper">
						<input 
							type="text" 
							placeholder="Search by title or author"
							value={this.state.searchInputValue}
							onChange={(e) => this.searchInputTyping(e)}
						/>
					</div>
				</div>
				<div className="search-books-results">
					{this.props.searchLoader ? <Loader /> : books.length > 0 ? (
						<ol className="books-grid">
							{books.map(book => (
								<li key={Math.random()}>
									<Book 
										book={book}
										shelfOptionSelected={shelfOptionSelected}
										selectingOption={selectingOption}
										selectMenuDisabled={selectMenuDisabled}
									/>
								</li>
							))}
						</ol>
					) : <div style={{margin: "auto", textAlign: "center"}}>There are no search books</div>}
				</div>
			</div>
		)
	}
}
