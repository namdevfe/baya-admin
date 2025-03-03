import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import TableComponent, { ColumnProps } from '~/components/TableComponent'
import { useEffect, useState } from 'react'
import permissionService from '~/services/permissionService'
import {
  AddPermissionPayload,
  EditPermissionPayload,
  Permission
} from '~/types/permission'
import PermissionDialog from '~/pages/PermissionPage/PermissionDialog'
import { toast } from 'react-toastify'

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
  // Init hooks
  const [permissions, setPermissions] = useState<Permission[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [isShowPermissionDialog, setIsShowPermissionDialog] =
    useState<boolean>(false)
  const [selectedPermission, setSelectedPermission] = useState<Permission>()

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
        // Toast notification success
        toast.success(res?.message)

        // Push to permissions
        setPermissions((prev) => [res.data, ...prev])
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
          // Update item edited on list permission
          setPermissions((prev) => [
            ...prev.map((item) =>
              item._id === res.data._id
                ? {
                    ...item,
                    updatedAt: res.data.updatedAt,
                    url: res.data.url,
                    description: res.data?.description
                  }
                : item
            )
          ])

          // Toast notification success
          toast.success(res.message)
        }
      } catch (error: any) {
        const errorInfo = error?.response?.data
        toast.error(errorInfo?.message)
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

  useEffect(() => {
    const handleGetPermissions = async () => {
      setLoading(true)
      try {
        const res = await permissionService.getAll()

        if (res.data.length > 0) {
          setPermissions(res.data)
        }
      } catch (error) {
        console.log('🚀error---->', error)
      } finally {
        setTimeout(() => {
          setLoading(false)
        }, 300)
      }
    }

    handleGetPermissions()
  }, [])

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
        />
      </Container>

      {/* Permission Dialog */}
      <PermissionDialog
        isOpen={isShowPermissionDialog}
        permission={selectedPermission}
        onClose={handleClosePermissionDialog}
        onSubmit={handleSubmit}
      />
    </>
  )
}

export default PermissionPage
