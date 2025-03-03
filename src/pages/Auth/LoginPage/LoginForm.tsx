import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import InputField from '~/components/InputField'
import { LoginPayLoad } from '~/types/auth'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { IconButton, InputAdornment } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useState } from 'react'

interface LoginFormProps {
  loading?: boolean
  // eslint-disable-next-line no-unused-vars
  onSubmit?: (payload: LoginPayLoad) => void
}

const LoginForm = ({ loading = false, onSubmit }: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const schema = yup.object().shape({
    email: yup.string().required('Email is required').email('Email invalid'),
    password: yup
      .string()
      .required('Password is required')
      .min(6, 'Password must have least 6 characters')
  })

  const { control, handleSubmit } = useForm<LoginPayLoad>({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: yupResolver(schema)
  })

  const handleFormSubmit = (values: LoginPayLoad) => {
    onSubmit?.(values)
  }

  return (
    <Box
      component='form'
      sx={{ mt: 4 }}
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <InputField
        disabled={loading}
        name='email'
        control={control}
        label='Email'
        placeholder='Enter your email...'
        required
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
          Login
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

export default LoginForm
