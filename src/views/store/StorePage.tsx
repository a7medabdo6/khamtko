'use client'

// React Imports
import { useState } from 'react'
import { useRouter } from 'next/navigation'

// MUI Imports
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Chip from '@mui/material/Chip'
import Badge from '@mui/material/Badge'
import Rating from '@mui/material/Rating'
import Stack from '@mui/material/Stack'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import Tooltip from '@mui/material/Tooltip'
import Divider from '@mui/material/Divider'

// Swiper Imports
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// Mock Data
const banners = [
  {
    id: 1,
    title: 'Summer Collection 2024',
    subtitle: 'Up to 50% OFF',
    description: 'Discover the latest trends in fashion',
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200&h=500&fit=crop',
    buttonText: 'Shop Now',
    color: '#009BFF'
  },
  {
    id: 2,
    title: 'New Arrivals',
    subtitle: 'Fresh Styles Just In',
    description: 'Be the first to get our newest collection',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&h=500&fit=crop',
    buttonText: 'Explore Now',
    color: '#FF6B6B'
  },
  {
    id: 3,
    title: 'Special Offers',
    subtitle: 'Limited Time Only',
    description: 'Exclusive deals you cannot miss',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&h=500&fit=crop',
    buttonText: 'View Deals',
    color: '#4ECDC4'
  }
]

const products = [
  {
    id: 1,
    name: 'Premium Wireless Headphones',
    price: 299.99,
    originalPrice: 399.99,
    rating: 4.5,
    reviews: 128,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    badge: 'Hot',
    discount: 25,
    category: 'Electronics'
  },
  {
    id: 2,
    name: 'Smart Watch Series 7',
    price: 449.99,
    originalPrice: 599.99,
    rating: 4.8,
    reviews: 256,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
    badge: 'New',
    discount: 25,
    category: 'Electronics'
  },
  {
    id: 3,
    name: 'Designer Sunglasses',
    price: 189.99,
    originalPrice: 249.99,
    rating: 4.3,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400',
    badge: 'Sale',
    discount: 24,
    category: 'Fashion'
  },
  {
    id: 4,
    name: 'Leather Backpack',
    price: 159.99,
    originalPrice: 219.99,
    rating: 4.6,
    reviews: 145,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
    badge: 'Popular',
    discount: 27,
    category: 'Fashion'
  },
  {
    id: 5,
    name: 'Running Shoes Pro',
    price: 129.99,
    originalPrice: 179.99,
    rating: 4.7,
    reviews: 203,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
    badge: 'Hot',
    discount: 28,
    category: 'Sports'
  },
  {
    id: 6,
    name: 'Minimalist Watch',
    price: 249.99,
    originalPrice: 329.99,
    rating: 4.4,
    reviews: 167,
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400',
    badge: 'New',
    discount: 24,
    category: 'Fashion'
  },
  {
    id: 7,
    name: 'Wireless Earbuds Pro',
    price: 179.99,
    originalPrice: 249.99,
    rating: 4.9,
    reviews: 312,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400',
    badge: 'Best Seller',
    discount: 28,
    category: 'Electronics'
  },
  {
    id: 8,
    name: 'Premium Camera Lens',
    price: 899.99,
    originalPrice: 1199.99,
    rating: 4.8,
    reviews: 78,
    image: 'https://images.unsplash.com/photo-1606809321498-45a5f36e1f6b?w=400',
    badge: 'Professional',
    discount: 25,
    category: 'Electronics'
  }
]

const newArrivals = [
  {
    id: 9,
    name: 'Bluetooth Speaker',
    price: 89.99,
    originalPrice: 129.99,
    rating: 4.6,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400',
    discount: 31,
    category: 'Electronics'
  },
  {
    id: 10,
    name: 'Vintage Camera',
    price: 599.99,
    originalPrice: 799.99,
    rating: 4.7,
    reviews: 45,
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400',
    discount: 25,
    category: 'Electronics'
  },
  {
    id: 11,
    name: 'Casual Sneakers',
    price: 79.99,
    originalPrice: 119.99,
    rating: 4.5,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400',
    discount: 33,
    category: 'Fashion'
  },
  {
    id: 12,
    name: 'Coffee Maker Pro',
    price: 149.99,
    originalPrice: 199.99,
    rating: 4.8,
    reviews: 234,
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400',
    discount: 25,
    category: 'Home'
  }
]

const trendingProducts = [
  {
    id: 13,
    name: 'Fitness Tracker',
    price: 99.99,
    originalPrice: 149.99,
    rating: 4.7,
    reviews: 567,
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400',
    discount: 33,
    category: 'Sports'
  },
  {
    id: 14,
    name: 'Gaming Mouse',
    price: 69.99,
    originalPrice: 99.99,
    rating: 4.9,
    reviews: 789,
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400',
    discount: 30,
    category: 'Electronics',
    sold: 1200
  },
  {
    id: 15,
    name: 'Desk Lamp LED',
    price: 49.99,
    originalPrice: 79.99,
    rating: 4.6,
    reviews: 234,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400',
    discount: 38,
    category: 'Home',
    sold: 850
  },
  {
    id: 16,
    name: 'Travel Mug',
    price: 29.99,
    originalPrice: 44.99,
    rating: 4.5,
    reviews: 345,
    image: 'https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?w=400',
    discount: 33,
    category: 'Home',
    sold: 650
  }
]

const limitedOffers = [
  {
    id: 17,
    name: 'Laptop Stand Aluminum',
    price: 39.99,
    originalPrice: 89.99,
    rating: 4.8,
    reviews: 456,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400',
    discount: 56,
    timeLeft: '2h 45m',
    category: 'Electronics'
  },
  {
    id: 18,
    name: 'Yoga Mat Premium',
    price: 34.99,
    originalPrice: 69.99,
    rating: 4.7,
    reviews: 234,
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400',
    discount: 50,
    timeLeft: '5h 12m',
    category: 'Sports'
  },
  {
    id: 19,
    name: 'Wireless Charger',
    price: 24.99,
    originalPrice: 49.99,
    rating: 4.6,
    reviews: 567,
    image: 'https://images.unsplash.com/photo-1591290619762-d4e1f5d18c77?w=400',
    discount: 50,
    timeLeft: '1h 30m',
    category: 'Electronics'
  },
  {
    id: 20,
    name: 'Air Purifier',
    price: 129.99,
    originalPrice: 249.99,
    rating: 4.9,
    reviews: 890,
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400',
    discount: 48,
    timeLeft: '3h 20m',
    category: 'Home'
  }
]

const categories = [
  {
    id: 1,
    name: 'Electronics',
    icon: 'ri-smartphone-line',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400',
    count: 1234
  },
  {
    id: 2,
    name: 'Fashion',
    icon: 'ri-shirt-line',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400',
    count: 856
  },
  {
    id: 3,
    name: 'Home & Living',
    icon: 'ri-home-line',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
    count: 567
  },
  {
    id: 4,
    name: 'Sports',
    icon: 'ri-basketball-line',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400',
    count: 432
  },
  {
    id: 5,
    name: 'Beauty',
    icon: 'ri-palette-line',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400',
    count: 789
  },
  {
    id: 6,
    name: 'Books',
    icon: 'ri-book-line',
    image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400',
    count: 345
  }
]

const navItems = ['Home', 'Shop', 'Categories',  'Sale', 'Contact']

const StorePage = () => {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [cartCount] = useState(3)
  const [wishlist, setWishlist] = useState<number[]>([])
  const [offerDialogOpen, setOfferDialogOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')

  const toggleWishlist = (productId: number) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
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

  const getBadgeColor = (badge: string) => {
    switch (badge.toLowerCase()) {
      case 'hot':
        return 'error'
      case 'new':
        return 'primary'
      case 'sale':
        return 'warning'
      case 'popular':
        return 'success'
      case 'best seller':
        return 'secondary'
      default:
        return 'info'
    }
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8f9fa' }}>
      {/* Header */}
      <AppBar 
        position="sticky" 
        elevation={0} 
        sx={{ 
          bgcolor: 'white', 
          borderBottom: '1px solid', 
          borderColor: 'divider',
          backdropFilter: 'blur(20px)',
          background: 'rgba(255,255,255,0.95)',
          boxShadow: '0 2px 20px rgba(0,0,0,0.05)',
          transition: 'all 0.3s'
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ py: 1.5, gap: 2 }}>
            {/* Logo */}
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1.5,
                cursor: 'pointer',
                transition: 'transform 0.3s',
                '&:hover': { transform: 'scale(1.05)' }
              }}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 2,
                  background: 'linear-gradient(135deg, #009BFF 0%, #00D4FF 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 15px rgba(0,155,255,0.3)',
                }}
              >
                <i className='ri-shopping-bag-3-fill' style={{ color: 'white', fontSize: 22 }} />
              </Box>
              <Typography
                variant="h5"
                component="div"
                sx={{ 
                  fontWeight: 800,
                  background: 'linear-gradient(45deg, #009BFF 30%, #00D4FF 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: -0.5,
                  fontSize: '1.5rem'
                }}
              >
                Khamatko
              </Typography>
            </Box>

            {/* Navigation */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 0.5, ml: 4 }}>
              {navItems.map((item) => (
                <Button
                  key={item}
                  sx={{ 
                    color: 'text.primary',
                    fontWeight: 400,
                    fontSize: '0.9rem',
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: '50%',
                      width: 0,
                      height: 2,
                      bgcolor: 'primary.main',
                      transition: 'all 0.3s',
                      transform: 'translateX(-50%)',
                    },
                    '&:hover': { 
                      color: 'primary.main', 
                      bgcolor: 'rgba(0,155,255,0.08)',
                      '&::before': {
                        width: '70%',
                      }
                    }
                  }}
                >
                  {item}
                </Button>
              ))}
            </Box>

            {/* Search Bar */}
            <Box sx={{ flexGrow: 0, display: { xs: 'none', sm: 'block' }, mx: 2, maxWidth: 400, width: '100%' }}>
              <TextField
                fullWidth
                size="small"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <i className='ri-search-line' style={{ fontSize: 20, color: '#666' }} />
                    </InputAdornment>
                  ),
                  endAdornment: searchQuery && (
                    <InputAdornment position="end">
                      <IconButton size="small" onClick={() => setSearchQuery('')}>
                        <i className='ri-close-line' style={{ fontSize: 18 }} />
                      </IconButton>
                    </InputAdornment>
                  ),
                  sx: { 
                    borderRadius: 3,
                    bgcolor: '#f5f7fa',
                    border: '2px solid transparent',
                    transition: 'all 0.3s',
                    '&:hover': {
                      bgcolor: 'white',
                      borderColor: 'primary.lighter',
                    },
                    '&.Mui-focused': {
                      bgcolor: 'white',
                      borderColor: 'primary.main',
                      boxShadow: '0 0 0 4px rgba(0,155,255,0.1)',
                    },
                    '& fieldset': { border: 'none' }
                  }
                }}
              />
            </Box>

            {/* Action Buttons */}
            <Stack direction="row" spacing={1}>
              <Tooltip title="Wishlist" arrow>
                <IconButton 
                  sx={{ 
                    position: 'relative',
                    transition: 'all 0.3s',
                    '&:hover': { 
                      bgcolor: 'rgba(255,107,107,0.1)',
                      transform: 'scale(1.1)',
                      '& i': { color: '#FF6B6B' }
                    }
                  }}
                >
                  <Badge badgeContent={wishlist.length} color="error" max={99}>
                    <i className='ri-heart-line' style={{ fontSize: 22, transition: 'color 0.3s' }} />
                  </Badge>
                </IconButton>
              </Tooltip>
              
              <Tooltip title="Shopping Cart" arrow>
                <IconButton 
                  sx={{ 
                    position: 'relative',
                    transition: 'all 0.3s',
                    '&:hover': { 
                      bgcolor: 'primary.lighter',
                      transform: 'scale(1.1)',
                      '& i': { color: 'primary.main' }
                    }
                  }}
                >
                  <Badge badgeContent={cartCount} color="primary" max={99}>
                    <i className='ri-shopping-cart-line' style={{ fontSize: 22, transition: 'color 0.3s' }} />
                  </Badge>
                </IconButton>
              </Tooltip>

              <Button 
                variant="contained" 
                startIcon={<i className='ri-login-box-line' />}
                sx={{ 
                  ml: 1,
                  px: 3,
                  py: 1,
                  borderRadius: 3,
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  textTransform: 'none',
                  background: 'linear-gradient(135deg, #009BFF 0%, #00D4FF 100%)',
                  boxShadow: '0 4px 15px rgba(0,155,255,0.3)',
                  transition: 'all 0.3s',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #0088E6 0%, #00BFEF 100%)',
                    boxShadow: '0 6px 20px rgba(0,155,255,0.4)',
                    transform: 'translateY(-2px)',
                  }
                }}
              >
                Login
              </Button>
            </Stack>

            {/* Mobile Menu Button */}
            <IconButton 
              sx={{ display: { xs: 'flex', md: 'none' }, ml: 'auto' }}
              color="primary"
            >
              <i className='ri-menu-line' style={{ fontSize: 24 }} />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Promoting Banner */}
      <Box 
        sx={{ 
          background: 'linear-gradient(90deg, #009BFF 0%, #00D4FF 50%, #009BFF 100%)',
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
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
            animation: 'shimmer 3s infinite',
          },
          '@keyframes shimmer': {
            '0%': { left: '-100%' },
            '100%': { left: '100%' },
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
              <i className='ri-gift-line' style={{ fontSize: 22 }} />
              Free Shipping on Orders Over $50
            </Box>
            <Box sx={{ width: 2, height: 20, bgcolor: 'rgba(255,255,255,0.5)' }} />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              Use Code: <Box component="span" sx={{ bgcolor: 'rgba(255,255,255,0.2)', px: 1, py: 0.3, borderRadius: 1, fontWeight: 700 }}>FREESHIP</Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <i className='ri-truck-line' style={{ fontSize: 22 }} />
            </Box>
          </Typography>
        </Container>
      </Box>

      {/* Hero Carousel */}
      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Box 
          sx={{ 
            borderRadius: 4, 
            overflow: 'hidden', 
            boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              border: '3px solid',
              borderColor: 'primary.main',
              borderRadius: 4,
              opacity: 0,
              transition: 'opacity 0.3s',
              pointerEvents: 'none',
              zIndex: 1,
            },
            '&:hover::before': {
              opacity: 0.3,
            }
          }}
        >
          <Swiper
            spaceBetween={0}
            centeredSlides={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            style={{ height: '500px' }}
            className="hero-swiper"
          >
            {banners.map((banner, index) => (
              <SwiperSlide key={banner.id}>
                <Box
                  sx={{
                    position: 'relative',
                    height: '100%',
                    backgroundImage: `url(${banner.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      inset: 0,
                      background: index === 0 
                        ? 'linear-gradient(135deg, rgba(0,155,255,0.5) 0%, rgba(0,212,255,0.3) 100%)'
                        : index === 1
                        ? 'linear-gradient(135deg, rgba(255,107,107,0.5) 0%, rgba(255,142,142,0.3) 100%)'
                        : 'linear-gradient(135deg, rgba(78,205,196,0.5) 0%, rgba(68,168,160,0.3) 100%)',
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      inset: 0,
                      background: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.15) 0%, transparent 60%)',
                    }
                  }}
                >
                  <Container sx={{ position: 'relative', zIndex: 1 }}>
                    <Box 
                      sx={{ 
                        textAlign: 'center', 
                        color: 'white',
                        animation: 'fadeInUp 1s ease-out',
                        '@keyframes fadeInUp': {
                          '0%': { opacity: 0, transform: 'translateY(30px)' },
                          '100%': { opacity: 1, transform: 'translateY(0)' },
                        }
                      }}
                    >
                      {/* Decorative Elements */}
                      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                        <Box sx={{ width: 60, height: 3, bgcolor: 'white', borderRadius: 2, opacity: 0.8 }} />
                      </Box>

                      <Typography 
                        variant="body1" 
                        sx={{ 
                          fontWeight: 700,
                          mb: 2,
                          letterSpacing: 4,
                          textTransform: 'uppercase',
                          fontSize: '0.85rem',
                          opacity: 0.95,
                          textShadow: '0 2px 10px rgba(0,0,0,0.3)'
                        }}
                      >
                        {banner.subtitle}
                      </Typography>
                      
                      <Typography 
                        variant="h2" 
                        sx={{ 
                          fontWeight: 900,
                          mb: 2,
                          fontSize: { xs: '2rem', md: '3.5rem' },
                          textShadow: '0 4px 20px rgba(0,0,0,0.3)',
                          lineHeight: 1.2,
                          background: 'linear-gradient(to right, #fff 0%, rgba(255,255,255,0.9) 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.3))',
                        }}
                      >
                        {banner.title}
                      </Typography>
                      
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          mb: 4,
                          fontWeight: 400,
                          opacity: 0.95,
                          fontSize: '1.1rem',
                          textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                          maxWidth: 600,
                          mx: 'auto'
                        }}
                      >
                        {banner.description}
                      </Typography>

                      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Button 
                          variant="contained" 
                          size="large"
                          endIcon={<i className='ri-arrow-right-line' />}
                          sx={{ 
                            px: 4,
                            py: 1.5,
                            fontSize: '1rem',
                            fontWeight: 700,
                            borderRadius: 3,
                            bgcolor: 'white',
                            color: banner.color,
                            textTransform: 'uppercase',
                            letterSpacing: 1,
                            boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
                            '&:hover': {
                              bgcolor: 'white',
                              transform: 'translateY(-4px) scale(1.05)',
                              boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
                            },
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                          }}
                        >
                          {banner.buttonText}
                        </Button>
                        
                        <Button 
                          variant="outlined" 
                          size="large"
                          endIcon={<i className='ri-play-circle-line' />}
                          sx={{ 
                            px: 4,
                            py: 1.5,
                            fontSize: '1rem',
                            fontWeight: 700,
                            borderRadius: 3,
                            color: 'white',
                            borderColor: 'white',
                            borderWidth: 2,
                            textTransform: 'uppercase',
                            letterSpacing: 1,
                            backdropFilter: 'blur(10px)',
                            bgcolor: 'rgba(255,255,255,0.1)',
                            '&:hover': {
                              borderColor: 'white',
                              borderWidth: 2,
                              bgcolor: 'white',
                              color: banner.color,
                              transform: 'translateY(-4px) scale(1.05)',
                            },
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                          }}
                        >
                          Learn More
                        </Button>
                      </Box>

                      {/* Feature Pills */}
                      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 4, flexWrap: 'wrap' }}>
                        <Chip 
                          icon={<i className='ri-checkbox-circle-fill' style={{ color: 'white', fontSize: 18 }} />}
                          label="Free Shipping" 
                          sx={{ 
                            bgcolor: 'rgba(255,255,255,0.2)', 
                            color: 'white', 
                            fontWeight: 600,
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255,255,255,0.3)',
                            '& .MuiChip-icon': { marginLeft: '8px' }
                          }} 
                        />
                        <Chip 
                          icon={<i className='ri-shield-check-fill' style={{ color: 'white', fontSize: 18 }} />}
                          label="Secure Payment" 
                          sx={{ 
                            bgcolor: 'rgba(255,255,255,0.2)', 
                            color: 'white', 
                            fontWeight: 600,
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255,255,255,0.3)',
                            '& .MuiChip-icon': { marginLeft: '8px' }
                          }} 
                        />
                        <Chip 
                          icon={<i className='ri-refresh-line' style={{ color: 'white', fontSize: 18 }} />}
                          label="Easy Returns" 
                          sx={{ 
                            bgcolor: 'rgba(255,255,255,0.2)', 
                            color: 'white', 
                            fontWeight: 600,
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255,255,255,0.3)',
                            '& .MuiChip-icon': { marginLeft: '8px' }
                          }} 
                        />
                      </Box>
                    </Box>
                  </Container>
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Container>

      {/* Products Section */}
      <Container maxWidth="xl" sx={{ py: 6 }}>
        {/* Section Header */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 700,
              mb: 1,
              background: 'linear-gradient(45deg, #009BFF 30%, #00D4FF 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Featured Products
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Discover our handpicked collection of premium products
          </Typography>
        </Box>

        {/* Products Grid */}
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Card 
                onClick={() => router.push(`/store/${product.id}`)}
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 3,
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                  border: '1px solid',
                  borderColor: 'divider',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,1) 100%)',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-12px) scale(1.02)',
                    boxShadow: '0 20px 40px rgba(0,155,255,0.2)',
                    borderColor: 'primary.main',
                    '& .product-image': {
                      transform: 'scale(1.1)',
                    },
                    '& .quick-actions': {
                      opacity: 1,
                      transform: 'translateY(0)',
                    },
                    '& .add-to-cart-btn': {
                      background: 'linear-gradient(45deg, #009BFF 30%, #00D4FF 90%)',
                    }
                  }
                }}
              >
                {/* Decorative Corner Element */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: 80,
                    height: 80,
                    background: 'linear-gradient(135deg, transparent 50%, rgba(0,155,255,0.1) 50%)',
                    zIndex: 0,
                  }}
                />

                {/* Badge with Modern Design */}
                <Chip
                  label={product.badge}
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: 12,
                    left: 12,
                    zIndex: 2,
                    fontWeight: 700,
                    color: 'white',
                    fontSize: '0.7rem',
                    height: 24,
                    background: getBadgeColor(product.badge) === 'success' 
                      ? 'linear-gradient(45deg, #4CAF50 30%, #66BB6A 90%)'
                      : getBadgeColor(product.badge) === 'warning'
                      ? 'linear-gradient(45deg, #FF9800 30%, #FFB74D 90%)'
                      : 'linear-gradient(45deg, #2196F3 30%, #42A5F5 90%)',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
                    border: '2px solid white',
                  }}
                />

                {/* Discount Badge with Animation */}
                <Chip
                  label={`-${product.discount}%`}
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    zIndex: 2,
                    fontWeight: 800,
                    color: 'white',
                    fontSize: '0.75rem',
                    height: 28,
                    background: 'linear-gradient(45deg, #FF6B6B 30%, #FF8E8E 90%)',
                    boxShadow: '0 4px 15px rgba(255,107,107,0.4)',
                    border: '2px solid white',
                    animation: 'pulse 2s infinite',
                    '@keyframes pulse': {
                      '0%, 100%': { transform: 'scale(1)' },
                      '50%': { transform: 'scale(1.05)' },
                    }
                  }}
                />

                {/* Wishlist Heart Icon with Better Design */}
                <IconButton
                  sx={{
                    position: 'absolute',
                    top: 50,
                    right: 8,
                    zIndex: 2,
                    bgcolor: 'rgba(255,255,255,0.95)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    transition: 'all 0.3s',
                    '&:hover': { 
                      bgcolor: '#FF6B6B',
                      transform: 'scale(1.15) rotate(10deg)',
                      '& i': { color: 'white !important' }
                    }
                  }}
                  size="small"
                  onClick={() => toggleWishlist(product.id)}
                >
                  <i 
                    className={wishlist.includes(product.id) ? 'ri-heart-fill' : 'ri-heart-line'}
                    style={{ 
                      color: wishlist.includes(product.id) ? '#FF6B6B' : '#666', 
                      fontSize: 18,
                      transition: 'color 0.3s'
                    }}
                  />
                </IconButton>

                {/* Product Image with Overlay */}
                <Box sx={{ position: 'relative', overflow: 'hidden', bgcolor: '#f5f5f5' }}>
                  <CardMedia
                    component="img"
                    height="260"
                    image={product.image}
                    alt={product.name}
                    className="product-image"
                    sx={{ 
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease',
                    }}
                  />
                  
                  {/* Quick View Overlay */}
                  <Box
                    className="quick-actions"
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      p: 2,
                      display: 'flex',
                      gap: 1,
                      justifyContent: 'center',
                      background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)',
                      opacity: 0,
                      transform: 'translateY(20px)',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <IconButton
                      size="small"
                      sx={{
                        bgcolor: 'white',
                        '&:hover': { bgcolor: 'primary.main', color: 'white' }
                      }}
                    >
                      <i className='ri-eye-line' style={{ fontSize: 18 }} />
                    </IconButton>
                    <IconButton
                      size="small"
                      sx={{
                        bgcolor: 'white',
                        '&:hover': { bgcolor: 'primary.main', color: 'white' }
                      }}
                    >
                      <i className='ri-share-line' style={{ fontSize: 18 }} />
                    </IconButton>
                  </Box>
                </Box>

                <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                  {/* Category Tag */}
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: 'primary.main',
                      fontWeight: 600,
                      fontSize: '0.65rem',
                      textTransform: 'uppercase',
                      letterSpacing: 1,
                      display: 'block',
                      mb: 0.5
                    }}
                  >
                    {product.category}
                  </Typography>

                  <Typography 
                    variant="body1" 
                    sx={{ 
                      fontWeight: 600,
                      mb: 1,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      fontSize: '0.95rem',
                      minHeight: 44,
                      lineHeight: 1.4
                    }}
                  >
                    {product.name}
                  </Typography>

                  {/* Rating with Custom Style */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                    <Box sx={{ display: 'flex', gap: 0.3 }}>
                      {[...Array(5)].map((_, i) => (
                        <i 
                          key={i}
                          className={i < Math.floor(product.rating) ? 'ri-star-fill' : 'ri-star-line'}
                          style={{ 
                            color: '#FFB400', 
                            fontSize: 14,
                          }}
                        />
                      ))}
                    </Box>
                    <Typography variant="caption" sx={{ fontSize: '0.7rem', fontWeight: 600, color: 'text.secondary' }}>
                      {product.rating} <span style={{ fontWeight: 400 }}>({product.reviews})</span>
                    </Typography>
                  </Box>

                  {/* Price with Better Layout */}
                  <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.5, mb: 0.5 }}>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 800, 
                        fontSize: '1.25rem',
                        background: 'linear-gradient(45deg, #009BFF 30%, #00D4FF 90%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      ${product.price}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        textDecoration: 'line-through',
                        color: 'text.disabled',
                        fontSize: '0.85rem',
                        fontWeight: 500
                      }}
                    >
                      ${product.originalPrice}
                    </Typography>
                    <Chip
                      label={`Save $${(product.originalPrice - product.price).toFixed(0)}`}
                      size="small"
                      sx={{
                        height: 20,
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        bgcolor: 'success.light',
                        color: 'success.dark',
                      }}
                    />
                  </Box>

                  {/* Stock Status */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Box
                      sx={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        bgcolor: 'success.main',
                        animation: 'blink 2s infinite',
                        '@keyframes blink': {
                          '0%, 100%': { opacity: 1 },
                          '50%': { opacity: 0.3 },
                        }
                      }}
                    />
                    <Typography variant="caption" sx={{ fontSize: '0.7rem', color: 'success.main', fontWeight: 600 }}>
                      In Stock
                    </Typography>
                  </Box>
                </CardContent>

                <CardActions sx={{ p: 2, pt: 0, gap: 1 }}>
                  <Button 
                    fullWidth 
                    variant="contained"
                    size="small"
                    className="add-to-cart-btn"
                    startIcon={<i className='ri-shopping-cart-line' />}
                    sx={{ 
                      borderRadius: 2,
                      py: 1,
                      fontWeight: 700,
                      fontSize: '0.8rem',
                      background: 'linear-gradient(45deg, #009BFF 30%, #0088E6 90%)',
                      boxShadow: '0 4px 12px rgba(0,155,255,0.3)',
                      transition: 'all 0.3s',
                      textTransform: 'uppercase',
                      letterSpacing: 0.5,
                      '&:hover': {
                        boxShadow: '0 6px 20px rgba(0,155,255,0.4)',
                        transform: 'translateY(-2px)',
                      }
                    }}
                  >
                    Add to Cart
                  </Button>
                  <Tooltip title="Request Special Offer" arrow>
                    <IconButton 
                      size="small"
                      color="primary"
                      onClick={() => handleRequestOffer(product)}
                      sx={{ 
                        border: '2px solid', 
                        borderColor: 'primary.main',
                        borderRadius: 2,
                        background: 'linear-gradient(135deg, rgba(0,155,255,0.1) 0%, rgba(0,212,255,0.1) 100%)',
                        transition: 'all 0.3s',
                        '&:hover': {
                          background: 'primary.main',
                          color: 'white',
                          transform: 'rotate(10deg) scale(1.1)',
                        }
                      }}
                    >
                      <i className='ri-price-tag-3-line' style={{ fontSize: 18 }} />
                    </IconButton>
                  </Tooltip>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Load More Button */}
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button 
            variant="outlined" 
            size="medium"
            sx={{ 
              px: 3,
              py: 1,
              borderRadius: 2,
              fontWeight: 600,
              fontSize: '0.875rem'
            }}
          >
            Load More Products
          </Button>
        </Box>
      </Container>

      {/* Categories Section */}
      <Box sx={{ bgcolor: 'linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)', py: 8, position: 'relative', overflow: 'hidden' }}>
        {/* Background Decoration */}
        <Box sx={{ position: 'absolute', top: -100, right: -100, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,155,255,0.1) 0%, transparent 70%)', }}/>
        <Box sx={{ position: 'absolute', bottom: -150, left: -150, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(78,205,196,0.1) 0%, transparent 70%)', }}/>
        
        <Container maxWidth="xl">
          <Box sx={{ mb: 5, textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <Box sx={{ display: 'inline-block', mb: 2 }}>
              <Chip 
                label="EXPLORE" 
                size="small" 
                sx={{ 
                  bgcolor: 'primary.lighter', 
                  color: 'primary.main', 
                  fontWeight: 700,
                  fontSize: '0.7rem',
                  letterSpacing: 2,
                  px: 1
                }} 
              />
            </Box>
            <Typography 
              variant="h3" 
              sx={{ 
                fontWeight: 800,
                mb: 1.5,
                background: 'linear-gradient(45deg, #009BFF 30%, #00D4FF 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: { xs: '2rem', md: '2.5rem' }
              }}
            >
              Shop by Category
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.05rem', maxWidth: 600, mx: 'auto' }}>
              Discover amazing products across all our popular categories
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {categories.map((category, index) => (
              <Grid item xs={6} sm={4} md={2} key={category.id}>
                <Card
                  sx={{
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    borderRadius: 3,
                    overflow: 'hidden',
                    border: '2px solid transparent',
                    position: 'relative',
                    animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                    '@keyframes fadeInUp': {
                      '0%': { opacity: 0, transform: 'translateY(30px)' },
                      '100%': { opacity: 1, transform: 'translateY(0)' },
                    },
                    '&:hover': {
                      transform: 'translateY(-12px) scale(1.03)',
                      boxShadow: '0 20px 40px rgba(0,155,255,0.25)',
                      borderColor: 'primary.main',
                      '& .category-overlay': {
                        background: 'linear-gradient(135deg, rgba(0,155,255,0.7) 0%, rgba(0,212,255,0.65) 100%)',
                      },
                      '& .category-icon': {
                        transform: 'scale(1.2) rotate(10deg)',
                      },
                      '& .category-arrow': {
                        opacity: 1,
                        transform: 'translateX(0)',
                      },
                      '& .shine-effect': {
                        left: '100%',
                      }
                    }
                  }}
                >
                  <Box
                    sx={{
                      position: 'relative',
                      height: 200,
                      backgroundImage: `url(${category.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      overflow: 'hidden'
                    }}
                  >
                    {/* Overlay */}
                    <Box
                      className="category-overlay"
                      sx={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(135deg, rgba(0,155,255,0.5) 0%, rgba(0,212,255,0.4) 100%)',
                        transition: 'all 0.4s',
                      }}
                    />

                    {/* Shine Effect */}
                    <Box
                      className="shine-effect"
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: '-100%',
                        width: '50%',
                        height: '100%',
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                        transition: 'left 0.6s',
                      }}
                    />

                    {/* Content */}
                    <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                      {/* Icon Circle */}
                      <Box
                        sx={{
                          width: 70,
                          height: 70,
                          borderRadius: '50%',
                          bgcolor: 'rgba(255,255,255,0.25)',
                          backdropFilter: 'blur(10px)',
                          border: '3px solid rgba(255,255,255,0.4)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mb: 1.5,
                          mx: 'auto',
                          boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
                        }}
                      >
                        <i 
                          className={`${category.icon} category-icon`}
                          style={{ 
                            fontSize: 36, 
                            transition: 'transform 0.4s',
                            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
                          }} 
                        />
                      </Box>

                      <Typography 
                        variant="h6" 
                        sx={{ 
                          fontWeight: 700, 
                          fontSize: '1rem',
                          mb: 0.5,
                          textShadow: '0 2px 8px rgba(0,0,0,0.3)',
                          letterSpacing: 0.5
                        }}
                      >
                        {category.name}
                      </Typography>
                      
                      <Box 
                        sx={{ 
                          display: 'inline-flex',
                          alignItems: 'center',
                          bgcolor: 'rgba(255,255,255,0.25)',
                          backdropFilter: 'blur(10px)',
                          px: 1.5,
                          py: 0.3,
                          borderRadius: 2,
                          gap: 0.5
                        }}
                      >
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            textShadow: '0 1px 3px rgba(0,0,0,0.2)'
                          }}
                        >
                          {category.count} items
                        </Typography>
                        <i 
                          className="ri-arrow-right-line category-arrow" 
                          style={{ 
                            fontSize: 14,
                            opacity: 0,
                            transform: 'translateX(-10px)',
                            transition: 'all 0.3s'
                          }} 
                        />
                      </Box>
                    </Box>

                    {/* Corner Badge */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        bgcolor: 'rgba(255,255,255,0.95)',
                        color: 'primary.main',
                        width: 28,
                        height: 28,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800,
                        fontSize: '0.7rem',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                        zIndex: 2
                      }}
                    >
                      {index + 1}
                    </Box>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* View All Categories Button */}
          <Box sx={{ textAlign: 'center', mt: 5 }}>
            <Button 
              variant="outlined" 
              size="large"
              endIcon={<i className='ri-arrow-right-line' />}
              sx={{ 
                px: 4,
                py: 1.5,
                borderRadius: 3,
                fontWeight: 700,
                fontSize: '0.95rem',
                borderWidth: 2,
                textTransform: 'uppercase',
                letterSpacing: 1,
                '&:hover': {
                  borderWidth: 2,
                  transform: 'translateY(-3px)',
                  boxShadow: '0 8px 25px rgba(0,155,255,0.25)',
                }
              }}
            >
              View All Categories
            </Button>
          </Box>
        </Container>
      </Box>

      {/* New Arrivals Section */}
      <Container maxWidth="xl" sx={{ py: 6 }}>
          <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 700,
                  background: 'linear-gradient(45deg, #FF6B6B 30%, #FF8E8E 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                New Arrivals
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Fresh products just added
              </Typography>
            </Box>
            <Button variant="outlined" size="small" endIcon={<i className='ri-arrow-right-line' />}>
              View All
            </Button>
          </Box>

        <Grid container spacing={3}>
          {newArrivals.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product.id}>
              <Card 
                onClick={() => router.push(`/store/${product.id}`)}
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 3,
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                  border: '1px solid',
                  borderColor: 'divider',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,1) 100%)',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-12px) scale(1.02)',
                    boxShadow: '0 20px 40px rgba(255,107,107,0.2)',
                    borderColor: '#FF6B6B',
                    '& .product-image': { transform: 'scale(1.1)' },
                    '& .quick-actions': { opacity: 1, transform: 'translateY(0)' },
                    '& .new-badge': { 
                      animation: 'shake 0.5s ease-in-out',
                    }
                  },
                  '@keyframes shake': {
                    '0%, 100%': { transform: 'rotate(0deg)' },
                    '25%': { transform: 'rotate(-5deg)' },
                    '75%': { transform: 'rotate(5deg)' },
                  }
                }}
              >
                {/* Decorative Corner */}
                <Box sx={{ position: 'absolute', top: 0, right: 0, width: 80, height: 80, background: 'linear-gradient(135deg, transparent 50%, rgba(255,107,107,0.1) 50%)', zIndex: 0 }} />

                <Chip
                  label="NEW"
                  className="new-badge"
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: 12,
                    left: 12,
                    zIndex: 2,
                    fontWeight: 800,
                    color: 'white',
                    fontSize: '0.7rem',
                    height: 24,
                    background: 'linear-gradient(45deg, #FF6B6B 30%, #FF8E8E 90%)',
                    boxShadow: '0 4px 15px rgba(255,107,107,0.5)',
                    border: '2px solid white',
                    animation: 'glow 2s infinite',
                    '@keyframes glow': {
                      '0%, 100%': { boxShadow: '0 4px 15px rgba(255,107,107,0.4)' },
                      '50%': { boxShadow: '0 4px 25px rgba(255,107,107,0.7)' },
                    }
                  }}
                />

                <IconButton
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    zIndex: 2,
                    bgcolor: 'rgba(255,255,255,0.95)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    transition: 'all 0.3s',
                    '&:hover': { 
                      bgcolor: '#FF6B6B',
                      transform: 'scale(1.15) rotate(10deg)',
                      '& i': { color: 'white !important' }
                    }
                  }}
                  size="small"
                  onClick={() => toggleWishlist(product.id)}
                >
                  <i 
                    className={wishlist.includes(product.id) ? 'ri-heart-fill' : 'ri-heart-line'}
                    style={{ color: wishlist.includes(product.id) ? '#FF6B6B' : '#666', fontSize: 18, transition: 'color 0.3s' }}
                  />
                </IconButton>

                <Box sx={{ position: 'relative', overflow: 'hidden', bgcolor: '#f5f5f5' }}>
                  <CardMedia
                    component="img"
                    height="220"
                    image={product.image}
                    alt={product.name}
                    className="product-image"
                    sx={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
                  />
                  
                  <Box
                    className="quick-actions"
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      p: 2,
                      display: 'flex',
                      gap: 1,
                      justifyContent: 'center',
                      background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)',
                      opacity: 0,
                      transform: 'translateY(20px)',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <IconButton size="small" sx={{ bgcolor: 'white', '&:hover': { bgcolor: '#FF6B6B', color: 'white' } }}>
                      <i className='ri-eye-line' style={{ fontSize: 18 }} />
                    </IconButton>
                    <IconButton size="small" sx={{ bgcolor: 'white', '&:hover': { bgcolor: '#FF6B6B', color: 'white' } }}>
                      <i className='ri-share-line' style={{ fontSize: 18 }} />
                    </IconButton>
                  </Box>
                </Box>

                <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                  <Typography variant="caption" sx={{ color: '#FF6B6B', fontWeight: 600, fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: 1, display: 'block', mb: 0.5 }}>
                    {product.category}
                  </Typography>
                  
                  <Typography variant="body1" sx={{ fontWeight: 600, mb: 1, fontSize: '0.95rem', minHeight: 44, lineHeight: 1.4, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                    {product.name}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                    <Box sx={{ display: 'flex', gap: 0.3 }}>
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className={i < Math.floor(product.rating) ? 'ri-star-fill' : 'ri-star-line'} style={{ color: '#FFB400', fontSize: 14 }} />
                      ))}
                    </Box>
                    <Typography variant="caption" sx={{ fontSize: '0.7rem', fontWeight: 600, color: 'text.secondary' }}>
                      {product.rating} <span style={{ fontWeight: 400 }}>({product.reviews})</span>
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.5, flexWrap: 'wrap' }}>
                    <Typography variant="h6" sx={{ fontWeight: 800, fontSize: '1.25rem', background: 'linear-gradient(45deg, #FF6B6B 30%, #FF8E8E 90%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                      ${product.price}
                    </Typography>
                    {product.originalPrice && (
                      <>
                        <Typography variant="body2" sx={{ textDecoration: 'line-through', color: 'text.disabled', fontSize: '0.85rem', fontWeight: 500 }}>
                          ${product.originalPrice}
                        </Typography>
                        <Chip label={`Save $${(product.originalPrice - product.price).toFixed(0)}`} size="small" sx={{ height: 20, fontSize: '0.65rem', fontWeight: 700, bgcolor: 'success.light', color: 'success.dark' }} />
                      </>
                    )}
                  </Box>
                </CardContent>

                <CardActions sx={{ p: 2, pt: 0, gap: 1 }}>
                  <Button fullWidth variant="contained" size="small" startIcon={<i className='ri-shopping-cart-line' />} sx={{ borderRadius: 2, py: 1, fontWeight: 700, fontSize: '0.8rem', background: 'linear-gradient(45deg, #FF6B6B 30%, #FF8E8E 90%)', boxShadow: '0 4px 12px rgba(255,107,107,0.3)', textTransform: 'uppercase', letterSpacing: 0.5, '&:hover': { boxShadow: '0 6px 20px rgba(255,107,107,0.4)', transform: 'translateY(-2px)' } }}>
                    Add to Cart
                  </Button>
                  <Tooltip title="Request Special Offer" arrow>
                    <IconButton size="small" onClick={() => handleRequestOffer(product)} sx={{ border: '2px solid', borderColor: '#FF6B6B', borderRadius: 2, background: 'linear-gradient(135deg, rgba(255,107,107,0.1) 0%, rgba(255,142,142,0.1) 100%)', color: '#FF6B6B', transition: 'all 0.3s', '&:hover': { background: '#FF6B6B', color: 'white', transform: 'rotate(10deg) scale(1.1)' } }}>
                      <i className='ri-price-tag-3-line' style={{ fontSize: 18 }} />
                    </IconButton>
                  </Tooltip>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Trending Products Section */}
      <Box sx={{ bgcolor: 'white', py: 6 }}>
        <Container maxWidth="xl">
          <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 700,
                  background: 'linear-gradient(45deg, #4ECDC4 30%, #44A8A0 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Trending Now
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Most popular products this week
              </Typography>
            </Box>
            <Button variant="outlined" size="small" endIcon={<i className='ri-fire-line' />}>
              View All
            </Button>
          </Box>

          <Grid container spacing={3}>
            {trendingProducts.map((product) => (
              <Grid item xs={12} sm={6} md={3} key={product.id}>
                <Card 
                  onClick={() => router.push(`/store/${product.id}`)}
                  sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 3,
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    overflow: 'hidden',
                    border: '1px solid',
                    borderColor: 'divider',
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,1) 100%)',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'translateY(-12px) scale(1.02)',
                      boxShadow: '0 20px 40px rgba(78,205,196,0.2)',
                      borderColor: '#4ECDC4',
                      '& .product-image': { transform: 'scale(1.1) rotate(2deg)' },
                      '& .quick-actions': { opacity: 1, transform: 'translateY(0)' },
                      '& .trending-badge': {
                        animation: 'fire 0.8s ease-in-out infinite',
                      }
                    },
                    '@keyframes fire': {
                      '0%, 100%': { transform: 'scale(1)' },
                      '50%': { transform: 'scale(1.1)' },
                    }
                  }}
                >
                  {/* Decorative Corner */}
                  <Box sx={{ position: 'absolute', top: 0, right: 0, width: 80, height: 80, background: 'linear-gradient(135deg, transparent 50%, rgba(78,205,196,0.1) 50%)', zIndex: 0 }} />

                  <Chip
                    icon={<i className='ri-fire-fill' style={{ color: 'white', fontSize: 14 }} />}
                    label="TRENDING"
                    className="trending-badge"
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 12,
                      left: 12,
                      zIndex: 2,
                      fontWeight: 800,
                      color: 'white',
                      fontSize: '0.7rem',
                      height: 24,
                      background: 'linear-gradient(45deg, #4ECDC4 30%, #44A8A0 90%)',
                      boxShadow: '0 4px 15px rgba(78,205,196,0.5)',
                      border: '2px solid white',
                      '& .MuiChip-icon': { marginLeft: '4px' }
                    }}
                  />

                  <IconButton
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      zIndex: 2,
                      bgcolor: 'rgba(255,255,255,0.95)',
                      backdropFilter: 'blur(10px)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      transition: 'all 0.3s',
                      '&:hover': { 
                        bgcolor: '#FF6B6B',
                        transform: 'scale(1.15) rotate(10deg)',
                        '& i': { color: 'white !important' }
                      }
                    }}
                    size="small"
                    onClick={() => toggleWishlist(product.id)}
                  >
                    <i 
                      className={wishlist.includes(product.id) ? 'ri-heart-fill' : 'ri-heart-line'}
                      style={{ color: wishlist.includes(product.id) ? '#FF6B6B' : '#666', fontSize: 18, transition: 'color 0.3s' }}
                    />
                  </IconButton>

                  <Box sx={{ position: 'relative', overflow: 'hidden', bgcolor: '#f5f5f5' }}>
                    <CardMedia
                      component="img"
                      height="220"
                      image={product.image}
                      alt={product.name}
                      className="product-image"
                      sx={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
                    />
                    
                    <Box
                      className="quick-actions"
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        p: 2,
                        display: 'flex',
                        gap: 1,
                        justifyContent: 'center',
                        background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)',
                        opacity: 0,
                        transform: 'translateY(20px)',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <IconButton size="small" sx={{ bgcolor: 'white', '&:hover': { bgcolor: '#4ECDC4', color: 'white' } }}>
                        <i className='ri-eye-line' style={{ fontSize: 18 }} />
                      </IconButton>
                      <IconButton size="small" sx={{ bgcolor: 'white', '&:hover': { bgcolor: '#4ECDC4', color: 'white' } }}>
                        <i className='ri-share-line' style={{ fontSize: 18 }} />
                      </IconButton>
                    </Box>
                  </Box>

                  <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                    <Typography variant="caption" sx={{ color: '#4ECDC4', fontWeight: 600, fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: 1, display: 'block', mb: 0.5 }}>
                      {product.category}
                    </Typography>
                    
                    <Typography variant="body1" sx={{ fontWeight: 600, mb: 1, fontSize: '0.95rem', minHeight: 44, lineHeight: 1.4, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                      {product.name}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                      <Box sx={{ display: 'flex', gap: 0.3 }}>
                        {[...Array(5)].map((_, i) => (
                          <i key={i} className={i < Math.floor(product.rating) ? 'ri-star-fill' : 'ri-star-line'} style={{ color: '#FFB400', fontSize: 14 }} />
                        ))}
                      </Box>
                      <Typography variant="caption" sx={{ fontSize: '0.7rem', fontWeight: 600, color: 'text.secondary' }}>
                        {product.rating} <span style={{ fontWeight: 400 }}>({product.reviews})</span>
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.5, flexWrap: 'wrap' }}>
                      <Typography variant="h6" sx={{ fontWeight: 800, fontSize: '1.25rem', background: 'linear-gradient(45deg, #4ECDC4 30%, #44A8A0 90%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        ${product.price}
                      </Typography>
                      {product.originalPrice && (
                        <>
                          <Typography variant="body2" sx={{ textDecoration: 'line-through', color: 'text.disabled', fontSize: '0.85rem', fontWeight: 500 }}>
                            ${product.originalPrice}
                          </Typography>
                          <Chip label={`${product.sold} sold`} size="small" sx={{ height: 20, fontSize: '0.65rem', fontWeight: 700, bgcolor: '#4ECDC4', color: 'white' }} />
                        </>
                      )}
                    </Box>
                  </CardContent>

                  <CardActions sx={{ p: 2, pt: 0, gap: 1 }}>
                    <Button fullWidth variant="contained" size="small" startIcon={<i className='ri-shopping-cart-line' />} sx={{ borderRadius: 2, py: 1, fontWeight: 700, fontSize: '0.8rem', background: 'linear-gradient(45deg, #4ECDC4 30%, #44A8A0 90%)', boxShadow: '0 4px 12px rgba(78,205,196,0.3)', textTransform: 'uppercase', letterSpacing: 0.5, '&:hover': { boxShadow: '0 6px 20px rgba(78,205,196,0.4)', transform: 'translateY(-2px)' } }}>
                      Add to Cart
                    </Button>
                    <Tooltip title="Request Special Offer" arrow>
                      <IconButton size="small" onClick={() => handleRequestOffer(product)} sx={{ border: '2px solid', borderColor: '#4ECDC4', borderRadius: 2, background: 'linear-gradient(135deg, rgba(78,205,196,0.1) 0%, rgba(68,168,160,0.1) 100%)', color: '#4ECDC4', transition: 'all 0.3s', '&:hover': { background: '#4ECDC4', color: 'white', transform: 'rotate(10deg) scale(1.1)' } }}>
                        <i className='ri-price-tag-3-line' style={{ fontSize: 18 }} />
                      </IconButton>
                    </Tooltip>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Limited Time Offers Section */}
      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 700,
              mb: 1,
              background: 'linear-gradient(45deg, #FF6B6B 30%, #FFB347 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Limited Time Offers
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Hurry! These deals won't last long
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {limitedOffers.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product.id}>
              <Card 
                onClick={() => router.push(`/store/${product.id}`)}
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 3,
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                  border: '2px solid',
                  borderColor: 'error.main',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,235,238,1) 100%)',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-12px) scale(1.02)',
                    boxShadow: '0 20px 40px rgba(255,107,107,0.3)',
                    borderColor: '#FF6B6B',
                    '& .product-image': { transform: 'scale(1.15) rotate(-2deg)' },
                    '& .quick-actions': { opacity: 1, transform: 'translateY(0)' },
                    '& .timer-badge': {
                      animation: 'urgentPulse 0.6s ease-in-out infinite',
                    }
                  },
                  '@keyframes urgentPulse': {
                    '0%, 100%': { transform: 'scale(1)', boxShadow: '0 4px 15px rgba(255,107,107,0.4)' },
                    '50%': { transform: 'scale(1.05)', boxShadow: '0 6px 25px rgba(255,107,107,0.7)' },
                  }
                }}
              >
                {/* Urgent Corner Flash */}
                <Box sx={{ position: 'absolute', top: 0, right: 0, width: 100, height: 100, background: 'linear-gradient(135deg, transparent 50%, rgba(255,107,107,0.2) 50%)', zIndex: 0 }} />
                <Box sx={{ position: 'absolute', top: 0, left: 0, width: 100, height: 100, background: 'linear-gradient(45deg, rgba(255,107,107,0.1) 50%, transparent 50%)', zIndex: 0 }} />

                {/* Timer Badge */}
                <Box
                  className="timer-badge"
                  sx={{
                    position: 'absolute',
                    top: 12,
                    left: 12,
                    zIndex: 2,
                    background: 'linear-gradient(45deg, #FF6B6B 30%, #FF8E8E 90%)',
                    color: 'white',
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 2,
                    fontWeight: 800,
                    fontSize: '0.7rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    boxShadow: '0 4px 15px rgba(255,107,107,0.5)',
                    border: '2px solid white',
                  }}
                >
                  <i className='ri-time-line' style={{ fontSize: 14 }} />
                  {product.timeLeft}
                </Box>

                {/* Discount Badge */}
                <Chip
                  label={`-${product.discount}%`}
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    zIndex: 2,
                    fontWeight: 900,
                    fontSize: '1rem',
                    color: 'white',
                    height: 36,
                    background: 'linear-gradient(45deg, #FF6B6B 30%, #FFB347 90%)',
                    boxShadow: '0 6px 20px rgba(255,107,107,0.5)',
                    border: '2px solid white',
                    animation: 'discountPulse 2s infinite',
                    '@keyframes discountPulse': {
                      '0%, 100%': { transform: 'scale(1) rotate(0deg)' },
                      '25%': { transform: 'scale(1.1) rotate(-5deg)' },
                      '75%': { transform: 'scale(1.1) rotate(5deg)' },
                    }
                  }}
                />

                {/* Wishlist Heart */}
                <IconButton
                  sx={{
                    position: 'absolute',
                    top: 56,
                    right: 8,
                    zIndex: 2,
                    bgcolor: 'rgba(255,255,255,0.95)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    transition: 'all 0.3s',
                    '&:hover': { 
                      bgcolor: '#FF6B6B',
                      transform: 'scale(1.15) rotate(10deg)',
                      '& i': { color: 'white !important' }
                    }
                  }}
                  size="small"
                  onClick={() => toggleWishlist(product.id)}
                >
                  <i 
                    className={wishlist.includes(product.id) ? 'ri-heart-fill' : 'ri-heart-line'}
                    style={{ color: wishlist.includes(product.id) ? '#FF6B6B' : '#666', fontSize: 18, transition: 'color 0.3s' }}
                  />
                </IconButton>

                {/* Product Image */}
                <Box sx={{ position: 'relative', overflow: 'hidden', bgcolor: '#fff5f5' }}>
                  <CardMedia
                    component="img"
                    height="220"
                    image={product.image}
                    alt={product.name}
                    className="product-image"
                    sx={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
                  />
                  
                  <Box
                    className="quick-actions"
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      p: 2,
                      display: 'flex',
                      gap: 1,
                      justifyContent: 'center',
                      background: 'linear-gradient(to top, rgba(255,107,107,0.9) 0%, transparent 100%)',
                      opacity: 0,
                      transform: 'translateY(20px)',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <IconButton size="small" sx={{ bgcolor: 'white', '&:hover': { bgcolor: '#FF6B6B', color: 'white' } }}>
                      <i className='ri-eye-line' style={{ fontSize: 18 }} />
                    </IconButton>
                    <IconButton size="small" sx={{ bgcolor: 'white', '&:hover': { bgcolor: '#FF6B6B', color: 'white' } }}>
                      <i className='ri-share-line' style={{ fontSize: 18 }} />
                    </IconButton>
                  </Box>

                  {/* Flash Sale Banner */}
                  <Box sx={{ position: 'absolute', bottom: 8, left: 8, bgcolor: 'rgba(255,107,107,0.95)', color: 'white', px: 1.5, py: 0.5, borderRadius: 1, fontSize: '0.7rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: 0.5, boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>
                    <i className='ri-flashlight-fill' style={{ fontSize: 14 }} />
                    FLASH SALE
                  </Box>
                </Box>

                <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                  <Typography variant="caption" sx={{ color: '#FF6B6B', fontWeight: 600, fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: 1, display: 'block', mb: 0.5 }}>
                    {product.category}
                  </Typography>
                  
                  <Typography variant="body1" sx={{ fontWeight: 600, mb: 1, fontSize: '0.95rem', minHeight: 44, lineHeight: 1.4, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                    {product.name}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                    <Box sx={{ display: 'flex', gap: 0.3 }}>
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className={i < Math.floor(product.rating) ? 'ri-star-fill' : 'ri-star-line'} style={{ color: '#FFB400', fontSize: 14 }} />
                      ))}
                    </Box>
                    <Typography variant="caption" sx={{ fontSize: '0.7rem', fontWeight: 600, color: 'text.secondary' }}>
                      {product.rating} <span style={{ fontWeight: 400 }}>({product.reviews})</span>
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.5, flexWrap: 'wrap' }}>
                    <Typography variant="h6" sx={{ fontWeight: 900, fontSize: '1.35rem', background: 'linear-gradient(45deg, #FF6B6B 30%, #FFB347 90%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                      ${product.price}
                    </Typography>
                    {product.originalPrice && (
                      <>
                        <Typography variant="body2" sx={{ textDecoration: 'line-through', color: 'text.disabled', fontSize: '0.85rem', fontWeight: 500 }}>
                          ${product.originalPrice}
                        </Typography>
                        <Chip label={`Save $${(product.originalPrice - product.price).toFixed(0)}`} size="small" sx={{ height: 20, fontSize: '0.65rem', fontWeight: 700, bgcolor: 'error.main', color: 'white' }} />
                      </>
                    )}
                  </Box>
                </CardContent>

                <CardActions sx={{ p: 2, pt: 0, gap: 1 }}>
                  <Button fullWidth variant="contained" color="error" size="small" startIcon={<i className='ri-flashlight-fill' />} sx={{ borderRadius: 2, py: 1, fontWeight: 800, fontSize: '0.8rem', background: 'linear-gradient(45deg, #FF6B6B 30%, #FFB347 90%)', boxShadow: '0 4px 12px rgba(255,107,107,0.4)', textTransform: 'uppercase', letterSpacing: 0.5, animation: 'btnPulse 2s infinite', '&:hover': { boxShadow: '0 6px 20px rgba(255,107,107,0.5)', transform: 'translateY(-2px)' }, '@keyframes btnPulse': { '0%, 100%': { boxShadow: '0 4px 12px rgba(255,107,107,0.4)' }, '50%': { boxShadow: '0 6px 20px rgba(255,107,107,0.6)' } } }}>
                    Grab Deal
                  </Button>
                  <Tooltip title="Request Special Offer" arrow>
                    <IconButton size="small" onClick={() => handleRequestOffer(product)} sx={{ border: '2px solid', borderColor: '#FF6B6B', borderRadius: 2, background: 'linear-gradient(135deg, rgba(255,107,107,0.2) 0%, rgba(255,179,71,0.2) 100%)', color: '#FF6B6B', transition: 'all 0.3s', '&:hover': { background: 'linear-gradient(45deg, #FF6B6B 30%, #FFB347 90%)', color: 'white', transform: 'rotate(10deg) scale(1.1)' } }}>
                      <i className='ri-price-tag-3-line' style={{ fontSize: 18 }} />
                    </IconButton>
                  </Tooltip>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Special Offer Request Dialog */}
      <Dialog open={offerDialogOpen} onClose={() => setOfferDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                bgcolor: 'primary.lighter',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <i className='ri-price-tag-3-line' style={{ fontSize: 24, color: '#009BFF' }} />
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1.1rem' }}>
                Request Special Offer
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                {selectedProduct?.name}
              </Typography>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Your Name"
              placeholder="Enter your name"
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              placeholder="your@email.com"
            />
            <TextField
              fullWidth
              label="Phone Number"
              placeholder="+1 (555) 000-0000"
            />
            <TextField
              fullWidth
              label="Quantity"
              type="number"
              defaultValue={1}
            />
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Additional Notes"
              placeholder="Tell us about your requirements..."
            />
            <Alert severity="info" icon={<i className='ri-information-line' />}>
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
      <Box 
        sx={{ 
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
          color: 'white', 
          py: 8, 
          mt: 8,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: 'linear-gradient(90deg, #009BFF 0%, #00D4FF 50%, #009BFF 100%)',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: -100,
            right: -100,
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,155,255,0.15) 0%, transparent 70%)',
          }
        }}
      >
        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={5}>
            {/* Brand Section */}
            <Grid item xs={12} md={4}>
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                  <Box
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: 2.5,
                      background: 'linear-gradient(135deg, #009BFF 0%, #00D4FF 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 8px 25px rgba(0,155,255,0.3)',
                    }}
                  >
                    <i className='ri-shopping-bag-3-fill' style={{ color: 'white', fontSize: 26 }} />
                  </Box>
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      fontWeight: 900,
                      background: 'linear-gradient(45deg, #009BFF 30%, #00D4FF 90%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      filter: 'drop-shadow(0 2px 8px rgba(0,155,255,0.3))',
                      letterSpacing: -1
                    }}
                  >
                    Khamatko
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ opacity: 0.85, lineHeight: 1.7, fontSize: '0.95rem', mb: 3 }}>
                  Your one-stop destination for quality products and amazing deals. We bring you the best shopping experience with secure payments and fast delivery.
                </Typography>
                
                {/* Newsletter */}
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5, fontSize: '0.9rem' }}>
                    Subscribe to our Newsletter
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <TextField
                      size="small"
                      placeholder="Enter your email"
                      sx={{
                        flex: 1,
                        '& .MuiOutlinedInput-root': {
                          bgcolor: 'rgba(255,255,255,0.1)',
                          backdropFilter: 'blur(10px)',
                          color: 'white',
                          borderRadius: 2,
                          '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                          '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
                          '&.Mui-focused fieldset': { borderColor: '#009BFF' },
                          '& input::placeholder': { color: 'rgba(255,255,255,0.6)' }
                        }
                      }}
                    />
                    <Button 
                      variant="contained"
                      sx={{
                        background: 'linear-gradient(135deg, #009BFF 0%, #00D4FF 100%)',
                        px: 3,
                        borderRadius: 2,
                        fontWeight: 700,
                        boxShadow: '0 4px 15px rgba(0,155,255,0.4)',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #0088E6 0%, #00BFEF 100%)',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 6px 20px rgba(0,155,255,0.5)',
                        }
                      }}
                    >
                      Subscribe
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Grid>

            {/* Quick Links */}
            <Grid item xs={12} sm={6} md={2}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, fontSize: '1.1rem', position: 'relative', display: 'inline-block', '&::after': { content: '""', position: 'absolute', bottom: -8, left: 0, width: 30, height: 3, bgcolor: '#009BFF', borderRadius: 2 } }}>
                Shop
              </Typography>
              <Stack spacing={1.5} sx={{ mt: 3 }}>
                {['New Arrivals', 'Best Sellers', 'Sale Items', 'Gift Cards', 'Track Order'].map((link) => (
                  <Box 
                    key={link}
                    sx={{ 
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      '&:hover': { 
                        transform: 'translateX(8px)',
                        '& i': { color: '#009BFF' },
                        '& .MuiTypography-root': { color: '#009BFF' }
                      }
                    }}
                  >
                    <i className='ri-arrow-right-s-line' style={{ fontSize: 18, opacity: 0.7, transition: 'color 0.3s' }} />
                    <Typography variant="body2" sx={{ opacity: 0.85, fontSize: '0.9rem', transition: 'color 0.3s' }}>
                      {link}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Grid>

            {/* Customer Service */}
            <Grid item xs={12} sm={6} md={2}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, fontSize: '1.1rem', position: 'relative', display: 'inline-block', '&::after': { content: '""', position: 'absolute', bottom: -8, left: 0, width: 30, height: 3, bgcolor: '#009BFF', borderRadius: 2 } }}>
                Support
              </Typography>
              <Stack spacing={1.5} sx={{ mt: 3 }}>
                {['Help Center', 'Contact Us', 'Shipping Info', 'Returns', 'FAQs'].map((link) => (
                  <Box 
                    key={link}
                    sx={{ 
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      '&:hover': { 
                        transform: 'translateX(8px)',
                        '& i': { color: '#009BFF' },
                        '& .MuiTypography-root': { color: '#009BFF' }
                      }
                    }}
                  >
                    <i className='ri-arrow-right-s-line' style={{ fontSize: 18, opacity: 0.7, transition: 'color 0.3s' }} />
                    <Typography variant="body2" sx={{ opacity: 0.85, fontSize: '0.9rem', transition: 'color 0.3s' }}>
                      {link}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Grid>

            {/* Company */}
            <Grid item xs={12} sm={6} md={2}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, fontSize: '1.1rem', position: 'relative', display: 'inline-block', '&::after': { content: '""', position: 'absolute', bottom: -8, left: 0, width: 30, height: 3, bgcolor: '#009BFF', borderRadius: 2 } }}>
                Company
              </Typography>
              <Stack spacing={1.5} sx={{ mt: 3 }}>
                {['About Us', 'Careers', 'Press', 'Affiliates', 'Partners'].map((link) => (
                  <Box 
                    key={link}
                    sx={{ 
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      '&:hover': { 
                        transform: 'translateX(8px)',
                        '& i': { color: '#009BFF' },
                        '& .MuiTypography-root': { color: '#009BFF' }
                      }
                    }}
                  >
                    <i className='ri-arrow-right-s-line' style={{ fontSize: 18, opacity: 0.7, transition: 'color 0.3s' }} />
                    <Typography variant="body2" sx={{ opacity: 0.85, fontSize: '0.9rem', transition: 'color 0.3s' }}>
                      {link}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Grid>

            {/* Contact & Social */}
            <Grid item xs={12} sm={6} md={2}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, fontSize: '1.1rem', position: 'relative', display: 'inline-block', '&::after': { content: '""', position: 'absolute', bottom: -8, left: 0, width: 30, height: 3, bgcolor: '#009BFF', borderRadius: 2 } }}>
                Connect
              </Typography>
              <Stack spacing={2} sx={{ mt: 3 }}>
                {/* Contact Info */}
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                    <Box sx={{ width: 36, height: 36, borderRadius: 2, bgcolor: 'rgba(0,155,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <i className='ri-phone-line' style={{ color: '#009BFF', fontSize: 18 }} />
                    </Box>
                    <Typography variant="body2" sx={{ opacity: 0.85, fontSize: '0.9rem' }}>
                      +1 234 567 8900
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                    <Box sx={{ width: 36, height: 36, borderRadius: 2, bgcolor: 'rgba(0,155,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <i className='ri-mail-line' style={{ color: '#009BFF', fontSize: 18 }} />
                    </Box>
                    <Typography variant="body2" sx={{ opacity: 0.85, fontSize: '0.9rem' }}>
                      hello@Khamatko.com
                    </Typography>
                  </Box>
                </Box>

                {/* Social Media */}
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5, fontSize: '0.85rem', opacity: 0.7 }}>
                    FOLLOW US
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    {[
                      { icon: 'ri-facebook-fill', color: '#1877F2' },
                      { icon: 'ri-instagram-line', color: '#E4405F' },
                      { icon: 'ri-twitter-x-line', color: '#1DA1F2' },
                      { icon: 'ri-linkedin-fill', color: '#0A66C2' }
                    ].map((social, index) => (
                      <IconButton 
                        key={index}
                        sx={{ 
                          color: 'white', 
                          bgcolor: 'rgba(255,255,255,0.1)',
                          backdropFilter: 'blur(10px)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          transition: 'all 0.3s',
                          '&:hover': { 
                            bgcolor: social.color,
                            transform: 'translateY(-4px) rotate(10deg)',
                            boxShadow: `0 8px 20px ${social.color}40`,
                            borderColor: social.color,
                          }
                        }}
                      >
                        <i className={social.icon} style={{ fontSize: 20 }} />
                      </IconButton>
                    ))}
                  </Stack>
                </Box>
              </Stack>
            </Grid>
          </Grid>

          {/* Bottom Bar */}
          <Box 
            sx={{ 
              mt: 6, 
              pt: 4, 
              borderTop: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 3
            }}
          >
            <Typography variant="body2" sx={{ opacity: 0.7, fontSize: '0.85rem' }}>
              © 2024 Khamatko. All rights reserved. | Made with <i className='ri-heart-fill' style={{ color: '#FF6B6B', fontSize: 14 }} /> by Khamatko Team
            </Typography>
            
            <Stack direction="row" spacing={3}>
              {['Privacy Policy', 'Terms of Service', 'Cookies'].map((link) => (
                <Typography 
                  key={link}
                  variant="body2" 
                  sx={{ 
                    opacity: 0.7, 
                    cursor: 'pointer', 
                    fontSize: '0.85rem',
                    transition: 'all 0.3s',
                    '&:hover': { 
                      opacity: 1,
                      color: '#009BFF'
                    } 
                  }}
                >
                  {link}
                </Typography>
              ))}
            </Stack>

            {/* Payment Methods */}
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="caption" sx={{ opacity: 0.6, fontSize: '0.75rem', mr: 1 }}>
                We Accept:
              </Typography>
              {['ri-visa-line', 'ri-mastercard-line', 'ri-paypal-line', 'ri-bank-card-line'].map((icon, index) => (
                <Box 
                  key={index}
                  sx={{ 
                    width: 40, 
                    height: 28, 
                    borderRadius: 1, 
                    bgcolor: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}
                >
                  <i className={icon} style={{ fontSize: 20, color: '#666' }} />
                </Box>
              ))}
            </Stack>
          </Box>
        </Container>

        {/* Floating decoration */}
        <Box
          sx={{
            position: 'absolute',
            top: -50,
            left: -50,
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,212,255,0.15) 0%, transparent 70%)',
          }}
        />
      </Box>
    </Box>
  )
}

export default StorePage

