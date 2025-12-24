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

// Component Imports
import PageHeader from '@components/layout/shared/PageHeader'

// Type Imports
type ProductRequest = {
  id: number
  productIds: string[]
  requestDate: string
  status: 'pending' | 'approved' | 'rejected'
  sellerName?: string
  sellerEmail?: string
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

  const handleApprove = (requestId: number) => {
    const request = requests.find(r => r.id === requestId)

    if (request) {
      // Add products to assigned products
      const assignedProducts = localStorage.getItem('assignedProducts')
      const assigned = assignedProducts ? JSON.parse(assignedProducts) : []
      const updatedAssigned = [...new Set([...assigned, ...request.productIds])]

      localStorage.setItem('assignedProducts', JSON.stringify(updatedAssigned))

      // Update request status
      const updatedRequests = requests.map(r => (r.id === requestId ? { ...r, status: 'approved' as const } : r))

      setRequests(updatedRequests)
      localStorage.setItem('pendingProductRequests', JSON.stringify(updatedRequests))

      setSnackbarMessage('Request approved successfully! Products added to seller inventory.')
      setSnackbarOpen(true)
    }
  }

  const handleReject = (requestId: number) => {
    const updatedRequests = requests.map(r => (r.id === requestId ? { ...r, status: 'rejected' as const } : r))

    setRequests(updatedRequests)
    localStorage.setItem('pendingProductRequests', JSON.stringify(updatedRequests))

    setSnackbarMessage('Request rejected.')
    setSnackbarOpen(true)
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
      default:
        return 'default'
    }
  }

  const pendingCount = requests.filter(r => r.status === 'pending').length

  // Pagination
  const paginatedRequests = requests.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

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

      {/* Requests Table */}
      <Card>
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Request ID</TableCell>
                  <TableCell>Request Date</TableCell>
                  <TableCell>Products Count</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align='right'>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {requests.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} align='center'>
                      <Box className='flex flex-col items-center justify-center' sx={{ py: 8 }}>
                        <Box sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }}>
                          <i className='ri-inbox-line' />
                        </Box>
                        <Typography variant='h6' color='text.secondary'>
                          No Requests Yet
                        </Typography>
                        <Typography variant='body2' color='text.secondary'>
                          Order requests from sellers will appear here
                        </Typography>
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
                          {new Date(request.requestDate).toLocaleTimeString()}
                        </Typography>
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
                      <TableCell align='center'>
                        <Box className='flex flex-row gap-2 items-end justify-end'>
                         
                            <Box className='flex gap-2 items-end justify-end'>
                                <Button
                            variant='outlined'
                            size='small'
                            className='border-secondary  border-1 text-secondary'
                            onClick={() => handleViewDetails(request)}
                            sx={{ minWidth: 100 }}
                          >
                            View Details
                          </Button>
                          {request.status === 'pending' && (
                            <> 
                              <Button
                                variant='contained'
                                size='small'
                                onClick={() => handleApprove(request.id)}
                                className='text-white'
                                sx={{ minWidth: 100 }}
                              >
                                Approve
                              </Button>
                              <Button
                                variant='contained'
                                size='small'
                                color='error'
                                onClick={() => handleReject(request.id)}
                                className='text-white'
                                sx={{ minWidth: 100 }}
                              >
                                Reject
                              </Button>
                               </>
                              )}
                            </Box>
                          
                          
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          {requests.length > 0 && (
            <TablePagination
              component='div'
              count={requests.length}
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

