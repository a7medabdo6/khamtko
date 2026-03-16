'use client'

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
import Timeline from '@mui/lab/Timeline'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineDot from '@mui/lab/TimelineDot'

type TransactionStatus = 'Completed' | 'Pending' | 'Failed' | 'Refunded'
type TransactionType = 'Payment' | 'Refund' | 'Payout' | 'Fee'

type TransactionDetail = {
  id: string
  orderId: string
  type: TransactionType
  amount: number
  currency: string
  status: TransactionStatus
  paymentMethod: string
  customerName: string
  customerEmail: string
  date: string
  description: string
  reference: string
  fee: number
  netAmount: number
  timeline: { label: string; date: string; completed: boolean }[]
}

const statusConfig: Record<TransactionStatus, { color: 'success' | 'warning' | 'error' | 'info'; icon: string }> = {
  Completed: { color: 'success', icon: 'ri-checkbox-circle-line' },
  Pending: { color: 'warning', icon: 'ri-time-line' },
  Failed: { color: 'error', icon: 'ri-close-circle-line' },
  Refunded: { color: 'info', icon: 'ri-refund-2-line' }
}

const typeConfig: Record<TransactionType, { color: 'success' | 'error' | 'primary' | 'warning'; icon: string }> = {
  Payment: { color: 'success', icon: 'ri-arrow-down-line' },
  Refund: { color: 'error', icon: 'ri-arrow-up-line' },
  Payout: { color: 'primary', icon: 'ri-bank-line' },
  Fee: { color: 'warning', icon: 'ri-percent-line' }
}

const mockDetails: Record<string, TransactionDetail> = {
  'TXN-10001': {
    id: 'TXN-10001',
    orderId: 'ORD-5421',
    type: 'Payment',
    amount: 2450.0,
    currency: 'USD',
    status: 'Completed',
    paymentMethod: 'Credit Card (**** 4521)',
    customerName: 'Ahmed Al-Rashid',
    customerEmail: 'ahmed@example.com',
    date: '2026-03-12',
    description: 'Payment for order ORD-5421 — Organic Cotton Raw Material (50 units)',
    reference: 'PAY-REF-8A3F2D',
    fee: 73.5,
    netAmount: 2376.5,
    timeline: [
      { label: 'Transaction initiated', date: '2026-03-12 09:15', completed: true },
      { label: 'Payment authorized', date: '2026-03-12 09:16', completed: true },
      { label: 'Payment captured', date: '2026-03-12 09:18', completed: true },
      { label: 'Funds settled', date: '2026-03-12 14:00', completed: true }
    ]
  },
  'TXN-10002': {
    id: 'TXN-10002',
    orderId: 'ORD-5398',
    type: 'Payment',
    amount: 1890.0,
    currency: 'USD',
    status: 'Completed',
    paymentMethod: 'Bank Transfer (IBAN ***1234)',
    customerName: 'Sara Mohammed',
    customerEmail: 'sara@example.com',
    date: '2026-03-11',
    description: 'Payment for order ORD-5398 — Oak Wood Lumber (20 units)',
    reference: 'PAY-REF-7B2E1C',
    fee: 56.7,
    netAmount: 1833.3,
    timeline: [
      { label: 'Transaction initiated', date: '2026-03-11 10:30', completed: true },
      { label: 'Bank transfer received', date: '2026-03-11 15:45', completed: true },
      { label: 'Payment confirmed', date: '2026-03-11 16:00', completed: true },
      { label: 'Funds settled', date: '2026-03-12 09:00', completed: true }
    ]
  },
  'TXN-10003': {
    id: 'TXN-10003',
    orderId: 'ORD-5375',
    type: 'Refund',
    amount: 329.9,
    currency: 'USD',
    status: 'Completed',
    paymentMethod: 'Credit Card (**** 7890)',
    customerName: 'Khalid Ibrahim',
    customerEmail: 'khalid@example.com',
    date: '2026-03-10',
    description: 'Refund for returned items — Stainless Steel Sheet (10 units)',
    reference: 'REF-REF-5C9D4A',
    fee: 0,
    netAmount: 329.9,
    timeline: [
      { label: 'Refund requested', date: '2026-03-09 11:00', completed: true },
      { label: 'Refund approved', date: '2026-03-09 14:30', completed: true },
      { label: 'Refund processed', date: '2026-03-10 10:00', completed: true },
      { label: 'Funds returned', date: '2026-03-10 16:00', completed: true }
    ]
  },
  'TXN-10004': {
    id: 'TXN-10004',
    orderId: 'ORD-5412',
    type: 'Payment',
    amount: 637.5,
    currency: 'USD',
    status: 'Pending',
    paymentMethod: 'Bank Transfer (IBAN ***5678)',
    customerName: 'Omar Yusuf',
    customerEmail: 'omar@example.com',
    date: '2026-03-10',
    description: 'Payment for order ORD-5412 — Copper Wire Coil (15 units)',
    reference: 'PAY-REF-3F1A8B',
    fee: 19.13,
    netAmount: 618.37,
    timeline: [
      { label: 'Transaction initiated', date: '2026-03-10 08:45', completed: true },
      { label: 'Awaiting bank confirmation', date: '2026-03-10 08:46', completed: true },
      { label: 'Payment confirmation', date: '-', completed: false },
      { label: 'Funds settlement', date: '-', completed: false }
    ]
  },
  'TXN-10005': {
    id: 'TXN-10005',
    orderId: 'ORD-5350',
    type: 'Payment',
    amount: 1672.5,
    currency: 'USD',
    status: 'Failed',
    paymentMethod: 'Credit Card (**** 3456)',
    customerName: 'Fatima Hassan',
    customerEmail: 'fatima@example.com',
    date: '2026-03-09',
    description: 'Payment for order ORD-5350 — Raw Silk Fabric (30 units)',
    reference: 'PAY-REF-9E2C7D',
    fee: 0,
    netAmount: 0,
    timeline: [
      { label: 'Transaction initiated', date: '2026-03-09 13:20', completed: true },
      { label: 'Payment declined by bank', date: '2026-03-09 13:21', completed: true },
      { label: 'Transaction failed', date: '2026-03-09 13:21', completed: true }
    ]
  },
  'TXN-10006': {
    id: 'TXN-10006',
    orderId: '-',
    type: 'Payout',
    amount: 8500.0,
    currency: 'USD',
    status: 'Completed',
    paymentMethod: 'Bank Transfer (IBAN ***9012)',
    customerName: 'Platform Payout',
    customerEmail: 'payouts@platform.com',
    date: '2026-03-08',
    description: 'Weekly seller payout — Earnings from Mar 1-7, 2026',
    reference: 'PAY-OUT-6A4B2E',
    fee: 25.0,
    netAmount: 8475.0,
    timeline: [
      { label: 'Payout scheduled', date: '2026-03-07 18:00', completed: true },
      { label: 'Payout processed', date: '2026-03-08 09:00', completed: true },
      { label: 'Bank transfer initiated', date: '2026-03-08 09:30', completed: true },
      { label: 'Funds deposited', date: '2026-03-08 15:00', completed: true }
    ]
  },
  'TXN-10007': {
    id: 'TXN-10007',
    orderId: 'ORD-5290',
    type: 'Refund',
    amount: 999.6,
    currency: 'USD',
    status: 'Refunded',
    paymentMethod: 'Credit Card (**** 2345)',
    customerName: 'Layla Noor',
    customerEmail: 'layla@example.com',
    date: '2026-03-07',
    description: 'Refund for defective items — Natural Rubber Sheets (40 units)',
    reference: 'REF-REF-1D8F3G',
    fee: 0,
    netAmount: 999.6,
    timeline: [
      { label: 'Refund requested', date: '2026-03-05 10:00', completed: true },
      { label: 'Refund approved', date: '2026-03-06 11:00', completed: true },
      { label: 'Refund processed', date: '2026-03-07 09:00', completed: true },
      { label: 'Funds returned to customer', date: '2026-03-07 14:00', completed: true }
    ]
  },
  'TXN-10008': {
    id: 'TXN-10008',
    orderId: '-',
    type: 'Fee',
    amount: 125.0,
    currency: 'USD',
    status: 'Completed',
    paymentMethod: 'Auto-deducted',
    customerName: 'Platform Fee',
    customerEmail: 'billing@platform.com',
    date: '2026-03-07',
    description: 'Monthly platform service fee — March 2026',
    reference: 'FEE-REF-4H2J6K',
    fee: 0,
    netAmount: 125.0,
    timeline: [
      { label: 'Fee calculated', date: '2026-03-07 00:00', completed: true },
      { label: 'Fee deducted', date: '2026-03-07 00:01', completed: true }
    ]
  },
  'TXN-10009': {
    id: 'TXN-10009',
    orderId: 'ORD-5445',
    type: 'Payment',
    amount: 3200.0,
    currency: 'USD',
    status: 'Completed',
    paymentMethod: 'Bank Transfer (IBAN ***3456)',
    customerName: 'Mohammed Ali',
    customerEmail: 'mali@example.com',
    date: '2026-03-06',
    description: 'Payment for order ORD-5445 — Bulk raw materials',
    reference: 'PAY-REF-2K7L9M',
    fee: 96.0,
    netAmount: 3104.0,
    timeline: [
      { label: 'Transaction initiated', date: '2026-03-06 07:30', completed: true },
      { label: 'Bank transfer received', date: '2026-03-06 12:00', completed: true },
      { label: 'Payment confirmed', date: '2026-03-06 12:15', completed: true },
      { label: 'Funds settled', date: '2026-03-06 17:00', completed: true }
    ]
  },
  'TXN-10010': {
    id: 'TXN-10010',
    orderId: 'ORD-5430',
    type: 'Payment',
    amount: 780.0,
    currency: 'USD',
    status: 'Pending',
    paymentMethod: 'Credit Card (**** 6789)',
    customerName: 'Nadia Karim',
    customerEmail: 'nadia@example.com',
    date: '2026-03-05',
    description: 'Payment for order ORD-5430 — Ceramic Clay Powder (25 units)',
    reference: 'PAY-REF-8N3P5Q',
    fee: 23.4,
    netAmount: 756.6,
    timeline: [
      { label: 'Transaction initiated', date: '2026-03-05 16:00', completed: true },
      { label: 'Payment authorization pending', date: '2026-03-05 16:01', completed: true },
      { label: 'Payment capture', date: '-', completed: false },
      { label: 'Funds settlement', date: '-', completed: false }
    ]
  }
}

const TransactionDetails = ({ id }: { id: string }) => {
  const router = useRouter()
  const txn = mockDetails[id]

  if (!txn) {
    return (
      <Card>
        <CardContent className='flex flex-col items-center justify-center gap-4' sx={{ minHeight: 400 }}>
          <i className='ri-file-unknow-line' style={{ fontSize: 64, color: 'var(--mui-palette-text-secondary)' }} />
          <Typography variant='h5'>Transaction not found</Typography>
          <Button variant='contained' onClick={() => router.back()}>
            Go Back
          </Button>
        </CardContent>
      </Card>
    )
  }

  const isDebit = txn.type === 'Refund' || txn.type === 'Fee'

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
              <Typography variant='h4'>{txn.id}</Typography>
              <Chip
                label={txn.status}
                color={statusConfig[txn.status].color}
                icon={<i className={statusConfig[txn.status].icon} />}
                size='small'
              />
              <Chip
                label={txn.type}
                color={typeConfig[txn.type].color}
                icon={<i className={typeConfig[txn.type].icon} />}
                size='small'
                variant='tonal'
              />
            </div>
            <Typography variant='body2' color='text.secondary'>
              {txn.date} &middot; Ref: {txn.reference}
            </Typography>
          </div>
        </div>
        <Typography variant='h4' color={isDebit ? 'error.main' : 'success.main'}>
          {isDebit ? '-' : '+'}${txn.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </Typography>
      </div>

      <Grid container spacing={6}>
        {/* Main Content */}
        <Grid item xs={12} md={8}>
          {/* Amount Breakdown */}
          <Card className='mbe-6'>
            <CardHeader title='Amount Breakdown' />
            <CardContent>
              <div className='flex flex-col gap-3'>
                <div className='flex justify-between'>
                  <Typography variant='body2' color='text.secondary'>
                    Gross Amount
                  </Typography>
                  <Typography variant='body2' className='font-medium'>
                    ${txn.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </Typography>
                </div>
                <div className='flex justify-between'>
                  <Typography variant='body2' color='text.secondary'>
                    Platform Fee
                  </Typography>
                  <Typography variant='body2' className='font-medium' color='error.main'>
                    -${txn.fee.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </Typography>
                </div>
                <Divider />
                <div className='flex justify-between'>
                  <Typography variant='body1' className='font-medium'>
                    Net Amount
                  </Typography>
                  <Typography variant='body1' className='font-medium' color='primary.main'>
                    ${txn.netAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </Typography>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Transaction Details */}
          <Card>
            <CardHeader title='Transaction Details' />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={6} sm={4}>
                  <Typography variant='caption' color='text.secondary'>Transaction ID</Typography>
                  <Typography variant='body2' className='font-medium'>{txn.id}</Typography>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Typography variant='caption' color='text.secondary'>Order ID</Typography>
                  <Typography variant='body2' className='font-medium' color={txn.orderId === '-' ? 'text.secondary' : 'primary.main'}>
                    {txn.orderId}
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Typography variant='caption' color='text.secondary'>Reference</Typography>
                  <Typography variant='body2' className='font-medium'>{txn.reference}</Typography>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Typography variant='caption' color='text.secondary'>Payment Method</Typography>
                  <Typography variant='body2' className='font-medium'>{txn.paymentMethod}</Typography>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Typography variant='caption' color='text.secondary'>Currency</Typography>
                  <Typography variant='body2' className='font-medium'>{txn.currency}</Typography>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Typography variant='caption' color='text.secondary'>Date</Typography>
                  <Typography variant='body2' className='font-medium'>{txn.date}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='caption' color='text.secondary'>Description</Typography>
                  <Typography variant='body2'>{txn.description}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          <div className='flex flex-col gap-6'>
          

            {/* Activity Timeline */}
            <Card>
              <CardHeader title='Activity' />
              <CardContent>
                <Timeline sx={{ p: 0, m: 0, '& .MuiTimelineItem-root:before': { display: 'none' } }}>
                  {txn.timeline.map((event, index) => (
                    <TimelineItem key={index}>
                      <TimelineSeparator>
                        <TimelineDot color={event.completed ? 'success' : 'grey'} variant={event.completed ? 'filled' : 'outlined'} />
                        {index < txn.timeline.length - 1 && <TimelineConnector />}
                      </TimelineSeparator>
                      <TimelineContent>
                        <Typography variant='body2' className='font-medium'>{event.label}</Typography>
                        <Typography variant='caption' color='text.secondary'>{event.date}</Typography>
                      </TimelineContent>
                    </TimelineItem>
                  ))}
                </Timeline>
              </CardContent>
            </Card>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default TransactionDetails
