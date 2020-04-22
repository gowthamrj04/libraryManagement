import React, { Component } from "react";
import LibraryService from "../service/LibraryService";
import BookService from "../service/BookService";
import BooksComponent from "./BooksComponent";
import "../App.css";

class LibraryComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      libraryData: [],
      showBooks: false,
      bookData: [],
    };
    this.showBooks = this.showBooks.bind(this);
    this.fetchBookData = this.fetchBookData.bind(this);
  }

  componentDidMount() {
    LibraryService.fetchLibraryData()
      .then((res) => {
        //on success
        this.setState({
          libraryData: res.data,
        });
      })
      .catch((error) => {
        //on error
        console.log("response ", error);
      });
  }

  fetchBookData(id) {
    if (isNaN(id)) {
      return;
    } else {
      BookService.fetchBookData(id)
        .then((resp) => {
          this.state.bookData.push(resp.data);
          this.setState({
            showBooks: true,
          });
        })
        .catch((error) => {
          console.log("error ", error);
        });
    }
  }

  showBooks(e, id) {
    console.log(id);
    this.setState({
      bookData: [],
    });
    for (var i = 0; i < id.length; i++) {
      this.fetchBookData(id[i]);
    }
  }

  render() {
    return (
      <div id="library-content">
        <header>
          <h4>Library Management</h4>
        </header>
        <div className="libraryTable">
          <table id="libraryTable" border="1">
            <thead>
              <tr>
                <th>Id</th>
                <th>Library Name</th>
                <th>Location</th>
                <th>Book Lists</th>
                <th>View Books</th>
              </tr>
            </thead>
            <tbody>
              {this.state.libraryData.map((library, index) => {
                return (
                  <tr key={library.libraryId}>
                    <td>{library.libraryId}</td>
                    <td>{library.libraryName}</td>
                    <td>{library.libraryPlace}</td>
                    <td>{library.bookIds}</td>
                    <td>
                      <button
                        onClick={(e) => this.showBooks(e, library.bookIds)}
                      >
                        view Library
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {this.state.showBooks && (
          <div>
            <BooksComponent bookData={this.state.bookData} />
          </div>
        )}
      </div>
    );
  }
}

export default LibraryComponent;
