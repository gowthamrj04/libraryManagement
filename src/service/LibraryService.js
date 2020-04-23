import axios from "axios";
import { API_URL } from "../Constants";
class LibraryService {
  static fetchAllLibraryData() {
    return axios.get(`${API_URL}/library`);
  }

  static fetchSingleLibraryData(id) {
    return axios.get(`${API_URL}/library/${id}`);
  }

  static updateLibraryBooks(library) {
    return axios.put(`${API_URL}/library`,
    library
    );
  }

  static deleteLibraryData(id) {
    return axios.delete(`${API_URL}/library/${id}`);
  }
}
export default LibraryService;
