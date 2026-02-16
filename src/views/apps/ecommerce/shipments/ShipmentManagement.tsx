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
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import TablePagination from '@mui/material/TablePagination'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Badge from '@mui/material/Badge'
import Alert from '@mui/material/Alert'

// Component Imports
import PageHeader from '@components/layout/shared/PageHeader'

// Type Imports
import type { ThemeColor } from '@core/types'
import type { getDictionary } from '@/utils/getDictionary'

type ShipmentStatus = 'pending_shipment' | 'out_for_delivery' | 'delivered' | 'cancelled' | 'returned_all' | 'returned_partial'

type Order = {
  id: string
  orderNumber: string
  customer: string
  items: number
  totalAmount: string
  orderDate: string
  approvedDate: string
  shipmentStatus: ShipmentStatus
  shippingAddress: string
  returnedItems?: number // For partial returns
}

// Check if user is a seller (in real app, this would come from auth context)
const isSeller = true // TODO: Replace with actual auth check

// Mock data for approved orders
const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-2024-001',
    customer: 'ABC Manufacturing Ltd.',
    items: 3,
    totalAmount: '$1,250.00',
    orderDate: '2024-12-10',
    approvedDate: '2024-12-11',
    shipmentStatus: 'out_for_delivery',
    shippingAddress: '123 Industrial Ave, New York, NY 10001'
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-002',
    customer: 'XYZ Industries Inc.',
    items: 5,
    totalAmount: '$2,800.00',
    orderDate: '2024-12-12',
    approvedDate: '2024-12-13',
    shipmentStatus: 'delivered',
    shippingAddress: '456 Factory Blvd, Los Angeles, CA 90001'
  },
  {
    id: '3',
    orderNumber: 'ORD-2024-003',
    customer: 'Global Traders Co.',
    items: 2,
    totalAmount: '$950.00',
    orderDate: '2024-12-14',
    approvedDate: '2024-12-15',
    shipmentStatus: 'pending_shipment',
    shippingAddress: '789 Commerce St, Chicago, IL 60601'
  },
  {
    id: '4',
    orderNumber: 'ORD-2024-004',
    customer: 'Tech Solutions LLC',
    items: 4,
    totalAmount: '$1,850.00',
    orderDate: '2024-12-08',
    approvedDate: '2024-12-09',
    shipmentStatus: 'out_for_delivery',
    shippingAddress: '321 Tech Park, San Francisco, CA 94102'
  },
  {
    id: '5',
    orderNumber: 'ORD-2024-005',
    customer: 'Premium Goods Inc.',
    items: 6,
    totalAmount: '$3,200.00',
    orderDate: '2024-12-05',
    approvedDate: '2024-12-06',
    shipmentStatus: 'delivered',
    shippingAddress: '654 Market Square, Boston, MA 02101'
  },
  {
    id: '6',
    orderNumber: 'ORD-2024-006',
    customer: 'Industrial Supply Co.',
    items: 3,
    totalAmount: '$1,450.00',
    orderDate: '2024-12-16',
    approvedDate: '2024-12-17',
    shipmentStatus: 'pending_shipment',
    shippingAddress: '987 Supply Lane, Houston, TX 77001'
  },
  {
    id: '7',
    orderNumber: 'ORD-2024-007',
    customer: 'Metro Distributors',
    items: 2,
    totalAmount: '$780.00',
    orderDate: '2024-12-11',
    approvedDate: '2024-12-12',
    shipmentStatus: 'cancelled',
    shippingAddress: '147 Distribution Way, Miami, FL 33101'
  },
  {
    id: '8',
    orderNumber: 'ORD-2024-008-RET',
    customer: 'Ahmed Hassan',
    items: 5,
    totalAmount: '$2,450.00',
    orderDate: '2024-12-15',
    approvedDate: '2024-12-16',
    shipmentStatus: 'returned_all',
    shippingAddress: '123 Tahrir St, Cairo, Egypt, 11511'
  },
  {
    id: '9',
    orderNumber: 'ORD-2024-009',
    customer: 'BuildTech Materials',
    items: 7,
    totalAmount: '$4,150.00',
    orderDate: '2024-12-15',
    approvedDate: '2024-12-16',
    shipmentStatus: 'out_for_delivery',
    shippingAddress: '258 Builder Rd, Seattle, WA 98101'
  },
  {
    id: '10',
    orderNumber: 'ORD-2024-010',
    customer: 'Quality Products LLC',
    items: 5,
    totalAmount: '$550.00',
    orderDate: '2024-12-13',
    approvedDate: '2024-12-14',
    shipmentStatus: 'returned_partial',
    returnedItems: 2,
    shippingAddress: '369 Quality Ave, Denver, CO 80201'
  },
  {
    id: '11',
    orderNumber: 'ORD-2024-011',
    customer: 'Enterprise Solutions',
    items: 4,
    totalAmount: '$2,100.00',
    orderDate: '2024-12-09',
    approvedDate: '2024-12-10',
    shipmentStatus: 'delivered',
    shippingAddress: '741 Enterprise Blvd, Phoenix, AZ 85001'
  }
]

const ShipmentManagement = ({ dictionary }: { dictionary: Awaited<ReturnType<typeof getDictionary>> }) => {
  const t = dictionary.shipments
  const router = useRouter()

  // States
  const [orders, setOrders] = useState<Order[]>(mockOrders)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<ShipmentStatus | 'all'>('all')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  // Filter and search logic
  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === 'all' || order.shipmentStatus === statusFilter

    return matchesSearch && matchesStatus
  })

  // Pagination
  const paginatedOrders = filteredOrders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  // Stats
  const outForDeliveryCount = orders.filter(o => o.shipmentStatus === 'out_for_delivery').length
  const pendingCount = orders.filter(o => o.shipmentStatus === 'pending_shipment').length

  // Handlers
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleViewDetails = (orderId: string) => {
    router.push(`/apps/ecommerce/shipments/${orderId}`)
  }

  // Helper functions
  const getStatusColor = (status: ShipmentStatus): ThemeColor => {
    switch (status) {
      case 'delivered':
        return 'success'
      case 'out_for_delivery':
        return 'primary'
      case 'pending_shipment':
        return 'warning'
      case 'cancelled':
        return 'error'
      case 'returned_all':
        return 'error'
      case 'returned_partial':
        return 'secondary'
      default:
        return 'info'
    }
  }

  const getStatusLabel = (status: ShipmentStatus, returnedItems?: number, totalItems?: number): string => {
    switch (status) {
      case 'delivered':
        return (t as any).delivered || 'Delivered'
      case 'out_for_delivery':
        return (t as any).outForDelivery || 'Out for Delivery'
      case 'pending_shipment':
        return (t as any).pendingShipment || 'Pending Shipment'
      case 'cancelled':
        return (t as any).cancelled || 'Cancelled'
      case 'returned_all':
        return (t as any).returnedAll || 'Returned (All Items)'
      case 'returned_partial':
        return returnedItems 
          ? `${(t as any).returnedPartial || 'Returned'} (${returnedItems}/${totalItems} items)` 
          : (t as any).returnedPartial || 'Returned (Partial)'
      default:
        return status
    }
  }

  // Handler to mark as out for delivery (seller only)
  const handleMarkOutForDelivery = (orderId: string) => {
    setOrders(prev => 
      prev.map(order => 
        order.id === orderId ? { ...order, shipmentStatus: 'out_for_delivery' as ShipmentStatus } : order
      )
    )
  }

  return (
    <div className='flex flex-col gap-6' style={{ backgroundColor: 'white', padding: '24px', minHeight: '100vh' }}>
      {/* Header Section */}
      <PageHeader
        title={t.title}
        description={t.description}
        badge={{
          count: outForDeliveryCount,
          label: `${outForDeliveryCount} ${(t as any).outForDelivery || 'Out for Delivery'}`,
          color: 'primary',
          icon: 'ri-truck-line'
        }}
      />

      {/* Info Alert */}
      {pendingCount > 0 && (
        <Alert severity='warning' icon={<i className='ri-time-line' />}>
          {((t as any).pendingShipmentAlert || 'You have {count} order(s) pending shipment').replace('{count}', pendingCount.toString())}
        </Alert>
      )}

      {/* Filters and Search */}
      <Card>
        <CardContent>
          <Box className='flex flex-col sm:flex-row gap-4 items-end'>
            {/* Search */}
            <TextField
              fullWidth
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <i className='ri-search-line' />
                  </InputAdornment>
                )
              }}
              sx={{ maxWidth: { sm: '400px' } }}
            />

            {/* Status Filter */}
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>{t.shipmentStatus}</InputLabel>
              <Select
                value={statusFilter}
                label={t.shipmentStatus}
                onChange={e => setStatusFilter(e.target.value as ShipmentStatus | 'all')}
              >
                <MenuItem value='all'>{(t as any).allStatus || 'All Status'}</MenuItem>
                <MenuItem value='pending_shipment'>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Chip size='small' color='warning' label='' sx={{ width: 8, height: 8, p: 0 }} />
                    {(t as any).pendingShipment || 'Pending Shipment'}
                  </Box>
                </MenuItem>
                <MenuItem value='out_for_delivery'>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Chip size='small' color='primary' label='' sx={{ width: 8, height: 8, p: 0 }} />
                    {(t as any).outForDelivery || 'Out for Delivery'}
                  </Box>
                </MenuItem>
                <MenuItem value='delivered'>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Chip size='small' color='success' label='' sx={{ width: 8, height: 8, p: 0 }} />
                    {(t as any).delivered || 'Delivered'}
                  </Box>
                </MenuItem>
                <MenuItem value='cancelled'>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Chip size='small' color='error' label='' sx={{ width: 8, height: 8, p: 0 }} />
                    {(t as any).cancelled || 'Cancelled'}
                  </Box>
                </MenuItem>
                <MenuItem value='returned_all'>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Chip size='small' color='error' label='' sx={{ width: 8, height: 8, p: 0 }} />
                    {(t as any).returnedAll || 'Returned (All Items)'}
                  </Box>
                </MenuItem>
                <MenuItem value='returned_partial'>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Chip size='small' color='secondary' label='' sx={{ width: 8, height: 8, p: 0 }} />
                    {(t as any).returnedPartial || 'Returned (Partial)'}
                  </Box>
                </MenuItem>
              </Select>
            </FormControl>

         
          </Box>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{t.orderNumber}</TableCell>
                  <TableCell>{t.productsCount}</TableCell>
                  <TableCell>{t.totalAmount}</TableCell>
                  <TableCell>{t.orderDate}</TableCell>
                  <TableCell>{t.shipmentStatus}</TableCell>
                  <TableCell align='right'>{dictionary.navigation.actions}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedOrders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align='center'>
                      <Box className='flex flex-col items-center justify-center' sx={{ py: 8 }}>
                      <Box sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }}>
                        <i className='ri-inbox-line' />
                      </Box>
                      <Typography variant='h6' color='text.secondary'>
                        {t.noOrdersFound}
                      </Typography>
                      <Typography variant='body2' color='text.secondary'>
                        {t.tryAdjusting}
                      </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedOrders.map(order => (
                    <TableRow key={order.id} hover>
                      <TableCell>
                        <Typography variant='body2' className='font-medium'>
                          {order.orderNumber}
                        </Typography>
                        <Typography variant='caption' color='text.secondary'>
                          {order.customer}
                        </Typography>
                      </TableCell>
                   
                      <TableCell>
                        <Chip label={`${order.items} ${t.items}`} size='small' variant='tonal' />
                      </TableCell>
                      <TableCell>
                        <Typography variant='body2' className='font-medium'>
                          {order.totalAmount}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant='body2'>{order.orderDate}</Typography>
                        <Typography variant='caption' color='text.secondary'>
                          {t.approved}: {order.approvedDate}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={getStatusLabel(order.shipmentStatus, order.returnedItems, order.items)}
                          color={getStatusColor(order.shipmentStatus)}
                          size='small'
                          className='text-white'
                        />
                      </TableCell>
                      <TableCell align='right'>
                        <Box className='flex gap-2 items-end justify-end'>
                          {/* Out for Delivery button - Seller Only */}
                          {isSeller && order.shipmentStatus === 'pending_shipment' && (
                            <Button
                              variant='contained'
                              size='small'
                              onClick={() => handleMarkOutForDelivery(order.id)}
                              startIcon={<i className='ri-truck-line' style={{ fontSize: '16px' }} />}
                              sx={{ 
                                minWidth: 150,
                                background: '#667eea',
                                color: 'white',
                                fontWeight: 600,
                                fontSize: '0.8rem',
                                textTransform: 'none',
                                borderRadius: '8px',
                                px: 2.5,
                                py: 2,
                               
                              }}
                            >
                              {(t as any).markOutForDelivery || 'Out for Delivery'}
                            </Button>
                          )}
                          <Button
                            variant='outlined'
                            size='small'
                            className='border-secondary border-1 text-secondary'
                            onClick={() => handleViewDetails(order.id)}
                            sx={{ minWidth: 100 }}
                          >
                            {t.details}
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          {filteredOrders.length > 0 && (
            <TablePagination
              component='div'
              count={filteredOrders.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 25, 50]}
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default ShipmentManagement

