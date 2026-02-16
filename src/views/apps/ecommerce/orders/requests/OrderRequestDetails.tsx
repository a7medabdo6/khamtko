'use client'

// React Imports
import { useState, useEffect, useCallback } from 'react'
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
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import TablePagination from '@mui/material/TablePagination'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import DialogContentText from '@mui/material/DialogContentText'

// Component Imports
import PageHeader from '@components/layout/shared/PageHeader'

// Type Imports
import type { ThemeColor } from '@core/types'

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

type Product = {
  id: string
  name: string
  sku: string
  image: string
  price: string
  quantity: number
}

type ProductItemStatus = {
  productId: string
  status: 'pending' | 'approved' | 'rejected'
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Industrial Ball Bearings',
    sku: 'BB001',
    image: 'https://images.unsplash.com/photo-1536329583941-14287ec6fc4e?w=500',
    price: '$120.00 / unit',
    quantity: 100
  },
  {
    id: '2',
    name: 'Custom Retail Packaging',
    sku: 'PKG005',
    image: 'https://images.unsplash.com/photo-1563207153-f403bf289096?w=500',
    price: '$0.85 / unit',
    quantity: 20
  },
  {
    id: '4',
    name: 'Precision Aluminum Rods',
    sku: 'AR100',
    image: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=500',
    price: '$5.10 / meter',
    quantity: 20
  },
  {
    id: '5',
    name: 'Disposable Medical Gloves',
    sku: 'DG500',
    image: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=500',
    price: '$5.99 / box',
    quantity: 50
  },
  {
    id: '6',
    name: 'Engine Mounts',
    sku: 'EM010',
    image: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=500',
    price: '$45.00 / unit',
    quantity: 30
  }
]

const OrderRequestDetails = ({ requestId }: { requestId: string }) => {
  const router = useRouter()

  // States
  const [request, setRequest] = useState<ProductRequest | null>(null)
  const [itemStatuses, setItemStatuses] = useState<ProductItemStatus[]>([])
  const [initialStatuses, setInitialStatuses] = useState<ProductItemStatus[]>([])
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'warning' | 'error'>('success')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [counterOfferOpen, setCounterOfferOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [counterOfferPrice, setCounterOfferPrice] = useState('')
  const [counterOfferQty, setCounterOfferQty] = useState('')
  const [unsavedDialogOpen, setUnsavedDialogOpen] = useState(false)
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(null)
  const [timeLeft, setTimeLeft] = useState<{ text: string; isExpired: boolean; isUrgent: boolean } | null>(null)

  // Check if there are unsaved changes
  const hasUnsavedChanges = useCallback(() => {
    if (initialStatuses.length === 0) return false
    return JSON.stringify(itemStatuses) !== JSON.stringify(initialStatuses)
  }, [itemStatuses, initialStatuses])

  // Load request from localStorage
  useEffect(() => {
    const storedRequests = localStorage.getItem('pendingProductRequests')

    if (storedRequests) {
      const parsed = JSON.parse(storedRequests)
      const foundRequest = parsed.find((r: ProductRequest) => r.id === parseInt(requestId))

      if (foundRequest) {
        setRequest(foundRequest)

        // Initialize item statuses
        const statuses: ProductItemStatus[] = foundRequest.productIds.map((id: string) => ({
          productId: id,
          status: foundRequest.status === 'expired' ? 'rejected' : foundRequest.status
        }))

        setItemStatuses(statuses)
        setInitialStatuses(statuses)
        
        // Calculate time left
        setTimeLeft(getTimeLeft(foundRequest.requestDate))
      }
    }
  }, [requestId])

  // Update time left every minute
  useEffect(() => {
    if (!request) return
    
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(request.requestDate))
    }, 60000) // Update every minute
    
    return () => clearInterval(interval)
  }, [request])

  // Helper functions
  const getProductById = (id: string): Product | undefined => {
    return mockProducts.find(p => p.id === id)
  }

  const getStatusColor = (status: 'pending' | 'approved' | 'rejected' | 'expired'): ThemeColor => {
    switch (status) {
      case 'approved':
        return 'success'
      case 'rejected':
        return 'error'
      case 'expired':
        return 'secondary'
      case 'pending':
      default:
        return 'info'
    }
  }

  // Handlers
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleItemApprove = (productId: string) => {
    setItemStatuses(prev => prev.map(item => (item.productId === productId ? { ...item, status: 'approved' } : item)))
    setSnackbarMessage('Product approved')
    setSnackbarOpen(true)
  }

  const handleItemReject = (productId: string) => {
    setItemStatuses(prev => prev.map(item => (item.productId === productId ? { ...item, status: 'rejected' } : item)))
    setSnackbarMessage('Product rejected')
    setSnackbarOpen(true)
  }

  const handleItemCounterOffer = (productId: string) => {
    const product = getProductById(productId)

    if (product) {
      setSelectedProduct(product)
      setCounterOfferPrice(product.price)
      setCounterOfferQty(product.quantity.toString())
      setCounterOfferOpen(true)
    }
  }

  const handleCounterOfferClose = () => {
    setCounterOfferOpen(false)
    setSelectedProduct(null)
    setCounterOfferPrice('')
    setCounterOfferQty('')
  }

  const handleCounterOfferSubmit = () => {
    // Simulate API call
    // In real app: await api.submitCounterOffer({ requestId, productId, price, qty })

    // Close dialog
    setCounterOfferOpen(false)

    // Show success message
    setSnackbarMessage('Your counter offer has been submitted and will be reviewed by the admin.')
    setSnackbarOpen(true)

    // Reset form
    setSelectedProduct(null)
    setCounterOfferPrice('')
    setCounterOfferQty('')
  }

  const handleApproveAll = () => {
    setItemStatuses(prev => prev.map(item => ({ ...item, status: 'approved' })))
    setSnackbarMessage('All products approved')
    setSnackbarOpen(true)
  }

  const handleRejectAll = () => {
    setItemStatuses(prev => prev.map(item => ({ ...item, status: 'rejected' })))
    setSnackbarMessage('All products rejected')
    setSnackbarOpen(true)
  }

  const handleBack = () => {
    if (hasUnsavedChanges()) {
      setPendingNavigation('/apps/ecommerce/orders/requests')
      setUnsavedDialogOpen(true)
    } else {
      router.push('/apps/ecommerce/orders/requests')
    }
  }

  const handleSaveChanges = () => {
    if (!request) return

    // Update the request in localStorage
    const storedRequests = localStorage.getItem('pendingProductRequests')
    
    if (storedRequests) {
      const parsed = JSON.parse(storedRequests)
      
      // Determine overall status based on item statuses
      const allApproved = itemStatuses.every(item => item.status === 'approved')
      const allRejected = itemStatuses.every(item => item.status === 'rejected')
      const hasApproved = itemStatuses.some(item => item.status === 'approved')
      
      let newStatus: 'pending' | 'approved' | 'rejected' = 'pending'
      if (allApproved) newStatus = 'approved'
      else if (allRejected) newStatus = 'rejected'
      else if (hasApproved) newStatus = 'approved' // Partial approval

      const updatedRequests = parsed.map((r: ProductRequest) => 
        r.id === request.id ? { ...r, status: newStatus } : r
      )
      
      localStorage.setItem('pendingProductRequests', JSON.stringify(updatedRequests))
      
      // Update initial statuses to current (no more unsaved changes)
      setInitialStatuses([...itemStatuses])
      setRequest({ ...request, status: newStatus })
      
      setSnackbarMessage('Changes saved successfully!')
      setSnackbarSeverity('success')
      setSnackbarOpen(true)
    }
  }

  const handleDiscardChanges = () => {
    setItemStatuses([...initialStatuses])
    setUnsavedDialogOpen(false)
    
    if (pendingNavigation) {
      router.push(pendingNavigation)
    }
  }

  const handleCancelNavigation = () => {
    setUnsavedDialogOpen(false)
    setPendingNavigation(null)
  }

  const handleSaveAndNavigate = () => {
    handleSaveChanges()
    setUnsavedDialogOpen(false)
    
    if (pendingNavigation) {
      setTimeout(() => {
        router.push(pendingNavigation)
      }, 500)
    }
  }

  if (!request) {
    return (
      <Box className='flex items-center justify-center' sx={{ minHeight: '400px' }}>
        <Typography variant='h6' color='text.secondary'>
          Request not found
        </Typography>
      </Box>
    )
  }

  const paginatedProducts = request.productIds.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  return (
    <div className='flex flex-col gap-6' style={{ backgroundColor: 'white', padding: '24px', minHeight: '100vh' }}>
      {/* Header Section */}
      <PageHeader
        title={`Order Number: #${request.id}`}
        description={
          <Box className='flex gap-3 items-center flex-wrap'>
            <Chip
              label={request.status.toUpperCase()}
              color={getStatusColor(request.status)}
              size='small'
              className='text-white'
            />
            <Typography variant='body2' color='text.secondary'>
              Date: {new Date(request.requestDate).toLocaleDateString()} at {new Date(request.requestDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Typography>
            {timeLeft && (
              <Chip
                icon={<i className={timeLeft.isExpired ? 'ri-time-line' : 'ri-timer-line'} />}
                label={timeLeft.text}
                color={timeLeft.isExpired ? 'error' : timeLeft.isUrgent ? 'warning' : 'info'}
                size='small'
                variant={timeLeft.isUrgent ? 'filled' : 'outlined'}
              />
            )}
          </Box>
        }
        showBackButton
        onBackClick={handleBack}
      />

      {/* Save Changes Bar */}
      {hasUnsavedChanges() && (
        <Alert 
          severity='warning' 
          icon={<i className='ri-error-warning-line' />}
          action={
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button 
                color='inherit' 
                size='small' 
                onClick={() => setItemStatuses([...initialStatuses])}
              >
                Discard
              </Button>
              <Button 
                variant='contained' 
                size='small' 
                onClick={handleSaveChanges}
                className='text-white'
              >
                Save Changes
              </Button>
            </Box>
          }
        >
          You have unsaved changes. Don't forget to save before leaving.
        </Alert>
      )}

      {/* Order Details Card */}
      <Card>

        {/* Items Details Section */}
        <CardContent sx={{ p: 3 }}>
          <Box className='flex items-center justify-between' sx={{ mb: 3 }}>
            <Typography variant='h6'>Items Details</Typography>
            <Box className='flex gap-2'>
              <Button
                variant='contained'
                size='medium'
                onClick={handleApproveAll}
                disabled={request.status !== 'pending'}
                className='text-white'
              >
                Approve All
              </Button>
              <Button
                variant='contained'
                color='error'
                size='medium'
                onClick={handleRejectAll}
                disabled={request.status !== 'pending'}
                className='text-white'
              >
                Reject All
              </Button>
            </Box>
          </Box>

          {/* Items Table */}
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>SKU</TableCell>
                  <TableCell>Item Requested</TableCell>
                  <TableCell>Offered Price</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell align='right'>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedProducts.map(productId => {
                  const product = getProductById(productId)
                  const itemStatus = itemStatuses.find(item => item.productId === productId)

                  return product ? (
                    <TableRow key={productId}>
                      <TableCell>
                        <Typography variant='body2' className='font-medium'>
                          {product.sku}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant='body2'>{product.name}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant='body2'>{product.price}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant='body2'>{product.quantity}</Typography>
                      </TableCell>
                      <TableCell>
                        <Box className='flex gap-2 justify-end items-center'>
                          {itemStatus?.status === 'pending' ? (
                            <>
                             
                              <Button
                                variant='contained'
                                size='small'
                                onClick={() => handleItemApprove(productId)}
                                disabled={request.status !== 'pending'}
                                className='text-white'
                                sx={{ minWidth: 90 }}
                              >
                                Approve
                              </Button>
                              <Button
                                variant='outlined'
                                size='small'
                                onClick={() => handleItemCounterOffer(productId)}
                                disabled={request.status !== 'pending'}
                                sx={{ minWidth: 100 }}
                              >
                                Counter Offer
                              </Button>
                              <Button
                                variant='contained'
                                color='error'
                                size='small'
                                onClick={() => handleItemReject(productId)}
                                disabled={request.status !== 'pending'}
                                className='text-white'
                                sx={{ minWidth: 90 }}
                              >
                                Reject
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button
                                variant='outlined'
                                size='small'
                                className='border-secondary border-1 text-secondary'
                                sx={{ minWidth: 90 }}
                              >
                                View Details
                              </Button>
                              <Chip
                                label={itemStatus?.status.toUpperCase()}
                                color={getStatusColor(itemStatus?.status || 'pending')}
                                size='small'
                                className='text-white'
                              />
                            </>
                          )}
                        </Box>
                      </TableCell>
                    </TableRow>
                  ) : null
                })}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          {request.productIds.length > 0 && (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <TablePagination
                component='div'
                count={request.productIds.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
                labelDisplayedRows={({ from, to, count }) => `Page ${page + 1} of ${Math.ceil(count / rowsPerPage)}`}
              />
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Counter Offer Dialog */}
      <Dialog open={counterOfferOpen} onClose={handleCounterOfferClose} maxWidth='sm' fullWidth>
        <DialogTitle>
          <Typography variant='h5'>Submit Counter Offer</Typography>
          <Typography variant='body2' color='text.secondary'>
            {selectedProduct?.name} (SKU: {selectedProduct?.sku})
          </Typography>
        </DialogTitle>

        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Typography variant='body2' color='text.secondary' sx={{ mb: 3 }}>
              Adjust the price and quantity for this item. Your counter offer will be reviewed by the admin.
            </Typography>

            <Grid container spacing={4}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='Offered Price'
                  placeholder='e.g., $150.00 / unit'
                  value={counterOfferPrice}
                  onChange={e => setCounterOfferPrice(e.target.value)}
                  helperText='Enter your counter offer price with unit'
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type='number'
                  label='Quantity'
                  placeholder='e.g., 50'
                  value={counterOfferQty}
                  onChange={e => setCounterOfferQty(e.target.value)}
                  helperText='Enter the quantity you can supply'
                  inputProps={{ min: 1 }}
                />
              </Grid>
            </Grid>

            <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
              <Typography variant='caption' color='text.secondary' sx={{ display: 'block', mb: 1 }}>
                Current Values:
              </Typography>
              <Typography variant='body2'>
                Price: {selectedProduct?.price}
              </Typography>
              <Typography variant='body2'>Quantity: {selectedProduct?.quantity}</Typography>
            </Box>
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button onClick={handleCounterOfferClose} variant='outlined'>
            Cancel
          </Button>
          <Button
            onClick={handleCounterOfferSubmit}
            variant='contained'
            className='text-white'
            disabled={!counterOfferPrice || !counterOfferQty}
          >
            Submit Counter Offer
          </Button>
        </DialogActions>
      </Dialog>

      {/* Unsaved Changes Dialog */}
      <Dialog open={unsavedDialogOpen} onClose={handleCancelNavigation} maxWidth='sm'>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                bgcolor: 'warning.lighter',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <i className='ri-error-warning-line' style={{ fontSize: 24, color: '#FDB528' }} />
            </Box>
            <Typography variant='h6'>Unsaved Changes</Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            You have unsaved changes. What would you like to do?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button onClick={handleCancelNavigation} variant='outlined'>
            Cancel
          </Button>
          <Button onClick={handleDiscardChanges} color='error'>
            Discard Changes
          </Button>
          <Button onClick={handleSaveAndNavigate} variant='contained' className='text-white'>
            Save & Continue
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
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} variant='filled' sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default OrderRequestDetails

