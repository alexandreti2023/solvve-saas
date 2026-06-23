import axios from "axios";

export default axios.create({
  baseURL: "https://solvve-saas-production.up.railway.app"
});