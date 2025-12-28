'use client'

import { useState } from 'react'
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Chip,
  IconButton,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  Select,
  MenuItem,
  Menu,
  Divider,
  Rating,
  Drawer,
  useMediaQuery,
  useTheme,
  AppBar,
  Toolbar,
  TextField,
  InputAdornment,
  Stack,
  Tooltip,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert
} from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import StoreFooter from '@/components/store/StoreFooter'
import StoreHeader from '@/components/store/StoreHeader'

const navItems = ['Home', 'Shop', 'Categories', 'Sale', 'Contact']

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviews: number
  size: string
  fragrance: string
  scent: string[]
  category: string
  inStock: boolean
}

interface SubCategory {
  id: string
  name: string
  image: string
  productCount: number
}

const subCategories: SubCategory[] = [
  { id: 'body-splash', name: 'Body Splash', image: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=300', productCount: 12 },
  { id: 'body-lotion', name: 'Body Lotion', image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=300', productCount: 18 },
  { id: 'shower-gel', name: 'Shower Gel', image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=300', productCount: 15 },
  { id: 'body-butter', name: 'Body Butter', image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=300', productCount: 10 }
]

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'In The Wilds Body Butter',
    price: 359.0,
    originalPrice: 449.0,
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400',
    rating: 5,
    reviews: 1,
    size: '200gm',
    fragrance: 'In The Wilds',
    scent: ['Woody'],
    category: 'body-butter',
    inStock: true
  },
  {
    id: '2',
    name: 'Cupcake Glaze Essential Pack',
    price: 1086.0,
    originalPrice: 1353.0,
    image: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=400',
    rating: 5,
    reviews: 2,
    size: '250ml',
    fragrance: 'Cupcake Glaze',
    scent: ['Fruity', 'Vanilla'],
    category: 'body-splash',
    inStock: true
  },
  {
    id: '3',
    name: 'In The Wilds Shower Gel',
    price: 263.0,
    originalPrice: 329.0,
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400',
    rating: 4,
    reviews: 0,
    size: '400ml',
    fragrance: 'In The Wilds',
    scent: ['Woody'],
    category: 'shower-gel',
    inStock: true
  },
  {
    id: '4',
    name: 'Cupcake Glaze Body Butter',
    price: 359.0,
    originalPrice: 449.0,
    image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=400',
    rating: 0,
    reviews: 9,
    size: '200gm',
    fragrance: 'Cupcake Glaze',
    scent: ['Fruity', 'Vanilla'],
    category: 'body-butter',
    inStock: true
  },
  {
    id: '5',
    name: 'Cupcake Glaze Body Lotion',
    price: 386.0,
    originalPrice: 483.0,
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400',
    rating: 0,
    reviews: 0,
    size: '250ml',
    fragrance: 'Cupcake Glaze',
    scent: ['Fruity', 'Vanilla'],
    category: 'body-lotion',
    inStock: true
  },
  {
    id: '6',
    name: 'Sunkissed Honey Body Splash',
    price: 475.0,
    image: 'https://images.unsplash.com/photo-1615397349754-90cde6a2f09e?w=400',
    rating: 5,
    reviews: 1,
    size: '250ml',
    fragrance: 'Sunkissed Honey',
    scent: ['Fruity'],
    category: 'body-splash',
    inStock: true
  },
  {
    id: '4',
    name: 'Cupcake Glaze Body Butter',
    price: 359.0,
    originalPrice: 449.0,
    image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=400',
    rating: 0,
    reviews: 9,
    size: '200gm',
    fragrance: 'Cupcake Glaze',
    scent: ['Fruity', 'Vanilla'],
    category: 'body-butter',
    inStock: true
  }, {
    id: '4',
    name: 'Cupcake Glaze Body Butter',
    price: 359.0,
    originalPrice: 449.0,
    image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=400',
    rating: 0,
    reviews: 9,
    size: '200gm',
    fragrance: 'Cupcake Glaze',
    scent: ['Fruity', 'Vanilla'],
    category: 'body-butter',
    inStock: true
  }, {
    id: '4',
    name: 'Cupcake Glaze Body Butter',
    price: 359.0,
    originalPrice: 449.0,
    image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=400',
    rating: 0,
    reviews: 9,
    size: '200gm',
    fragrance: 'Cupcake Glaze',
    scent: ['Fruity', 'Vanilla'],
    category: 'body-butter',
    inStock: true
  }, {
    id: '4',
    name: 'Cupcake Glaze Body Butter',
    price: 359.0,
    originalPrice: 449.0,
    image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=400',
    rating: 0,
    reviews: 9,
    size: '200gm',
    fragrance: 'Cupcake Glaze',
    scent: ['Fruity', 'Vanilla'],
    category: 'body-butter',
    inStock: true
  }, {
    id: '4',
    name: 'Cupcake Glaze Body Butter',
    price: 359.0,
    originalPrice: 449.0,
    image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=400',
    rating: 0,
    reviews: 9,
    size: '200gm',
    fragrance: 'Cupcake Glaze',
    scent: ['Fruity', 'Vanilla'],
    category: 'body-butter',
    inStock: true
  }, {
    id: '4',
    name: 'Cupcake Glaze Body Butter',
    price: 359.0,
    originalPrice: 449.0,
    image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=400',
    rating: 0,
    reviews: 9,
    size: '200gm',
    fragrance: 'Cupcake Glaze',
    scent: ['Fruity', 'Vanilla'],
    category: 'body-butter',
    inStock: true
  }, {
    id: '4',
    name: 'Cupcake Glaze Body Butter',
    price: 359.0,
    originalPrice: 449.0,
    image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=400',
    rating: 0,
    reviews: 9,
    size: '200gm',
    fragrance: 'Cupcake Glaze',
    scent: ['Fruity', 'Vanilla'],
    category: 'body-butter',
    inStock: true
  },
  {
    id: '4',
    name: 'Cupcake Glaze Body Butter',
    price: 359.0,
    originalPrice: 449.0,
    image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=400',
    rating: 0,
    reviews: 9,
    size: '200gm',
    fragrance: 'Cupcake Glaze',
    scent: ['Fruity', 'Vanilla'],
    category: 'body-butter',
    inStock: true
  }, {
    id: '4',
    name: 'Cupcake Glaze Body Butter',
    price: 359.0,
    originalPrice: 449.0,
    image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=400',
    rating: 0,
    reviews: 9,
    size: '200gm',
    fragrance: 'Cupcake Glaze',
    scent: ['Fruity', 'Vanilla'],
    category: 'body-butter',
    inStock: true
  },
]

export default function CategoryPage() {
  const router = useRouter()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [sortBy, setSortBy] = useState('position')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [priceRange, setPriceRange] = useState<string>('all')
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [selectedFragrances, setSelectedFragrances] = useState<string[]>([])
  const [selectedScents, setSelectedScents] = useState<string[]>([])
  const [wishlist, setWishlist] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [cartCount] = useState(3)
  const [offerDialogOpen, setOfferDialogOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [langAnchorEl, setLangAnchorEl] = useState<null | HTMLElement>(null)
  const [currentLang, setCurrentLang] = useState('en')

  const handleLangMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setLangAnchorEl(event.currentTarget)
  }

  const handleLangMenuClose = () => {
    setLangAnchorEl(null)
  }

  const handleLanguageChange = (lang: string) => {
    setCurrentLang(lang)
    const currentPath = window.location.pathname
    const pathParts = currentPath.split('/')
    
    // Replace the language part in the URL
    if (pathParts[1] === 'en' || pathParts[1] === 'ar' || pathParts[1] === 'fr') {
      pathParts[1] = lang
      router.push(pathParts.join('/'))
    } else {
      router.push(`/${lang}${currentPath}`)
    }
    
    handleLangMenuClose()
  }

  const fragrances = ['Cupcake Glaze', 'In The Wilds', 'Spring Petals', 'Midnight Miracle', 'Desert Whisper', 'Night Charm', 'Sunkissed Honey', 'Diamond Stardust']
  const scents = ['Fruity', 'Floral', 'Vanilla', 'Creamy', 'Woody', 'Fresh']
  const sizes = ['400ml', '250ml', '200ml', '125ml', '200gm']

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => (prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]))
    setSnackbarMessage(wishlist.includes(productId) ? 'Removed from wishlist' : 'Added to wishlist')
    setSnackbarOpen(true)
  }

  const handleRequestOffer = (product: any) => {
    setSelectedProduct(product)
    setOfferDialogOpen(true)
  }

  const handleSubmitOfferRequest = () => {
    setOfferDialogOpen(false)
    setSnackbarMessage('Special offer request submitted successfully!')
    setSnackbarOpen(true)
  }

  const filteredProducts = mockProducts.filter(product => {
    if (selectedCategory !== 'all' && product.category !== selectedCategory) return false
    if (priceRange === '0-1000' && product.price > 1000) return false
    if (priceRange === '1000-2000' && (product.price < 1000 || product.price > 2000)) return false
    if (selectedSizes.length > 0 && !selectedSizes.includes(product.size)) return false
    if (selectedFragrances.length > 0 && !selectedFragrances.includes(product.fragrance)) return false
    if (selectedScents.length > 0 && !product.scent.some(s => selectedScents.includes(s))) return false
    return true
  })

  const FilterSection = () => (
    <Box>
      {/* Category Filter */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Category
        </Typography>
        <FormControl component="fieldset">
          <RadioGroup value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
            <FormControlLabel
              value="all"
              control={<Radio />}
              label={
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: 180 }}>
                  <span>All Products</span>
                  <Chip label={mockProducts.length} size="small" />
                </Box>
              }
            />
            {subCategories.map(cat => (
              <FormControlLabel
                key={cat.id}
                value={cat.id}
                control={<Radio />}
                label={
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', width: 180 }}>
                    <span>{cat.name}</span>
                    <Chip label={cat.productCount} size="small" />
                  </Box>
                }
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Price Filter */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Price
        </Typography>
        <FormControl component="fieldset">
          <RadioGroup value={priceRange} onChange={e => setPriceRange(e.target.value)}>
            <FormControlLabel value="all" control={<Radio />} label="All Prices" />
            <FormControlLabel value="0-1000" control={<Radio />} label="LE 0.00 - LE 1,000" />
            <FormControlLabel value="1000-2000" control={<Radio />} label="LE 1,000 - LE 2,000" />
          </RadioGroup>
        </FormControl>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Size Filter */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Size
        </Typography>
        <FormGroup>
          {sizes.map(size => (
            <FormControlLabel
              key={size}
              control={
                <Checkbox checked={selectedSizes.includes(size)} onChange={e => {
                  if (e.target.checked) {
                    setSelectedSizes([...selectedSizes, size])
                  } else {
                    setSelectedSizes(selectedSizes.filter(s => s !== size))
                  }
                }} />
              }
              label={size}
            />
          ))}
        </FormGroup>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Fragrance Filter */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Fragrance
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {fragrances.map(fragrance => (
            <Chip
              key={fragrance}
              label={fragrance}
              onClick={() => {
                if (selectedFragrances.includes(fragrance)) {
                  setSelectedFragrances(selectedFragrances.filter(f => f !== fragrance))
                } else {
                  setSelectedFragrances([...selectedFragrances, fragrance])
                }
              }}
              color={selectedFragrances.includes(fragrance) ? 'primary' : 'default'}
              variant={selectedFragrances.includes(fragrance) ? 'filled' : 'outlined'}
              sx={{ fontSize: '0.75rem' }}
            />
          ))}
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Scent Filter */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Scent
        </Typography>
        <FormGroup>
          {scents.map(scent => (
            <FormControlLabel
              key={scent}
              control={
                <Checkbox checked={selectedScents.includes(scent)} onChange={e => {
                  if (e.target.checked) {
                    setSelectedScents([...selectedScents, scent])
                  } else {
                    setSelectedScents(selectedScents.filter(s => s !== scent))
                  }
                }} />
              }
              label={scent}
            />
          ))}
        </FormGroup>
      </Box>
    </Box>
  )

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8f9fa' }}>
      {/* Header */}
      <StoreHeader 
        cartCount={cartCount} 
        wishlistCount={wishlist.length}
        onSearch={setSearchQuery}
      />

      {/* Promotional Banner */}
      <Box
        sx={{
          bgcolor: '#009BFF',
          py: 1.5,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'rgba(255,255,255,0.1)',
            animation: 'shimmer 3s infinite'
          },
          '@keyframes shimmer': {
            '0%': { left: '-100%' },
            '100%': { left: '100%' }
          }
        }}
      >
        <Container maxWidth="xl">
          <Typography
            variant="body2"
            align="center"
            sx={{
              color: 'white',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
              fontSize: '0.9rem',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <i className="ri-gift-line" style={{ fontSize: 22 }} />
              Free Shipping on Orders Over $50
            </Box>
            <Box sx={{ width: 2, height: 20, bgcolor: 'rgba(255,255,255,0.5)' }} />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              Use Code:{' '}
              <Box component="span" sx={{ bgcolor: 'rgba(255,255,255,0.2)', px: 1, py: 0.3, borderRadius: 1, fontWeight: 700 }}>
                FREESHIP
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <i className="ri-truck-line" style={{ fontSize: 22 }} />
            </Box>
          </Typography>
        </Container>
      </Box>

      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          height: { xs: 300, md: 400 },
          color: 'white',
          overflow: 'hidden'
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'url(https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=1200)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <Container
          sx={{
            position: 'relative',
            zIndex: 1,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            maxWidth: 'lg'
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              mb: 2,
              fontSize: { xs: '2rem', md: '3rem' }
            }}
          >
            Body Care,
            <br />
            the Premium Way
          </Typography>
          <Typography variant="h6" sx={{ maxWidth: 500, opacity: 0.95, fontSize: { xs: '0.9rem', md: '1.1rem' } }}>
            Shop our body care collection for irresistibly soft skin and lasting fragrance.
          </Typography>
        </Container>
      </Box>

      {/* Subcategories Section */}
      <Container sx={{ py: 5, maxWidth: 'lg' }}>
        {/* Section Header */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 1,
              color: 'text.primary',
              fontSize: { xs: '1.5rem', md: '2rem' }
            }}
          >
            Shop by Category
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.95rem' }}>
            Browse through our diverse collection of body care products
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {subCategories.map((subCat, index) => (
            <Grid item xs={6} sm={3} key={subCat.id}>
              <Box
                sx={{
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  // border: '2px solid',
                  // borderColor: 'divider',
                  // borderRadius: 3,
                  // overflow: 'hidden',
                  // position: 'relative',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    borderColor: 'primary.main',
                    '& .category-image': {
                      transform: 'scale(1.1)'
                    },
                    '& .category-overlay': {
                      opacity: 0.1
                    },
                    '& .category-chip': {
                      bgcolor: 'primary.main',
                      color: 'white'
                    }
                  }
                }}
                onClick={() => setSelectedCategory(subCat.id)}
              >
                {/* Image Container */}
                <Box
                  sx={{
                    position: 'relative',
                    paddingTop: '100%',
                    overflow: 'hidden',
                    bgcolor: '#f5f5f5'
                  }}
                >
                  <Image
                    src={subCat.image}
                    alt={subCat.name}
                    fill
                    className="category-image"
                    style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
                  />
                  {/* Subtle Overlay */}
                  <Box
                    className="category-overlay"
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      bgcolor: 'primary.main',
                      opacity: 0,
                      transition: 'opacity 0.3s ease'
                    }}
                  />

                  {/* Product Count Badge */}
                  <Chip
                    label={`${subCat.productCount} products`}
                    className="category-chip"
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      bgcolor: 'white',
                      color: 'text.primary',
                      fontWeight: 600,
                      fontSize: '0.7rem',
                      height: 24,
                      transition: 'all 0.3s ease',
                      zIndex: 1
                    }}
                  />
                </Box>

                {/* Category Info */}
                <CardContent sx={{ textAlign: 'center', py: 0.5, px: 2 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 700,
                      fontSize: '0.95rem',
                      color: 'text.primary',
                      mb: 0.5
                    }}
                  >
                    {subCat.name}
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 0.5,
                      color: 'primary.main'
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        fontSize: '0.75rem',
                        fontWeight: 600
                      }}
                    >
                      Explore
                    </Typography>
                    <i className="ri-arrow-right-line" style={{ fontSize: 14 }} />
                  </Box>
                </CardContent>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Divider />

      {/* Products Section */}
      <Container sx={{ py: 4, maxWidth: 'lg' }}>
        <Grid container spacing={3}>
          {/* Filters Sidebar - Desktop */}
          {!isMobile && (
            <Grid item md={3}>
              <Box sx={{ p: 3, position: 'sticky', top: 20, border: '1px solid', borderColor: 'divider' }}>
                <FilterSection />
              </Box>
            </Grid>
          )}

          {/* Products Grid */}
          <Grid item xs={12} md={9}>
            {/* Toolbar */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Items 1-{filteredProducts.length} of {filteredProducts.length}
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                {isMobile && (
                  <Button
                    variant="outlined"
                    startIcon={<i className="ri-filter-line" />}
                    onClick={() => setMobileFiltersOpen(true)}
                    size="small"
                  >
                    Filters
                  </Button>
                )}
                <FormControl size="small" sx={{ minWidth: 150 }}>
                  <Select value={sortBy} onChange={e => setSortBy(e.target.value)}>
                    <MenuItem value="position">Position</MenuItem>
                    <MenuItem value="name">Name</MenuItem>
                    <MenuItem value="price-low">Price: Low to High</MenuItem>
                    <MenuItem value="price-high">Price: High to Low</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>

            {/* Products Grid */}
            <Grid container spacing={2}>
              {filteredProducts.map(product => (
                <Grid item xs={6} sm={4} key={product.id}>
                  <Box
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative',
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                        //border: '1px solid',
                      // borderColor: 'divider',
                      //borderRadius: 2,
                      backgroundColor: 'rgba(255,255,255,0.95)',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        borderColor: 'primary.main',
                        boxShadow: 2
                      }
                    }}
                    onClick={() => router.push(`/en/store/${product.id}`)}
                  >
                    {/* Wishlist Button */}
                    <IconButton
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        zIndex: 1,
                        bgcolor: 'background.paper',
                        '&:hover': { bgcolor: 'background.paper' }
                      }}
                      size="small"
                      onClick={e => {
                        e.stopPropagation()
                        toggleWishlist(product.id)
                      }}
                    >
                      <i
                        className={wishlist.includes(product.id) ? 'ri-heart-fill' : 'ri-heart-line'}
                        style={{ color: wishlist.includes(product.id) ? '#f44336' : undefined, fontSize: 18 }}
                      />
                    </IconButton>

                    {/* Discount Badge */}
                    {product.originalPrice && (
                      <Chip
                        label={`-${Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%`}
                        size="small"
                        sx={{
                          position: 'absolute',
                          top: 8,
                          left: 8,
                          zIndex: 1,
                          bgcolor: 'error.main',
                          color: 'white',
                          fontWeight: 700,
                          fontSize: '0.7rem',
                          height: 22
                        }}
                      />
                    )}

                    {/* Product Image */}
                    <Box sx={{ position: 'relative', paddingTop: '100%', bgcolor: '#f5f5f5' }}>
                      <Image src={product.image} alt={product.name} fill style={{ objectFit: 'cover' }} />
                    </Box>

                    {/* Product Info */}
                    <CardContent sx={{ flexGrow: 1, p: 2 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          mb: 1,
                          fontSize: '0.85rem',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          minHeight: 38
                        }}
                      >
                        {product.name}
                      </Typography>

                      {/* Size Badge */}
                      <Chip label={product.size} size="small" sx={{ mb: 1, fontSize: '0.7rem', height: 20, bgcolor: 'action.hover' }} />

                      {/* Rating */}
                      {(product.rating > 0 || product.reviews > 0) && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                          <Rating value={product.rating} size="small" readOnly sx={{ fontSize: '0.9rem' }} />
                          <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.7rem' }}>
                            ({product.reviews})
                          </Typography>
                        </Box>
                      )}

                      {/* Price */}
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1, flexWrap: 'wrap' }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main', fontSize: '1rem' }}>
                          L.E {product.price.toFixed(2)}
                        </Typography>
                        {product.originalPrice && (
                          <Typography
                            variant="caption"
                            sx={{
                              textDecoration: 'line-through',
                              color: 'text.secondary',
                              fontSize: '0.75rem'
                            }}
                          >
                            L.E {product.originalPrice.toFixed(2)}
                          </Typography>
                        )}
                      </Box>
                    </CardContent>

                    {/* Action Buttons */}
                    <Box sx={{ p: 2, pt: 0, display: 'flex', gap: 1 }}>
                      <Button
                        fullWidth
                        variant="contained"
                        size="small"
                        sx={{
                          fontSize: '0.75rem',
                          py: 0.75,
                          bgcolor: 'primary.main',
                          color: 'white',
                          '&:hover': {
                            bgcolor: 'primary.dark'
                          }
                        }}
                        onClick={e => {
                          e.stopPropagation()
                          // Add to cart logic
                        }}
                      >
                        ADD TO CART
                      </Button>
                      <Tooltip title="Request Special Offer" arrow>
                        <IconButton
                          size="small"
                          sx={{
                            border: '1px solid',
                            borderColor: 'primary.main',
                            color: 'primary.main',
                            borderRadius: 1,
                            '&:hover': {
                              bgcolor: 'primary.main',
                              color: 'white'
                            }
                          }}
                          onClick={e => {
                            e.stopPropagation()
                            handleRequestOffer(product)
                          }}
                        >
                          <i className="ri-price-tag-3-line" style={{ fontSize: 16 }} />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>

            {filteredProducts.length === 0 && (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <i className="ri-inbox-line" style={{ fontSize: 64, color: '#ccc' }} />
                <Typography variant="h6" sx={{ mt: 2, color: 'text.secondary' }}>
                  No products found
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Try adjusting your filters
                </Typography>
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>

      {/* Mobile Filters Drawer */}
      <Drawer anchor="right" open={mobileFiltersOpen} onClose={() => setMobileFiltersOpen(false)}>
        <Box sx={{ width: 300, p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Filters
            </Typography>
            <IconButton onClick={() => setMobileFiltersOpen(false)}>
              <i className="ri-close-line" />
            </IconButton>
          </Box>
          <FilterSection />
          <Button fullWidth variant="contained" onClick={() => setMobileFiltersOpen(false)} sx={{ mt: 3 }}>
            Apply Filters
          </Button>
        </Box>
      </Drawer>

      {/* Special Offer Request Dialog */}
      <Dialog open={offerDialogOpen} onClose={() => setOfferDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 2,
                bgcolor: 'primary.main',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <i className="ri-price-tag-3-line" style={{ fontSize: 24, color: 'white' }} />
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Request Special Offer
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedProduct?.name}
              </Typography>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <TextField fullWidth label="Your Name" placeholder="Enter your name" />
            <TextField fullWidth label="Email" type="email" placeholder="your@email.com" />
            <TextField fullWidth label="Phone Number" placeholder="+1 (555) 000-0000" />
            <TextField fullWidth label="Quantity" type="number" defaultValue={1} />
            <TextField fullWidth multiline rows={3} label="Additional Notes" placeholder="Tell us about your requirements..." />
            <Alert severity="info" icon={<i className="ri-information-line" />}>
              Our team will review your request and get back to you within 24 hours with a custom quote.
            </Alert>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOfferDialogOpen(false)} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleSubmitOfferRequest} variant="contained">
            Submit Request
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {/* Footer */}
      <StoreFooter />
    </Box>
  )
}

