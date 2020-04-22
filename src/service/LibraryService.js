import axios from "axios";
import { API_URL } from "../Constants";
class LibraryService {
  static fetchLibraryData() {
    return axios.get(`${API_URL}/library`);
  }
}
export default LibraryService;
