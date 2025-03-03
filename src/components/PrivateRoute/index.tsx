import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '~/store'

interface PrivateRouteProps {
  redirectPath?: string
}

const PrivateRoute = ({ redirectPath }: PrivateRouteProps) => {
  const { token } = useAppSelector((state) => state.auth)

  if (!token) {
    return <Navigate to={redirectPath ? redirectPath : '/login'} />
  }

  return <Outlet />
}

export default PrivateRoute
