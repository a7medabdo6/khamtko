'use client'

// React Imports
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Chip from '@mui/material/Chip'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import Badge from '@mui/material/Badge'
import TablePagination from '@mui/material/TablePagination'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'

// Component Imports
import PageHeader from '@components/layout/shared/PageHeader'

// Type Imports
type ProductRequest = {
  id: number
  productIds: string[]
  requestDate: string
  status: 'pending' | 'approved' | 'rejected' | 'expired'
  sellerName?: string
  sellerEmail?: string
}

// Helper function to calculate deadline and time left
const calculateDeadline = (requestDate: string) => {
  const orderTime = new Date(requestDate)
  const orderHour = orderTime.getHours()
  
  // Create deadline date
  const deadline = new Date(orderTime)
  
  if (orderHour < 18) {
    // Orders before 6 PM: deadline is 9 PM same day
    deadline.setHours(21, 0, 0, 0)
  } else {
    // Orders after 6 PM: deadline is 9 PM next day
    deadline.setDate(deadline.getDate() + 1)
    deadline.setHours(21, 0, 0, 0)
  }
  
  return deadline
}

const getTimeLeft = (requestDate: string) => {
  const deadline = calculateDeadline(requestDate)
  const now = new Date()
  const diff = deadline.getTime() - now.getTime()
  
  if (diff <= 0) {
    return { text: 'Expired', isExpired: true, isUrgent: false }
  }
  
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  
  const isUrgent = hours < 2
  
  if (hours > 24) {
    const days = Math.floor(hours / 24)
    return { text: `${days}d ${hours % 24}h left`, isExpired: false, isUrgent: false }
  }
  
  return { text: `${hours}h ${minutes}m left`, isExpired: false, isUrgent }
}

// Dummy order requests
const dummyRequests: ProductRequest[] = [
  {
    id: 222222222,
    productIds: ['1', '2', '4', '5', '6'],
    requestDate: new Date('2025-12-12').toISOString(),
    status: 'pending',
    sellerName: 'Ahmed Store',
    sellerEmail: 'ahmed@store.com'
  },
  {
    id: 222222223,
    productIds: ['1', '2'],
    requestDate: new Date('2025-12-11').toISOString(),
    status: 'pending',
    sellerName: 'Tech Solutions',
    sellerEmail: 'info@techsolutions.com'
  },
  {
    id: 222222224,
    productIds: ['4', '5', '6'],
    requestDate: new Date('2025-12-10').toISOString(),
    status: 'approved',
    sellerName: 'Global Traders',
    sellerEmail: 'contact@globaltraders.com'
  },
  {
    id: 222222225,
    productIds: ['2', '4'],
    requestDate: new Date('2025-12-09').toISOString(),
    status: 'pending',
    sellerName: 'Best Electronics',
    sellerEmail: 'sales@bestelectronics.com'
  },
  {
    id: 222222226,
    productIds: ['1', '5'],
    requestDate: new Date('2025-12-08').toISOString(),
    status: 'rejected',
    sellerName: 'Quick Supply Co',
    sellerEmail: 'orders@quicksupply.com'
  },
  {
    id: 222222227,
    productIds: ['2', '4', '5'],
    requestDate: new Date('2025-12-07').toISOString(),
    status: 'approved',
    sellerName: 'Premium Parts',
    sellerEmail: 'info@premiumparts.com'
  },
  {
    id: 222222228,
    productIds: ['1', '2', '4'],
    requestDate: new Date('2025-12-06').toISOString(),
    status: 'pending',
    sellerName: 'Industrial Supply Hub',
    sellerEmail: 'hub@industrialsupply.com'
  },
  {
    id: 222222229,
    productIds: ['5', '6'],
    requestDate: new Date('2025-12-05').toISOString(),
    status: 'approved',
    sellerName: 'Mega Mart',
    sellerEmail: 'orders@megamart.com'
  },
  {
    id: 222222230,
    productIds: ['1', '4'],
    requestDate: new Date('2025-11-15').toISOString(),
    status: 'expired',
    sellerName: 'Old Supplies Ltd',
    sellerEmail: 'contact@oldsupplies.com'
  },
  {
    id: 222222231,
    productIds: ['2', '5', '6'],
    requestDate: new Date('2025-11-10').toISOString(),
    status: 'expired',
    sellerName: 'Vintage Goods Co',
    sellerEmail: 'info@vintagegoods.com'
  }
]

const OrderRequests = () => {
  const router = useRouter()

  // States
  const [requests, setRequests] = useState<ProductRequest[]>([])
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  
  // Filter States
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Load requests from localStorage or use dummy data
  useEffect(() => {
    const storedRequests = localStorage.getItem('pendingProductRequests')

    if (storedRequests) {
      const parsed = JSON.parse(storedRequests)

      setRequests(parsed)
    } else {
      // Use dummy data if no stored requests
      setRequests(dummyRequests)
      localStorage.setItem('pendingProductRequests', JSON.stringify(dummyRequests))
    }
  }, [])

  // Handlers
  const handleViewDetails = (request: ProductRequest) => {
    router.push(`/apps/ecommerce/orders/requests/${request.id}`)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'warning'
      case 'approved':
        return 'success'
      case 'rejected':
        return 'error'
      case 'expired':
        return 'secondary'
      default:
        return 'default'
    }
  }

  // Clear filters handler
  const handleClearFilters = () => {
    setFilterStatus('all')
    setSearchQuery('')
  }

  const hasActiveFilters = filterStatus !== 'all' || searchQuery !== ''

  // Filtered requests
  const filteredRequests = requests.filter(request => {
    // Status filter
    const matchesStatus = filterStatus === 'all' || request.status === filterStatus
    
    // Search filter (by ID or seller name)
    const matchesSearch = 
      searchQuery === '' ||
      request.id.toString().includes(searchQuery) ||
      (request.sellerName?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)
    
    return matchesStatus && matchesSearch
  })

  const pendingCount = requests.filter(r => r.status === 'pending').length

  // Pagination
  const paginatedRequests = filteredRequests.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  return (
    <div className='flex flex-col gap-6' style={{ backgroundColor: 'white', padding: '24px', minHeight: '100vh' }}>
      {/* Header Section */}
      <PageHeader
        title='Order Requests'
        description='Review and manage seller order requests'
        badge={{
          count: pendingCount,
          label: `${pendingCount} Pending`,
          color: 'warning',
          icon: 'ri-time-line'
        }}
      />

      {/* Info Alert */}
      {pendingCount > 0 && (
        <Alert severity='info' icon={<i className='ri-information-line' />}>
          You have {pendingCount} pending request(s) awaiting your review. Approve or reject them to update seller
          inventories.
        </Alert>
      )}

      {/* Filters Row */}
      <Card>
        <CardContent sx={{ py: 2 }}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
            {/* Search */}
            <TextField
              placeholder='Search by ID or Seller...'
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              size='small'
              sx={{ minWidth: 250 }}
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

            {/* Status Filter */}
            <FormControl size='small' sx={{ minWidth: 180 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={filterStatus}
                label='Status'
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <MenuItem value='all'>All Status</MenuItem>
                <MenuItem value='pending'>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Chip size='small' color='warning' label='' sx={{ width: 8, height: 8, p: 0 }} />
                    Pending
                  </Box>
                </MenuItem>
                <MenuItem value='approved'>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Chip size='small' color='success' label='' sx={{ width: 8, height: 8, p: 0 }} />
                    Approved
                  </Box>
                </MenuItem>
                <MenuItem value='rejected'>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Chip size='small' color='error' label='' sx={{ width: 8, height: 8, p: 0 }} />
                    Rejected
                  </Box>
                </MenuItem>
                <MenuItem value='expired'>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Chip size='small' color='secondary' label='' sx={{ width: 8, height: 8, p: 0 }} />
                    Expired
                  </Box>
                </MenuItem>
              </Select>
            </FormControl>

            {/* Results Count */}
            <Typography variant='body2' color='text.secondary'>
              {filteredRequests.length} results
            </Typography>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <Button
                variant='text'
                color='error'
                onClick={handleClearFilters}
                size='small'
                startIcon={<i className='ri-close-circle-line' />}
              >
                Clear Filters
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>

      {/* Requests Table */}
      <Card>
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Request ID</TableCell>
                  <TableCell>Request Date</TableCell>
                  <TableCell>Time Left</TableCell>
                  <TableCell>Products Count</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align='right'>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredRequests.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align='center'>
                      <Box className='flex flex-col items-center justify-center' sx={{ py: 8 }}>
                        <Box sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }}>
                          <i className='ri-inbox-line' />
                        </Box>
                        <Typography variant='h6' color='text.secondary'>
                          {hasActiveFilters ? 'No Matching Requests' : 'No Requests Yet'}
                        </Typography>
                        <Typography variant='body2' color='text.secondary'>
                          {hasActiveFilters ? 'Try adjusting your filters' : 'Order requests from sellers will appear here'}
                        </Typography>
                        {hasActiveFilters && (
                          <Button
                            variant='text'
                            color='primary'
                            onClick={handleClearFilters}
                            sx={{ mt: 2 }}
                            startIcon={<i className='ri-refresh-line' />}
                          >
                            Clear Filters
                          </Button>
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedRequests.map(request => (
                    <TableRow key={request.id} hover>
                      <TableCell>
                        <Typography variant='body2' className='font-medium'>
                          #{request.id}
                        </Typography>
                      </TableCell>
                    
                      <TableCell>
                        <Typography variant='body2'>{new Date(request.requestDate).toLocaleDateString()}</Typography>
                        <Typography variant='caption' color='text.secondary'>
                          {new Date(request.requestDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {(() => {
                          const timeLeft = getTimeLeft(request.requestDate)
                          return (
                            <Chip
                              icon={<i className={timeLeft.isExpired ? 'ri-time-line' : 'ri-timer-line'} style={{ fontSize: 14 }} />}
                              label={timeLeft.text}
                              color={timeLeft.isExpired ? 'error' : timeLeft.isUrgent ? 'warning' : 'info'}
                              size='small'
                              variant={timeLeft.isUrgent || timeLeft.isExpired ? 'filled' : 'outlined'}
                            />
                          )
                        })()}
                      </TableCell>
                      <TableCell>
                        <Chip label={`${request.productIds.length} Products`} size='small' variant='tonal' />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={request.status.toUpperCase()}
                          color={getStatusColor(request.status)}
                          size='small'
                          className='text-white'
                        />
                      </TableCell>
                      <TableCell align='right'>
                        <Button
                          variant='contained'
                          size='small'
                          onClick={() => handleViewDetails(request)}
                          startIcon={<i className='ri-eye-line' />}
                          className='text-white'
                        >
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          {filteredRequests.length > 0 && (
            <TablePagination
              component='div'
              count={filteredRequests.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 25, 50]}
            />
          )}
        </CardContent>
      </Card>

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

export default OrderRequests

