import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'
import InputField from '~/components/InputField'
import { useForm } from 'react-hook-form'
import { RegisterPayload } from '~/types/auth'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { IconButton, InputAdornment } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'

interface RegisterFormProps {
  loading?: boolean
  // eslint-disable-next-line no-unused-vars
  onSubmit?: (payload: RegisterPayload) => void
}

const RegisterForm = ({ loading = false, onSubmit }: RegisterFormProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const schema = yup.object().shape({
    lastName: yup.string().required('Last name is required'),
    firstName: yup.string().required('First name is required'),
    email: yup
      .string()
      .required('Email is required')
      .email('Email is not correct format'),
    password: yup
      .string()
      .required('Password is required')
      .min(6, 'Password must have least 6 characters')
  })

  const { control, handleSubmit } = useForm<RegisterPayload>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    },
    resolver: yupResolver(schema)
  })

  const handleFormSubmit = (values: RegisterPayload) => {
    onSubmit?.(values)
  }

  return (
    <Box component='form' noValidate onSubmit={handleSubmit(handleFormSubmit)}>
      <InputField
        name='firstName'
        control={control}
        label='Fist Name'
        placeholder='Enter your first name...'
        required
        disabled={loading}
      />

      <InputField
        name='lastName'
        control={control}
        label='Last Name'
        placeholder='Enter your last name...'
        required
        disabled={loading}
      />

      <InputField
        name='email'
        control={control}
        label='Email'
        placeholder='Enter your email...'
        required
        disabled={loading}
      />

      <InputField
        disabled={loading}
        type={showPassword ? 'text' : 'password'}
        name='password'
        control={control}
        label='Password'
        placeholder='Enter your password...'
        required
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton
                aria-label={
                  showPassword ? 'hide the password' : 'display the password'
                }
                onClick={() => setShowPassword((prev) => !prev)}
                edge='end'
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )
        }}
      />

      <Stack mt={3}>
        <Button
          type='submit'
          variant='contained'
          size='large'
          loading={loading}
        >
          Register
        </Button>
        <Stack
          direction='row'
          justifyContent='center'
          alignItems='center'
          gap={1}
          mt={2}
        >
          <Typography variant='body2'>Don't have an account?</Typography>
          <Link to='/register'>Register</Link>
        </Stack>
      </Stack>
    </Box>
  )
}

export default RegisterForm
