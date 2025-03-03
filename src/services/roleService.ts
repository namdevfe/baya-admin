import { ApiResponse, ListParams } from '~/types/common'
import { AddRolePayload, EditRolePayload, Role, Roles } from '~/types/role'
import axiosInstance from '~/utils/axiosInstance'

const roleService = {
  addRole(payload: AddRolePayload): Promise<ApiResponse<Role>> {
    const url = '/roles/add-role'
    return axiosInstance.post(url, payload)
  },
  getRoles(params: ListParams): Promise<Roles> {
    const url = '/roles/get-roles'
    return axiosInstance.get(url, {
      params
    })
  },
  editRoleById(
    id: string,
    payload: EditRolePayload
  ): Promise<ApiResponse<Role>> {
    const url = `/roles/edit-role/${id}`
    return axiosInstance.put(url, payload)
  },
  deleteRoleById(id: string): Promise<ApiResponse<Role>> {
    const url = `/roles/delete-role/${id}`
    return axiosInstance.delete(url)
  }
}

export default roleService
