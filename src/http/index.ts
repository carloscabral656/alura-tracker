import axios, { AxiosInstance } from "axios"

const clienteHtttp: AxiosInstance = axios.create({
    baseURL: "http://localhost:3000/"
})

export default clienteHtttp
