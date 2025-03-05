import { ApiResponse, ListPagination } from '~/types/common'

export interface User {
  _id: string
  email?: string
  password?: string
  address?: string
  firstName: string
  lastName: string
  displayName?: string
  avatar?: string
  role?: string
  _destroy: boolean
  createdAt: Date
  updatedAt: Date
  __v: 0
}

export type AddUserPayload = Pick<
  User,
  | 'email'
  | 'password'
  | 'firstName'
  | 'lastName'
  | 'role'
  | 'avatar'
  | 'displayName'
  | 'address'
>

export type Users = ApiResponse<{
  users: User[]
  pagination: ListPagination
}>

export type EditUserPayload = Pick<
  User,
  | 'email'
  | 'address'
  | 'firstName'
  | 'lastName'
  | 'avatar'
  | 'role'
  | 'displayName'
  | 'password'
>
