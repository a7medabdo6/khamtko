'use client'

// React Imports
import type { ReactNode } from 'react'

// MUI Imports
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import type { TextFieldProps } from '@mui/material/TextField'

// Third-party Imports
import { Controller } from 'react-hook-form'
import type { Control, FieldValues, Path } from 'react-hook-form'

export type SelectOption = {
  value: string | number
  label: string
}

type CustomSelectFieldProps<T extends FieldValues> = {
  name: Path<T>
  control: Control<T>
  label?: string
  placeholder?: string
  required?: boolean
  helperText?: ReactNode
  rules?: object
  options: SelectOption[]
  inputHeight?: string
} & Omit<TextFieldProps, 'name' | 'select'>

const CustomSelectField = <T extends FieldValues>({
  name,
  control,
  label,
  placeholder = 'Select an option',
  required = false,
  helperText,
  rules,
  options,
  inputHeight = '46px',
  ...textFieldProps
}: CustomSelectFieldProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          {...textFieldProps}
          select
          label={label}
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
          SelectProps={{
            displayEmpty: true,
            ...textFieldProps.SelectProps
          }}
        >
          <MenuItem value='' disabled>
            {placeholder}
          </MenuItem>
          {options.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  )
}

export default CustomSelectField

