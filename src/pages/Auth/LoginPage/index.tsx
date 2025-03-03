import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { toast } from 'react-toastify'
import LoginForm from '~/pages/Auth/LoginPage/LoginForm'
import { useAppDispatch, useAppSelector } from '~/store'
import {
  handleGetProfile,
  handleLogin,
  selectLoginLoading
} from '~/store/reducers/authReducer'
import { LoginPayLoad } from '~/types/auth'

const LoginPage = () => {
  const dispatch = useAppDispatch()
  const loading = useAppSelector(selectLoginLoading)

  const handleSubmit = async (payload: LoginPayLoad) => {
    try {
      const loginRes = await dispatch(handleLogin(payload)).unwrap()
      if (loginRes?.accessToken) {
        // Get profile
        const profileRes = await dispatch(handleGetProfile({})).unwrap()
        if (Object.keys(profileRes).length > 0) {
          toast.success('Login is successfully.')
        }
      }
    } catch (error: any) {
      toast.error(error)
    }
  }

  return (
    <Card sx={{ minWidth: 460 }}>
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Typography variant='h1' sx={(theme) => theme.typography.h3}>
            Login
          </Typography>
        </Box>

        <LoginForm loading={loading} onSubmit={handleSubmit} />
      </CardContent>
    </Card>
  )
}

export default LoginPage
