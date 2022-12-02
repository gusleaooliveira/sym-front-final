import axios from 'axios'

const port = 5003

export const api = axios.create({
    baseURL: `http://localhost:${port}`
})