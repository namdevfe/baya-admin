export interface Permission {
  _id: string
  url: string
  description?: string
  _destroy: boolean
  createdAt: Date
  updatedAt: Date
  __v: number
}

export type AddPermissionPayload = Pick<Permission, 'url' | 'description'>

export type EditPermissionPayload = Partial<
  Pick<Permission, 'url' | 'description'>
>
