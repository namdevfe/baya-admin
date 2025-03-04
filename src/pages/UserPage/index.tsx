import AddIcon from '@mui/icons-material/Add'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import { toast } from 'react-toastify'
import UserDialog from '~/pages/UserPage/UserDialog'
import userService from '~/services/userService'
import { AddUserPayload, User } from '~/types/user'

const UserPage = () => {
  const [isOpenUserDialog, setIsOpenUserDialog] = useState<boolean>(false)
  const [selectedAccount, setSelectedAccount] = useState<User>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleOpenUserDialog = () => {
    setIsOpenUserDialog(true)
  }

  const handleCloseUserDialog = () => {
    setIsOpenUserDialog(false)
  }

  const handleAddUser = async (payload: AddUserPayload) => {
    setIsLoading(true)
    try {
      const res = await userService.addNew(payload)

      if (res.data._id) {
        toast.success(res.message)
      }
    } catch (error: any) {
      const errorInfo = error?.response?.data
      toast.error(errorInfo?.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditUser = (payload: any) => {
    console.log('Handle edit user')
  }

  const handleSubmit = (payload: AddUserPayload) => {
    if (selectedAccount) {
      handleEditUser(payload)
    } else {
      handleAddUser(payload)
    }
  }

  return (
    <>
      <Container>
        <Stack
          direction='row'
          sx={{ alignItems: 'center', justifyContent: 'space-between' }}
        >
          <Box>
            <Typography variant='h4' component='h1' gutterBottom>
              Users
            </Typography>
            <Typography variant='body2' color='textSecondary'>
              Manage users
            </Typography>
          </Box>
          <Button
            variant='contained'
            color='primary'
            onClick={handleOpenUserDialog}
            startIcon={<AddIcon />}
          >
            Add new user
          </Button>
        </Stack>
      </Container>

      {isOpenUserDialog && (
        <UserDialog
          isOpen={isOpenUserDialog}
          onClose={handleCloseUserDialog}
          onSubmit={handleSubmit}
        />
      )}
    </>
  )
}

export default UserPage
