import { yupResolver } from '@hookform/resolvers/yup'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import InputField from '~/components/InputField'
import {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_UPLOAD_PRESET_NAME
} from '~/constants/environment'
import roleService from '~/services/roleService'
import { Role } from '~/types/role'
import { AddUserPayload, User } from '~/types/user'

interface UserDialogProps {
  isOpen?: boolean
  isLoading?: boolean
  user?: User
  onClose?: () => void
  // eslint-disable-next-line no-unused-vars
  onSubmit?: (payload: AddUserPayload) => void
}

const UserDialog = ({
  isOpen = false,
  isLoading = false,
  user,
  onClose,
  onSubmit
}: UserDialogProps) => {
  const [roles, setRoles] = useState<Role[]>([])
  const [selectedRole, setSelectedRole] = useState<string>('')
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false)
  const [previewImage, setPreviewImage] = useState<string>()
  const [files, setFiles] = useState<FileList>()

  const roleOptions = roles.map((role) => ({
    value: role._id,
    label: role.name
  }))

  const schema = yup.object().shape({
    email: yup.string().required('Email is required.').email('Invalid email.'),
    password: yup
      .string()
      .required('Password is required.')
      .min(6, 'Password must have contain least 6 charactor.'),
    firstName: yup.string().required('First name is required.'),
    lastName: yup.string().required('Last name is required.'),
    avatar: yup.string().optional()
  })

  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: ''
    },
    resolver: yupResolver(schema)
  })

  const handleResetForm = () => {
    reset({
      email: '',
      password: '',
      firstName: '',
      lastName: ''
    })
  }

  const handleCancle = () => {
    onClose?.()
    handleResetForm()
  }

  const handleSelectRoleChange = (e: SelectChangeEvent<any>) => {
    setSelectedRole(e.target.value)
  }

  const uploadFile = async (files: FileList) => {
    try {
      const formData = new FormData()
      formData.append('file', files[0])
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET_NAME)

      const res: any = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      )

      if (res.status === 200 && res?.data?.secure_url) {
        return res.data.secure_url
      }
    } catch (error) {
      console.log('🚀error---->', error)
    }
  }

  const _onSubmit = async (data: AddUserPayload) => {
    const payload = { ...data, role: selectedRole }

    if (files) {
      // Upload to cloudinary
      const imageURL = await uploadFile(files)

      if (imageURL) {
        payload.avatar = imageURL
      }
    }

    onSubmit?.(payload)
    onClose?.()
    handleResetForm()
  }

  const fetchAllRole = useCallback(async () => {
    try {
      const res = await roleService.getAll()

      if (res.data.length > 0) {
        setRoles(res.data)
      }
    } catch (error) {
      console.log('🚀error---->', error)
    }
  }, [])

  useEffect(() => {
    fetchAllRole()
  }, [fetchAllRole])

  return (
    <Dialog
      fullWidth
      open={isOpen}
      onClose={(_, reason) => {
        if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
          handleResetForm()
          onClose?.()
        }
      }}
    >
      {isLoading && <CircularProgress />}
      <DialogTitle>{user ? 'Edit user' : 'Add new user'}</DialogTitle>
      <DialogContent>
        <Box component='form' onSubmit={handleSubmit(_onSubmit)}>
          {previewImage ? (
            <Avatar
              src={previewImage}
              alt='avatar'
              sx={{ width: 100, height: 100 }}
            />
          ) : (
            <Avatar alt='avatar' sx={{ width: 100, height: 100 }} />
          )}
          <label htmlFor='avatar-upload' style={{ cursor: 'pointer' }}>
            Choose Image
          </label>
          <input
            type='file'
            id='avatar-upload'
            accept='image/*'
            name='avatar'
            hidden
            onChange={(e) => {
              setPreviewImage(URL.createObjectURL(e.target.files?.[0] as any))
              setFiles(e.target.files as any)
            }}
          />

          <InputField
            autoComplete='off'
            name='email'
            label='Email'
            control={control}
          />
          <InputField
            autoComplete='off'
            type={isShowPassword ? 'text' : 'password'}
            name='password'
            label='Password'
            control={control}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    aria-label={
                      isShowPassword
                        ? 'hide the password'
                        : 'display the password'
                    }
                    onClick={() => setIsShowPassword((prev) => !prev)}
                    edge='end'
                  >
                    {isShowPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <InputField name='firstName' label='First name' control={control} />
          <InputField name='lastName' label='Last name' control={control} />
          <FormControl fullWidth margin='normal'>
            <InputLabel id='select-role'>Select role</InputLabel>
            <Select
              labelId='select-role-label'
              id='select-role-label'
              label='Select role'
              value={selectedRole}
              onChange={handleSelectRoleChange}
            >
              {roleOptions.map((item) => (
                <MenuItem key={item.value} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: 2
            }}
          >
            <Button onClick={handleCancle}>Cancel</Button>
            <Button type='submit' variant='contained'>
              {user ? 'Edit' : 'Add'}
            </Button>
          </Box> */}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancle}>Cancel</Button>
        <Button onClick={handleSubmit(_onSubmit)} variant='contained'>
          {user ? 'Edit' : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default UserDialog
