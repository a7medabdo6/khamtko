# Reusable Form Components

This folder contains reusable form components built with MUI and React Hook Form.

## Components

### 1. CustomTextField

A reusable text field component that integrates with React Hook Form's Controller.

#### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| name | string | Yes | - | Field name for form control |
| control | Control | Yes | - | React Hook Form control object |
| label | string | No | - | Label for the input field |
| placeholder | string | No | - | Placeholder text |
| type | string | No | 'text' | Input type (text, email, number, etc.) |
| required | boolean | No | false | Whether the field is required |
| helperText | ReactNode | No | - | Helper text below the input |
| rules | object | No | - | Validation rules |

#### Usage Example

```tsx
import { useForm } from 'react-hook-form'
import { CustomTextField } from '@components/form'

const MyForm = () => {
  const { control } = useForm()

  return (
    <form>
      <CustomTextField
        name='email'
        control={control}
        label='Email Address'
        type='email'
        placeholder='john.doe@example.com'
        required
      />
    </form>
  )
}
```

### 2. CustomPasswordField

A reusable password field component with built-in show/hide password toggle.

#### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| name | string | Yes | - | Field name for form control |
| control | Control | Yes | - | React Hook Form control object |
| label | string | No | 'Password' | Label for the input field |
| placeholder | string | No | '••••••••' | Placeholder text |
| required | boolean | No | false | Whether the field is required |
| helperText | ReactNode | No | - | Helper text below the input |
| rules | object | No | - | Validation rules |
| showPasswordToggle | boolean | No | true | Show/hide password toggle button |

#### Usage Example

```tsx
import { useForm } from 'react-hook-form'
import { CustomPasswordField } from '@components/form'

const MyForm = () => {
  const { control } = useForm()

  return (
    <form>
      <CustomPasswordField
        name='password'
        control={control}
        label='Password'
        placeholder='Enter your password'
        required
      />
    </form>
  )
}
```

## Complete Login Form Example

```tsx
'use client'

import { useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { object, string, email, pipe, minLength, nonEmpty } from 'valibot'
import { Button, Typography } from '@mui/material'
import { CustomTextField, CustomPasswordField } from '@components/form'

const schema = object({
  email: pipe(
    string(),
    minLength(1, 'Email is required'),
    email('Please enter a valid email')
  ),
  password: pipe(
    string(),
    nonEmpty('Password is required'),
    minLength(8, 'Password must be at least 8 characters')
  )
})

type FormData = InferInput<typeof schema>

const LoginForm = () => {
  const { control, handleSubmit } = useForm<FormData>({
    resolver: valibotResolver(schema)
  })

  const onSubmit = (data: FormData) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
      <CustomTextField
        name='email'
        control={control}
        label='Email Address'
        type='email'
        placeholder='john.doe@example.com'
      />

      <CustomPasswordField
        name='password'
        control={control}
        label='Password'
        placeholder='••••••••'
      />

      <Button type='submit' variant='contained' fullWidth>
        Sign In
      </Button>
    </form>
  )
}

export default LoginForm
```

## Benefits

- **Type-safe**: Full TypeScript support with generics
- **DRY**: Reduces code duplication across forms
- **Consistent**: Ensures consistent styling and behavior
- **Validation**: Built-in integration with React Hook Form validation
- **Accessible**: Follows MUI accessibility standards
- **Customizable**: All MUI TextField props are supported

## Notes

- These components use React Hook Form's `Controller` component internally
- Error handling is automatic when using validation schemas
- All standard MUI TextField props can be passed through
- The components are fully typed with TypeScript generics

