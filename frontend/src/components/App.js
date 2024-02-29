import React from "react";
import { Route, Switch } from "react-router-dom";
import Search from "./Search";
import HomePage from "./HomePage";
import About from "./About";
import Header from "./Header";
import Footer from "./Footer";
import Login from "./Login";
import Signup from "./Signup";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import "@fortawesome/fontawesome-svg-core/styles.css";

class BooksApp extends React.Component {
  state = {
    homeLoader: false,
    searchLoader: false,
    selectMenuDisabled: false,
    books: [],
    shelfs: {
      currentlyReading: {
        name: "currentlyReading",
        uiName: "Currently Reading",
        data: [],
      },
      wantToRead: {
        name: "wantToRead",
        uiName: "Want to Read",
        data: [],
      },
      read: {
        name: "read",
        uiName: "Read",
        data: [],
      },
    },
  };

  selectingOption = () => {
    this.setState({
      selectMenuDisabled: true,
    });
  };

  initializeHomeLoader = () => {
    this.setState({ homeLoader: true });
  };

  initializeSearchLoader = () => {
    this.setState({ searchLoader: true });
  };

  setBooks = (books) => {
    let currentlyReadingShelfBooks = this.state.shelfs.currentlyReading.data,
      wantToReadShelfBooks = this.state.shelfs.wantToRead.data,
      readShelfBooks = this.state.shelfs.read.data;
    books.map((book) => {
      if (
        currentlyReadingShelfBooks.some((shelfBook) => shelfBook.id === book.id)
      ) {
        book["shelf"] = "currentlyReady";
      } else if (
        wantToReadShelfBooks.some((shelfBook) => shelfBook.id === book.id)
      ) {
        book["shelf"] = "wantToRead";
      } else if (readShelfBooks.some((shelfBook) => shelfBook.id === book.id)) {
        book["shelf"] = "read";
      } else {
        book["shelf"] = "none";
      }
    });

    this.setState({
      books,
      searchLoader: false,
    });
  };

  resetBooks = () => {
    this.setState({
      books: [],
      searchLoader: false,
    });
  };

  handleShelfs = (fetchedBooks, screenName) => {
    let clonedShelfs = this.state.shelfs;
    if (screenName === "home") {
      this.setState({
        books: fetchedBooks,
      });
    } else {
      this.setState({
        books: [],
      });
    }

    fetchedBooks.map((book) => {
      const bookShelf = book.shelf;
      if (this.state.shelfs[bookShelf].name === bookShelf) {
        let clonedShelf = clonedShelfs[bookShelf];
        clonedShelf.data.push(book);
        clonedShelfs = {
          ...clonedShelfs,
          [bookShelf]: clonedShelf,
        };
        this.setState({
          ...this.state,
          shelfs: clonedShelfs,
        });
      }
    });

    this.setState({
      homeLoader: false,
      searchLoader: false,
    });
  };

  shelfOptionSelected = (book, shelf) => {
    let clonedShelfs = this.state.shelfs;
    if (book.shelf && book.shelf !== "none") {
      let oldShelf = book.shelf,
        clonedOldShelf = clonedShelfs[oldShelf],
        filteredClonedOldShelfArray = clonedOldShelf.data.filter(
          (shelfBook) => book.id !== shelfBook.id
        );

      clonedOldShelf = {
        ...clonedOldShelf,
        data: filteredClonedOldShelfArray,
      };

      book.shelf = shelf;

      if (shelf !== "none") {
        let clonedNewShelf = clonedShelfs[shelf];
        clonedNewShelf.data.push(book);

        clonedShelfs = {
          ...clonedShelfs,
          [oldShelf]: clonedOldShelf,
          [shelf]: clonedNewShelf,
        };
      } else {
        clonedShelfs = {
          ...clonedShelfs,
          [oldShelf]: clonedOldShelf,
        };
      }
    }

    let clonedBooks = this.state.books;
    let requiredBook = clonedBooks.find(
      (clonedBook) => book.id === clonedBook.id
    );
    if (requiredBook) {
      requiredBook.shelf = shelf;
    }

    this.setState({
      ...this.state,
      shelfs: clonedShelfs,
      selectMenuDisabled: false,
      books: clonedBooks,
    });
  };

  render() {
    return (
      <div className="app">
        <Header />

        <Switch>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/register">
            <Signup />
          </Route>

          <Route exact path="/home">
            <HomePage
              shelfs={this.state.shelfs}
              handleShelfs={this.handleShelfs}
              initializeHomeLoader={this.initializeHomeLoader}
              homeLoader={this.state.homeLoader}
              shelfOptionSelected={this.shelfOptionSelected}
              selectingOption={this.selectingOption}
              selectMenuDisabled={this.state.selectMenuDisabled}
            />
          </Route>

          <Route exact path="/search">
            <Search
              books={this.state.books}
              shelfOptionSelected={this.shelfOptionSelected}
              selectingOption={this.selectingOption}
              handleShelfs={this.handleShelfs}
              selectMenuDisabled={this.state.selectMenuDisabled}
              resetBooks={this.resetBooks}
              setBooks={this.setBooks}
              initializeSearchLoader={this.initializeSearchLoader}
              searchLoader={this.state.searchLoader}
            />
          </Route>
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default BooksApp;
