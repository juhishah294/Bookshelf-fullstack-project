import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import Loader from "../ui/Loader/Loader";
import Shelf from "./Shelf";
import * as BooksAPI from "../BooksAPI";

const Home = ({
  shelfs,
  shelfOptionSelected,
  selectingOption,
  selectMenuDisabled,
  homeLoader,
  initializeHomeLoader,
  handleShelfs,
}) => {
  const history = useHistory();

  const [userAuthenticated, setuserAuthenticated] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("jwt-token")) {
      setuserAuthenticated(true);
    } else {
      history.push("/");
    }
    initializeHomeLoader();
    BooksAPI.getAll().then((data) => {
      handleShelfs(data, "home");
    });
  }, [initializeHomeLoader, handleShelfs, history]);

  const allShelfs = Object.keys(shelfs).map((shelf) => (
    <Shelf
      key={shelf}
      id={shelf}
      shelfs={shelfs}
      shelfOptionSelected={shelfOptionSelected}
      selectingOption={selectingOption}
      selectMenuDisabled={selectMenuDisabled}
    />
  ));

  return (
    <>
      {userAuthenticated && (
        <div className="home-screen">
          {homeLoader ? (
            <Loader />
          ) : (
            <>
              {selectMenuDisabled && <Loader className="select-shelf-loader" />}
              <div>{allShelfs}</div>
              <div className="open-search">
                <Link to="/search">
                  <button>Add a book</button>
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

Home.propTypes = {
  shelfs: PropTypes.object.isRequired,
  initializeHomeLoader: PropTypes.func.isRequired,
  handleShelfs: PropTypes.func.isRequired,
};

export default Home;
