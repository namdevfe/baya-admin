import Box from '@mui/material/Box'
import { Outlet } from 'react-router-dom'
import Header from '~/components/Header'
import Sidebar from '~/components/Sidebar'

const MainLayout = () => {
  return (
    <Box>
      <Sidebar />
      <Box sx={{ ml: '250px' }}>
        <Header />
        <Outlet />
      </Box>
    </Box>
  )
}

export default MainLayout
