import { ApiResponse } from '~/types/common'
import { AddUserPayload, User } from '~/types/user'
import axiosInstance from '~/utils/axiosInstance'

const userService = {
  addNew(payload: AddUserPayload): Promise<ApiResponse<User>> {
    const url = '/users/add-user'
    return axiosInstance.post(url, payload)
  }
}

export default userService
