import { ApiResponse } from '~/types/common'
import {
  AddPermissionPayload,
  EditPermissionPayload,
  Permission
} from '~/types/permission'
import axiosInstance from '~/utils/axiosInstance'

const permissionService = {
  getAll(): Promise<ApiResponse<Permission[]>> {
    const url = '/permissions/get-all-permissions'
    return axiosInstance.get(url)
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
  }
}

export default permissionService
