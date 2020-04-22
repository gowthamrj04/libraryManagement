import axios from "axios";
import { API_URL } from "../Constants";
class BookService {
  static fetchBookData(id) {
    return axios.get(`${API_URL}/library/books/${id}`);
  }
}
export default BookService;
