import axios from 'axios'

export const api = axios.create({
    baseURL: 'https://we-are-adults-backend.vercel.app'
})
