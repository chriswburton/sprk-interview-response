import { UserInterface } from '../interfaces/user.interface'

export const extractDataFromJWT = (token: string): { user: UserInterface } =>
    JSON.parse(atob(token.split('.')[1]))
