'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Chip from '@mui/material/Chip'
import Switch from '@mui/material/Switch'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import InputAdornment from '@mui/material/InputAdornment'
import Checkbox from '@mui/material/Checkbox'
import TablePagination from '@mui/material/TablePagination'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Autocomplete from '@mui/material/Autocomplete'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import Select from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Slider from '@mui/material/Slider'

// Component Imports
import PageHeader from '@components/layout/shared/PageHeader'

// Type Imports
import type { getDictionary } from '@/utils/getDictionary'

type Product = {
  id: string
  name: string
  image: string
  sku: string
  quantity: number
  quantityStatus: string
  price: number
  negotiable: boolean
  status: 'Active' | 'Inactive'
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Organic Cotton Raw Material',
    image: 'https://images.unsplash.com/photo-1536329583941-14287ec6fc4e?w=500',
    sku: 'OCRM-WHT-001',
    quantity: 500,
    quantityStatus: 'In Stock',
    price: 12.5,
    negotiable: true,
    status: 'Active'
  },
  {
    id: '2',
    name: 'Oak Wood Lumber',
    image: 'https://images.unsplash.com/photo-1563207153-f403bf289096?w=500',
    sku: 'OWL-NAT-002',
    quantity: 150,
    quantityStatus: 'Low Stock',
    price: 45.0,
    negotiable: false,
    status: 'Active'
  },
  {
    id: '3',
    name: 'Genuine Leather Hide',
    image: 'https://images.unsplash.com/photo-1591348278863-a4fd8fc0f3c2?w=500',
    sku: 'GLH-BRN-003',
    quantity: 0,
    quantityStatus: 'Out of Stock',
    price: 85.0,
    negotiable: true,
    status: 'Inactive'
  },
  {
    id: '4',
    name: 'Stainless Steel Sheet',
    image: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=500',
    sku: 'SSS-304-004',
    quantity: 200,
    quantityStatus: 'In Stock',
    price: 32.99,
    negotiable: false,
    status: 'Active'
  },
  {
    id: '5',
    name: 'Raw Silk Fabric',
    image: 'https://images.unsplash.com/photo-1566206091558-7f218e696731?w=500',
    sku: 'RSF-WHT-005',
    quantity: 85,
    quantityStatus: 'In Stock',
    price: 55.75,
    negotiable: true,
    status: 'Active'
  },
  {
    id: '6',
    name: 'Bamboo Raw Material',
    image: 'https://images.unsplash.com/photo-1601656770048-cd0ff0a7d0b6?w=500',
    sku: 'BRM-NAT-006',
    quantity: 120,
    quantityStatus: 'Low Stock',
    price: 28.0,
    negotiable: false,
    status: 'Active'
  },
  {
    id: '7',
    name: 'Copper Wire Coil',
    image: 'https://images.unsplash.com/photo-1624378515195-6bbdb73dff1a?w=500',
    sku: 'CWC-99-007',
    quantity: 300,
    quantityStatus: 'In Stock',
    price: 42.50,
    negotiable: true,
    status: 'Active'
  },
  {
    id: '8',
    name: 'Natural Rubber Sheets',
    image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=500',
    sku: 'NRS-BLK-008',
    quantity: 180,
    quantityStatus: 'In Stock',
    price: 24.99,
    negotiable: false,
    status: 'Active'
  },
  {
    id: '9',
    name: 'Ceramic Clay Powder',
    image: 'https://images.unsplash.com/photo-1611511373796-20336ae2e0e4?w=500',
    sku: 'CCP-WHT-009',
    quantity: 250,
    quantityStatus: 'In Stock',
    price: 18.50,
    negotiable: true,
    status: 'Active'
  },
  {
    id: '10',
    name: 'Recycled Plastic Pellets',
    image: 'https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=500',
    sku: 'RPP-MIX-010',
    quantity: 400,
    quantityStatus: 'In Stock',
    price: 15.75,
    negotiable: false,
    status: 'Active'
  },
  {
    id: '11',
    name: 'Aluminum Ingots',
    image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=500',
    sku: 'ALI-6061-011',
    quantity: 100,
    quantityStatus: 'Low Stock',
    price: 38.00,
    negotiable: true,
    status: 'Active'
  },
  {
    id: '12',
    name: 'Hemp Fiber Raw',
    image: 'https://images.unsplash.com/photo-1607968565043-36af90dde238?w=500',
    sku: 'HFR-NAT-012',
    quantity: 220,
    quantityStatus: 'In Stock',
    price: 22.50,
    negotiable: false,
    status: 'Active'
  }
]

const ProductListManagement = ({ dictionary }: { dictionary: Awaited<ReturnType<typeof getDictionary>> }) => {
  const t = dictionary.products
  // Get assigned products from localStorage
  const getAssignedProducts = () => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('assignedProducts')
      const assignedIds: string[] = stored ? JSON.parse(stored) : []

      // Filter mockProducts to only show assigned ones
      return mockProducts.filter(product => assignedIds.includes(product.id))
    }

    return []
  }

  // States
  const [products, setProducts] = useState<Product[]>(getAssignedProducts())
  const [searchQuery, setSearchQuery] = useState('')
  const [selected, setSelected] = useState<string[]>([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [editingCell, setEditingCell] = useState<{ id: string; field: string } | null>(null)
  const [customProductDialogOpen, setCustomProductDialogOpen] = useState(false)
  const [customProductName, setCustomProductName] = useState('')
  const [customProductCategory, setCustomProductCategory] = useState('')
  const [customProductManufacture, setCustomProductManufacture] = useState('')
  const [customProductPrice, setCustomProductPrice] = useState('')
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [editValue, setEditValue] = useState<string>('')
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [productsCount, setProductsCount] = useState<number>(1)
  const [notes, setNotes] = useState('')
  const [deactivateDialogOpen, setDeactivateDialogOpen] = useState(false)
  const [productToDeactivate, setProductToDeactivate] = useState<string | null>(null)
  
  // Filter States
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [filterNegotiable, setFilterNegotiable] = useState<string>('all')
  const [filterPriceRange, setFilterPriceRange] = useState<number[]>([0, 500])
  const [filterQuantity, setFilterQuantity] = useState<string>('all')

  // Handlers
  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const allIds = filteredProducts.map(product => product.id)

      setSelected(allIds)
    } else {
      setSelected([])
    }
  }

  const handleSelectOne = (id: string) => {
    setSelected(prev => (prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]))
  }

  const handleToggleNegotiable = (id: string) => {
    setProducts(prev =>
      prev.map(product => (product.id === id ? { ...product, negotiable: !product.negotiable } : product))
    )
  }

  const handleDeactivateClick = (id: string) => {
    setProductToDeactivate(id)
    setDeactivateDialogOpen(true)
  }

  const handleDeactivateConfirm = () => {
    if (productToDeactivate) {
      setProducts(prev => prev.map(product => (product.id === productToDeactivate ? { ...product, status: 'Inactive' } : product)))
      setSnackbarMessage((t as any).productDeactivated || 'Product deactivated successfully')
      setSnackbarOpen(true)
    }
    setDeactivateDialogOpen(false)
    setProductToDeactivate(null)
  }

  const handleDeactivateCancel = () => {
    setDeactivateDialogOpen(false)
    setProductToDeactivate(null)
  }

  const handleBulkDelete = () => {
    setProducts(prev => prev.filter(product => !selected.includes(product.id)))
    setSelected([])
    setAnchorEl(null)
  }

  const handleBulkActivate = () => {
    setProducts(prev =>
      prev.map(product => (selected.includes(product.id) ? { ...product, status: 'Active' } : product))
    )
    setSelected([])
    setAnchorEl(null)
  }

  const handleBulkDeactivate = () => {
    setProducts(prev =>
      prev.map(product => (selected.includes(product.id) ? { ...product, status: 'Inactive' } : product))
    )
    setSelected([])
    setAnchorEl(null)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleCellEdit = (id: string, field: string, currentValue: string | number) => {
    setEditingCell({ id, field })
    setEditValue(String(currentValue))
  }

  const handleSaveEdit = () => {
    if (editingCell) {
      setProducts(prev =>
        prev.map(product => {
          if (product.id === editingCell.id) {
            if (editingCell.field === 'price') {
              return { ...product, [editingCell.field]: parseFloat(editValue) || 0 }
            }

            if (editingCell.field === 'quantity') {
              return { ...product, [editingCell.field]: parseInt(editValue) || 0 }
            }

            return { ...product, [editingCell.field]: editValue }
          }

          return product
        })
      )
    }

    setEditingCell(null)
    setEditValue('')
  }

  const handleCancelEdit = () => {
    setEditingCell(null)
    setEditValue('')
  }

  const handleClearFilters = () => {
    setSearchQuery('')
    setFilterStatus('all')
    setFilterNegotiable('all')
    setFilterPriceRange([0, 500])
    setFilterQuantity('all')
  }

  const hasActiveFilters = 
    searchQuery !== '' || 
    filterStatus !== 'all' || 
    filterNegotiable !== 'all' || 
    filterPriceRange[0] !== 0 || 
    filterPriceRange[1] !== 500 ||
    filterQuantity !== 'all'

  const handleCustomProductClose = () => {
    setCustomProductDialogOpen(false)
    setCustomProductName('')
    setCustomProductCategory('')
    setCustomProductManufacture('')
    setCustomProductPrice('')
  }

  const handleCustomProductSubmit = () => {
    // Validate inputs
    if (!customProductName || !customProductCategory || !customProductManufacture || !customProductPrice) {
      setSnackbarMessage(t.requestSubmitted)
      setSnackbarOpen(true)

      return
    }

    // Save custom product request to localStorage for admin approval
    const customProductRequests = localStorage.getItem('customProductRequests')
    const requests = customProductRequests ? JSON.parse(customProductRequests) : []

    const newRequest = {
      id: Date.now(),
      name: customProductName,
      category: customProductCategory,
      manufacture: customProductManufacture,
      price: customProductPrice,
      requestDate: new Date().toISOString(),
      status: 'pending'
    }

    requests.push(newRequest)
    localStorage.setItem('customProductRequests', JSON.stringify(requests))

    // Close dialog
    setCustomProductDialogOpen(false)

    // Show success message
    setSnackbarMessage(t.requestSubmitted)
    setSnackbarOpen(true)

    // Reset form
    setCustomProductName('')
    setCustomProductCategory('')
    setCustomProductManufacture('')
    setCustomProductPrice('')
  }

  const getQuantityStatusColor = (status: string) => {
    switch (status) {
      case 'In Stock':
        return 'primary'
      case 'Low Stock':
        return 'warning'
      case 'Out of Stock':
        return 'default'
      default:
        return 'default'
    }
  }

 

  const filteredProducts = products.filter(product => {
    // Search filter (name and SKU)
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase())
    
    // Status filter
    const matchesStatus = filterStatus === 'all' || product.status === filterStatus
    
    // Negotiable filter
    const matchesNegotiable = 
      filterNegotiable === 'all' || 
      (filterNegotiable === 'yes' && product.negotiable) ||
      (filterNegotiable === 'no' && !product.negotiable)
    
    // Price range filter
    const matchesPrice = product.price >= filterPriceRange[0] && product.price <= filterPriceRange[1]
    
    // Quantity filter
    let matchesQuantity = true
    if (filterQuantity === 'inStock') {
      matchesQuantity = product.quantity > 50
    } else if (filterQuantity === 'lowStock') {
      matchesQuantity = product.quantity > 0 && product.quantity <= 50
    } else if (filterQuantity === 'outOfStock') {
      matchesQuantity = product.quantity === 0
    }
    
    return matchesSearch && matchesStatus && matchesNegotiable && matchesPrice && matchesQuantity
  })

  const paginatedProducts = filteredProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  const isSelected = (id: string) => selected.includes(id)
  const isAllSelected = filteredProducts.length > 0 && selected.length === filteredProducts.length

  return (
    <div className='flex flex-col gap-6' style={{ backgroundColor: 'white', padding: '24px', minHeight: '100vh' }}>
      {/* Header Section */}
      <PageHeader
        title={t.myProducts}
        description={t.description}
        badge={{
          count: products.length,
          label: `${products.length} ${(dictionary.products as any).requestedProducts || 'Requested Products'}`,
          color: 'primary',
          icon: 'ri-shopping-bag-line'
        }}
      />

      {/* Empty State */}
      {products.length === 0 && (
        <Card>
          <CardContent>
            <Box
              className='flex flex-col items-center justify-center gap-4'
              sx={{ minHeight: 400, textAlign: 'center' }}
            >
              <Box sx={{ fontSize: 80, color: 'text.secondary' }}>
                <i className='ri-shopping-bag-3-line' />
              </Box>
              <Typography variant='h5'>{t.noProductsFound}</Typography>
              <Typography color='text.secondary' sx={{ maxWidth: 500 }}>
                {t.noProductsDescription}
              </Typography>
              <Button
                variant='contained'
                size='large'
                className='text-white'
                href='/apps/ecommerce/products/catalog'
                startIcon={<i className='ri-add-circle-line' />}
              >
                {t.browseCatalog}
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}

      {mockProducts.length >0 && (
        <>

      {/* Actions Bar */}
      <div className='flex flex-wrap gap-4 justify-between items-center'>
        <div className='flex gap-4 items-center'>
          {/* Results Count */}
          <Typography variant='body2' color='text.secondary'>
            {filteredProducts.length} {(t as any).results || 'results'}
          </Typography>

          {selected.length > 0 && (
            <>
              <Button
                variant='outlined'
                color='secondary'
                onClick={e => setAnchorEl(e.currentTarget)}
                startIcon={<i className='ri-more-line' />}
              >
                {dictionary.navigation.actions} ({selected.length})
              </Button>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
                <MenuItem onClick={handleBulkActivate}>
                  <i className='ri-check-line mie-2' />
                  {t.activate}
                </MenuItem>
                <MenuItem onClick={handleBulkDeactivate}>
                  <i className='ri-close-line mie-2' />
                  {t.deactivate}
                </MenuItem>
                <MenuItem onClick={handleBulkDelete} sx={{ color: 'error.main' }}>
                  <i className='ri-delete-bin-line mie-2' />
                  {t.delete}
                </MenuItem>
              </Menu>
            </>
          )}
        </div>

        <div className='flex gap-4'>
          <Button
            variant='outlined'
            startIcon={<i className='ri-upload-cloud-line' />}
            href='/apps/ecommerce/products/bulk-upload'
          >
            {t.dailyBulkUpload}
          </Button>
          <Button
            variant='outlined'
            startIcon={<i className='ri-add-line' />}
            href='/apps/ecommerce/products/catalog'
          >
            {t.browseCatalog}
          </Button>
          <Button
            variant='contained'
            startIcon={<i className='ri-file-add-line' />}
            className='text-white'
            onClick={() => setCustomProductDialogOpen(true)}
          >
            {t.requestNewProduct}
          </Button>
        </div>
      </div>

      {/* Search and Filters Row */}
      <Card>
        <CardContent sx={{ py: 2 }}>
          <Grid container spacing={2} alignItems='center'>
            {/* Search */}
            <Grid item xs={12} sm={6} md={3}>
              <Autocomplete
                freeSolo
                options={mockProducts.map(product => ({
                  label: product.name,
                  sku: product.sku,
                  id: product.id
                }))}
                getOptionLabel={option => (typeof option === 'string' ? option : option.label)}
                value={searchQuery}
                onInputChange={(event, newValue) => {
                  setSearchQuery(newValue)
                }}
                onChange={(event, newValue) => {
                  if (newValue && typeof newValue !== 'string') {
                    setSearchQuery(newValue.label)
                  }
                }}
                renderOption={(props, option) => (
                  <Box component='li' {...props}>
                    <div>
                      <Typography variant='body2'>{option.label}</Typography>
                      <Typography variant='caption' color='text.secondary'>
                        SKU: {option.sku}
                      </Typography>
                    </div>
                  </Box>
                )}
                renderInput={params => (
                  <TextField
                    {...params}
                    placeholder={t.searchProducts}
                    size='small'
                    slotProps={{
                      input: {
                        ...params.InputProps,
                        startAdornment: (
                          <>
                            <InputAdornment position='start'>
                              <i className='ri-search-line' />
                            </InputAdornment>
                            {params.InputProps.startAdornment}
                          </>
                        )
                      }
                    }}
                  />
                )}
              />
            </Grid>

            {/* Status Filter */}
            <Grid item xs={6} sm={3} md={2}>
              <FormControl fullWidth size='small'>
                <InputLabel>{t.status}</InputLabel>
                <Select
                  value={filterStatus}
                  label={t.status}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <MenuItem value='all'>{(t as any).all || 'All'}</MenuItem>
                  <MenuItem value='Active'>{t.active}</MenuItem>
                  <MenuItem value='Inactive'>{t.inactive}</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Negotiable Filter */}
            <Grid item xs={6} sm={3} md={2}>
              <FormControl fullWidth size='small'>
                <InputLabel>{t.negotiable}</InputLabel>
                <Select
                  value={filterNegotiable}
                  label={t.negotiable}
                  onChange={(e) => setFilterNegotiable(e.target.value)}
                >
                  <MenuItem value='all'>{(t as any).all || 'All'}</MenuItem>
                  <MenuItem value='yes'>{t.yes}</MenuItem>
                  <MenuItem value='no'>{t.no}</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Quantity Filter */}
            <Grid item xs={6} sm={3} md={2}>
              <FormControl fullWidth size='small'>
                <InputLabel>{t.quantity}</InputLabel>
                <Select
                  value={filterQuantity}
                  label={t.quantity}
                  onChange={(e) => setFilterQuantity(e.target.value)}
                >
                  <MenuItem value='all'>{(t as any).all || 'All'}</MenuItem>
                  <MenuItem value='inStock'>{t.inStock}</MenuItem>
                  <MenuItem value='lowStock'>{t.lowStock}</MenuItem>
                  <MenuItem value='outOfStock'>{t.outOfStock}</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Price Range Filter */}
            <Grid item xs={6} sm={3} md={2}>
              <Typography variant='caption' color='text.secondary'>
                {t.price}: ${filterPriceRange[0]} - ${filterPriceRange[1]}
              </Typography>
              <Slider
                value={filterPriceRange}
                onChange={(e, newValue) => setFilterPriceRange(newValue as number[])}
                valueLabelDisplay='auto'
                min={0}
                max={500}
                size='small'
              />
            </Grid>

            {/* Clear Filters */}
            <Grid item xs={12} sm={6} md={1}>
              {hasActiveFilters && (
                <Button
                  variant='text'
                  color='error'
                  onClick={handleClearFilters}
                  size='small'
                  startIcon={<i className='ri-close-circle-line' />}
                >
                  {(t as any).clearFilters || 'Clear'}
                </Button>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardContent>
          <div className='mbe-4'>
            <Typography variant='h5' className='mbe-1'>
              {t.allProducts}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {t.allProductsOverview}
            </Typography>
          </div>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding='checkbox'>
                    <Checkbox checked={isAllSelected} onChange={handleSelectAll} />
                  </TableCell>
                  <TableCell>{t.productName}</TableCell>
                  <TableCell>{t.sku}</TableCell>
                  <TableCell>{t.quantity}</TableCell>
                  {/* <TableCell>{t.stockStatus}</TableCell> */}
                  <TableCell>{t.price}</TableCell>
                  <TableCell>{t.negotiable}</TableCell>
                  <TableCell>{t.status}</TableCell>
                  <TableCell align='right'>{t.actions}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockProducts.map(product => {
                  const isItemSelected = isSelected(product.id)

                  return (
                    <TableRow key={product.id} hover selected={isItemSelected}>
                      <TableCell padding='checkbox'>
                        <Checkbox checked={isItemSelected} onChange={() => handleSelectOne(product.id)} />
                      </TableCell>

                      {/* Product Name - Editable on Double Click */}
                      <TableCell>
                        {editingCell?.id === product.id && editingCell?.field === 'name' ? (
                          <Box className='flex items-center gap-2'>
                            <TextField
                              size='small'
                              value={editValue}
                              onChange={e => setEditValue(e.target.value)}
                              autoFocus
                              onKeyDown={e => {
                                if (e.key === 'Enter') handleSaveEdit()
                                if (e.key === 'Escape') handleCancelEdit()
                              }}
                            />
                            <IconButton size='small' color='primary' onClick={handleSaveEdit}>
                              <i className='ri-check-line' />
                            </IconButton>
                            <IconButton size='small' onClick={handleCancelEdit}>
                              <i className='ri-close-line' />
                            </IconButton>
                          </Box>
                        ) : (
                          <Box
                            className='flex items-center gap-3'
                            onDoubleClick={() => handleCellEdit(product.id, 'name', product.name)}
                            sx={{ cursor: 'text' }}
                          >
                            <Avatar
                              src={product.image}
                              alt={product.name}
                              variant='rounded'
                              sx={{ width: 40, height: 40 }}
                            />
                            <Typography variant='body2' className='font-medium'>
                              {product.name}
                            </Typography>
                          </Box>
                        )}
                      </TableCell>

                      {/* SKU - Editable on Double Click */}
                      <TableCell>
                        {editingCell?.id === product.id && editingCell?.field === 'sku' ? (
                          <Box className='flex items-center gap-2'>
                            <TextField
                              size='small'
                              value={editValue}
                              onChange={e => setEditValue(e.target.value)}
                              autoFocus
                              onKeyDown={e => {
                                if (e.key === 'Enter') handleSaveEdit()
                                if (e.key === 'Escape') handleCancelEdit()
                              }}
                            />
                            <IconButton size='small' color='primary' onClick={handleSaveEdit}>
                              <i className='ri-check-line' />
                            </IconButton>
                            <IconButton size='small' onClick={handleCancelEdit}>
                              <i className='ri-close-line' />
                            </IconButton>
                          </Box>
                        ) : (
                          <Typography
                            variant='body2'
                            color='text.secondary'
                            onDoubleClick={() => handleCellEdit(product.id, 'sku', product.sku)}
                            sx={{ cursor: 'text' }}
                          >
                            {product.sku}
                          </Typography>
                        )}
                      </TableCell>

                      {/* Quantity Number - Editable on Double Click */}
                      <TableCell>
                        {editingCell?.id === product.id && editingCell?.field === 'quantity' ? (
                          <Box className='flex items-center gap-2'>
                            <TextField
                              size='small'
                              type='number'
                              value={editValue}
                              onChange={e => setEditValue(e.target.value)}
                              autoFocus
                              onKeyDown={e => {
                                if (e.key === 'Enter') handleSaveEdit()
                                if (e.key === 'Escape') handleCancelEdit()
                              }}
                              sx={{ width: 80 }}
                            />
                            <IconButton size='small' color='primary' onClick={handleSaveEdit}>
                              <i className='ri-check-line' />
                            </IconButton>
                            <IconButton size='small' onClick={handleCancelEdit}>
                              <i className='ri-close-line' />
                            </IconButton>
                          </Box>
                        ) : (
                          <Typography
                          style={{backgroundColor: product?.quantity > 35 ? '#009BFF' : 'orange',color: 'white',padding: '4px 12px',borderRadius: '4px',textAlign: 'center'}}
                            variant='body2'
                            onDoubleClick={() => handleCellEdit(product.id, 'quantity', product.quantity)}
                            sx={{ cursor: 'text' }}
                          >
                            {product.quantity}
                          </Typography>
                        )}
                      </TableCell>


                      {/* Price - Editable on Double Click */}
                      <TableCell>
                        {editingCell?.id === product.id && editingCell?.field === 'price' ? (
                          <Box className='flex items-center gap-2'>
                            <TextField
                              size='small'
                              type='number'
                              value={editValue}
                              onChange={e => setEditValue(e.target.value)}
                              autoFocus
                              onKeyDown={e => {
                                if (e.key === 'Enter') handleSaveEdit()
                                if (e.key === 'Escape') handleCancelEdit()
                              }}
                              slotProps={{
                                input: {
                                  startAdornment: <InputAdornment position='start'>$</InputAdornment>
                                }
                              }}
                              sx={{ width: 100 }}
                            />
                            <IconButton size='small' color='primary' onClick={handleSaveEdit}>
                              <i className='ri-check-line' />
                            </IconButton>
                            <IconButton size='small' onClick={handleCancelEdit}>
                              <i className='ri-close-line' />
                            </IconButton>
                          </Box>
                        ) : (
                          <Typography
                            variant='body2'
                            onDoubleClick={() => handleCellEdit(product.id, 'price', product.price)}
                            sx={{ cursor: 'text' }}
                          >
                            ${product.price.toFixed(2)}
                          </Typography>
                        )}
                      </TableCell>

                      {/* Negotiable Toggle */}
                      <TableCell>
                        <Switch checked={product.negotiable} onChange={() => handleToggleNegotiable(product.id)} />
                      </TableCell>

                      {/* Status */}
                      <TableCell>
                        <Chip
                          label={product.status === 'Active' ? t.active : t.inactive}
                          color={product.status === 'Active' ? 'primary' : 'error'}
                          size='small'
                          variant='tonal'
                        />
                      </TableCell>

                      {/* Actions */}
                      <TableCell align='right'>
                        <Button
                          variant='contained'
                          color='error'
                          size='small'
                          startIcon={<i className='ri-delete-bin-line' />}
                          onClick={() => handleDeactivateClick(product.id)}
                          disabled={product.status === 'Inactive'}
                        >
                          {t.deactivate}
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <TablePagination
            component='div'
            count={filteredProducts.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25, 50]}
          />

          {paginatedProducts.length === 0 && (
            <Box className='flex justify-center items-center' sx={{ minHeight: 200 }}>
              <Typography color='text.secondary'>{t.noProductsFound}</Typography>
            </Box>
          )}
        </CardContent>
      </Card>
      </>
      )}

      {/* Custom Product Dialog */}
      <Dialog open={customProductDialogOpen} onClose={handleCustomProductClose} maxWidth='sm' fullWidth>
        <DialogTitle>
          <Typography variant='h5'>{t.requestNewProductTitle}</Typography>
          <Typography variant='body2' color='text.secondary'>
            {t.requestNewProductDescription}
          </Typography>
        </DialogTitle>

        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Alert severity='info' icon={<i className='ri-information-line' />} className='mbe-4'>
              {t.requestNewProductDescription}
            </Alert>

            <Grid container spacing={4}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type='number'
                  label={t.productsCount}
                  placeholder={t.enterProductsCount}
                  value={productsCount}
                  onChange={e => setProductsCount(parseInt(e.target.value))}
                  required
                />
              </Grid>

          

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label={t.additionalNotes}
                  placeholder={t.enterAdditionalNotes}
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  required
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button onClick={handleCustomProductClose} variant='outlined'>
            {t.cancel}
          </Button>
          <Button
            onClick={handleCustomProductSubmit}
            variant='contained'
            className='text-white'
            disabled={!customProductName || !customProductCategory || !customProductManufacture || !customProductPrice}
          >
            {t.submitRequest}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Deactivate Confirmation Dialog */}
      <Dialog open={deactivateDialogOpen} onClose={handleDeactivateCancel} maxWidth='xs' fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
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
              <i className='ri-error-warning-line' style={{ fontSize: 24, color: '#FF4C51' }} />
            </Box>
            <Typography variant='h6'>{(t as any).deactivateProduct || 'Deactivate Product'}</Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography variant='body1' color='text.secondary'>
            {(t as any).deactivateConfirmMessage || 'Are you sure you want to deactivate this product? The product will no longer be visible to customers.'}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button onClick={handleDeactivateCancel} variant='outlined'>
            {t.cancel}
          </Button>
          <Button onClick={handleDeactivateConfirm} variant='contained' color='error'>
            {t.deactivate}
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

export default ProductListManagement


