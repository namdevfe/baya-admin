import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PrivateRoute from '~/components/PrivateRoute'
import AuthLayout from '~/layouts/AuthLayout'
import MainLayout from '~/layouts/MainLayout'
import LoginPage from '~/pages/Auth/LoginPage'
import RegisterPage from '~/pages/Auth/RegisterPage'
import DashboardPage from '~/pages/DashboardPage'
import PermissionPage from '~/pages/PermissionPage'
import RolePage from '~/pages/RolePage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Layout */}
        <Route element={<PrivateRoute />}>
          <Route path='/' element={<MainLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path='/setting/roles' element={<RolePage />} />
            <Route path='/setting/permissions' element={<PermissionPage />} />
          </Route>
        </Route>

        {/* Auth Layout */}
        <Route element={<AuthLayout />}>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
