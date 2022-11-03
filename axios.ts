import axios from "axios";

export const apiConnect = axios.create({
    baseURL: "http://localhost:4000"
})