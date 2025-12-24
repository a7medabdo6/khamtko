'use client'

// React Imports
import type { ReactNode } from 'react'

// MUI Imports
import TextField from '@mui/material/TextField'
import type { TextFieldProps } from '@mui/material/TextField'

// Third-party Imports
import { Controller } from 'react-hook-form'
import type { Control, FieldValues, Path } from 'react-hook-form'

type CustomTextFieldProps<T extends FieldValues> = {
  name: Path<T>
  control: Control<T>
  label?: string
  placeholder?: string
  type?: string
  required?: boolean
  helperText?: ReactNode
  rules?: object
  inputHeight?: string
} & Omit<TextFieldProps, 'name'>

const CustomTextField = <T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  type = 'text',
  required = false,
  helperText,
  rules,
  inputHeight = '46px',
  ...textFieldProps
}: CustomTextFieldProps<T>) => {
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
          type={type}
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
        />
      )}
    />
  )
}

export default CustomTextField

