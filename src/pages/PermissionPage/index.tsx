import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import TableComponent, { ColumnProps } from '~/components/TableComponent'
import { useCallback, useEffect, useState } from 'react'
import permissionService from '~/services/permissionService'
import {
  AddPermissionPayload,
  EditPermissionPayload,
  Permission
} from '~/types/permission'
import PermissionDialog from '~/pages/PermissionPage/PermissionDialog'
import { toast } from 'react-toastify'
import PermissionConfirmDialog from '~/pages/PermissionPage/PermissionConfirmDialog'
import { ListPagination, ListParams } from '~/types/common'
import Pagination from '@mui/material/Pagination'

const PERMISSIONS_LIMIT = 10

const PERMISSION_COLUMNS: ColumnProps[] = [
  {
    label: 'ID',
    name: '_id'
  },
  {
    label: 'URL Endpoint',
    name: 'url'
  },
  {
    label: 'Description',
    name: 'description'
  }
]

const PermissionPage = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [permissions, setPermissions] = useState<Permission[]>([])
  const [isShowPermissionDialog, setIsShowPermissionDialog] =
    useState<boolean>(false)
  const [selectedPermission, setSelectedPermission] = useState<Permission>()
  const [isShowPermissionConfirmDialog, setIsShowPermissionConfirmDialog] =
    useState<boolean>(false)
  const [pagination, setPagination] = useState<ListPagination>()
  const [filters, setFilters] = useState<ListParams>({
    limit: PERMISSIONS_LIMIT,
    page: 1
  })

  // Events handling
  // Handle open permission dialog if user click button Add
  const handleOpenPermissionDialog = () => {
    setIsShowPermissionDialog(true)
  }

  const handleClosePermissionDialog = () => {
    setIsShowPermissionDialog(false)
  }

  // Handle add new permission
  const handleAddPermission = async (payload: AddPermissionPayload) => {
    try {
      const res = await permissionService.add(payload)
      if (res?.data?._id) {
        setFilters({ ...filters, page: 1 })
        toast.success(res?.message)
      }
    } catch (error: any) {
      const errorInfo = error?.response?.data
      toast.error(errorInfo?.message)
    }
  }

  // Handle edit permission
  const handleEditPermission = async (payload: EditPermissionPayload) => {
    if (selectedPermission?._id) {
      try {
        const res = await permissionService.edit(
          selectedPermission._id,
          payload
        )

        if (res.data._id) {
          setPermissions((prev) =>
            prev.map((item) =>
              item._id === res.data._id ? { ...item, ...res.data } : item
            )
          )
          // Toast notification success
          toast.success(res.message)
        }
      } catch (error: any) {
        const errorInfo = error?.response?.data
        toast.error(errorInfo?.message)
      }
    }
  }

  // Handle delete permission
  const handleDeletePermission = async () => {
    if (selectedPermission?._id) {
      setLoading(true)
      try {
        const res = await permissionService.deleteById(selectedPermission._id)
        if (res.data._id) {
          // Close confirm dialog
          setIsShowPermissionConfirmDialog(false)

          // Reset selected permission
          setSelectedPermission(undefined)

          setFilters({ ...filters, page: 1 })

          // Toast notification
          toast.success(res.message)
        }
      } catch (error: any) {
        const errorInfo = error?.response?.data
        toast.error(errorInfo?.message)
      } finally {
        setTimeout(() => {
          setLoading(false)
        }, 300)
      }
    }
  }

  // Handle submit
  const handleSubmit = (data: AddPermissionPayload) => {
    const payload = { ...data }

    if (selectedPermission) {
      handleEditPermission(payload)
    } else {
      handleAddPermission(payload)
    }
  }

  // Handle page change
  const handlePageChange = (e: React.ChangeEvent<unknown>, page: number) => {
    e.stopPropagation()
    setFilters({ ...filters, page })
  }

  // Fetch list permission
  const fetchListPermission = useCallback(async () => {
    setLoading(true)
    try {
      const res = await permissionService.getList(filters)

      if (res.data) {
        setPermissions(res.data.permissions)
        setPagination(res.data.pagination)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setTimeout(() => {
        setLoading(false)
      }, 300)
    }
  }, [filters])

  useEffect(() => {
    fetchListPermission()
  }, [fetchListPermission])

  return (
    <>
      <Container>
        <Stack
          direction='row'
          sx={{ alignItems: 'center', justifyContent: 'space-between' }}
        >
          <Box>
            <Typography variant='h4' component='h1' gutterBottom>
              Permissions
            </Typography>
            <Typography variant='body2' color='textSecondary'>
              Create permission to assign for role...
            </Typography>
          </Box>
          <Button
            variant='contained'
            color='primary'
            onClick={handleOpenPermissionDialog}
            startIcon={<AddIcon />}
          >
            Add new permission
          </Button>
        </Stack>

        <TableComponent
          sx={{ marginTop: 4 }}
          loading={loading}
          columns={PERMISSION_COLUMNS}
          data={permissions || []}
          onEdit={(permission) => {
            setSelectedPermission(permission)
            handleOpenPermissionDialog()
          }}
          onRemove={(permission) => {
            setSelectedPermission(permission)
            setIsShowPermissionConfirmDialog(true)
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
            page={pagination?.currentPage}
            onChange={handlePageChange}
          />
        </Box>
      </Container>

      {/* Permission Dialog */}
      <PermissionDialog
        isOpen={isShowPermissionDialog}
        permission={selectedPermission}
        onClose={handleClosePermissionDialog}
        onSubmit={handleSubmit}
      />

      {/* Delete Confirm Dialog */}
      <PermissionConfirmDialog
        isOpen={isShowPermissionConfirmDialog}
        onOk={handleDeletePermission}
      />
    </>
  )
}

export default PermissionPage
