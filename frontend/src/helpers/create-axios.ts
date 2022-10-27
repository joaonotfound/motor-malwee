import axios, { Axios } from "axios";

export function createAxios(token: string): Axios {
    return axios.create({ baseURL: "http://localhost:5000", headers: { authorization: token }})
}