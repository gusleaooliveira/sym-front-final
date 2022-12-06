import axios from 'axios'

const port = 5003
let url = `http://localhost:${port}`
let url_net = `http://gustavoleao.vps-kinghost.net:${port}` 

export const api = axios.create({
    baseURL: window.location.href.includes('localhost') ? url : url_net
})