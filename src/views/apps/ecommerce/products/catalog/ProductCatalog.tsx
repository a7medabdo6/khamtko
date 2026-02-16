'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid2'
import CardMedia from '@mui/material/CardMedia'
import CardActions from '@mui/material/CardActions'
import Chip from '@mui/material/Chip'
import Box from '@mui/material/Box'
import InputAdornment from '@mui/material/InputAdornment'
import Checkbox from '@mui/material/Checkbox'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import ListSubheader from '@mui/material/ListSubheader'
import Autocomplete from '@mui/material/Autocomplete'

// Component Imports
import PageHeader from '@components/layout/shared/PageHeader'

// Type Imports
import type { getDictionary } from '@/utils/getDictionary'

type CatalogProduct = {
  id: string
  name: string
  image: string
  sku: string
  category: string
  subcategory: string
  manufacturer: string
  description: string
  basePrice: number
  inStock: boolean
}

// Category tree structure
const categoryTree = [
  {
    name: 'Textiles',
    subcategories: ['Cotton', 'Silk', 'Hemp', 'Wool', 'Synthetic']
  },
  {
    name: 'Wood',
    subcategories: ['Hardwood', 'Softwood', 'Bamboo', 'Plywood', 'MDF']
  },
  {
    name: 'Metal',
    subcategories: ['Steel', 'Aluminum', 'Copper', 'Iron', 'Brass']
  },
  {
    name: 'Plastics',
    subcategories: ['Recycled', 'Virgin', 'Biodegradable', 'Industrial']
  },
  {
    name: 'Leather',
    subcategories: ['Full Grain', 'Top Grain', 'Genuine', 'Bonded', 'Faux']
  },
  {
    name: 'Rubber',
    subcategories: ['Natural', 'Synthetic', 'Silicone', 'Neoprene']
  },
  {
    name: 'Ceramics',
    subcategories: ['Clay', 'Porcelain', 'Stoneware', 'Earthenware']
  }
]

// Manufacturers list
const manufacturers = [
  'RawMaterials Co.',
  'Global Supplies Inc.',
  'EcoMaterials Ltd.',
  'Industrial Resources',
  'Premium Materials',
  'Nature\'s Best',
  'MetalWorks Industries',
  'TextilePro'
]

const masterCatalog: CatalogProduct[] = [
  {
    id: '1',
    name: 'Organic Cotton Raw Material',
    image: 'https://images.unsplash.com/photo-1536329583941-14287ec6fc4e?w=500',
    sku: 'OCRM-WHT-001',
    category: 'Textiles',
    subcategory: 'Cotton',
    manufacturer: 'RawMaterials Co.',
    description: 'Premium organic cotton fiber - 100% pure',
    basePrice: 12.5,
    inStock: true
  },
  {
    id: '2',
    name: 'Oak Wood Lumber',
    image: 'https://images.unsplash.com/photo-1563207153-f403bf289096?w=500',
    sku: 'OWL-NAT-002',
    category: 'Wood',
    subcategory: 'Hardwood',
    manufacturer: 'Global Supplies Inc.',
    description: 'High-grade oak wood lumber for construction',
    basePrice: 45.0,
    inStock: true
  },
  {
    id: '4',
    name: 'Stainless Steel Sheet',
    image: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=500',
    sku: 'SSS-304-004',
    category: 'Metal',
    subcategory: 'Steel',
    manufacturer: 'MetalWorks Industries',
    description: 'Grade 304 stainless steel sheet metal',
    basePrice: 32.99,
    inStock: true
  },
  {
    id: '10',
    name: 'Recycled Plastic Pellets',
    image: 'https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=500',
    sku: 'RPP-MIX-010',
    category: 'Plastics',
    subcategory: 'Recycled',
    manufacturer: 'EcoMaterials Ltd.',
    description: 'Recycled plastic pellets for manufacturing',
    basePrice: 15.75,
    inStock: true
  },
  {
    id: '11',
    name: 'Aluminum Ingots',
    image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=500',
    sku: 'ALI-6061-011',
    category: 'Metal',
    subcategory: 'Aluminum',
    manufacturer: 'MetalWorks Industries',
    description: 'Pure aluminum ingots grade 6061',
    basePrice: 38.00,
    inStock: true
  },
  {
    id: '12',
    name: 'Hemp Fiber Raw',
    image: 'https://images.unsplash.com/photo-1607968565043-36af90dde238?w=500',
    sku: 'HFR-NAT-012',
    category: 'Textiles',
    subcategory: 'Hemp',
    manufacturer: 'Nature\'s Best',
    description: 'Natural hemp fiber for textile production',
    basePrice: 22.50,
    inStock: true
  },
  {
    id: '7',
    name: 'Copper Wire Coil',
    image: 'https://images.unsplash.com/photo-1624378515195-6bbdb73dff1a?w=500',
    sku: 'CWC-99-007',
    category: 'Metal',
    subcategory: 'Copper',
    manufacturer: 'MetalWorks Industries',
    description: '99.9% pure copper wire in coil form',
    basePrice: 42.50,
    inStock: true
  },
  {
    id: '8',
    name: 'Natural Rubber Sheets',
    image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=500',
    sku: 'NRS-BLK-008',
    category: 'Rubber',
    subcategory: 'Natural',
    manufacturer: 'Industrial Resources',
    description: 'Natural latex rubber sheets',
    basePrice: 24.99,
    inStock: true
  },
  {
    id: '3',
    name: 'Genuine Leather Hide',
    image: 'https://images.unsplash.com/photo-1591348278863-a4fd8fc0f3c2?w=500',
    sku: 'GLH-BRN-003',
    category: 'Leather',
    subcategory: 'Full Grain',
    manufacturer: 'Premium Materials',
    description: 'Full grain genuine leather hide',
    basePrice: 85.0,
    inStock: false
  },
  {
    id: '5',
    name: 'Raw Silk Fabric',
    image: 'https://images.unsplash.com/photo-1566206091558-7f218e696731?w=500',
    sku: 'RSF-WHT-005',
    category: 'Textiles',
    subcategory: 'Silk',
    manufacturer: 'TextilePro',
    description: 'Premium quality raw silk fabric material',
    basePrice: 55.75,
    inStock: true
  },
  {
    id: '6',
    name: 'Bamboo Raw Material',
    image: 'https://images.unsplash.com/photo-1601656770048-cd0ff0a7d0b6?w=500',
    sku: 'BRM-NAT-006',
    category: 'Wood',
    subcategory: 'Bamboo',
    manufacturer: 'EcoMaterials Ltd.',
    description: 'Sustainable bamboo raw material',
    basePrice: 28.0,
    inStock: true
  },
  {
    id: '9',
    name: 'Ceramic Clay Powder',
    image: 'https://images.unsplash.com/photo-1611511373796-20336ae2e0e4?w=500',
    sku: 'CCP-WHT-009',
    category: 'Ceramics',
    subcategory: 'Clay',
    manufacturer: 'RawMaterials Co.',
    description: 'High-purity ceramic clay powder',
    basePrice: 18.50,
    inStock: true
  }
]

const ProductCatalog = ({ dictionary }: { dictionary: Awaited<ReturnType<typeof getDictionary>> }) => {
  const t = dictionary.catalog
  // States
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  
  // Filter States
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [filterManufacturer, setFilterManufacturer] = useState<string>('all')

  // Get already assigned products from localStorage
  const getAssignedProducts = () => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('assignedProducts')

      return stored ? JSON.parse(stored) : []
    }

    return []
  }

  const assignedProductIds = getAssignedProducts()

  const handleSelectProduct = (productId: string) => {
    setSelectedProducts(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    )
  }

  const handleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([])
    } else {
      setSelectedProducts(filteredProducts.map(p => p.id))
    }
  }

  const handleAssignProducts = () => {
    if (selectedProducts.length === 0) {
      setSnackbarMessage(t.pleaseSelectProduct)
      setSnackbarOpen(true)

      return
    }

    // Show confirmation dialog
    setDialogOpen(true)
  }

  const handleConfirmRequest = () => {
    // Close dialog
    setDialogOpen(false)

    // Add products directly to assigned products
    const assignedProducts = localStorage.getItem('assignedProducts')
    const assigned = assignedProducts ? JSON.parse(assignedProducts) : []
    const updatedAssigned = [...new Set([...assigned, ...selectedProducts])]

    localStorage.setItem('assignedProducts', JSON.stringify(updatedAssigned))

    // Show success message
    setSnackbarMessage(
      t.successMessage.replace('{count}', selectedProducts.length.toString())
    )
    setSnackbarOpen(true)
    setSelectedProducts([])

    // Optional: Reload after delay
    setTimeout(() => {
      window.location.reload()
    }, 2000)
  }

  const handleCancelRequest = () => {
    setDialogOpen(false)
  }

  // Clear filters handler
  const handleClearFilters = () => {
    setSearchQuery('')
    setFilterCategory('all')
    setFilterManufacturer('all')
  }

  const hasActiveFilters = searchQuery !== '' || filterCategory !== 'all' || filterManufacturer !== 'all'

  const filteredProducts = masterCatalog.filter(product => {
    // Search filter (name/grade)
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase())
    
    // Category filter (matches category or subcategory)
    const matchesCategory = 
      filterCategory === 'all' || 
      product.category === filterCategory ||
      product.subcategory === filterCategory
    
    // Manufacturer filter
    const matchesManufacturer = 
      filterManufacturer === 'all' || 
      product.manufacturer === filterManufacturer
    
    return matchesSearch && matchesCategory && matchesManufacturer
  })

  const isProductAssigned = (productId: string) => assignedProductIds.includes(productId)

  return (
    <div className='flex flex-col gap-6' style={{ backgroundColor: 'white', padding: '24px', minHeight: '100vh' }}>
      {/* Header Section */}
      <PageHeader
        title={t.title}
        description={t.description}
        badge={{
          count: masterCatalog.length,
          label: `${masterCatalog.length} ${t.totalAvailable}`,
          color: 'primary',
          icon: 'ri-store-line'
        }}
      />

      {/* Actions Bar */}
      <div className='flex flex-wrap gap-4 justify-between items-center'>
        <div className='flex gap-4 items-center'>
          {/* Results Count */}
          <Typography variant='body2' color='text.secondary'>
            {filteredProducts.length} {(t as any).results || 'results'}
          </Typography>

          {selectedProducts.length > 0 && (
            <Typography variant='body2' color='text.secondary'>
              {t.selected.replace('{count}', selectedProducts.length.toString())}
            </Typography>
          )}
        </div>

        <div className='flex gap-4 items-center'>
          <Button variant='outlined' onClick={handleSelectAll}>
            {selectedProducts.length === filteredProducts.length ? t.deselectAll : t.selectAll}
          </Button>
          <Button
            variant='contained'
            className='text-white'
            onClick={handleAssignProducts}
            disabled={selectedProducts.length === 0}
            startIcon={<i className='ri-add-line' />}
          >
            {t.addToMyProducts.replace('{count}', selectedProducts.length.toString())}
          </Button>
        </div>
      </div>

      {/* Search and Filters Row */}
      <Card>
        <CardContent sx={{ py: 2 }}>
          <Grid container spacing={2} alignItems='center'>
            {/* Search by Product Name/Grade */}
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Autocomplete
                freeSolo
                options={masterCatalog.map(product => product.name)}
                value={searchQuery}
                onInputChange={(event, newValue) => setSearchQuery(newValue)}
                renderInput={params => (
                  <TextField
                    {...params}
                    placeholder={(t as any).searchByName || 'Search by product name...'}
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

            {/* Category Filter with Tree */}
            <Grid size={{ xs: 6, sm: 3, md: 3 }}>
              <FormControl fullWidth size='small'>
                <InputLabel>{(t as any).category || 'Category'}</InputLabel>
                <Select
                  value={filterCategory}
                  label={(t as any).category || 'Category'}
                  onChange={(e) => setFilterCategory(e.target.value)}
                >
                  <MenuItem value='all'>
                    <em>{(t as any).allCategories || 'All Categories'}</em>
                  </MenuItem>
                  {categoryTree.map(category => [
                    <ListSubheader key={category.name} sx={{ fontWeight: 'bold', bgcolor: 'action.hover' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <i className='ri-folder-line' />
                        {category.name}
                      </Box>
                    </ListSubheader>,
                    <MenuItem key={`${category.name}-all`} value={category.name} sx={{ pl: 4 }}>
                      <em>All {category.name}</em>
                    </MenuItem>,
                    ...category.subcategories.map(sub => (
                      <MenuItem key={sub} value={sub} sx={{ pl: 4 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <i className='ri-file-line' style={{ fontSize: 14 }} />
                          {sub}
                        </Box>
                      </MenuItem>
                    ))
                  ])}
                </Select>
              </FormControl>
            </Grid>

            {/* Manufacturer Filter */}
            <Grid size={{ xs: 6, sm: 3, md: 3 }}>
              <FormControl fullWidth size='small'>
                <InputLabel>{(t as any).manufacturer || 'Manufacturer'}</InputLabel>
                <Select
                  value={filterManufacturer}
                  label={(t as any).manufacturer || 'Manufacturer'}
                  onChange={(e) => setFilterManufacturer(e.target.value)}
                >
                  <MenuItem value='all'>
                    <em>{(t as any).allManufacturers || 'All Manufacturers'}</em>
                  </MenuItem>
                  {manufacturers.map(mfr => (
                    <MenuItem key={mfr} value={mfr}>
                      {mfr}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Clear Filters */}
            <Grid size={{ xs: 12, sm: 12, md: 2 }}>
              {hasActiveFilters && (
                <Button
                  variant='text'
                  color='error'
                  onClick={handleClearFilters}
                  size='small'
                  startIcon={<i className='ri-close-circle-line' />}
                >
                  {(t as any).clearFilters || 'Clear Filters'}
                </Button>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Info Alert */}
      <Alert severity='info' icon={<i className='ri-information-line' />}>
        {t.infoAlert}
      </Alert>

      {/* Products Grid */}
      <Grid container spacing={4}>
        {filteredProducts.map(product => {
          const isSelected = selectedProducts.includes(product.id)
          const isAssigned = isProductAssigned(product.id)

          return (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  border: isSelected ? '2px solid' : '1px solid',
                  borderColor: isSelected ? 'primary.main' : 'divider',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onClick={() => !isAssigned && handleSelectProduct(product.id)}
              >
                {/* Selection Checkbox */}
                {!isAssigned && (
                  <Box sx={{ position: 'absolute', top: 8, left: 8, zIndex: 1 }}>
                    <Checkbox
                      checked={isSelected}
                      onChange={() => handleSelectProduct(product.id)}
                      onClick={e => e.stopPropagation()}
                      sx={{
                        bgcolor: 'background.paper',
                        borderRadius: 1,
                        '&:hover': { bgcolor: 'background.paper' }
                      }}
                    />
                  </Box>
                )}

                {/* Already Assigned Badge */}
                {isAssigned && (
                  <Box sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}>
                    <Chip label={t.inMyInventory} color='success' size='small' className='text-white' />
                  </Box>
                )}

                <CardMedia component='img' height='200' image={product.image} alt={product.name} />

                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant='h6' className='mbe-2'>
                    {product.name}
                  </Typography>

                  <Typography variant='body2' color='text.secondary' className='mbe-2'>
                    {product.description}
                  </Typography>

                  <Box className='flex items-center gap-2 mbe-2'>
                    <Chip label={product.category} size='small' variant='tonal' />
                    <Chip
                      label={product.inStock ? t.available : t.outOfStock}
                      size='small'
                      color={product.inStock ? 'success' : 'error'}
                      variant='tonal'
                    />
                  </Box>

                  <Typography variant='caption' color='text.secondary' className='block mbe-1'>
                    SKU: {product.sku}
                  </Typography>

                 
                </CardContent>

                <CardActions>
                  {isAssigned ? (
                    <Button fullWidth variant='outlined' disabled startIcon={<i className='ri-check-line' />}>
                      {t.alreadyAdded}
                    </Button>
                  ) : (
                    <Button
                      fullWidth
                      variant={isSelected ? 'contained' : 'outlined'}
                      onClick={e => {
                        e.stopPropagation()
                        handleSelectProduct(product.id)
                      }}
                      startIcon={<i className={isSelected ? 'ri-check-line' : 'ri-add-line'} />}
                    >
                      {isSelected ? t.selected_status : t.select}
                    </Button>
                  )}
                </CardActions>
              </Card>
            </Grid>
          )
        })}
      </Grid>

      {filteredProducts.length === 0 && (
        <Box className='flex justify-center items-center' sx={{ minHeight: 300 }}>
          <Typography color='text.secondary'>{t.noProductsFound}</Typography>
        </Box>
      )}

      {/* Confirmation Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleCancelRequest}
        maxWidth='sm'
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2
          }
        }}
      >
        <DialogTitle>
          <Box className='flex items-center gap-3'>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                backgroundColor: 'warning.light',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <i className='ri-time-line' style={{ fontSize: 24, color: 'var(--mui-palette-warning-main)' }} />
            </Box>
            <div>
              <Typography variant='h5'>{t.confirmTitle}</Typography>
              <Typography variant='body2' color='text.secondary'>
                {t.adminApprovalRequired}
              </Typography>
            </div>
          </Box>
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            <Typography variant='body1' className='mbe-3'>
              {t.confirmMessage.replace('{count}', selectedProducts.length.toString())}
            </Typography>

            <Alert severity='success' icon={<i className='ri-checkbox-circle-line' />} className='mbe-3'>
              {t.successAlert}
            </Alert>

            <Typography variant='body2' color='text.secondary'>
              <strong>{t.whatHappensNext}</strong>
            </Typography>
            <ul style={{ margin: '8px 0', paddingLeft: 20 }}>
              <li>{t.step1}</li>
              <li>{t.step2}</li>
              <li>{t.step3}</li>
            </ul>
          </DialogContentText>
        </DialogContent>

        <DialogActions sx={{ padding: 3, paddingTop: 0 }}>
          <Button onClick={handleCancelRequest} variant='outlined' size='large'>
            {t.cancel}
          </Button>
          <Button onClick={handleConfirmRequest} variant='contained' size='large' className='text-white' autoFocus>
            {t.submitRequest}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={30000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarMessage.includes('Please') ? 'warning' : 'success'}
          sx={{ width: '100%', backgroundColor: '#56CA00', color: 'white' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default ProductCatalog

