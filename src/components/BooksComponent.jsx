import React, { Component } from "react";
import "../App.css";

class BooksComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <header>
          <h4>View Books</h4>
        </header>
        <div className="book">
          <table id="libraryTable" border="1">
            <thead>
              <tr>
                <th>Id</th>
                <th>Book Name</th>
                <th>Author</th>
              </tr>
            </thead>
            <tbody>
              {this.props.bookData.map((book, index) => {
                return (
                  <tr key={book.bookId}>
                    <td>{book.bookId}</td>
                    <td>{book.bookName}</td>
                    <td>{book.author}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default BooksComponent;
