import { ApiResponse, ListPagination } from '~/types/common'

export interface Role {
  _id: string
  name: string
  description?: string
  permissions: string[]
  createdAt: Date
  updatedAt: Date
  _destroy: boolean
}

export type Roles = ApiResponse<{
  roles: Role[]
  pagination: ListPagination
}>

export interface AddRolePayload {
  name: string
  description?: string
}

export type EditRolePayload = Partial<
  Pick<Role, 'name' | 'description' | 'permissions'>
>
