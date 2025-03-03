import Box from '@mui/material/Box'
import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '~/store'
import { selectToken } from '~/store/reducers/authReducer'

const AuthLayout = () => {
  const token = useAppSelector(selectToken)

  if (token) {
    return <Navigate to='/' />
  }

  return (
    <Box
      component='main'
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#dedede'
      }}
    >
      <Outlet />
    </Box>
  )
}

export default AuthLayout
