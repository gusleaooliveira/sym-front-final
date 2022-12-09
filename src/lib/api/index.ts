import axios from "axios";

const port = 5003;
let url = `http://localhost:${port}`;
let url_net = `https://sym-api-5sygq.ondigitalocean.app`;

export const api = axios.create({
  baseURL: url_net,
});
