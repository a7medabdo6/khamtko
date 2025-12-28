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
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import Grid from '@mui/material/Grid'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'

// Component Imports
import PageHeader from '@components/layout/shared/PageHeader'

// Type Imports
import type { ThemeColor } from '@core/types'
import type { getDictionary } from '@/utils/getDictionary'

type ShipmentStatus = 'pending' | 'in_transit' | 'delivered' | 'on_hold' | 'cancelled' | 'returned'

type ReturnRequest = {
  id: string
  requestDate: string
  reason: string
  status: 'pending' | 'accepted' | 'rejected'
  customerComments?: string
}

type ShipmentOrder = {
  id: string
  orderNumber: string
  customer: string
  customerEmail: string
  customerPhone: string
  shippingAddress: string
  items: number
  totalAmount: string
  orderDate: string
  approvedDate: string
  trackingNumber: string
  carrier: string
  estimatedDelivery: string
  shipmentStatus: ShipmentStatus
  products: ShipmentProduct[]
  timeline: TimelineEvent[]
  returnRequest?: ReturnRequest
}

type ShipmentProduct = {
  id: string
  name: string
  sku: string
  image: string
  quantity: number
  price: string
  total: string
}

type TimelineEvent = {
  status: string
  description: string
  date: string
  time: string
  location?: string
}

const ShipmentDetails = ({
  shipmentId,
  dictionary
}: {
  shipmentId: string
  dictionary: Awaited<ReturnType<typeof getDictionary>>
}) => {
  const t = dictionary.shipments
  const router = useRouter()
  const [shipment, setShipment] = useState<ShipmentOrder | null>(null)
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' })
  const [updateStatusDialog, setUpdateStatusDialog] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState<ShipmentStatus>('pending')

  useEffect(() => {
    // Load shipment data from localStorage or API
    const storedOrders = localStorage.getItem('shipmentOrders')
    
    if (storedOrders) {
      const orders: ShipmentOrder[] = JSON.parse(storedOrders)
      const order = orders.find(o => o.id === shipmentId)
      
      if (order) {
        setShipment(order)
        setSelectedStatus(order.shipmentStatus)
      } else {
        // Mock data for demo
        setShipment(getMockShipment(shipmentId))
      }
    } else {
      setShipment(getMockShipment(shipmentId))
    }
  }, [shipmentId])

  const getMockShipment = (id: string): ShipmentOrder => {
    return {
      id,
      orderNumber: `ORD-${id.padStart(4, '0')}`,
      customer: 'Ahmed Hassan',
      customerEmail: 'ahmed.hassan@example.com',
      customerPhone: '+20 123 456 7890',
      shippingAddress: '123 Tahrir St, Cairo, Egypt, 11511',
      items: 5,
      totalAmount: '$2,450.00',
      orderDate: '2024-12-15',
      approvedDate: '2024-12-16',
      trackingNumber: `TRK${id.padStart(10, '0')}`,
      carrier: 'DHL Express',
      estimatedDelivery: '2024-12-22',
      shipmentStatus: id === '3' ? 'delivered' : 'in_transit',
      returnRequest: id === '3' ? {
        id: 'RET-001',
        requestDate: '2024-12-23',
        reason: 'Product damaged during shipping',
        status: 'pending',
        customerComments: 'The packaging arrived with visible damage and some items inside were broken. I would like to return this order for a refund or replacement.'
      } : undefined,
      products: [
        {
          id: '1',
          name: 'Industrial Ball Bearings',
          sku: 'BB001',
          image: 'https://images.unsplash.com/photo-1536329583941-14287ec6fc4e?w=500',
          quantity: 100,
          price: '$120.00',
          total: '$12,000.00'
        },
        {
          id: '2',
          name: 'Custom Retail Packaging',
          sku: 'PKG005',
          image: 'https://images.unsplash.com/photo-1563207153-f403bf289096?w=500',
          quantity: 500,
          price: '$0.85',
          total: '$425.00'
        },
        {
          id: '3',
          name: 'Precision Aluminum Rods',
          sku: 'AR100',
          image: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=500',
          quantity: 50,
          price: '$5.10',
          total: '$255.00'
        }
      ],
      timeline: [
        {
          status: 'Order Placed',
          description: 'Order has been placed successfully',
          date: '2024-12-15',
          time: '10:30 AM',
          location: 'Cairo, Egypt'
        },
        {
          status: 'Order Approved',
          description: 'Order has been approved by admin',
          date: '2024-12-16',
          time: '02:15 PM',
          location: 'Cairo, Egypt'
        },
        {
          status: 'Shipped',
          description: 'Package has been picked up by carrier',
          date: '2024-12-17',
          time: '09:00 AM',
          location: 'Cairo Distribution Center'
        },
        {
          status: 'In Transit',
          description: 'Package is on the way',
          date: '2024-12-18',
          time: '11:45 AM',
          location: 'Alexandria Hub'
        }
      ]
    }
  }

  const getStatusColor = (status: ShipmentStatus): ThemeColor => {
    switch (status) {
      case 'delivered':
        return 'success'
      case 'in_transit':
        return 'primary'
      case 'pending':
        return 'warning'
      case 'on_hold':
        return 'secondary'
      case 'cancelled':
        return 'error'
      case 'returned':
        return 'error'
      default:
        return 'info'
    }
  }

  const getStatusLabel = (status: ShipmentStatus): string => {
    switch (status) {
      case 'delivered':
        return t.delivered
      case 'in_transit':
        return t.inTransit
      case 'pending':
        return t.pending
      case 'on_hold':
        return t.onHold
      case 'cancelled':
        return t.cancelled
      case 'returned':
        return t.returned
      default:
        return status
    }
  }

  const getReturnStatusColor = (status: 'pending' | 'accepted' | 'rejected'): ThemeColor => {
    switch (status) {
      case 'accepted':
        return 'success'
      case 'rejected':
        return 'error'
      case 'pending':
        return 'warning'
      default:
        return 'info'
    }
  }

  const handleUpdateStatus = () => {
    if (!shipment) return

    const updatedShipment = { ...shipment, shipmentStatus: selectedStatus }
    setShipment(updatedShipment)

    // Update localStorage
    const storedOrders = localStorage.getItem('shipmentOrders')
    if (storedOrders) {
      const orders: ShipmentOrder[] = JSON.parse(storedOrders)
      const updatedOrders = orders.map(o => (o.id === shipmentId ? updatedShipment : o))
      localStorage.setItem('shipmentOrders', JSON.stringify(updatedOrders))
    }

    setUpdateStatusDialog(false)
    setSnackbar({ open: true, message: t.statusUpdated, severity: 'success' })
  }



  const handleTrackShipment = () => {
    setSnackbar({ open: true, message: 'Opening tracking page...', severity: 'success' })
  }

  const handleAcceptReturn = () => {
    if (!shipment || !shipment.returnRequest) return

    const updatedShipment = {
      ...shipment,
      returnRequest: {
        ...shipment.returnRequest,
        status: 'accepted' as const
      },
      shipmentStatus: 'returned' as ShipmentStatus
    }

    setShipment(updatedShipment)

    // Update localStorage
    const storedOrders = localStorage.getItem('shipmentOrders')
    if (storedOrders) {
      const orders: ShipmentOrder[] = JSON.parse(storedOrders)
      const updatedOrders = orders.map(o => (o.id === shipmentId ? updatedShipment : o))
      localStorage.setItem('shipmentOrders', JSON.stringify(updatedOrders))
    }

    setSnackbar({
      open: true,
      message: t.returnAccepted,
      severity: 'success'
    })
  }

  const handleRejectReturn = () => {
    if (!shipment || !shipment.returnRequest) return

    const updatedShipment = {
      ...shipment,
      returnRequest: {
        ...shipment.returnRequest,
        status: 'rejected' as const
      }
    }

    setShipment(updatedShipment)

    // Update localStorage
    const storedOrders = localStorage.getItem('shipmentOrders')
    if (storedOrders) {
      const orders: ShipmentOrder[] = JSON.parse(storedOrders)
      const updatedOrders = orders.map(o => (o.id === shipmentId ? updatedShipment : o))
      localStorage.setItem('shipmentOrders', JSON.stringify(updatedOrders))
    }

    setSnackbar({
      open: true,
      message: t.returnRejected,
      severity: 'success'
    })
  }

  if (!shipment) {
    return (
      <Box className='flex items-center justify-center' style={{ minHeight: '50vh' }}>
        <Typography>Loading shipment details...</Typography>
      </Box>
    )
  }

  return (
    <div className='flex flex-col gap-6' style={{ backgroundColor: 'white', padding: '24px', minHeight: '100vh' }}>
      {/* Header Section */}
      <PageHeader
        title={`${t.orderDetails} ${shipment.orderNumber}`}
        description={
          <Box className='flex gap-2 items-center'>
            <Chip
              label={getStatusLabel(shipment.shipmentStatus)}
              color={getStatusColor(shipment.shipmentStatus)}
              size='small'
              className='text-white'
            />
            <Typography variant='body2' color='text.secondary'>
              {t.orderDate}: {new Date(shipment.orderDate).toLocaleDateString()}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              •
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {t.estDelivery}: {new Date(shipment.estimatedDelivery).toLocaleDateString()}
            </Typography>
          </Box>
        }
        showBackButton
        onBackClick={() => router.push('/apps/ecommerce/shipments')}
        actions={
          <Button
            variant='contained'
            size='small'
            startIcon={<i className='ri-refresh-line' />}
            onClick={() => setUpdateStatusDialog(true)}
            className='text-white'
          >
            {t.updateStatus}
          </Button>
        }
      />

      {/* Shipment Timeline */}
      <Card>
        <CardContent>
          <Typography variant='h6' className='mbe-4'>
            {t.shipmentTimeline}
          </Typography>
          <Stepper activeStep={shipment.timeline.length - 1} alternativeLabel>
            {shipment.timeline.map((event, index) => (
              <Step key={index} completed={true}>
                <StepLabel
                  StepIconProps={{
                    sx: {
                      color: index === shipment.timeline.length - 1 ? 'primary.main' : 'success.main',
                      '&.Mui-completed': {
                        color: 'success.main'
                      },
                      '&.Mui-active': {
                        color: 'primary.main'
                      }
                    }
                  }}
                >
                  <Box className='flex flex-col items-center'>
                    <Typography variant='body2' className='font-bold text-black'>
                      {event.status}
                    </Typography>
                    <Typography variant='caption' color='text.secondary' className='text-center'>
                      {event.description}
                    </Typography>
                    <Typography variant='caption' color='text.secondary' className='mbs-1'>
                      {event.date} at {event.time}
                    </Typography>
                    {event.location && (
                      <Typography variant='caption' color='text.secondary' className='flex items-center gap-2 mt-2'>
                        <i className='ri-map-pin-line' style={{ fontSize: 16 }} /> {event.location}
                      </Typography>
                    )}
                  </Box>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </CardContent>
      </Card>

      {/* Info Cards */}
      <Grid container spacing={4}>
        {/* Customer Information */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant='h6' className='mbe-4'>
                {t.customerInformation}
              </Typography>
              <Box className='flex flex-col gap-3'>
                <Box>
                  <Typography variant='caption' color='text.secondary'>
                    {t.name}
                  </Typography>
                  <Typography variant='body2' className='font-medium'>
                    {shipment.customer}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant='caption' color='text.secondary'>
                    {t.email}
                  </Typography>
                  <Typography variant='body2'>{shipment.customerEmail}</Typography>
                </Box>
                <Box>
                  <Typography variant='caption' color='text.secondary'>
                    {t.phone}
                  </Typography>
                  <Typography variant='body2'>{shipment.customerPhone}</Typography>
                </Box>
                <Box>
                  <Typography variant='caption' color='text.secondary'>
                    {t.shippingAddress}
                  </Typography>
                  <Typography variant='body2'>{shipment.shippingAddress}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Shipment Information */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant='h6' className='mbe-4'>
                {t.shipmentInformation}
              </Typography>
              <Box className='flex flex-col gap-3'>
                <Box>
                  <Typography variant='caption' color='text.secondary'>
                    {t.trackingNumber}
                  </Typography>
                  <Typography variant='body2' className='font-medium' fontFamily='monospace'>
                    {shipment.trackingNumber}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant='caption' color='text.secondary'>
                    {t.carrier}
                  </Typography>
                  <Typography variant='body2'>{shipment.carrier}</Typography>
                </Box>
                <Box>
                  <Typography variant='caption' color='text.secondary'>
                    {t.orderDate}
                  </Typography>
                  <Typography variant='body2'>
                    {new Date(shipment.orderDate).toLocaleDateString()} at{' '}
                    {new Date(shipment.orderDate).toLocaleTimeString()}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant='caption' color='text.secondary'>
                    {t.estDelivery}
                  </Typography>
                  <Typography variant='body2' className='font-medium'>
                    {new Date(shipment.estimatedDelivery).toLocaleDateString()}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Order Items */}
      <Card>
        <CardContent>
          <Typography variant='h6' className='mbe-4'>
            {t.orderItems}
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{t.product}</TableCell>
                  <TableCell>{t.sku}</TableCell>
                  <TableCell align='right'>{t.quantity}</TableCell>
                  <TableCell align='right'>{t.price}</TableCell>
                  <TableCell align='right'>{t.total}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {shipment.products.map(product => (
                  <TableRow key={product.id} hover>
                    <TableCell>
                      <Box className='flex items-center gap-3'>
                        <img
                          src={product.image}
                          alt={product.name}
                          style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 8 }}
                        />
                        <Typography variant='body2' className='font-medium'>
                          {product.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body2' fontFamily='monospace'>
                        {product.sku}
                      </Typography>
                    </TableCell>
                    <TableCell align='right'>
                      <Typography variant='body2'>{product.quantity}</Typography>
                    </TableCell>
                    <TableCell align='right'>
                      <Typography variant='body2'>{product.price}</Typography>
                    </TableCell>
                    <TableCell align='right'>
                      <Typography variant='body2' className='font-medium'>
                        {product.total}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={4} align='right'>
                    <Typography variant='h6'>{t.totalAmountLabel}</Typography>
                  </TableCell>
                  <TableCell align='right'>
                    <Typography variant='h6' color='primary'>
                      {shipment.totalAmount}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Return Request Section */}
      {shipment.returnRequest && (
        <Card>
          <CardContent>
            <Box className='flex items-center justify-between mbe-4'>
              <Typography variant='h6'>{t.returnRequest}</Typography>
              <Chip
                label={shipment.returnRequest.status.toUpperCase()}
                color={getReturnStatusColor(shipment.returnRequest.status)}
                size='small'
                className='text-white'
              />
            </Box>

            <Alert
              severity={shipment.returnRequest.status === 'pending' ? 'warning' : 'info'}
              icon={<i className='ri-error-warning-line' />}
              className='mbe-4'
            >
              {shipment.returnRequest.status === 'pending'
                ? t.returnPendingAlert
                : shipment.returnRequest.status === 'accepted'
                  ? t.returnAcceptedAlert
                  : t.returnRejectedAlert}
            </Alert>

            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Box>
                  <Typography variant='caption' color='text.secondary' className='block mbe-1'>
                    {t.requestDate}
                  </Typography>
                  <Typography variant='body2' className='font-medium'>
                    {new Date(shipment.returnRequest.requestDate).toLocaleDateString()} at{' '}
                    {new Date(shipment.returnRequest.requestDate).toLocaleTimeString()}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box>
                  <Typography variant='caption' color='text.secondary' className='block mbe-1'>
                    {t.returnReason}
                  </Typography>
                  <Typography variant='body2' className='font-medium'>
                    {shipment.returnRequest.reason}
                  </Typography>
                </Box>
              </Grid>
              {shipment.returnRequest.customerComments && (
                <Grid item xs={12}>
                  <Box>
                    <Typography variant='caption' color='text.secondary' className='block mbe-1'>
                      {t.customerComments}
                    </Typography>
                    <Typography variant='body2' sx={{ whiteSpace: 'pre-wrap' }}>
                      {shipment.returnRequest.customerComments}
                    </Typography>
                  </Box>
                </Grid>
              )}
            </Grid>

            {/* Action Buttons */}
            {shipment.returnRequest.status === 'pending' && (
              <Box className='flex gap-3 mbs-6'>
                <Button
                  variant='contained'
                  color='success'
                  onClick={handleAcceptReturn}
                  startIcon={<i className='ri-check-line' />}
                  className='text-white'
                >
                  {t.acceptReturn}
                </Button>
                <Button
                  variant='contained'
                  color='error'
                  onClick={handleRejectReturn}
                  startIcon={<i className='ri-close-line' />}
                  className='text-white'
                >
                  {t.rejectReturn}
                </Button>
              </Box>
            )}
          </CardContent>
        </Card>
      )}

      {/* Update Status Dialog */}
      <Dialog open={updateStatusDialog} onClose={() => setUpdateStatusDialog(false)} maxWidth='sm' fullWidth>
        <DialogTitle>{t.updateStatusDialog}</DialogTitle>
        <DialogContent>
          <Box className='mbs-4'>
            <FormControl fullWidth>
              <InputLabel>{t.status}</InputLabel>
              <Select
                value={selectedStatus}
                onChange={e => setSelectedStatus(e.target.value as ShipmentStatus)}
                label={t.status}
              >
                <MenuItem value='pending'>{t.pending}</MenuItem>
                <MenuItem value='in_transit'>{t.inTransit}</MenuItem>
                <MenuItem value='delivered'>{t.delivered}</MenuItem>
                <MenuItem value='on_hold'>{t.onHold}</MenuItem>
                <MenuItem value='cancelled'>{t.cancelled}</MenuItem>
                <MenuItem value='returned'>{t.returned}</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUpdateStatusDialog(false)}>{t.cancel}</Button>
          <Button variant='contained' onClick={handleUpdateStatus} className='text-white'>
            {t.update}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default ShipmentDetails

