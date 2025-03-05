import { ApiResponse, ListParams } from '~/types/common'
import { AddUserPayload, EditUserPayload, User, Users } from '~/types/user'
import axiosInstance from '~/utils/axiosInstance'

const userService = {
  getList(params: ListParams): Promise<Users> {
    const url = '/users/get-users'
    return axiosInstance.get(url, {
      params
    })
  },
  addNew(payload: AddUserPayload): Promise<ApiResponse<User>> {
    const url = '/users/add-user'
    return axiosInstance.post(url, payload)
  },
  editById(id: string, payload: EditUserPayload): Promise<ApiResponse<User>> {
    const url = `/users/update-user/${id}`
    return axiosInstance.put(url, payload)
  },
  deleteById(id: string): Promise<ApiResponse<User>> {
    const url = `/users/delete-user/${id}`
    return axiosInstance.delete(url)
  }
}

export default userService
