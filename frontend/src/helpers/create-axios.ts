import axios, { Axios } from "axios";
import { Fenvironment } from '../../../environment'

export function createAxios(token: string): Axios {
    return axios.create({ baseURL: Fenvironment.backendURL, headers: { authorization: token }})
}