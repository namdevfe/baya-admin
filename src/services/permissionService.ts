import { ApiResponse, ListParams } from '~/types/common'
import {
  AddPermissionPayload,
  EditPermissionPayload,
  Permission,
  Permissions
} from '~/types/permission'
import axiosInstance from '~/utils/axiosInstance'

const permissionService = {
  getAll(): Promise<ApiResponse<Permission[]>> {
    const url = '/permissions/get-all-permissions'
    return axiosInstance.get(url)
  },
  getList(params: ListParams): Promise<Permissions> {
    const url = '/permissions/get-permissions'
    return axiosInstance.get(url, {
      params
    })
  },
  add(payload: AddPermissionPayload): Promise<ApiResponse<Permission>> {
    const url = '/permissions/add-permission'
    return axiosInstance.post(url, payload)
  },
  edit(
    id: string,
    payload: EditPermissionPayload
  ): Promise<ApiResponse<Permission>> {
    const url = `/permissions/edit-permission/${id}`
    return axiosInstance.put(url, payload)
  },
  deleteById(id: string): Promise<ApiResponse<Permission>> {
    const url = `/permissions/delete-permission/${id}`
    return axiosInstance.delete(url)
  }
}

export default permissionService
