'use client'

// React Imports
import { useState } from 'react'

// Next Imports
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'

// MUI Imports
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Box from '@mui/material/Box'

// Third-party Imports
import { useForm, Controller } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { object, string, email, pipe, nonEmpty, custom, optional, boolean } from 'valibot'
import classnames from 'classnames'
import type { SubmitHandler } from 'react-hook-form'
import type { InferInput } from 'valibot'

// Type Imports
import type { Mode } from '@core/types'
import type { Locale } from '@configs/i18n'

// Component Imports
import Logo from '@components/layout/shared/Logo'
import Illustrations from '@components/Illustrations'
import CustomTextField from '@components/form/CustomTextField'
import CustomSelectField from '@components/form/CustomSelectField'
import CustomFileUpload from '@components/form/CustomFileUpload'
import type { SelectOption } from '@components/form/CustomSelectField'

// Hook Imports
import { useImageVariant } from '@core/hooks/useImageVariant'
import { useSettings } from '@core/hooks/useSettings'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'
import { SELLER_TYPE, SELLER_TYPE_LABELS } from '@/types/sellerTypes'

type ErrorType = {
  message: string[]
}

type FormData = InferInput<typeof schema>

const schema = object({
  name: pipe(string(), nonEmpty('Name is required')),
  email: pipe(string(), nonEmpty('Email is required'), email('Please enter a valid email address')),
  companyName: pipe(string(), nonEmpty('Company name is required')),
  phoneNumber: pipe(string(), nonEmpty('Phone number is required')),
  businessType: pipe(string(), nonEmpty('Please select a business type')),
  sellerType: pipe(string(), nonEmpty('Please select a seller type')),

  // File uploads
  commercialRegisterFile: custom<File>(value => value instanceof File, 'Please upload commercial register'),
  commercialRegisterNumber: pipe(string(), nonEmpty('Document number is required')),
  taxCardFile: custom<File>(value => value instanceof File, 'Please upload tax card'),
  taxCardNumber: pipe(string(), nonEmpty('Document number is required')),
  vatCertificateFile: custom<File>(value => value instanceof File, 'Please upload VAT certificate'),
  vatCertificateNumber: pipe(string(), nonEmpty('Document number is required')),
  advanceTaxFile: custom<File>(value => value instanceof File, 'Please upload tax certificate'),
  advanceTaxNumber: pipe(string(), nonEmpty('Document number is required')),

  // Advance payment (optional; when advancePaymentRequired is true, amount/notes/document required in submit)
  advancePaymentRequired: optional(boolean()),
  advancePaymentAmount: optional(string()),
  advancePaymentNotes: optional(string()),
  advancePaymentDocument: optional(custom<File | undefined>(v => v === undefined || v instanceof File, 'Must be a file')),
  advancePaymentDocumentNumber: optional(string())
})

const businessTypeOptions: SelectOption[] = [
  { value: 'retail', label: 'Retail' },
  { value: 'wholesale', label: 'Wholesale' },
  { value: 'manufacturer', label: 'Manufacturer' },
  { value: 'distributor', label: 'Distributor' },
  { value: 'service', label: 'Service Provider' },
  { value: 'other', label: 'Other' }
]

const sellerTypeOptions: SelectOption[] = [
  { value: SELLER_TYPE.SUB_COMPANY, label: SELLER_TYPE_LABELS[SELLER_TYPE.SUB_COMPANY] },
  { value: SELLER_TYPE.SELLER_A, label: SELLER_TYPE_LABELS[SELLER_TYPE.SELLER_A] },
  { value: SELLER_TYPE.SELLER_B, label: SELLER_TYPE_LABELS[SELLER_TYPE.SELLER_B] }
]

const RegisterV2 = ({ mode }: { mode: Mode }) => {
  // States
  const [errorState, setErrorState] = useState<ErrorType | null>(null)
  const [successState, setSuccessState] = useState(false)

  // Vars
  const darkImg = '/images/pages/auth-v2-mask-dark.png'
  const lightImg = '/images/pages/auth-v2-mask-light.png'
  const darkIllustration = '/images/illustrations/auth/v2-register-dark.png'
  const lightIllustration = '/images/illustrations/auth/v2-register-light.png'
  const borderedDarkIllustration = '/images/illustrations/auth/v2-register-dark-border.png'
  const borderedLightIllustration = '/images/illustrations/auth/v2-register-light-border.png'

  // Hooks
  const router = useRouter()
  const { lang: locale } = useParams()
  const { settings } = useSettings()

  const { control, handleSubmit, watch } = useForm<FormData>({
    resolver: valibotResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      companyName: '',
      phoneNumber: '',
      businessType: '',
      sellerType: '',
      commercialRegisterNumber: '',
      taxCardNumber: '',
      vatCertificateNumber: '',
      advanceTaxNumber: '',
      advancePaymentRequired: false,
      advancePaymentAmount: '',
      advancePaymentNotes: '',
      advancePaymentDocumentNumber: ''
    }
  })

  const advancePaymentRequired = watch('advancePaymentRequired')

  const authBackground = useImageVariant(mode, lightImg, darkImg)

  const characterIllustration = useImageVariant(
    mode,
    lightIllustration,
    darkIllustration,
    borderedLightIllustration,
    borderedDarkIllustration
  )

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    try {
      if (data.advancePaymentRequired) {
        const hasAmount = !!data.advancePaymentAmount?.trim()
        const hasNotes = !!data.advancePaymentNotes?.trim()
        const hasDocument = data.advancePaymentDocument instanceof File

        if (!hasAmount || !hasNotes || !hasDocument) {
          setErrorState({
            message: ['When advance payment is required, please provide amount, notes, and upload the document.']
          })
          return
        }
      }

      console.log('Form Data:', data)
      // data.sellerType is one of: sub_company | seller_a | seller_b
      // Store it on User (e.g. via registerSeller API) so orders/warehouse/commission can use it.

      // Here you would typically send the data to your API
      // const response = await registerSeller({ ...data, sellerType: data.sellerType })
      
      setSuccessState(true)
      setErrorState(null)

      // Redirect to login after successful registration
      setTimeout(() => {
        router.push(getLocalizedUrl('/login', locale as Locale))
      }, 2000)
    } catch (error) {
      setErrorState({
        message: ['Registration failed. Please try again.']
      })
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
          image1={{ src: '/images/illustrations/objects/tree-3.png' }}
          image2={null}
          maskImg={{ src: authBackground }}
        />
      </div>
      <div className='flex justify-center items-center bs-full bg-backgroundPaper !min-is-full p-6 md:!min-is-[unset] md:p-12 md:is-[600px] overflow-y-auto'>
        <div className='absolute block-start-5 sm:block-start-[33px] inline-start-6 sm:inline-start-[38px]'>
          <Logo />
        </div>

        <div className='flex flex-col gap-6 is-full sm:is-auto md:is-full sm:max-is-[550px] md:max-is-[unset] mbs-11 sm:mbs-14 md:mbs-0'>
          <div className='text-center'>
            <Typography variant='h4' className='mbe-2'>
              Seller Registration
            </Typography>
            <Typography color='text.secondary'>
              Join our platform! Fill out the form below to register as a seller and start showcasing your products.
            </Typography>
          </div>

          {successState && (
            <Alert severity='success' onClose={() => setSuccessState(false)}>
              Registration successful! Redirecting to login...
            </Alert>
          )}

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
            className='flex flex-col gap-6'
          >
            {/* Business Details Section */}
            <div className='flex flex-col gap-4'>
              <Typography variant='h6' className='font-semibold'>
                Business Details
              </Typography>

              <CustomTextField
                name='name'
                control={control}
                label='Name'
                placeholder='Your Personal name'
                autoFocus
                required
              />

              <CustomTextField
                name='email'
                control={control}
                label='Email'
                type='email'
                placeholder='name@example.com'
                required
              />

              <CustomTextField
                name='companyName'
                control={control}
                label='Company Name'
                placeholder='Your Company Name'
                required
              />

              <CustomTextField
                name='phoneNumber'
                control={control}
                label='Phone Number'
                type='tel'
                placeholder='+1 (555) 123-4567'
                required
              />

              <CustomSelectField
                name='businessType'
                control={control}
                label='Business Type'
                placeholder='Select a business type'
                options={businessTypeOptions}
                required
              />

              <CustomSelectField
                name='sellerType'
                control={control}
                label='Seller Type'
                placeholder='Select a seller type'
                options={sellerTypeOptions}
                required
                helperText='Used for orders, warehouse routing, and commission calculation.'
              />

              <Controller
                name='advancePaymentRequired'
                control={control}
                render={({ field: { value, onChange, ...field } }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={!!value}
                        onChange={e => onChange(e.target.checked)}
                        {...field}
                      />
                    }
                    label='Advance payment required?'
                  />
                )}
              />

              {advancePaymentRequired && (
                <Box className='flex flex-col gap-4' sx={{ pl: 4, borderLeft: '2px solid', borderColor: 'divider' }}>
                  <CustomTextField
                    name='advancePaymentAmount'
                    control={control}
                    label='Amount / Reference'
                    placeholder='e.g. amount or reference'
                  />
                  <CustomTextField
                    name='advancePaymentNotes'
                    control={control}
                    label='Notes'
                    placeholder='Notes about advance payment'
                    multiline
                    rows={2}
                  />
                  <CustomFileUpload
                    name='advancePaymentDocument'
                    documentNumberName='advancePaymentDocumentNumber'
                    control={control}
                    label='Advance payment document'
                    documentLabel='Document Number'
                    required={advancePaymentRequired}
                  />
                </Box>
              )}
            </div>

            <Divider />

            {/* Required Documents Section */}
            <div className='flex flex-col gap-4'>
              <div>
                <Typography variant='h6' className='font-semibold mbe-1'>
                  Required Documents
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  Please upload copies of the following documents.
                </Typography>
              </div>

              <CustomFileUpload
                name='commercialRegisterFile'
                documentNumberName='commercialRegisterNumber'
                control={control}
                label='Commercial Register'
                documentLabel='Document Number'
                required
              />

              <CustomFileUpload
                name='taxCardFile'
                documentNumberName='taxCardNumber'
                control={control}
                label='Tax Card'
                documentLabel='Document Number'
                required
              />

              <CustomFileUpload
                name='vatCertificateFile'
                documentNumberName='vatCertificateNumber'
                control={control}
                label='VAT Certificate'
                documentLabel='Document Number'
                required
              />

              <CustomFileUpload
                name='advanceTaxFile'
                documentNumberName='advanceTaxNumber'
                control={control}
                label='Advance/Withholding Tax Certificate'
                documentLabel='Document Number'
                required
              />
            </div>

            {/* Submit Button */}
            <Button fullWidth variant='contained' type='submit' size='large' className='mbs-2 text-white'>
              <span className='text-white'>Register and Submit</span>
            </Button>

            {/* Sign In Link */}
            <div className='flex justify-center items-center flex-wrap gap-2'>
              <Typography color='text.secondary'>Already have an account?</Typography>
              <Typography
                component={Link}
                href={getLocalizedUrl('/login', locale as Locale)}
                color='primary.main'
                className='font-medium'
              >
                Sign In
              </Typography>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegisterV2
