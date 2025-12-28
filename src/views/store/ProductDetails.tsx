'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import StoreFooter from '@/components/store/StoreFooter'
import StoreHeader from '@/components/store/StoreHeader'
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  IconButton,
  Rating,
  Chip,
  Stack,
  TextField,
  Avatar,
  Divider,
  Card,
  CardContent,
  Breadcrumbs,
  Link,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Badge,
  AppBar,
  Toolbar,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Snackbar
} from '@mui/material'
import Image from 'next/image'

// Mock product data
const getProductById = (id: string) => {
  return {
    id,
    name: 'Premium Ergonomic Office Chair',
    brand: 'ComfortZone',
    sku: 'CZ-ERGO-001',
    price: 499.99,
    originalPrice: 699.99,
    discount: 29,
    rating: 4.5,
    reviewCount: 127,
    inStock: true,
    stockCount: 24,
    description:
      'Crafted with breathable mesh and high-density foam, this chair offers adjustable lumbar support, 3D armrests, and a recline feature. Its robust frame ensures durability, while the smooth-rolling casters provide effortless mobility. Perfect for any modern workspace.',
    images: [
      'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=500',
      'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=500',
      'https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=500',
      'https://images.unsplash.com/photo-1589395937772-e5d8c8d4f6d5?w=500'
    ],
    specifications: [
      { label: 'Material', value: 'Breathable Mesh, High-Density Foam' },
      { label: 'Adjustments', value: 'Lumbar, Armrests (3D), Recline, Seat Height' },
      { label: 'Weight Capacity', value: 'Up to 150 kg (330 lbs)' },
      { label: 'Base Type', value: '5-Star Nylon Base' },
      { label: 'Warranty', value: '5 Years' },
      { label: 'Assembly', value: 'Easy self-assembly required' }
    ],
    reviews: [
      {
        id: 1,
        name: 'Jane D.',
        rating: 5,
        date: '2023-10-26',
        title: "Best Chair I've Ever Owned!",
        comment:
          "I spend countless hours at my desk, and this chair has been a game-changer. My back pain is gone, and the adjustments are fantastic. Highly recommend!"
      },
      {
        id: 2,
        name: 'Mark P.',
        rating: 4,
        date: '2023-08-20',
        title: 'Great Value for the Price',
        comment:
          'Comfortable and looks good. Assembly was straightforward. Only wish the armrests had a bit more padding, but overall very satisfied.'
      },
      {
        id: 3,
        name: 'Sarah L.',
        rating: 5,
        date: '2023-09-15',
        title: 'Improved My Productivity',
        comment:
          'No more fidgeting! This chair keeps me comfortable and focused. The mesh back is excellent for air circulation, too.'
      }
    ],
    features: [
      { icon: 'ri-shield-check-line', label: '5-Year Warranty' },
      { icon: 'ri-truck-line', label: 'Free Shipping' },
      { icon: 'ri-arrow-go-back-line', label: '30-Day Returns' },
      { icon: 'ri-customer-service-2-line', label: '24/7 Support' }
    ],
    relatedProducts: [
      { id: 'p2', name: 'Desk Lamp Pro', price: 79.99, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=300' },
      { id: 'p3', name: 'Standing Desk', price: 399.99, image: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=300' },
      { id: 'p4', name: 'Monitor Arm', price: 129.99, image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300' },
      { id: 'p5', name: 'Keyboard Tray', price: 59.99, image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300' }
    ]
  }
}

type ProductDetailsProps = {
  productId: string
}

const ProductDetails = ({ productId }: ProductDetailsProps) => {
  const router = useRouter()
  const product = getProductById(productId)

  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [wishlist, setWishlist] = useState(false)
  const [offerDialogOpen, setOfferDialogOpen] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [cartCount] = useState(2)
  const [wishlistCount] = useState(5)

  const handleQuantityChange = (type: 'increase' | 'decrease') => {
    if (type === 'increase') {
      setQuantity(prev => Math.min(prev + 1, product.stockCount))
    } else {
      setQuantity(prev => Math.max(prev - 1, 1))
    }
  }

  const handleAddToCart = () => {
    setSnackbarMessage(`${quantity} item(s) added to cart!`)
    setSnackbarOpen(true)
  }

  const handleRequestOffer = () => {
    setOfferDialogOpen(false)
    setSnackbarMessage('Special offer request submitted successfully!')
    setSnackbarOpen(true)
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8f9fa' }}>
      {/* Header */}
      <StoreHeader cartCount={cartCount} wishlistCount={wishlistCount} />

      {/* Breadcrumbs */}
      <Container maxWidth="xl" sx={{ mt: 3 }}>
        <Breadcrumbs
          separator={<i className="ri-arrow-right-s-line" style={{ fontSize: 18, color: '#999' }} />}
          sx={{ mb: 4 }}
        >
          <Link
            href="/store"
            underline="hover"
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: 'text.secondary',
              fontSize: '0.85rem',
              transition: 'color 0.3s',
              '&:hover': { color: 'primary.main' }
            }}
          >
            <i className="ri-home-line" style={{ marginRight: 4, fontSize: 16 }} />
            Home
          </Link>
          <Link
            href="/store"
            underline="hover"
            sx={{ color: 'text.secondary', fontSize: '0.85rem', transition: 'color 0.3s', '&:hover': { color: 'primary.main' } }}
          >
            Shop
          </Link>
          <Typography sx={{ color: 'text.primary', fontSize: '0.85rem', fontWeight: 600 }}>{product.name}</Typography>
        </Breadcrumbs>

        {/* Main Product Section */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          {/* Left: Images */}
          <Grid item xs={12} md={6}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 4,
                overflow: 'hidden',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                position: 'sticky',
                top: 100
              }}
            >
              {/* Main Image */}
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: 500,
                  bgcolor: '#f5f5f5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  cursor: 'zoom-in'
                }}
              >
                {product.discount > 0 && (
                  <Chip
                    label={`-${product.discount}%`}
                    sx={{
                      position: 'absolute',
                      top: 20,
                      left: 20,
                      background: 'linear-gradient(135deg, #FF6B6B 0%, #FF5252 100%)',
                      color: 'white',
                      fontWeight: 700,
                      fontSize: '1rem',
                      height: 40,
                      borderRadius: 3,
                      boxShadow: '0 4px 15px rgba(255, 107, 107, 0.4)',
                      zIndex: 1,
                      animation: 'pulse 2s infinite'
                    }}
                  />
                )}
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  style={{ objectFit: 'contain', padding: 20 }}
                />
              </Box>

              {/* Thumbnail Gallery */}
              <Box sx={{ p: 2, display: 'flex', gap: 1.5, bgcolor: 'white' }}>
                {product.images.map((img, index) => (
                  <Box
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: 2,
                      overflow: 'hidden',
                      border: selectedImage === index ? '3px solid #009BFF' : '2px solid #e0e0e0',
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      position: 'relative',
                      '&:hover': {
                        transform: 'scale(1.1)',
                        boxShadow: '0 4px 15px rgba(0, 155, 255, 0.3)',
                        borderColor: '#009BFF'
                      }
                    }}
                  >
                    <Image src={img} alt={`${product.name} ${index + 1}`} fill style={{ objectFit: 'cover' }} />
                  </Box>
                ))}
              </Box>
            </Card>
          </Grid>

          {/* Right: Product Details */}
          <Grid item xs={12} md={6}>
            <Box>
              {/* Brand & SKU */}
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1, fontSize: '0.9rem' }}>
                Brand: <strong>{product.brand}</strong> | SKU: {product.sku}
              </Typography>

              {/* Product Name */}
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  fontSize: '1.8rem',
                  mb: 2,
                  background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: -1,
                  lineHeight: 1.2
                }}
              >
                {product.name}
              </Typography>

              {/* Price */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 900,
                    fontSize: '2rem',
                    background: 'linear-gradient(135deg, #009BFF 0%, #00D4FF 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  ${product.price}
                </Typography>
                {product.originalPrice && (
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: '1.1rem',
                      textDecoration: 'line-through',
                      color: 'text.secondary',
                      fontWeight: 500
                    }}
                  >
                    ${product.originalPrice}
                  </Typography>
                )}
                {product.discount > 0 && (
                  <Chip
                    label={`Save ${product.discount}%`}
                    size="small"
                    sx={{
                      bgcolor: 'rgba(76, 175, 80, 0.1)',
                      color: '#4CAF50',
                      fontWeight: 700,
                      fontSize: '0.8rem'
                    }}
                  />
                )}
              </Box>

              {/* Rating & Reviews */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Rating value={product.rating} precision={0.5} readOnly size="medium" />
                  <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1rem' }}>
                    {product.rating}
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>
                  ({product.reviewCount} reviews)
                </Typography>
              </Box>

              {/* Stock Status */}
              <Box sx={{ mb: 3 }}>
                {product.inStock ? (
                  <Chip
                    icon={<i className="ri-checkbox-circle-line" style={{ fontSize: 18 }} />}
                    label={`In Stock (${product.stockCount} available)`}
                    sx={{
                      bgcolor: 'rgba(76, 175, 80, 0.1)',
                      color: '#4CAF50',
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      height: 36
                    }}
                  />
                ) : (
                  <Chip
                    icon={<i className="ri-close-circle-line" style={{ fontSize: 18 }} />}
                    label="Out of Stock"
                    sx={{
                      bgcolor: 'rgba(244, 67, 54, 0.1)',
                      color: '#F44336',
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      height: 36
                    }}
                  />
                )}
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* Description */}
              <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7, mb: 4, fontSize: '0.95rem' }}>
                {product.description}
              </Typography>

              {/* Features */}
              <Grid container spacing={2} sx={{ mb: 4 }}>
                {product.features.map((feature, index) => (
                  <Grid item xs={6} key={index}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        p: 2,
                        borderRadius: 3,
                        bgcolor: 'rgba(0, 155, 255, 0.05)',
                        border: '1px solid rgba(0, 155, 255, 0.1)',
                        transition: 'all 0.3s',
                        '&:hover': {
                          bgcolor: 'rgba(0, 155, 255, 0.1)',
                          transform: 'translateY(-4px)',
                          boxShadow: '0 8px 20px rgba(0, 155, 255, 0.15)'
                        }
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
                          justifyContent: 'center'
                        }}
                      >
                        <i className={feature.icon} style={{ color: 'white', fontSize: 20 }} />
                      </Box>
                      <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.85rem' }}>
                        {feature.label}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>

              <Divider sx={{ my: 3 }} />

              {/* Quantity Selector */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5, fontSize: '0.9rem' }}>
                  Quantity
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      border: '2px solid #e0e0e0',
                      borderRadius: 3,
                      overflow: 'hidden'
                    }}
                  >
                    <IconButton
                      onClick={() => handleQuantityChange('decrease')}
                      disabled={quantity <= 1}
                      sx={{
                        borderRadius: 0,
                        px: 2,
                        py: 1.5,
                        '&:hover': { bgcolor: 'rgba(0, 155, 255, 0.1)' }
                      }}
                    >
                      <i className="ri-subtract-line" />
                    </IconButton>
                    <Typography
                      sx={{
                        px: 4,
                        py: 1.5,
                        fontWeight: 700,
                        fontSize: '1.1rem',
                        minWidth: 60,
                        textAlign: 'center'
                      }}
                    >
                      {quantity}
                    </Typography>
                    <IconButton
                      onClick={() => handleQuantityChange('increase')}
                      disabled={quantity >= product.stockCount}
                      sx={{
                        borderRadius: 0,
                        px: 2,
                        py: 1.5,
                        '&:hover': { bgcolor: 'rgba(0, 155, 255, 0.1)' }
                      }}
                    >
                      <i className="ri-add-line" />
                    </IconButton>
                  </Box>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {product.stockCount} items available
                  </Typography>
                </Box>
              </Box>

              {/* Action Buttons */}
              <Stack spacing={2} sx={{ mb: 3 }}>
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  startIcon={<i className="ri-shopping-cart-line" />}
                  onClick={handleAddToCart}
                  sx={{
                    background: 'linear-gradient(135deg, #009BFF 0%, #00D4FF 100%)',
                    color: 'white',
                    py: 1.8,
                    borderRadius: 3,
                    fontSize: '1rem',
                    fontWeight: 700,
                    textTransform: 'none',
                    boxShadow: '0 8px 25px rgba(0, 155, 255, 0.4)',
                    transition: 'all 0.3s',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #0088E6 0%, #00BFEF 100%)',
                      transform: 'translateY(-4px)',
                      boxShadow: '0 12px 35px rgba(0, 155, 255, 0.5)'
                    }
                  }}
                >
                  Add to Cart
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  fullWidth
                  startIcon={<i className="ri-percent-line" />}
                  onClick={() => setOfferDialogOpen(true)}
                  sx={{
                    py: 1.8,
                    borderRadius: 3,
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    textTransform: 'none',
                    borderWidth: 2,
                    borderColor: '#009BFF',
                    color: '#009BFF',
                    transition: 'all 0.3s',
                    '&:hover': {
                      borderWidth: 2,
                      borderColor: '#009BFF',
                      bgcolor: 'rgba(0, 155, 255, 0.05)',
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  Request Special Offer
                </Button>
              </Stack>

              {/* Wishlist Button */}
              <Button
                variant="text"
                fullWidth
                startIcon={
                  <i
                    className={wishlist ? 'ri-heart-fill' : 'ri-heart-line'}
                    style={{ color: wishlist ? '#FF4757' : 'inherit' }}
                  />
                }
                onClick={() => setWishlist(!wishlist)}
                sx={{
                  py: 1.5,
                  color: wishlist ? '#FF4757' : 'text.secondary',
                  fontWeight: 600,
                  transition: 'all 0.3s',
                  '&:hover': {
                    bgcolor: 'rgba(255, 71, 87, 0.05)',
                    color: '#FF4757'
                  }
                }}
              >
                {wishlist ? 'Added to Wishlist' : 'Add to Wishlist'}
              </Button>
            </Box>
          </Grid>
        </Grid>

        {/* Specifications Section */}
        <Card
          elevation={0}
          sx={{
            borderRadius: 4,
            mb: 4,
            overflow: 'hidden',
            border: '1px solid rgba(0, 0, 0, 0.08)'
          }}
        >
          <Box
            sx={{
              p: 2,
              background: 'linear-gradient(135deg, #009BFF 0%, #00D4FF 100%)',
              display: 'flex',
              alignItems: 'center',
              gap: 2
            }}
          >
            <Box
              sx={{
                width: 50,
                height: 50,
                borderRadius: 2.5,
                bgcolor: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <i className="ri-file-list-3-line" style={{ color: 'white', fontSize: 26 }} />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: 'white', fontSize: '1.1rem' }}>
              Specifications
            </Typography>
          </Box>
          <CardContent sx={{ p: 0 }}>
            <Table>
              <TableBody>
                {product.specifications.map((spec, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      '&:hover': { bgcolor: 'rgba(0, 155, 255, 0.03)' },
                      '&:last-child td': { borderBottom: 0 }
                    }}
                  >
                    <TableCell
                      sx={{
                        width: '30%',
                        fontWeight: 700,
                        color: 'text.primary',
                        fontSize: '0.95rem',
                        py: 2.5,
                        px: 3
                      }}
                    >
                      {spec.label}
                    </TableCell>
                    <TableCell sx={{ color: 'text.secondary', fontSize: '0.95rem', py: 2.5, px: 3 }}>
                      {spec.value}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Customer Reviews Section */}
        <Card
          elevation={0}
          sx={{
            borderRadius: 4,
            mb: 6,
            overflow: 'hidden',
            border: '1px solid rgba(0, 0, 0, 0.08)'
          }}
        >
          <Box
            sx={{
              p: 2,
              background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box
                sx={{
                  width: 50,
                  height: 50,
                  borderRadius: 2.5,
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <i className="ri-star-line" style={{ color: 'white', fontSize: 26 }} />
              </Box>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: 'white', fontSize: '1.1rem' }}>
                  Customer Reviews ({product.reviewCount})
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                  <Rating value={product.rating} precision={0.5} readOnly size="small" />
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.85rem' }}>
                    {product.rating} out of 5
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Button
              variant="contained"
              sx={{
                bgcolor: 'white',
                color: '#1a1a2e',
                fontWeight: 700,
                px: 3,
                py: 1.5,
                borderRadius: 2.5,
                textTransform: 'none',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.9)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 20px rgba(255, 255, 255, 0.3)'
                }
              }}
            >
              Write a Review
            </Button>
          </Box>
          <CardContent sx={{ p: 4 }}>
            <Stack spacing={4}>
              {product.reviews.map(review => (
                <Box
                  key={review.id}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    bgcolor: 'rgba(0, 155, 255, 0.03)',
                    border: '1px solid rgba(0, 155, 255, 0.1)',
                    transition: 'all 0.3s',
                    '&:hover': {
                      bgcolor: 'rgba(0, 155, 255, 0.05)',
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 25px rgba(0, 155, 255, 0.1)'
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
                    <Avatar
                      sx={{
                        width: 50,
                        height: 50,
                        background: 'linear-gradient(135deg, #009BFF 0%, #00D4FF 100%)',
                        fontWeight: 700,
                        fontSize: '1.2rem'
                      }}
                    >
                      {review.name.charAt(0)}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1rem' }}>
                          {review.name}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
                          {review.date}
                        </Typography>
                      </Box>
                      <Rating value={review.rating} readOnly size="small" sx={{ mb: 1 }} />
                      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1, fontSize: '0.95rem' }}>
                        {review.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6, fontSize: '0.9rem' }}>
                        {review.comment}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Stack>
          </CardContent>
        </Card>

        {/* Related Products Section */}
        <Box sx={{ mb: 8 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
            <Box
              sx={{
                width: 50,
                height: 50,
                borderRadius: 2.5,
                background: 'linear-gradient(135deg, #009BFF 0%, #00D4FF 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <i className="ri-apps-line" style={{ color: 'white', fontSize: 26 }} />
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 800, fontSize: '1.5rem' }}>
              You May Also Like
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {product.relatedProducts.map(related => (
              <Grid item xs={12} sm={6} md={3} key={related.id}>
                <Card
                  elevation={0}
                  sx={{
                    borderRadius: 3,
                    overflow: 'hidden',
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 30px rgba(0, 155, 255, 0.2)',
                      borderColor: '#009BFF'
                    }
                  }}
                >
                  <Box sx={{ position: 'relative', height: 200, bgcolor: '#f5f5f5' }}>
                    <Image src={related.image} alt={related.name} fill style={{ objectFit: 'cover' }} />
                  </Box>
                  <CardContent>
                    <Typography variant="body1" sx={{ fontWeight: 600, mb: 1, fontSize: '0.9rem' }}>
                      {related.name}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 800,
                        fontSize: '1.1rem',
                        background: 'linear-gradient(135deg, #009BFF 0%, #00D4FF 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                      }}
                    >
                      ${related.price}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>

      {/* Special Offer Dialog */}
      <Dialog
        open={offerDialogOpen}
        onClose={() => setOfferDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
          }
        }}
      >
        <DialogTitle
          sx={{
            background: 'linear-gradient(135deg, #009BFF 0%, #00D4FF 100%)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            gap: 2
          }}
        >
          <i className="ri-percent-line" style={{ fontSize: 24 }} />
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.1rem' }}>
              Request Special Offer
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.9, fontSize: '0.8rem' }}>
              Get a custom quote for bulk orders or special requirements
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ p: 4, mt: 2 }}>
          <Stack spacing={3}>
            <TextField label="Your Name" fullWidth required />
            <TextField label="Email Address" type="email" fullWidth required />
            <TextField label="Phone Number" fullWidth />
            <TextField label="Quantity Needed" type="number" fullWidth defaultValue={quantity} />
            <TextField label="Additional Notes" multiline rows={4} fullWidth placeholder="Tell us about your requirements..." />
            <Alert severity="info" icon={<i className="ri-information-line" />}>
              Our team will review your request and get back to you within 24 hours with a custom quote.
            </Alert>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOfferDialogOpen(false)} variant="outlined" sx={{ borderRadius: 2 }}>
            Cancel
          </Button>
          <Button
            onClick={handleRequestOffer}
            variant="contained"
            sx={{
              background: 'linear-gradient(135deg, #009BFF 0%, #00D4FF 100%)',
              borderRadius: 2,
              px: 4
            }}
          >
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
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%', borderRadius: 2 }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {/* Footer */}
      <StoreFooter />
    </Box>
  )
}

export default ProductDetails

