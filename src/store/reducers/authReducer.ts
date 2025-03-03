import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authService from '~/services/authService'
import { RootState } from '~/store'
import { LoginPayLoad, Profile } from '~/types/auth'

interface AuthState {
  token: {
    accessToken: string
    refreshToken: string
  } | null
  profile: Profile | null
  loading: {
    login: boolean
    profile: boolean
  }
}

const initialState: AuthState = {
  token: null,
  profile: null,
  loading: {
    login: false,
    profile: false
  }
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.token = null
      state.profile = null
    }
  },
  extraReducers: (builder) => {
    // Handle login actions
    builder.addCase(handleLogin.pending, (state) => {
      state.loading.login = true
    })
    builder.addCase(handleLogin.fulfilled, (state, action) => {
      state.loading.login = false
      state.token = action.payload as any
    })
    builder.addCase(handleLogin.rejected, (state) => {
      state.loading.login = false
      state.token = null
    })
    // Handle get profile action
    builder.addCase(handleGetProfile.pending, (state) => {
      state.loading.profile = true
    })
    builder.addCase(handleGetProfile.fulfilled, (state, action) => {
      state.loading.profile = false
      state.profile = action.payload as any
    })
    builder.addCase(handleGetProfile.rejected, (state) => {
      state.loading.profile = false
      state.profile = null
    })
  }
})

export const { actions, reducer: authReducer } = authSlice
export const { logout } = actions
export const selectToken = (state: RootState) => state.auth.token
export const selectProfile = (state: RootState) => state.auth.profile
export const selectLoginLoading = (state: RootState) => state.auth.loading.login
export const selectProfileLoading = (state: RootState) =>
  state.auth.loading.profile
export default authReducer

// Async actions

export const handleLogin = createAsyncThunk(
  'auth/handleLogin',
  async (payload: LoginPayLoad, { rejectWithValue }) => {
    try {
      const loginRes = await authService.login(payload)
      return loginRes && loginRes.data
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message
      return rejectWithValue(errorMessage)
    }
  }
)

export const handleGetProfile = createAsyncThunk<
  object,
  object,
  { state: RootState }
>('auth/handleGetProfile', async (_, { getState, rejectWithValue }) => {
  const accessToken = getState().auth.token?.accessToken

  if (accessToken) {
    try {
      const profileRes = await authService.getProfile()
      return profileRes?.data
    } catch (error: any) {
      const errorInfo = error?.response?.data
      return rejectWithValue(errorInfo)
    }
  }
})
