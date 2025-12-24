'use client'

// React Imports
import { useState } from 'react'
import type { ReactNode } from 'react'

// MUI Imports
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import type { TextFieldProps } from '@mui/material/TextField'

// Third-party Imports
import { Controller } from 'react-hook-form'
import type { Control, FieldValues, Path } from 'react-hook-form'

type CustomPasswordFieldProps<T extends FieldValues> = {
  name: Path<T>
  control: Control<T>
  label?: string
  placeholder?: string
  required?: boolean
  helperText?: ReactNode
  rules?: object
  showPasswordToggle?: boolean
  inputHeight?: string
} & Omit<TextFieldProps, 'name' | 'type'>

const CustomPasswordField = <T extends FieldValues>({
  name,
  control,
  label = 'Password',
  placeholder = '••••••••',
  required = false,
  helperText,
  rules,
  showPasswordToggle = true,
  inputHeight = '56px',
  ...textFieldProps
}: CustomPasswordFieldProps<T>) => {
  // States
  const [isPasswordShown, setIsPasswordShown] = useState(false)

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          {...textFieldProps}
          label={label}
          placeholder={placeholder}
          type={isPasswordShown ? 'text' : 'password'}
          required={required}
          fullWidth
          error={!!error}
          helperText={error ? error.message : helperText}
          sx={{
            '& .MuiOutlinedInput-root': {
              height: inputHeight
            },
            ...textFieldProps.sx
          }}
          slotProps={{
            input: {
              ...textFieldProps.slotProps?.input,
              endAdornment: showPasswordToggle ? (
                <InputAdornment position='end'>
                  <IconButton
                    size='small'
                    edge='end'
                    onClick={handleClickShowPassword}
                    onMouseDown={e => e.preventDefault()}
                    aria-label='toggle password visibility'
                  >
                    <i className={isPasswordShown ? 'ri-eye-off-line' : 'ri-eye-line'} />
                  </IconButton>
                </InputAdornment>
              ) : null
            }
          }}
        />
      )}
    />
  )
}

export default CustomPasswordField

