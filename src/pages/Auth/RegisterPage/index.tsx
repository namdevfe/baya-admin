import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import RegisterForm from '~/pages/Auth/RegisterPage/RegisterForm'
import { RegisterPayload } from '~/types/auth'
import { useState } from 'react'
import authService from '~/services/authService'
import { toast } from 'react-toastify'

const RegisterPage = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const handleRegister = async (payload: RegisterPayload) => {
    setLoading(true)
    try {
      const res = await authService.register(payload)
      if (res.data && res.data._id) {
        toast.success(res.message)
      }
    } catch (error) {
      console.log('🚀error---->', error)
    } finally {
      setTimeout(() => {
        setLoading(false)
      }, 2000)
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
            Register
          </Typography>
        </Box>

        <RegisterForm loading={loading} onSubmit={handleRegister} />
      </CardContent>
    </Card>
  )
}

export default RegisterPage
