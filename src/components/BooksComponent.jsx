import React, { Component } from "react";

class BooksComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookData: this.props.bookData,
    };
  }

  // componentDidUpdate(prevprops) {
  //   if (prevprops.bookData.length !== this.props.bookData.length) {
  //     this.setState({
  //       bookData: this.props.bookData,
  //     });
  //   }
  // }

  render() {
    return (
      <div>
        <header>
          <h4>View Books</h4>
        </header>
        <div id="book">
          <table id="libraryTable" border="1">
            <thead>
              <tr>
                <th>Book Id</th>
                <th>Book Name</th>
                <th>Author</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.props.bookData.map((book, index) => {
                return (
                  <tr key={book.bookId}>
                    <td>{book.bookId}</td>
                    <td>{book.bookName}</td>
                    <td>{book.author}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={(e) => this.props.deleteBook(e, book.bookId)}
                      >
                        Delete Book
                      </button>
                    </td>
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
