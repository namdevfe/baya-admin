import AddIcon from '@mui/icons-material/Add'
import FilterListIcon from '@mui/icons-material/FilterList'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Menu from '@mui/material/Menu'
import Pagination from '@mui/material/Pagination'
import { SelectChangeEvent } from '@mui/material/Select'
import Typography from '@mui/material/Typography'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import TableComponent, { ColumnProps } from '~/components/TableComponent'
import { ROLE_SORT_OPTIONS } from '~/constants/general'
import RoleDialog from '~/pages/RolePage/RoleDialog'
import RoleFilters from '~/pages/RolePage/RoleFilters'
import permissionService from '~/services/permissionService'
import roleService from '~/services/roleService'
import { ListPagination, ListParams } from '~/types/common'
import { Permission } from '~/types/permission'
import { Role } from '~/types/role'

const ROLES_LIMIT = 10

const ROLE_COLUMNS: ColumnProps<Role>[] = [
  {
    name: '_id',
    label: 'ID'
  },
  {
    name: 'name',
    label: 'Name'
  },
  {
    name: 'description',
    label: 'Description'
  }
]

const RolePage = () => {
  const [isShowDialog, setIsShowDialog] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [, setIsFetching] = useState<boolean>(true)
  const [roles, setRoles] = useState<Role[]>([])
  const [pagination, setPagination] = useState<ListPagination | null>(null)
  const [filters, setFilters] = useState<ListParams>({
    page: 1,
    limit: ROLES_LIMIT,
    sort: 'desc',
    sortBy: 'createdAt'
  })
  const [selectedRole, setSelectedRole] = useState<Role>()
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false)
  const [permissions, setPermissions] = useState<Permission[]>([])
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleFiltersOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleFiltersClose = () => {
    setAnchorEl(null)
  }

  const handleSortChange = (e: SelectChangeEvent) => {
    const sortObject = ROLE_SORT_OPTIONS.find(
      (item) => item.value === e.target.value
    )?.queryObject
    setFilters({ ...filters, ...sortObject, page: 1 })
  }

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false)
  }

  const handleOpenConfirmDialog = () => {
    setOpenConfirmDialog(true)
  }

  const handleShowDialog = () => {
    setIsShowDialog(true)
  }

  const handleCloseDialog = () => {
    setSelectedRole(undefined)
    setIsShowDialog(false)
  }

  const handleAddRole = async (payload: any) => {
    setIsLoading(true)
    try {
      const res = await roleService.addRole(payload)
      if (res.data._id) {
        toast.success(res.message)
        handleCloseDialog()
        setFilters({ ...filters, page: 1 })
      }
    } catch (error: any) {
      const errorInfo = error?.response?.data
      toast.error(errorInfo?.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePageChange = (e: React.ChangeEvent<unknown>, page: number) => {
    e.stopPropagation()
    setFilters({ ...filters, page })
  }

  const handleSelectRole = (role: Role) => {
    handleShowDialog()
    setSelectedRole(role)
  }

  const handleEditRole = async (payload: any) => {
    if (selectedRole?._id) {
      setIsLoading(true)
      try {
        const res = await roleService.editRoleById(selectedRole._id, payload)
        if (res.data) {
          const { _id } = res.data || {}

          setRoles((prevRoles) =>
            prevRoles.map((role) =>
              role._id === _id ? { ...role, ...res.data } : role
            )
          )

          handleCloseDialog()
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

  const handleShowDeleteConfirmRole = (role: Role) => {
    setSelectedRole(role)
    handleOpenConfirmDialog()
  }

  const handleDeleteRole = async () => {
    if (selectedRole?._id) {
      setIsLoading(true)
      try {
        const res = await roleService.deleteRoleById(selectedRole._id)
        if (res.data) {
          toast.success(res.message)
          handleCloseConfirmDialog()
          setFilters({ ...filters, page: 1 })
        }
      } catch (error: any) {
        const errorInfo = error?.response?.data
        toast.error(errorInfo?.message)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleGetRoles = useCallback(async () => {
    setIsFetching(true)
    try {
      const res = await roleService.getRoles(filters)
      if (res.data.roles.length > 0) {
        setRoles(res.data.roles)

        if (res.data.pagination) {
          setPagination(res.data.pagination)
        }
      }
    } catch (error) {
      console.log('Fetch roles has error: ', error)
    } finally {
      setIsFetching(false)
    }
  }, [filters])

  useEffect(() => {
    handleGetRoles()
  }, [handleGetRoles])

  useEffect(() => {
    if (isShowDialog) {
      ;(async () => {
        setIsFetching(true)
        try {
          const res = await permissionService.getAll()
          if (res.data.length > 0) {
            setPermissions(res.data)
          }
        } catch (error) {
          console.log(error)
        } finally {
          setIsFetching(false)
        }
      })()
    }
  }, [isShowDialog])

  return (
    <>
      <Box component='main'>
        <Container>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 4
            }}
          >
            <Box>
              <Typography variant='h4' component='h1' gutterBottom>
                Roles
              </Typography>
              <Typography variant='body2' color='textSecondary'>
                Create roles to assign for user account
              </Typography>
            </Box>
            <Button
              variant='contained'
              color='primary'
              onClick={() => handleShowDialog()}
              startIcon={<AddIcon />}
            >
              Add new role
            </Button>
          </Box>

          {/* Actions */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              mb: 2
            }}
          >
            {/* Filters */}
            <Box>
              <Button
                variant='outlined'
                startIcon={<FilterListIcon />}
                onClick={handleFiltersOpen}
              >
                Filters
              </Button>
              <Menu
                id='basic-menu'
                sx={{
                  '.MuiPaper-root': {
                    minWidth: 300
                  }
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleFiltersClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button'
                }}
              >
                <RoleFilters filters={filters} onChange={handleSortChange} />
              </Menu>
            </Box>
          </Box>

          <TableComponent
            columns={ROLE_COLUMNS}
            data={roles}
            onEdit={handleSelectRole}
            onRemove={handleShowDeleteConfirmRole}
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
      </Box>

      <RoleDialog
        isOpen={isShowDialog}
        isLoading={isLoading}
        role={selectedRole}
        permissions={permissions}
        onClose={handleCloseDialog}
        onSubmit={selectedRole ? handleEditRole : handleAddRole}
      />

      <Dialog
        open={openConfirmDialog}
        onClose={handleCloseConfirmDialog}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>Confirm delete role</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Are you sure want delete this role?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog}>Disagree</Button>
          <Button
            onClick={() => {
              handleDeleteRole()
            }}
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default RolePage
