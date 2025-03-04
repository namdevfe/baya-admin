export interface User {
  _id: string
  email: string
  password?: string
  address: []
  firstName: string
  lastName: string
  avatar?: string
  role?: string
  _destroy: boolean
  createdAt: Date
  updatedAt: Date
  __v: 0
}

export type AddUserPayload = Pick<
  User,
  'email' | 'password' | 'firstName' | 'lastName' | 'role' | 'avatar'
>
