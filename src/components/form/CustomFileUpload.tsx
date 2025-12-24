'use client'

// React Imports
import { useRef, useState } from 'react'
import type { ReactNode, ChangeEvent } from 'react'

// MUI Imports
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import type { TextFieldProps } from '@mui/material/TextField'

// Third-party Imports
import { Controller } from 'react-hook-form'
import type { Control, FieldValues, Path } from 'react-hook-form'

type CustomFileUploadProps<T extends FieldValues> = {
  name: Path<T>
  documentNumberName: Path<T>
  control: Control<T>
  label: string
  documentLabel?: string
  helperText?: ReactNode
  rules?: object
  accept?: string
  inputHeight?: string
} & Omit<TextFieldProps, 'name'>

const CustomFileUpload = <T extends FieldValues>({
  name,
  documentNumberName,
  control,
  label,
  documentLabel = 'Document Number',
  helperText,
  rules,
  accept = '.pdf,.jpg,.jpeg,.png',
  inputHeight = '43px',
  ...textFieldProps
}: CustomFileUploadProps<T>) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [fileName, setFileName] = useState<string>('')

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className='flex flex-col gap-2'>
      <Typography variant='body2' className='font-medium'>
        {label}
      </Typography>
      <Box className='flex gap-3 flex-wrap sm:flex-nowrap'>
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field: { onChange, ...field }, fieldState: { error } }) => (
            <div className='flex flex-col'>
              <input
                {...field}
                type='file'
                ref={fileInputRef}
                accept={accept}
                style={{ display: 'none' }}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const file = e.target.files?.[0]

                  if (file) {
                    setFileName(file.name)
                    onChange(file)
                  }
                }}
              />
              <Button
                variant='outlined'
                size='large'
                onClick={handleButtonClick}
                startIcon={<i className='ri-upload-cloud-line' />}
                className='whitespace-nowrap'
              >
                Upload File
              </Button>
              {fileName && (
                <Typography variant='caption' color='text.secondary' className='mbs-1'>
                  {fileName}
                </Typography>
              )}
              {error && (
                <Typography variant='caption' color='error' className='mbs-1'>
                  {error.message}
                </Typography>
              )}
            </div>
          )}
        />

        <Controller
          name={documentNumberName}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              {...textFieldProps}
              fullWidth
              placeholder={documentLabel}
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
      </Box>
    </div>
  )
}

export default CustomFileUpload

