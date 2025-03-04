import { ApiResponse, ListParams } from '~/types/common'
import { AddUserPayload, User, Users } from '~/types/user'
import axiosInstance from '~/utils/axiosInstance'

const userService = {
  addNew(payload: AddUserPayload): Promise<ApiResponse<User>> {
    const url = '/users/add-user'
    return axiosInstance.post(url, payload)
  },
  getList(params: ListParams): Promise<Users> {
    const url = '/users/get-users'
    return axiosInstance.get(url, {
      params
    })
  }
}

export default userService
