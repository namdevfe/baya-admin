import { User } from '~/types/user'

export interface LoginPayLoad {
  email: string
  password: string
}

export interface LoginResponse {
  accessToken: string
  refreshToken: string
}

export interface RegisterPayload {
  firstName: string
  lastName: string
  email: string
  password: string
}

export type RegisterResponse = User

export type Profile = User & {
  role: {
    _id: string
    name: string
  }
}
