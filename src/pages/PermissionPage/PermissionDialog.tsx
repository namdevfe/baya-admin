import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import InputField from '~/components/InputField'
import Box from '@mui/material/Box'
import { useForm } from 'react-hook-form'
import Button from '@mui/material/Button'
// import { Role } from '~/types/role'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import CircularProgress from '@mui/material/CircularProgress'
import { useEffect } from 'react'
import {
  AddPermissionPayload,
  EditPermissionPayload,
  Permission
} from '~/types/permission'
// import Typography from '@mui/material/Typography'
// import Checkbox from '@mui/material/Checkbox'
// import FormControlLabel from '@mui/material/FormControlLabel'

interface PermissionDialogProps {
  isOpen?: boolean
  isLoading?: boolean
  permission?: Permission
  onClose?: () => void
  // eslint-disable-next-line no-unused-vars
  onSubmit?: (payload: any) => void
}

const PermissionDialog = ({
  isOpen = false,
  isLoading = false,
  permission,
  onClose,
  onSubmit
}: PermissionDialogProps) => {
  const schema = yup.object().shape({
    url: yup.string().required('Url is required.'),
    description: yup.string()
  })

  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      url: '',
      description: ''
    },
    resolver: yupResolver(schema)
  })

  const handleCancle = () => {
    onClose?.()
    reset({
      url: '',
      description: ''
    })
  }

  const _onSubmit = (data: AddPermissionPayload | EditPermissionPayload) => {
    onSubmit?.(data)
    onClose?.()
    reset({
      url: '',
      description: ''
    })
  }

  useEffect(() => {
    if (permission) {
      reset({
        url: permission.url,
        description: permission.description
      })
    }
  }, [permission, reset])

  return (
    <Dialog
      fullWidth
      open={isOpen}
      onClose={(_, reason) => {
        if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
          reset({
            url: '',
            description: ''
          })
          onClose?.()
        }
      }}
    >
      {isLoading && <CircularProgress />}
      <DialogTitle>
        {permission ? 'Edit permission' : 'Add new permission'}
      </DialogTitle>
      <DialogContent>
        <Box component='form' onSubmit={handleSubmit(_onSubmit)}>
          <InputField name='url' label='URL Endpoint' control={control} />
          <InputField
            name='description'
            label='Description'
            control={control}
          />

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
              {permission ? 'Edit' : 'Add'}
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default PermissionDialog
