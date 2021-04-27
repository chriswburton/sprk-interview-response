import axios, { AxiosResponse } from 'axios'
import { SignInDto } from './interfaces/sign-in.dto'
import { TokenDto } from './interfaces/token.dto'

const client = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
})

export const api = {
    login: (data: SignInDto): Promise<AxiosResponse<TokenDto>> =>
        client.post('/login', data),
    addAuthToken: (token: string) => {
        client.defaults.headers.Authorization = `Bearer ${token}`
        return true
    },
    clearAuthToken: () => {
        delete client.defaults.headers.Authorization
        return true
    },
}
