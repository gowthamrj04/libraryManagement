import React, { Component } from "react";
import LibraryService from "../service/LibraryService";
import BookService from "../service/BookService";
import BooksComponent from "./BooksComponent";
import "../style/style.css";

class LibraryComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      libraryData: [],
      showBooks: false,
      bookData: [],
      currentLibraryId: "",
    };
    this.fetchLibraryData = this.fetchLibraryData.bind(this);
    this.showBooks = this.showBooks.bind(this);
    this.fetchBookData = this.fetchBookData.bind(this);
    this.deleteBookfromLibrary = this.deleteBookfromLibrary.bind(this);
    this.updateLibraryData = this.updateLibraryData.bind(this);
  }

  componentDidMount() {
    this.fetchLibraryData();
  }

  fetchLibraryData() {
    LibraryService.fetchAllLibraryData()
      .then((res) => {
        //on success
        var data = res.data;
        var bookIds;
        console.log(data);
        if (this.state.currentLibraryId !== "") {
          for (var j = 0; j < data.length; j++) {
            if (data[j].libraryId === this.state.currentLibraryId)
              bookIds = data[j].bookIds;
          }
          console.log(bookIds);
        }

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

  showBooks(e, id, lId) {
    this.setState({
      bookData: [],
      currentLibraryId: lId,
    });
    for (var i = 0; i < id.length; i++) {
      this.fetchBookData(id[i]);
    }
  }

  deleteLibrary(e, id) {
    LibraryService.deleteLibraryData(id)
      .then((resp) => {
        this.fetchLibraryData();
        this.setState({
          showBooks: !true,
        });
      })
      .catch((error) => {
        console.log("error ", error);
      });
  }

  updateLibraryData(library) {
    LibraryService.updateLibraryBooks(library)
      .then((resp) => {
        this.fetchLibraryData();

        // this.setState({
        //   showBooks: true,
        // });
      })
      .catch((error) => {
        console.log("error ", error);
      });
  }

  deleteBookfromLibrary(e, id) {
    LibraryService.fetchSingleLibraryData(this.state.currentLibraryId)
      .then((resp) => {
        var singleLibrary = resp.data;
        var bookIdList = [];
        for (var i = 0; i < singleLibrary.bookIds.length; i++) {
          if (!isNaN(singleLibrary.bookIds[i])) {
            bookIdList.push(singleLibrary.bookIds[i]);
          }
        }
        var index = bookIdList.indexOf(id.toString());
        if (index !== -1) bookIdList.splice(index, 1);
        var newSingleLibrary = {
          libraryId: singleLibrary.libraryId,
          libraryName: singleLibrary.libraryName,
          bookIds: JSON.stringify(bookIdList),
          libraryPlace: singleLibrary.libraryPlace,
        };
        console.log(newSingleLibrary);
        this.updateLibraryData(newSingleLibrary);
        this.setState({
          showBooks: false,
        });
      })
      .catch((error) => {
        console.log("error ", error);
      });
  }

  render() {
    return (
      <div>
        <header>
          <h3>Library Management</h3>
        </header>
        <div id="library-content" className="libraryTable">
          <table id="libraryTable">
            <thead>
              <tr>
                <th>Library Id</th>
                <th>Library Name</th>
                <th>Location</th>
                <th>Book Lists</th>
                <th>View Books</th>
                <th>Delete Action</th>
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
                        className="btn btn-primary"
                        onClick={(e) =>
                          this.showBooks(e, library.bookIds, library.libraryId)
                        }
                      >
                        view Library Books
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={(e) =>
                          this.deleteLibrary(e, library.libraryId)
                        }
                      >
                        Delete Library
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div id="book-content">
          {this.state.showBooks && (
            <div>
              <BooksComponent
                bookData={this.state.bookData}
                deleteBook={this.deleteBookfromLibrary}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default LibraryComponent;
