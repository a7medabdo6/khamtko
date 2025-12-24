'use client'

// React Imports
import { useState } from 'react'

// Next Imports
import Link from 'next/link'
import { useParams, useRouter, useSearchParams } from 'next/navigation'

// MUI Imports
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Alert from '@mui/material/Alert'

// Third-party Imports
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { object, minLength, string, email, pipe, nonEmpty } from 'valibot'
import classnames from 'classnames'
import type { SubmitHandler } from 'react-hook-form'
import type { InferInput } from 'valibot'

// Type Imports
import type { Mode } from '@core/types'
import type { Locale } from '@configs/i18n'

// Component Imports
import Logo from '@components/layout/shared/Logo'
import Illustrations from '@components/Illustrations'

// Hook Imports
import { useImageVariant } from '@core/hooks/useImageVariant'
import { useSettings } from '@core/hooks/useSettings'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'
import CustomPasswordField from '../components/form/CustomPasswordField'
import CustomTextField from '../components/form/CustomTextField'

type ErrorType = {
  message: string[]
}

type FormData = InferInput<typeof schema>

const schema = object({
  email: pipe(string(), minLength(1, 'This field is required'), email('Please enter a valid email address')),
  password: pipe(
    string(),
    nonEmpty('This field is required'),
    minLength(5, 'Password must be at least 5 characters long')
  )
})

const LoginWithReusableComponents = ({ mode }: { mode: Mode }) => {
  // States
  const [errorState, setErrorState] = useState<ErrorType | null>(null)

  // Vars
  const darkImg = '/images/pages/auth-v2-mask-dark.png'
  const lightImg = '/images/pages/auth-v2-mask-light.png'
  const darkIllustration = '/images/illustrations/auth/v2-login-dark.png'
  const lightIllustration = '/images/illustrations/auth/v2-login-light.png'
  const borderedDarkIllustration = '/images/illustrations/auth/v2-login-dark-border.png'
  const borderedLightIllustration = '/images/illustrations/auth/v2-login-light-border.png'

  // Hooks
  const router = useRouter()
  const searchParams = useSearchParams()
  const { lang: locale } = useParams()
  const { settings } = useSettings()

  const { control, handleSubmit } = useForm<FormData>({
    resolver: valibotResolver(schema),
    defaultValues: {
      email: 'admin@materio.com',
      password: 'admin'
    }
  })

  const authBackground = useImageVariant(mode, lightImg, darkImg)

  const characterIllustration = useImageVariant(
    mode,
    lightIllustration,
    darkIllustration,
    borderedLightIllustration,
    borderedDarkIllustration
  )

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    const res = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false
    })

    if (res && res.ok && res.error === null) {
      // Vars
      const redirectURL = searchParams.get('redirectTo') ?? '/'

      router.replace(getLocalizedUrl(redirectURL, locale as Locale))
    } else {
      if (res?.error) {
        const error = JSON.parse(res.error)

        setErrorState(error)
      }
    }
  }

  return (
    <div className='flex bs-full justify-center'>
      <div
        className={classnames(
          'flex bs-full items-center justify-center flex-1 min-bs-[100dvh] relative p-6 max-md:hidden',
          {
            'border-ie': settings.skin === 'bordered'
          }
        )}
      >
        <div className='plb-12 pis-12'>
          <img
            src={characterIllustration}
            alt='character-illustration'
            className='max-bs-[500px] max-is-full bs-auto'
          />
        </div>
        <Illustrations
          image1={{ src: '/images/illustrations/objects/tree-2.png' }}
          image2={null}
          maskImg={{ src: authBackground }}
        />
      </div>
      <div className='flex justify-center items-center bs-full bg-backgroundPaper !min-is-full p-6 md:!min-is-[unset] md:p-12 md:is-[480px]'>
        <div className='absolute block-start-5 sm:block-start-[33px] inline-start-6 sm:inline-start-[38px]'>
          <Logo />
        </div>
        <div className='flex flex-col gap-5 is-full sm:is-auto md:is-full sm:max-is-[400px] md:max-is-[unset]'>
          <div>
            <Typography variant='h4' className='text-center'>
              Sign In to Khamatko
              {/* {themeConfig.templateName} */}
            </Typography>
            <Typography className='text-center' color='text.secondary'>
              Enter your credentials to access your account.
            </Typography>
          </div>

          {errorState !== null && (
            <Alert severity='error' onClose={() => setErrorState(null)}>
              {errorState?.message[0]}
            </Alert>
          )}

          <form
            noValidate
            action={() => {}}
            autoComplete='off'
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col gap-5'
          >
            {/* Using Reusable CustomTextField Component */}
            <CustomTextField
              name='email'
              control={control}
              label='Email Address'
              type='email'
              placeholder='john.doe@example.com'
              autoFocus
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                e.target.value
                errorState !== null && setErrorState(null)
              }}
            />

            {/* Password Field with Forgot Password Link */}
            <div>
              <div className='flex justify-end items-center mbe-1'>
                
                <Typography
                  className='text-sm'
                  color='primary.main'
                  component={Link}
                  href={getLocalizedUrl('/forgot-password', locale as Locale)}
                >
                  Forgot your password?
                </Typography>
              </div>

              {/* Using Reusable CustomPasswordField Component */}
              <CustomPasswordField
                name='password'
                control={control}
                id='login-password'
                placeholder='••••••••'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  e.target.value
                  errorState !== null && setErrorState(null)
                }}
              />
            </div>

            {/* Sign In Button */}
            <Button fullWidth variant='contained' type='submit' size='large'>
              Sign In
            </Button>

            {/* Divider */}
            <Divider className='gap-3'>
              <Typography variant='body2' color='text.secondary'>
                OR CONTINUE WITH
              </Typography>
            </Divider>

            {/* Sign In with OTP Button */}
            <Button
              fullWidth
              variant='outlined'
              size='large'
              onClick={() => router.push(getLocalizedUrl('/login-otp', locale as Locale))}
            >
              Sign In with OTP
            </Button>

            {/* Sign Up Link */}
            <div className='flex justify-center items-center flex-wrap gap-2'>
              <Typography color='text.secondary'>Don&apos;t have an account?</Typography>
              <Typography
                component={Link}
                href={getLocalizedUrl('/register', locale as Locale)}
                color='primary.main'
                className='font-medium'
              >
                Sign Up
              </Typography>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginWithReusableComponents

