import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import InputField from '~/components/InputField'
import Box from '@mui/material/Box'
import { useForm } from 'react-hook-form'
import Button from '@mui/material/Button'
import { Role } from '~/types/role'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import CircularProgress from '@mui/material/CircularProgress'
import { useEffect } from 'react'
import { Permission } from '~/types/permission'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'

interface RoleDialogProps {
  isOpen?: boolean
  isLoading?: boolean
  role?: Role
  permissions: Permission[]
  onClose?: () => void
  onSubmit?: (payload: any) => void
}

const RoleDialog = ({
  isOpen = false,
  isLoading = false,
  role,
  permissions = [],
  onClose,
  onSubmit
}: RoleDialogProps) => {
  const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    description: yup.string(),
    permissions: yup.array()
  })

  const { handleSubmit, control, reset, setValue, watch } = useForm({
    defaultValues: {
      name: '',
      description: '',
      permissions: []
    },
    resolver: yupResolver(schema)
  })

  const permissionsWatch = watch('permissions') || []

  const handlePermissionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const checked = e.target.checked

    const updatedPermissions = checked
      ? [...permissionsWatch, value]
      : permissionsWatch.filter((id: string) => id !== value)

    setValue('permissions', updatedPermissions)
  }

  const handleCancle = () => {
    onClose?.()
    reset({
      name: '',
      description: '',
      permissions: []
    })
  }

  const _onSubmit = (data: any) => {
    onSubmit?.(data)
    onClose?.()
    reset({
      name: '',
      description: '',
      permissions: []
    })
  }

  useEffect(() => {
    if (role) {
      reset({
        name: role.name,
        description: role.description,
        permissions: role.permissions
      })
    }
  }, [role, reset])

  return (
    <Dialog
      fullWidth
      open={isOpen}
      onClose={(_, reason) => {
        if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
          reset({
            name: '',
            description: '',
            permissions: []
          })
          onClose?.()
        }
      }}
    >
      {isLoading && <CircularProgress />}
      <DialogTitle>{role ? 'Edit role' : 'Add new role'}</DialogTitle>
      <DialogContent>
        <Box component='form' onSubmit={handleSubmit(_onSubmit)}>
          <InputField name='name' label='Name' control={control} />
          <InputField
            name='description'
            label='Description'
            control={control}
          />

          {/* Assign roles */}
          <Box mt={3} mb={3}>
            <Typography variant='overline' component='h5'>
              Assign role
            </Typography>
            {permissions.length > 0 && (
              <Box
                sx={{
                  display: 'flex',
                  gap: 1,
                  flexDirection: 'column'
                }}
              >
                {permissions.map((item) => {
                  const { _id, description } = item || {}
                  return (
                    <FormControlLabel
                      key={_id}
                      control={
                        <Checkbox
                          value={_id}
                          onChange={handlePermissionChange}
                          checked={control._formValues?.permissions?.includes(
                            _id
                          )}
                        />
                      }
                      label={description || ''}
                    />
                  )
                })}
              </Box>
            )}
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: 2
            }}
          >
            <Button onClick={handleCancle}>Cancel</Button>
            <Button type='submit' variant='contained'>
              {role ? 'Edit' : 'Add'}
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default RoleDialog
