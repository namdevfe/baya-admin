import { Control, useController } from 'react-hook-form'
import TextField, { TextFieldProps } from '@mui/material/TextField'

type InputFieldProps = TextFieldProps & {
  name: string
  control: Control<any>
}

const InputField = ({ name, control, ...restProps }: InputFieldProps) => {
  const {
    field: { onChange, onBlur, ref, value },
    fieldState: { error }
  } = useController({
    name,
    control
  })

  return (
    <TextField
      name={name}
      value={value}
      inputRef={ref}
      onChange={onChange}
      onBlur={onBlur}
      fullWidth
      margin='normal'
      error={!!error}
      helperText={error?.message}
      {...restProps}
    />
  )
}

export default InputField
