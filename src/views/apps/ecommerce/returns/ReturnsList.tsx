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

type ReturnStatus = 'Pending' | 'Approved' | 'Rejected' | 'Completed'

type ReturnItem = {
  id: string
  orderId: string
  productName: string
  sku: string
  quantity: number
  reason: string
  status: ReturnStatus
  requestDate: string
  resolvedDate: string | null
}

const statusConfig: Record<ReturnStatus, { color: 'warning' | 'success' | 'error' | 'info' }> = {
  Pending: { color: 'warning' },
  Approved: { color: 'info' },
  Rejected: { color: 'error' },
  Completed: { color: 'success' }
}

const mockReturns: ReturnItem[] = [
  {
    id: 'RET-001',
    orderId: 'ORD-5421',
    productName: 'Organic Cotton Raw Material',
    sku: 'OCRM-WHT-001',
    quantity: 50,
    reason: 'Defective material',
    status: 'Pending',
    requestDate: '2026-03-10',
    resolvedDate: null
  },
  {
    id: 'RET-002',
    orderId: 'ORD-5398',
    productName: 'Oak Wood Lumber',
    sku: 'OWL-NAT-002',
    quantity: 20,
    reason: 'Wrong specification',
    status: 'Approved',
    requestDate: '2026-03-08',
    resolvedDate: null
  },
  {
    id: 'RET-003',
    orderId: 'ORD-5375',
    productName: 'Stainless Steel Sheet',
    sku: 'SSS-304-004',
    quantity: 10,
    reason: 'Damaged in transit',
    status: 'Completed',
    requestDate: '2026-03-05',
    resolvedDate: '2026-03-09'
  },
  {
    id: 'RET-004',
    orderId: 'ORD-5350',
    productName: 'Raw Silk Fabric',
    sku: 'RSF-WHT-005',
    quantity: 30,
    reason: 'Quality not as described',
    status: 'Rejected',
    requestDate: '2026-03-03',
    resolvedDate: '2026-03-06'
  },
  {
    id: 'RET-005',
    orderId: 'ORD-5412',
    productName: 'Copper Wire Coil',
    sku: 'CWC-99-007',
    quantity: 15,
    reason: 'Excess order',
    status: 'Pending',
    requestDate: '2026-03-11',
    resolvedDate: null
  },
  {
    id: 'RET-006',
    orderId: 'ORD-5290',
    productName: 'Natural Rubber Sheets',
    sku: 'NRS-BLK-008',
    quantity: 40,
    reason: 'Defective material',
    status: 'Completed',
    requestDate: '2026-02-28',
    resolvedDate: '2026-03-04'
  }
]

const ReturnsList = () => {
  const { lang: locale } = useParams()
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const filteredReturns = mockReturns.filter(item => {
    const matchesSearch =
      item.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = filterStatus === 'all' || item.status === filterStatus

    return matchesSearch && matchesStatus
  })

  const paginatedReturns = filteredReturns.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  const statusCounts = {
    all: mockReturns.length,
    Pending: mockReturns.filter(r => r.status === 'Pending').length,
    Approved: mockReturns.filter(r => r.status === 'Approved').length,
    Completed: mockReturns.filter(r => r.status === 'Completed').length,
    Rejected: mockReturns.filter(r => r.status === 'Rejected').length
  }

  return (
    <div className='flex flex-col gap-6'>
      {/* Stats Cards */}
      <Grid container spacing={6}>
        {[
          { label: 'Total Returns', count: statusCounts.all, color: 'primary', icon: 'ri-arrow-go-back-line' },
          { label: 'Pending', count: statusCounts.Pending, color: 'warning', icon: 'ri-time-line' },
          { label: 'Approved', count: statusCounts.Approved, color: 'info', icon: 'ri-checkbox-circle-line' },
          { label: 'Completed', count: statusCounts.Completed, color: 'success', icon: 'ri-check-double-line' }
        ].map(stat => (
          <Grid item xs={12} sm={6} md={3} key={stat.label}>
            <Card>
              <CardContent className='flex items-center gap-4'>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: `${stat.color}.lighter`
                  }}
                >
                  <i className={stat.icon} style={{ fontSize: 24, color: `var(--mui-palette-${stat.color}-main)` }} />
                </Box>
                <div>
                  <Typography variant='h5'>{stat.count}</Typography>
                  <Typography variant='body2' color='text.secondary'>
                    {stat.label}
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
              placeholder='Search returns...'
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
              <FormControl size='small' sx={{ minWidth: 150 }}>
                <InputLabel>Status</InputLabel>
                <Select value={filterStatus} label='Status' onChange={e => setFilterStatus(e.target.value)}>
                  <MenuItem value='all'>All ({statusCounts.all})</MenuItem>
                  <MenuItem value='Pending'>Pending ({statusCounts.Pending})</MenuItem>
                  <MenuItem value='Approved'>Approved ({statusCounts.Approved})</MenuItem>
                  <MenuItem value='Completed'>Completed ({statusCounts.Completed})</MenuItem>
                  <MenuItem value='Rejected'>Rejected ({statusCounts.Rejected})</MenuItem>
                </Select>
              </FormControl>
              <Button variant='outlined' startIcon={<i className='ri-download-2-line' />}>
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Returns Table */}
      <Card>
        <CardContent>
          <Typography variant='h5' className='mbe-1'>
            Return Requests
          </Typography>
          <Typography variant='body2' color='text.secondary' className='mbe-4'>
            Manage and track all product return requests
          </Typography>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Return ID</TableCell>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Product</TableCell>
                  <TableCell>SKU</TableCell>
                  <TableCell>Qty</TableCell>
                  <TableCell>Reason</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Request Date</TableCell>
                  <TableCell align='right'>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedReturns.map(item => (
                  <TableRow key={item.id} hover>
                    <TableCell>
                      <Typography variant='body2' className='font-medium'>
                        {item.id}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body2' color='primary.main' className='font-medium'>
                        {item.orderId}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body2'>{item.productName}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body2' color='text.secondary'>
                        {item.sku}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body2'>{item.quantity}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body2' color='text.secondary'>
                        {item.reason}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={item.status}
                        color={statusConfig[item.status].color}
                        size='small'
                        variant='tonal'
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant='body2' color='text.secondary'>
                        {item.requestDate}
                      </Typography>
                    </TableCell>
                    <TableCell align='right'>
                      <IconButton size='small' component={Link} href={`/${locale}/apps/ecommerce/returns/${item.id}`}>
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
            count={filteredReturns.length}
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

export default ReturnsList
