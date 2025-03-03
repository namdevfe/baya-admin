import {
  LoginPayLoad,
  LoginResponse,
  Profile,
  RegisterPayload,
  RegisterResponse
} from '~/types/auth'
import { ApiResponse } from '~/types/common'
import axiosInstance from '~/utils/axiosInstance'

const authService = {
  login(payload: LoginPayLoad): Promise<ApiResponse<LoginResponse>> {
    const url = '/auth/login'
    return axiosInstance.post(url, payload)
  },
  register(payload: RegisterPayload): Promise<ApiResponse<RegisterResponse>> {
    const url = '/auth/register'
    return axiosInstance.post(url, payload)
  },
  getProfile(): Promise<ApiResponse<Profile>> {
    const url = '/auth/get-profile'
    return axiosInstance.get(url)
  }
}

export default authService
