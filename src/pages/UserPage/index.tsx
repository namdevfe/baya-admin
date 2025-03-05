import AddIcon from '@mui/icons-material/Add'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Link from '@mui/material/Link'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import TableComponent, { ColumnProps } from '~/components/TableComponent'
import UserConfirmDialog from '~/pages/UserPage/UserConfirmDialog'
import UserDialog from '~/pages/UserPage/UserDialog'
import userService from '~/services/userService'
import { ListPagination, ListParams } from '~/types/common'
import { AddUserPayload, EditUserPayload, User } from '~/types/user'

const USERS_LIMIT_DEFAULT = 10
const PAGE_DEFAULT = 1
const SORT_DEFAULT = 'asc'

const USER_COLUMNS: ColumnProps<User>[] = [
  {
    label: 'Account',
    name: 'account',
    render: (user) => (
      <Stack direction='row' spacing={2} sx={{ alignItems: 'center' }}>
        {user.avatar ? (
          <Avatar src={user.avatar} alt='avatar' />
        ) : (
          <Avatar alt='avatar' />
        )}
        <Stack>
          <Typography component='h3'>{`${user.firstName} ${user.lastName}`}</Typography>
          <Link href={`mailto:${user.email}`}>{user.email}</Link>
        </Stack>
      </Stack>
    )
  },
  {
    label: 'Created At',
    name: 'createdAt',
    render: (user) => {
      const formattedDate = new Date(user.createdAt).toLocaleString('vi-VN')
      return <>{formattedDate}</>
    }
  }
]

const UserPage = () => {
  const [isOpenUserDialog, setIsOpenUserDialog] = useState<boolean>(false)
  const [selectedUser, setSelectedUser] = useState<User>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [users, setUsers] = useState<User[]>([])
  const [pagination, setPagination] = useState<ListPagination>()
  const [isShowConfirmDialog, setIsShowConfirmDialog] = useState<boolean>(false)
  const [filters, setFilters] = useState<ListParams>({
    limit: USERS_LIMIT_DEFAULT,
    page: PAGE_DEFAULT,
    sort: SORT_DEFAULT
  })

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
        setFilters({ ...filters, page: PAGE_DEFAULT })
      }
    } catch (error: any) {
      const errorInfo = error?.response?.data
      toast.error(errorInfo?.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditUser = async (payload: EditUserPayload) => {
    if (selectedUser?._id) {
      setIsLoading(true)
      try {
        const res = await userService.editById(selectedUser._id, payload)

        if (res.data._id) {
          toast.success(res.message)
          setFilters({ ...filters, page: PAGE_DEFAULT })
        }
      } catch (error: any) {
        const errorInfo = error?.response?.data
        toast.error(errorInfo?.message)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleSubmit = (payload: AddUserPayload | EditUserPayload) => {
    if (selectedUser) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
      const { password: _password, email: _email, ...editUserPayload } = payload
      handleEditUser(editUserPayload)
    } else {
      handleAddUser(payload)
    }
  }

  const handlePageChange = (e: React.ChangeEvent<unknown>, page: number) => {
    e.stopPropagation()
    setFilters({ ...filters, page })
  }

  const handleDeleteUser = async () => {
    if (selectedUser?._id) {
      setIsLoading(true)
      try {
        const res = await userService.deleteById(selectedUser._id)

        if (res.data._id) {
          setFilters({ ...filters, page: PAGE_DEFAULT })
          setIsShowConfirmDialog(false)
          setSelectedUser(undefined)
          toast.success(res.message)
        }
      } catch (error: any) {
        const errorInfo = error?.response?.data
        toast.error(errorInfo?.message)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const fetchUsers = useCallback(async () => {
    setIsLoading(true)
    try {
      const res = await userService.getList(filters)

      if (res.data) {
        setUsers(res.data.users)
        setPagination(res.data.pagination)
      }
    } catch (error) {
      console.log('Fetch users error', error)
    } finally {
      setIsLoading(false)
    }
  }, [filters])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

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

        <TableComponent
          sx={{ marginTop: 2 }}
          loading={isLoading}
          columns={USER_COLUMNS}
          data={users}
          onEdit={(user) => {
            setIsOpenUserDialog(true)
            setSelectedUser(user)
          }}
          onRemove={(user) => {
            setIsShowConfirmDialog(true)
            setSelectedUser(user)
          }}
        />

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 2
          }}
        >
          <Pagination
            color='primary'
            count={pagination?.totalPages}
            page={pagination?.currentPage || 1}
            onChange={handlePageChange}
          />
        </Box>
      </Container>

      {isOpenUserDialog && (
        <UserDialog
          isOpen={isOpenUserDialog}
          user={selectedUser}
          onClose={handleCloseUserDialog}
          onSubmit={handleSubmit}
        />
      )}

      {isShowConfirmDialog && (
        <UserConfirmDialog
          isOpen={isShowConfirmDialog}
          onOk={() => handleDeleteUser()}
          onClose={() => {
            setIsShowConfirmDialog(false)
            setSelectedUser(undefined)
          }}
        />
      )}
    </>
  )
}

export default UserPage
