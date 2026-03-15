'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import TextField from '@mui/material/TextField'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'

type ReturnStatus = 'Pending' | 'Approved' | 'Rejected' | 'Completed'

type ReturnItem = {
  id: string
  orderId: string
  productName: string
  productImage: string
  sku: string
  quantity: number
  unitPrice: number
  reason: string
  description: string
  status: ReturnStatus
  requestDate: string
  resolvedDate: string | null
  customerName: string
  customerEmail: string
  shippingAddress: string
}

const statusConfig: Record<ReturnStatus, { color: 'warning' | 'success' | 'error' | 'info'; icon: string }> = {
  Pending: { color: 'warning', icon: 'ri-time-line' },
  Approved: { color: 'info', icon: 'ri-checkbox-circle-line' },
  Rejected: { color: 'error', icon: 'ri-close-circle-line' },
  Completed: { color: 'success', icon: 'ri-check-double-line' }
}

const mockReturnDetails: Record<string, ReturnItem> = {
  'RET-001': {
    id: 'RET-001',
    orderId: 'ORD-5421',
    productName: 'Organic Cotton Raw Material',
    productImage: 'https://images.unsplash.com/photo-1536329583941-14287ec6fc4e?w=200',
    sku: 'OCRM-WHT-001',
    quantity: 50,
    unitPrice: 12.5,
    reason: 'Defective material',
    description:
      'The cotton material received has visible defects including discoloration and inconsistent fiber quality. Multiple batches are affected, making it unsuitable for our production requirements.',
    status: 'Pending',
    requestDate: '2026-03-10',
    resolvedDate: null,
    customerName: 'Ahmed Al-Rashid',
    customerEmail: 'ahmed@example.com',
    shippingAddress: 'Warehouse 5, Industrial Zone, Riyadh, Saudi Arabia'
  },
  'RET-002': {
    id: 'RET-002',
    orderId: 'ORD-5398',
    productName: 'Oak Wood Lumber',
    productImage: 'https://images.unsplash.com/photo-1563207153-f403bf289096?w=200',
    sku: 'OWL-NAT-002',
    quantity: 20,
    unitPrice: 45.0,
    reason: 'Wrong specification',
    description:
      'The lumber dimensions do not match the ordered specifications. We ordered 2x4 inch planks but received 2x6 inch instead.',
    status: 'Approved',
    requestDate: '2026-03-08',
    resolvedDate: null,
    customerName: 'Sara Mohammed',
    customerEmail: 'sara@example.com',
    shippingAddress: 'Block B, Commercial District, Jeddah, Saudi Arabia'
  },
  'RET-003': {
    id: 'RET-003',
    orderId: 'ORD-5375',
    productName: 'Stainless Steel Sheet',
    productImage: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=200',
    sku: 'SSS-304-004',
    quantity: 10,
    unitPrice: 32.99,
    reason: 'Damaged in transit',
    description: 'Steel sheets arrived with dents and scratches due to improper packaging during shipment.',
    status: 'Completed',
    requestDate: '2026-03-05',
    resolvedDate: '2026-03-09',
    customerName: 'Khalid Ibrahim',
    customerEmail: 'khalid@example.com',
    shippingAddress: 'Unit 12, Metal Works Area, Dammam, Saudi Arabia'
  },
  'RET-004': {
    id: 'RET-004',
    orderId: 'ORD-5350',
    productName: 'Raw Silk Fabric',
    productImage: 'https://images.unsplash.com/photo-1566206091558-7f218e696731?w=200',
    sku: 'RSF-WHT-005',
    quantity: 30,
    unitPrice: 55.75,
    reason: 'Quality not as described',
    description: 'The silk fabric quality is significantly lower than what was described in the product listing.',
    status: 'Rejected',
    requestDate: '2026-03-03',
    resolvedDate: '2026-03-06',
    customerName: 'Fatima Hassan',
    customerEmail: 'fatima@example.com',
    shippingAddress: 'Textile Market, Al Khobar, Saudi Arabia'
  },
  'RET-005': {
    id: 'RET-005',
    orderId: 'ORD-5412',
    productName: 'Copper Wire Coil',
    productImage: 'https://images.unsplash.com/photo-1624378515195-6bbdb73dff1a?w=200',
    sku: 'CWC-99-007',
    quantity: 15,
    unitPrice: 42.5,
    reason: 'Excess order',
    description: 'We ordered more than required due to a system error and need to return the excess quantity.',
    status: 'Pending',
    requestDate: '2026-03-11',
    resolvedDate: null,
    customerName: 'Omar Yusuf',
    customerEmail: 'omar@example.com',
    shippingAddress: 'Electronics Hub, Riyadh, Saudi Arabia'
  },
  'RET-006': {
    id: 'RET-006',
    orderId: 'ORD-5290',
    productName: 'Natural Rubber Sheets',
    productImage: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=200',
    sku: 'NRS-BLK-008',
    quantity: 40,
    unitPrice: 24.99,
    reason: 'Defective material',
    description: 'Rubber sheets have inconsistent thickness and show signs of premature degradation.',
    status: 'Completed',
    requestDate: '2026-02-28',
    resolvedDate: '2026-03-04',
    customerName: 'Layla Noor',
    customerEmail: 'layla@example.com',
    shippingAddress: 'Manufacturing Zone, Jubail, Saudi Arabia'
  }
}

const getTimelineSteps = (status: ReturnStatus) => {
  const steps = ['Request Submitted', 'Under Review', 'Decision Made', 'Return Completed']

  switch (status) {
    case 'Pending':
      return 1
    case 'Approved':
      return 2
    case 'Rejected':
      return 2
    case 'Completed':
      return 4
    default:
      return 0
  }
}

const ReturnDetails = ({ id }: { id: string }) => {
  const router = useRouter()
  const returnItem = mockReturnDetails[id]

  const [status, setStatus] = useState<ReturnStatus>(returnItem?.status ?? 'Pending')
  const [approveDialogOpen, setApproveDialogOpen] = useState(false)
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false)
  const [rejectReason, setRejectReason] = useState('')
  const [approveNote, setApproveNote] = useState('')
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')

  if (!returnItem) {
    return (
      <Card>
        <CardContent className='flex flex-col items-center justify-center gap-4' sx={{ minHeight: 400 }}>
          <i className='ri-file-unknow-line' style={{ fontSize: 64, color: 'var(--mui-palette-text-secondary)' }} />
          <Typography variant='h5'>Return not found</Typography>
          <Button variant='contained' onClick={() => router.back()}>
            Go Back
          </Button>
        </CardContent>
      </Card>
    )
  }

  const handleApprove = () => {
    setStatus('Approved')
    setApproveDialogOpen(false)
    setApproveNote('')
    setSnackbarMessage(`Return ${id} has been approved`)
    setSnackbarOpen(true)
  }

  const handleReject = () => {
    if (!rejectReason.trim()) return

    setStatus('Rejected')
    setRejectDialogOpen(false)
    setRejectReason('')
    setSnackbarMessage(`Return ${id} has been rejected`)
    setSnackbarOpen(true)
  }

  const totalValue = returnItem.quantity * returnItem.unitPrice
  const activeStep = getTimelineSteps(status)
  const isPending = status === 'Pending'

  return (
    <div className='flex flex-col gap-6'>
      {/* Header */}
      <div className='flex flex-wrap items-center justify-between gap-4'>
        <div className='flex items-center gap-4'>
          <Button variant='text' color='secondary' startIcon={<i className='ri-arrow-left-line' />} onClick={() => router.back()}>
            Back
          </Button>
          <div>
            <div className='flex items-center gap-3'>
              <Typography variant='h4'>{returnItem.id}</Typography>
              <Chip
                label={status}
                color={statusConfig[status].color}
                icon={<i className={statusConfig[status].icon} />}
                size='small'
              />
            </div>
            <Typography variant='body2' color='text.secondary'>
              Requested on {returnItem.requestDate}
            </Typography>
          </div>
        </div>

        {isPending && (
          <div className='flex gap-3'>
            <Button
              variant='contained'
              color='error'
              startIcon={<i className='ri-close-circle-line' />}
              onClick={() => setRejectDialogOpen(true)}
            >
              Reject
            </Button>
            <Button
              variant='contained'
              color='success'
              startIcon={<i className='ri-checkbox-circle-line' />}
              onClick={() => setApproveDialogOpen(true)}
              className='text-white'
            >
              Approve
            </Button>
          </div>
        )}
      </div>

      {/* Progress Timeline */}
      <Card>
        <CardContent>
          <Stepper activeStep={activeStep} alternativeLabel>
            {['Request Submitted', 'Under Review', 'Decision Made', 'Return Completed'].map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </CardContent>
      </Card>

      <Grid container spacing={6}>
        {/* Product Details */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardHeader title='Product Information' />
            <CardContent>
              <div className='flex gap-6 flex-wrap'>
                <Box
                  component='img'
                  src={returnItem.productImage}
                  alt={returnItem.productName}
                  sx={{ width: 120, height: 120, borderRadius: 2, objectFit: 'cover' }}
                />
                <div className='flex-1'>
                  <Typography variant='h6' className='mbe-2'>
                    {returnItem.productName}
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6} sm={3}>
                      <Typography variant='caption' color='text.secondary'>
                        SKU
                      </Typography>
                      <Typography variant='body2' className='font-medium'>
                        {returnItem.sku}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Typography variant='caption' color='text.secondary'>
                        Quantity
                      </Typography>
                      <Typography variant='body2' className='font-medium'>
                        {returnItem.quantity} units
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Typography variant='caption' color='text.secondary'>
                        Unit Price
                      </Typography>
                      <Typography variant='body2' className='font-medium'>
                        ${returnItem.unitPrice.toFixed(2)}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Typography variant='caption' color='text.secondary'>
                        Total Value
                      </Typography>
                      <Typography variant='body2' className='font-medium' color='primary.main'>
                        ${totalValue.toFixed(2)}
                      </Typography>
                    </Grid>
                  </Grid>
                </div>
              </div>

              <Divider className='mbs-4 mbe-4' />

              <Typography variant='subtitle2' className='mbe-2'>
                Return Reason
              </Typography>
              <Chip label={returnItem.reason} color='warning' variant='tonal' size='small' className='mbe-3' />
              <Typography variant='body2' color='text.secondary'>
                {returnItem.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Sidebar Info */}
        <Grid item xs={12} md={4}>
          <div className='flex flex-col gap-6'>
            {/* Order Info */}
            <Card>
              <CardHeader title='Order Information' />
              <CardContent className='flex flex-col gap-4'>
                <div>
                  <Typography variant='caption' color='text.secondary'>
                    Order ID
                  </Typography>
                  <Typography variant='body2' className='font-medium' color='primary.main'>
                    {returnItem.orderId}
                  </Typography>
                </div>
                <div>
                  <Typography variant='caption' color='text.secondary'>
                    Request Date
                  </Typography>
                  <Typography variant='body2' className='font-medium'>
                    {returnItem.requestDate}
                  </Typography>
                </div>
                {returnItem.resolvedDate && (
                  <div>
                    <Typography variant='caption' color='text.secondary'>
                      Resolved Date
                    </Typography>
                    <Typography variant='body2' className='font-medium'>
                      {returnItem.resolvedDate}
                    </Typography>
                  </div>
                )}
              </CardContent>
            </Card>

        
          </div>
        </Grid>
      </Grid>

      {/* Approve Dialog */}
      <Dialog open={approveDialogOpen} onClose={() => setApproveDialogOpen(false)} maxWidth='sm' fullWidth>
        <DialogTitle>
          <Box className='flex items-center gap-3'>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                bgcolor: 'success.lighter',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <i className='ri-checkbox-circle-line' style={{ fontSize: 24, color: 'var(--mui-palette-success-main)' }} />
            </Box>
            <Typography variant='h6'>Approve Return</Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography variant='body2' color='text.secondary' className='mbe-4'>
            Are you sure you want to approve return <strong>{returnItem.id}</strong> for{' '}
            <strong>{returnItem.quantity} units</strong> of <strong>{returnItem.productName}</strong>?
          </Typography>
          <Alert severity='info' className='mbe-4'>
            Refund amount: <strong>${totalValue.toFixed(2)}</strong>
          </Alert>
          <TextField
            fullWidth
            multiline
            rows={3}
            label='Notes (optional)'
            placeholder='Add any notes for this approval...'
            value={approveNote}
            onChange={e => setApproveNote(e.target.value)}
          />
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button variant='outlined' onClick={() => setApproveDialogOpen(false)}>
            Cancel
          </Button>
          <Button variant='contained' color='success' onClick={handleApprove} className='text-white'>
            Confirm Approval
          </Button>
        </DialogActions>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={rejectDialogOpen} onClose={() => setRejectDialogOpen(false)} maxWidth='sm' fullWidth>
        <DialogTitle>
          <Box className='flex items-center gap-3'>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                bgcolor: 'error.lighter',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <i className='ri-close-circle-line' style={{ fontSize: 24, color: 'var(--mui-palette-error-main)' }} />
            </Box>
            <Typography variant='h6'>Reject Return</Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography variant='body2' color='text.secondary' className='mbe-4'>
            Are you sure you want to reject return <strong>{returnItem.id}</strong>?
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={3}
            label='Rejection Reason'
            placeholder='Please provide a reason for rejecting this return...'
            value={rejectReason}
            onChange={e => setRejectReason(e.target.value)}
            required
            error={rejectDialogOpen && rejectReason.trim() === ''}
            helperText={rejectDialogOpen && rejectReason.trim() === '' ? 'Reason is required' : ''}
          />
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button variant='outlined' onClick={() => setRejectDialogOpen(false)}>
            Cancel
          </Button>
          <Button variant='contained' color='error' onClick={handleReject} disabled={!rejectReason.trim()}>
            Confirm Rejection
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity='success' variant='filled' sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default ReturnDetails
