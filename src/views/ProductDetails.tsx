'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

// MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Container from '@mui/material/Container'
import Chip from '@mui/material/Chip'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'

// Component Imports
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

// Swiper Imports
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

// Product images mock data
const productImages = [
  '/images/product-mock.png',
  '/images/product-mock.png',
  '/images/product-mock.png',
  '/images/product-mock.png',
  '/images/product-mock.png'
]

// Pricing tiers
const pricingTiers = [
  { price: 2.5, quantity: 200, total: 50, label: '200 piece for 50EGP' },
  { price: 3.0, quantity: 150, total: 45, label: '150 piece for 45egp' },
  { price: 4.0, quantity: 100, total: 40, label: '100 piece for 40egp' }
]

// Key features
const keyFeatures = [
  'Excellent Mechanical Strength And Flexibility',
  'High Clarity With Low Haze And Good Gloss',
  'Smooth And Stable Processing On Standard Polyethylene Extruders',
  'Suitable For Mono And Multilayer Blown Film Applications'
]

// Related products (More From Category)
const categoryProducts = [
  { id: 1, brand: 'TASNEE', name: 'TASNEE LD 0725N — LDPE Film Grade', stock: '25k', price: 50.00, image: '/images/product-mock.png' },
  { id: 2, brand: 'TASNEE', name: 'TASNEE LD 0725N — LDPE Film Grade', stock: '25k', price: 50.00, image: '/images/product-mock.png' },
  { id: 3, brand: 'TASNEE', name: 'TASNEE LD 0725N — LDPE Film Grade', stock: '25k', price: 50.00, image: '/images/product-mock.png' },
  { id: 4, brand: 'TASNEE', name: 'TASNEE LD 0725N — LDPE Film Grade', stock: '25k', price: 50.00, image: '/images/product-mock.png' },
  { id: 5, brand: 'TASNEE', name: 'TASNEE LD 0725N — LDPE Film Grade', stock: '25k', price: 50.00, image: '/images/product-mock.png' },
  { id: 6, brand: 'TASNEE', name: 'TASNEE LD 0725N — LDPE Film Grade', stock: '25k', price: 50.00, image: '/images/product-mock.png' }
]

// Best seller products
const bestSellerProducts = [
  { id: 1, brand: 'TASNEE', name: 'TASNEE LD 0725N — LDPE Film Grade', stock: '25k', price: 50.00, image: '/images/product-mock.png', isNew: true },
  { id: 2, brand: 'TASNEE', name: 'TASNEE LD 0725N — LDPE Film Grade', stock: '25k', price: 50.00, image: '/images/product-mock.png', isNew: true },
  { id: 3, brand: 'TASNEE', name: 'TASNEE LD 0725N — LDPE Film Grade', stock: '25k', price: 50.00, image: '/images/product-mock.png', isNew: true },
  { id: 4, brand: 'TASNEE', name: 'TASNEE LD 0725N — LDPE Film Grade', stock: '25k', price: 50.00, image: '/images/product-mock.png', isNew: true },
  { id: 5, brand: 'TASNEE', name: 'TASNEE LD 0725N — LDPE Film Grade', stock: '25k', price: 50.00, image: '/images/product-mock.png', isNew: true },
  { id: 6, brand: 'TASNEE', name: 'TASNEE LD 0725N — LDPE Film Grade', stock: '25k', price: 50.00, image: '/images/product-mock.png', isNew: true }
]

const ProductDetails = () => {
  const router = useRouter()
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedTier, setSelectedTier] = useState(0)
  const [keyFeaturesExpanded, setKeyFeaturesExpanded] = useState(true)
  const [applicationsExpanded, setApplicationsExpanded] = useState(false)

  return (
    <Box sx={{ bgcolor: 'white', minHeight: '100vh' }}>
      {/* Header */}
      <Header />

      {/* Breadcrumb */}
      <Box sx={{ bgcolor: '#f5f5f5', py: 1.5 }}>
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            {['Home', 'Decoration', 'woods', 'wall panel'].map((item, index, arr) => (
              <Box key={item} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Typography
                  sx={{
                    fontSize: '0.85rem',
                    color: index === arr.length - 1 ? '#999' : '#333',
                    cursor: index === arr.length - 1 ? 'default' : 'pointer',
                    '&:hover': { color: index === arr.length - 1 ? '#999' : '#E36F3A' }
                  }}
                >
                  {item}
                </Typography>
                {index < arr.length - 1 && (
                  <Typography sx={{ color: '#999', fontSize: '0.75rem' }}>{'>'}</Typography>
                )}
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Product Details Section */}
      <Box sx={{ py: 4, bgcolor: 'white' }}>
        <Container maxWidth="xl">
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: 5
            }}
          >
            {/* Left - Product Gallery */}
            <Box sx={{ display: 'flex', gap: 2 }}>
              {/* Thumbnails */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {productImages.map((img, index) => (
                  <Box
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    sx={{
                      width: 70,
                      height: 70,
                      border: selectedImage === index ? '2px solid #E36F3A' : '1px solid #e0e0e0',
                      borderRadius: 1,
                      overflow: 'hidden',
                      cursor: 'pointer',
                      bgcolor: '#f8f8f8',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      '&:hover': { borderColor: '#E36F3A' }
                    }}
                  >
                    <Box
                      component="img"
                      src={img}
                      alt={`Product ${index + 1}`}
                      sx={{ width: '90%', height: '90%', objectFit: 'contain' }}
                    />
                  </Box>
                ))}
              </Box>

              {/* Main Image */}
              <Box sx={{ flex: 1, position: 'relative' }}>
                <Box
                  sx={{
                    bgcolor: 'white',
                    borderRadius: 0,
                    overflow: 'hidden',
                    height: 500,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Box
                    component="img"
                    src={productImages[selectedImage]}
                    alt="Product"
                    sx={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                  />
                </Box>
                {/* Navigation Arrow */}
                <IconButton
                  sx={{
                    position: 'absolute',
                    right: 8,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    bgcolor: 'white',
                    border: '1px solid #e0e0e0',
                    width: 36,
                    height: 36,
                    '&:hover': { bgcolor: '#f5f5f5' }
                  }}
                  onClick={() => setSelectedImage((prev) => (prev + 1) % productImages.length)}
                >
                  <Typography sx={{ fontSize: '1.2rem', color: '#666' }}>›</Typography>
                </IconButton>
              </Box>
            </Box>

            {/* Right - Product Info */}
            <Box>
              {/* Brand and SKU with Icons */}
              <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1 }}>
                <Typography sx={{ fontSize: '0.85rem', color: '#666' }}>
                  <span style={{ fontWeight: 600, color: '#E36F3A' }}>TASNEE</span> | SKU IT 123456
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton 
                    size="small" 
                    sx={{ 
                      color: '#888',
                      p: 0.5,
                      '&:hover': { color: '#E36F3A' }
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                    </svg>
                  </IconButton>
                  <IconButton 
                    size="small" 
                    sx={{ 
                      color: '#888',
                      p: 0.5,
                      '&:hover': { color: '#E36F3A' }
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <polygon points="12 2 2 7 12 12 22 7 12 2"/>
                      <polyline points="2 17 12 22 22 17"/>
                      <polyline points="2 12 12 17 22 12"/>
                    </svg>
                  </IconButton>
                </Box>
              </Box>

              {/* Title */}
              <Typography
                sx={{
                  fontWeight: 600,
                  color: '#1a1a1a',
                  fontSize: { xs: '1.5rem', md: '1.75rem' },
                  mb: 2,
                  lineHeight: 1.3
                }}
              >
                TASNEE LD 0725N — LDPE Film Grade
              </Typography>

              {/* Description */}
              <Typography sx={{ fontSize: '0.9rem', color: '#666', lineHeight: 1.7, mb: 2 }}>
                TASNEE LD 0725N Is A Low Density Polyethylene (LDPE) Grade Developed For Mono And
                Multilayer Blown Film Extrusion. The Material Provides An Excellent Balance Of
                Mechanical Strength, Flexibility, And Optical Clarity, Making It A Reliable Choice For
                Medium-Duty Packaging Applications.
              </Typography>

              {/* Stock and Discount */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Typography sx={{ color: '#4CAF50', fontWeight: 500, fontSize: '0.9rem' }}>
                  In Stock
                </Typography>
                <Chip
                  label="50% OFF"
                  size="small"
                  sx={{
                    bgcolor: 'rgba(227, 111, 58, 0.12)',
                    color: '#E36F3A',
                    fontWeight: 600,
                    fontSize: '0.75rem',
                    height: 24,
                    borderRadius: 0.5
                  }}
                />
              </Box>

              {/* Price */}
              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5, mb: 3 }}>
                <Typography sx={{ fontSize: '0.85rem', color: '#E36F3A' }}>EGP</Typography>
                <Typography sx={{ fontSize: '2.25rem', fontWeight: 700, color: '#E36F3A' }}>
                  50.00
                </Typography>
                <Typography
                  sx={{
                    fontSize: '0.9rem',
                    color: '#999',
                    textDecoration: 'line-through',
                    ml: 1
                  }}
                >
                  egp 100.00
                </Typography>
              </Box>

              {/* Pricing Tiers */}
              <Box sx={{ display: 'flex', gap: 2, mb: 1.5 }}>
                {pricingTiers.map((tier, index) => (
                  <Box
                    key={index}
                    onClick={() => setSelectedTier(index)}
                    sx={{
                      flex: 1,
                      border: selectedTier === index ? '1.5px solid #E36F3A' : '1px solid #e0e0e0',
                      borderRadius: 1,
                      py: 1.5,
                      px: 1,
                      cursor: 'pointer',
                      textAlign: 'center',
                      bgcolor: 'white',
                      '&:hover': { borderColor: '#E36F3A' }
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 0.25 }}>
                      <Typography sx={{ fontSize: '0.7rem', color: selectedTier === index ? '#E36F3A' : '#666' }}>
                        EGP
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '1.1rem',
                          fontWeight: 700,
                          color: selectedTier === index ? '#E36F3A' : '#333'
                        }}
                      >
                        {tier.price}
                      </Typography>
                      <Typography sx={{ fontSize: '0.7rem', color: '#666' }}>/ piece</Typography>
                    </Box>
                    <Typography sx={{ fontSize: '0.7rem', color: '#888', mt: 0.5 }}>
                      {tier.label}
                    </Typography>
                  </Box>
                ))}
              </Box>

              {/* See More Options */}
              <Typography
                sx={{
                  fontSize: '0.85rem',
                  color: '#E36F3A',
                  textAlign: 'right',
                  cursor: 'pointer',
                  mb: 3,
                  '&:hover': { textDecoration: 'underline' }
                }}
              >
                See More Options
              </Typography>

              {/* Action Buttons */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 4 }}>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    bgcolor: '#E36F3A',
                    py: 1.5,
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    borderRadius: 1,
                    boxShadow: 'none',
                    '&:hover': { bgcolor: '#d15f2a', boxShadow: 'none' }
                  }}
                >
                  Add to Cart
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{
                    borderColor: '#E36F3A',
                    color: '#E36F3A',
                    py: 1.5,
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    borderRadius: 1,
                    '&:hover': { borderColor: '#d15f2a', bgcolor: 'rgba(227, 111, 58, 0.05)' }
                  }}
                >
                  Request Offer
                </Button>
              </Box>

              {/* About This Product */}
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography sx={{ fontSize: '0.9rem', fontWeight: 600, color: '#333', letterSpacing: 0.5 }}>
                  ABOUT THIS PRODUCT
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    cursor: 'pointer',
                    '&:hover': { '& .preview-text': { textDecoration: 'underline' } }
                  }}
                >
                  <Typography className="preview-text" sx={{ fontSize: '0.85rem', color: '#E36F3A' }}>
                    Preview Pdf
                  </Typography>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E36F3A" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                  </svg>
                </Box>
              </Box>

              {/* Accordions */}
              <Box>
                {/* Key Features Accordion */}
                <Box
                  sx={{
                    bgcolor: '#f5f5f5',
                    mb: 1,
                    borderRadius: 0.5
                  }}
                >
                  <Box
                    onClick={() => setKeyFeaturesExpanded(!keyFeaturesExpanded)}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      px: 2,
                      py: 1.5,
                      cursor: 'pointer'
                    }}
                  >
                    <Typography sx={{ fontWeight: 600, fontSize: '0.85rem', color: '#333' }}>
                      KEY FEATURES
                    </Typography>
                    <Typography sx={{ fontSize: '1.25rem', color: '#666', lineHeight: 1 }}>
                      {keyFeaturesExpanded ? '−' : '+'}
                    </Typography>
                  </Box>
                  {keyFeaturesExpanded && (
                    <Box sx={{ px: 2, pb: 2 }}>
                      <Box component="ul" sx={{ m: 0, pl: 2.5 }}>
                        {keyFeatures.map((feature, index) => (
                          <Box component="li" key={index} sx={{ mb: 0.75 }}>
                            <Typography sx={{ fontSize: '0.85rem', color: '#555' }}>
                              {feature}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  )}
                </Box>

                {/* Applications Accordion */}
                <Box
                  sx={{
                    bgcolor: '#f5f5f5',
                    borderRadius: 0.5
                  }}
                >
                  <Box
                    onClick={() => setApplicationsExpanded(!applicationsExpanded)}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      px: 2,
                      py: 1.5,
                      cursor: 'pointer'
                    }}
                  >
                    <Typography sx={{ fontWeight: 600, fontSize: '0.85rem', color: '#333' }}>
                      APPLICATIONS
                    </Typography>
                    <Typography sx={{ fontSize: '1.25rem', color: '#666', lineHeight: 1 }}>
                      {applicationsExpanded ? '−' : '+'}
                    </Typography>
                  </Box>
                  {applicationsExpanded && (
                    <Box sx={{ px: 2, pb: 2 }}>
                      <Typography sx={{ fontSize: '0.85rem', color: '#555' }}>
                        Food packaging, industrial bags, agricultural films, and general-purpose packaging applications.
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* More From Category Section */}
      <Box sx={{ py: 5, bgcolor: '#fafafa' }}>
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography sx={{ fontSize: '1.5rem', fontWeight: 600 }}>
              More From <span style={{ color: '#E36F3A' }}>Category</span>
            </Typography>
            <Typography
              sx={{
                color: '#E36F3A',
                fontSize: '0.9rem',
                cursor: 'pointer',
                '&:hover': { textDecoration: 'underline' }
              }}
            >
              View All
            </Typography>
          </Box>

          <Box sx={{ position: 'relative' }}>
            <Swiper
              modules={[Navigation]}
              spaceBetween={16}
              slidesPerView={1.2}
              navigation={true}
              className="category-swiper"
              breakpoints={{
                480: { slidesPerView: 2.2 },
                768: { slidesPerView: 3.2 },
                1024: { slidesPerView: 4.2 },
                1280: { slidesPerView: 5.5 }
              }}
            >
              {categoryProducts.map((product) => (
                <SwiperSlide key={product.id}>
                  <Card
                    onClick={() => router.push(`/en/product/${product.id}`)}
                    sx={{
                      borderRadius: 1,
                      boxShadow: 'none',
                      border: '1px solid #e8e8e8',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      bgcolor: 'white',
                      '&:hover': {
                        boxShadow: '0 2px 12px rgba(0,0,0,0.08)'
                      }
                    }}
                  >
                    <Box sx={{ bgcolor: '#f8f8f8', p: 2 }}>
                      <CardMedia
                        component="img"
                        image={product.image}
                        alt={product.name}
                        sx={{ height: 140, objectFit: 'contain' }}
                      />
                    </Box>
                    <Box sx={{ p: 2 }}>
                      <Typography sx={{ fontSize: '0.75rem', color: '#888', mb: 0.5 }}>
                        {product.brand}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '0.85rem',
                          fontWeight: 500,
                          color: '#1a1a1a',
                          mb: 0.5,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          lineHeight: 1.3,
                          height: '2.2em'
                        }}
                      >
                        {product.name}
                      </Typography>
                      <Typography sx={{ fontSize: '0.75rem', color: '#888', mb: 1 }}>
                        {product.stock}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5 }}>
                        <Typography sx={{ fontSize: '0.7rem', color: '#333' }}>EGP</Typography>
                        <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, color: '#1a1a1a' }}>
                          {product.price.toFixed(2)}
                        </Typography>
                      </Box>
                    </Box>
                  </Card>
                </SwiperSlide>
              ))}
            </Swiper>

            <style jsx global>{`
              .category-swiper {
                padding: 8px 0;
              }
              .category-swiper .swiper-button-prev,
              .category-swiper .swiper-button-next {
                width: 36px;
                height: 36px;
                background: white;
                border-radius: 50%;
                border: 1px solid #e0e0e0;
                box-shadow: 0 2px 8px rgba(0,0,0,0.08);
              }
              .category-swiper .swiper-button-prev {
                display: none;
              }
              .category-swiper .swiper-button-next {
                right: 0;
              }
              .category-swiper .swiper-button-next:after {
                font-size: 14px;
                color: #666;
                font-weight: 600;
              }
            `}</style>
          </Box>
        </Container>
      </Box>

      {/* Best Seller Section */}
      <Box sx={{ py: 5, bgcolor: 'white' }}>
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography sx={{ fontSize: '1.5rem', fontWeight: 600, color: '#1a1a1a' }}>
              Best Seller
            </Typography>
            <Typography
              sx={{
                color: '#E36F3A',
                fontSize: '0.9rem',
                cursor: 'pointer',
                '&:hover': { textDecoration: 'underline' }
              }}
            >
              View All
            </Typography>
          </Box>

          <Box sx={{ position: 'relative' }}>
            <Swiper
              modules={[Navigation]}
              spaceBetween={16}
              slidesPerView={1.2}
              navigation={true}
              className="bestseller-swiper"
              breakpoints={{
                480: { slidesPerView: 2.2 },
                768: { slidesPerView: 3.2 },
                1024: { slidesPerView: 4.2 },
                1280: { slidesPerView: 5.5 }
              }}
            >
              {bestSellerProducts.map((product) => (
                <SwiperSlide key={product.id}>
                  <Card
                    onClick={() => router.push(`/en/product/${product.id}`)}
                    sx={{
                      borderRadius: 1,
                      boxShadow: 'none',
                      border: '1px solid #e8e8e8',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      bgcolor: 'white',
                      '&:hover': {
                        boxShadow: '0 2px 12px rgba(0,0,0,0.08)'
                      }
                    }}
                  >
                    <Box sx={{ bgcolor: '#f8f8f8', p: 2, position: 'relative' }}>
                      {product.isNew && (
                        <Chip
                          label="NEW"
                          size="small"
                          sx={{
                            position: 'absolute',
                            top: 8,
                            left: 8,
                            bgcolor: '#E36F3A',
                            color: 'white',
                            fontSize: '0.65rem',
                            fontWeight: 600,
                            height: 20,
                            borderRadius: 0.5
                          }}
                        />
                      )}
                      <CardMedia
                        component="img"
                        image={product.image}
                        alt={product.name}
                        sx={{ height: 140, objectFit: 'contain' }}
                      />
                    </Box>
                    <Box sx={{ p: 2 }}>
                      <Typography sx={{ fontSize: '0.75rem', color: '#888', mb: 0.5 }}>
                        {product.brand}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '0.85rem',
                          fontWeight: 500,
                          color: '#1a1a1a',
                          mb: 0.5,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          lineHeight: 1.3,
                          height: '2.2em'
                        }}
                      >
                        {product.name}
                      </Typography>
                      <Typography sx={{ fontSize: '0.75rem', color: '#888', mb: 1 }}>
                        {product.stock}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5 }}>
                        <Typography sx={{ fontSize: '0.7rem', color: '#333' }}>EGP</Typography>
                        <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, color: '#1a1a1a' }}>
                          {product.price.toFixed(2)}
                        </Typography>
                      </Box>
                    </Box>
                  </Card>
                </SwiperSlide>
              ))}
            </Swiper>

            <style jsx global>{`
              .bestseller-swiper {
                padding: 8px 0;
              }
              .bestseller-swiper .swiper-button-prev,
              .bestseller-swiper .swiper-button-next {
                width: 36px;
                height: 36px;
                background: white;
                border-radius: 50%;
                border: 1px solid #e0e0e0;
                box-shadow: 0 2px 8px rgba(0,0,0,0.08);
              }
              .bestseller-swiper .swiper-button-prev {
                display: none;
              }
              .bestseller-swiper .swiper-button-next {
                right: 0;
              }
              .bestseller-swiper .swiper-button-next:after {
                font-size: 14px;
                color: #666;
                font-weight: 600;
              }
            `}</style>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  )
}

export default ProductDetails
