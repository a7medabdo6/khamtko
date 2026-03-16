'use client'

import { useState } from 'react'

import Link from 'next/link'
import { useParams } from 'next/navigation'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Chip from '@mui/material/Chip'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import TablePagination from '@mui/material/TablePagination'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import LinearProgress from '@mui/material/LinearProgress'

type TransactionStatus = 'Completed' | 'Pending' | 'Failed' | 'Refunded'
type TransactionType = 'Payment' | 'Refund' | 'Payout' | 'Fee'

type Transaction = {
  id: string
  orderId: string
  type: TransactionType
  amount: number
  currency: string
  status: TransactionStatus
  paymentMethod: string
  customerName: string
  date: string
  description: string
}

const statusConfig: Record<TransactionStatus, { color: 'success' | 'warning' | 'error' | 'info' }> = {
  Completed: { color: 'success' },
  Pending: { color: 'warning' },
  Failed: { color: 'error' },
  Refunded: { color: 'info' }
}

const typeConfig: Record<TransactionType, { color: 'success' | 'error' | 'primary' | 'warning'; icon: string }> = {
  Payment: { color: 'success', icon: 'ri-arrow-down-line' },
  Refund: { color: 'error', icon: 'ri-arrow-up-line' },
  Payout: { color: 'primary', icon: 'ri-bank-line' },
  Fee: { color: 'warning', icon: 'ri-percent-line' }
}

const mockTransactions: Transaction[] = [
  {
    id: 'TXN-10001',
    orderId: 'ORD-5421',
    type: 'Payment',
    amount: 2450.0,
    currency: 'USD',
    status: 'Completed',
    paymentMethod: 'Credit Card',
    customerName: 'Ahmed Al-Rashid',
    date: '2026-03-12',
    description: 'Payment for order ORD-5421'
  },
  {
    id: 'TXN-10002',
    orderId: 'ORD-5398',
    type: 'Payment',
    amount: 1890.0,
    currency: 'USD',
    status: 'Completed',
    paymentMethod: 'Bank Transfer',
    customerName: 'Sara Mohammed',
    date: '2026-03-11',
    description: 'Payment for order ORD-5398'
  },
  {
    id: 'TXN-10003',
    orderId: 'ORD-5375',
    type: 'Refund',
    amount: 329.9,
    currency: 'USD',
    status: 'Completed',
    paymentMethod: 'Credit Card',
    customerName: 'Khalid Ibrahim',
    date: '2026-03-10',
    description: 'Refund for returned items - ORD-5375'
  },
  {
    id: 'TXN-10004',
    orderId: 'ORD-5412',
    type: 'Payment',
    amount: 637.5,
    currency: 'USD',
    status: 'Pending',
    paymentMethod: 'Bank Transfer',
    customerName: 'Omar Yusuf',
    date: '2026-03-10',
    description: 'Payment for order ORD-5412'
  },
  {
    id: 'TXN-10005',
    orderId: 'ORD-5350',
    type: 'Payment',
    amount: 1672.5,
    currency: 'USD',
    status: 'Failed',
    paymentMethod: 'Credit Card',
    customerName: 'Fatima Hassan',
    date: '2026-03-09',
    description: 'Payment for order ORD-5350'
  },
  {
    id: 'TXN-10006',
    orderId: '-',
    type: 'Payout',
    amount: 8500.0,
    currency: 'USD',
    status: 'Completed',
    paymentMethod: 'Bank Transfer',
    customerName: 'Platform Payout',
    date: '2026-03-08',
    description: 'Weekly seller payout'
  },
  {
    id: 'TXN-10007',
    orderId: 'ORD-5290',
    type: 'Refund',
    amount: 999.6,
    currency: 'USD',
    status: 'Refunded',
    paymentMethod: 'Credit Card',
    customerName: 'Layla Noor',
    date: '2026-03-07',
    description: 'Refund for defective items - ORD-5290'
  },
  {
    id: 'TXN-10008',
    orderId: '-',
    type: 'Fee',
    amount: 125.0,
    currency: 'USD',
    status: 'Completed',
    paymentMethod: 'Auto-deducted',
    customerName: 'Platform Fee',
    date: '2026-03-07',
    description: 'Monthly platform service fee'
  },
  {
    id: 'TXN-10009',
    orderId: 'ORD-5445',
    type: 'Payment',
    amount: 3200.0,
    currency: 'USD',
    status: 'Completed',
    paymentMethod: 'Bank Transfer',
    customerName: 'Mohammed Ali',
    date: '2026-03-06',
    description: 'Payment for order ORD-5445'
  },
  {
    id: 'TXN-10010',
    orderId: 'ORD-5430',
    type: 'Payment',
    amount: 780.0,
    currency: 'USD',
    status: 'Pending',
    paymentMethod: 'Credit Card',
    customerName: 'Nadia Karim',
    date: '2026-03-05',
    description: 'Payment for order ORD-5430'
  }
]

const TransactionsList = () => {
  const { lang: locale } = useParams()
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [filterType, setFilterType] = useState<string>('all')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const filteredTransactions = mockTransactions.filter(txn => {
    const matchesSearch =
      txn.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.customerName.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = filterStatus === 'all' || txn.status === filterStatus
    const matchesType = filterType === 'all' || txn.type === filterType

    return matchesSearch && matchesStatus && matchesType
  })

  const paginatedTransactions = filteredTransactions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  // Statistics
  const totalRevenue = mockTransactions
    .filter(t => t.type === 'Payment' && t.status === 'Completed')
    .reduce((sum, t) => sum + t.amount, 0)

  const totalRefunds = mockTransactions
    .filter(t => t.type === 'Refund')
    .reduce((sum, t) => sum + t.amount, 0)

  const totalPending = mockTransactions
    .filter(t => t.status === 'Pending')
    .reduce((sum, t) => sum + t.amount, 0)

  const totalPayouts = mockTransactions
    .filter(t => t.type === 'Payout' && t.status === 'Completed')
    .reduce((sum, t) => sum + t.amount, 0)

  const completedCount = mockTransactions.filter(t => t.status === 'Completed').length
  const successRate = Math.round((completedCount / mockTransactions.length) * 100)

  const stats = [
    {
      title: 'Total Revenue',
      value: `$${totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      icon: 'ri-money-dollar-circle-line',
      color: 'success',
      trend: '+12.5%',
      trendUp: true,
      subtitle: 'From completed payments'
    },
    {
      title: 'Pending Amount',
      value: `$${totalPending.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      icon: 'ri-time-line',
      color: 'warning',
      trend: `${mockTransactions.filter(t => t.status === 'Pending').length} transactions`,
      trendUp: false,
      subtitle: 'Awaiting confirmation'
    },
    {
      title: 'Total Refunds',
      value: `$${totalRefunds.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      icon: 'ri-refund-2-line',
      color: 'error',
      trend: `${mockTransactions.filter(t => t.type === 'Refund').length} refunds`,
      trendUp: false,
      subtitle: 'Processed refunds'
    },
    {
      title: 'Total Payouts',
      value: `$${totalPayouts.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      icon: 'ri-bank-line',
      color: 'primary',
      trend: 'This month',
      trendUp: true,
      subtitle: 'Settled to bank'
    }
  ]

  return (
    <div className='flex flex-col gap-6'>
      {/* Statistics Section */}
      <Grid container spacing={6}>
        {stats.map(stat => (
          <Grid item xs={12} sm={6} md={3} key={stat.title}>
            <Card className='bs-full'>
              <CardContent className='flex flex-col gap-2'>
                <div className='flex items-center justify-between'>
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: `${stat.color}.lighter`
                    }}
                  >
                    <i className={stat.icon} style={{ fontSize: 22, color: `var(--mui-palette-${stat.color}-main)` }} />
                  </Box>
                  <Typography variant='caption' color={stat.trendUp ? 'success.main' : 'text.secondary'}>
                    {stat.trend}
                  </Typography>
                </div>
                <div>
                  <Typography variant='h5'>{stat.value}</Typography>
                  <Typography variant='body2' color='text.secondary'>
                    {stat.title}
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

   

      {/* Filters */}
      <Card>
        <CardContent sx={{ py: 3 }}>
          <div className='flex flex-wrap gap-4 items-center justify-between'>
            <TextField
              placeholder='Search transactions...'
              size='small'
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              sx={{ minWidth: 280 }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position='start'>
                      <i className='ri-search-line' />
                    </InputAdornment>
                  )
                }
              }}
            />
            <div className='flex gap-4 items-center'>
              <FormControl size='small' sx={{ minWidth: 140 }}>
                <InputLabel>Status</InputLabel>
                <Select value={filterStatus} label='Status' onChange={e => setFilterStatus(e.target.value)}>
                  <MenuItem value='all'>All Status</MenuItem>
                  <MenuItem value='Completed'>Completed</MenuItem>
                  <MenuItem value='Pending'>Pending</MenuItem>
                  <MenuItem value='Failed'>Failed</MenuItem>
                  <MenuItem value='Refunded'>Refunded</MenuItem>
                </Select>
              </FormControl>
              <FormControl size='small' sx={{ minWidth: 140 }}>
                <InputLabel>Type</InputLabel>
                <Select value={filterType} label='Type' onChange={e => setFilterType(e.target.value)}>
                  <MenuItem value='all'>All Types</MenuItem>
                  <MenuItem value='Payment'>Payment</MenuItem>
                  <MenuItem value='Refund'>Refund</MenuItem>
                  <MenuItem value='Payout'>Payout</MenuItem>
                  <MenuItem value='Fee'>Fee</MenuItem>
                </Select>
              </FormControl>
              <Button variant='outlined' startIcon={<i className='ri-download-2-line' />}>
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card>
        <CardContent>
          <Typography variant='h5' className='mbe-1'>
            All Transactions
          </Typography>
          <Typography variant='body2' color='text.secondary' className='mbe-4'>
            Complete list of all financial transactions
          </Typography>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Transaction ID</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Order</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Payment Method</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell align='right'>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedTransactions.map(txn => (
                  <TableRow key={txn.id} hover>
                    <TableCell>
                      <Typography variant='body2' className='font-medium'>
                        {txn.id}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={txn.type}
                        color={typeConfig[txn.type].color}
                        size='small'
                        variant='tonal'
                        icon={<i className={typeConfig[txn.type].icon} />}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant='body2' color={txn.orderId === '-' ? 'text.secondary' : 'primary.main'} className='font-medium'>
                        {txn.orderId}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body2'>{txn.customerName}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body2' color='text.secondary'>
                        {txn.paymentMethod}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant='body2'
                        className='font-medium'
                        color={txn.type === 'Refund' || txn.type === 'Fee' ? 'error.main' : 'text.primary'}
                      >
                        {txn.type === 'Refund' || txn.type === 'Fee' ? '-' : '+'}${txn.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={txn.status}
                        color={statusConfig[txn.status].color}
                        size='small'
                        variant='tonal'
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant='body2' color='text.secondary'>
                        {txn.date}
                      </Typography>
                    </TableCell>
                    <TableCell align='right'>
                      <IconButton size='small' component={Link} href={`/${locale}/apps/ecommerce/transactions/${txn.id}`}>
                        <i className='ri-eye-line text-[22px] text-textSecondary' />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            component='div'
            count={filteredTransactions.length}
            page={page}
            onPageChange={(_, newPage) => setPage(newPage)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={e => {
              setRowsPerPage(parseInt(e.target.value, 10))
              setPage(0)
            }}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </CardContent>
      </Card>
    </div>
  )
}

export default TransactionsList
