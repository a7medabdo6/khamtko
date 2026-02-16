'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

// MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import TextField from '@mui/material/TextField'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import Slider from '@mui/material/Slider'

// Component Imports
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

// Swiper Imports
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

// Categories data
const categories = [
  { id: 1, name: 'Category 1', image: '/images/product-mock.png' },
  { id: 2, name: 'Category 2', image: '/images/product-mock.png' },
  { id: 3, name: 'Category 3', image: '/images/product-mock.png' },
  { id: 4, name: 'Category 4', image: '/images/product-mock.png' },
  { id: 5, name: 'Category 5', image: '/images/product-mock.png' },
  { id: 6, name: 'Category 6', image: '/images/product-mock.png' },
  { id: 7, name: 'Category 7', image: '/images/product-mock.png' },
  { id: 8, name: 'Category 8', image: '/images/product-mock.png' }
]

// Sub categories
const subCategories = [
  { id: 1, name: 'Metals & Alloys', count: 120 },
  { id: 2, name: 'Polyethylene', count: 85, active: true },
  { id: 3, name: 'Glass & Acrylic', count: 64 },
  { id: 4, name: 'Rubber & Elastomers', count: 42 },
  { id: 5, name: 'Fabrics & Textiles', count: 38 },
  { id: 6, name: 'Composites', count: 29 },
  { id: 7, name: 'Ceramics', count: 18 }
]

// Price ranges
const priceRanges = [
  { value: 'all', label: 'All Price' },
  { value: '25-100', label: '25 to 100' },
  { value: '100-300', label: '100 to 300' },
  { value: '300-500', label: '300 to 500' },
  { value: '500-1000', label: '500 to 1,000' },
  { value: '1000-10000', label: '1,000 to 10,000' }
]

// Products data
const products = Array(12).fill(null).map((_, index) => ({
  id: index + 1,
  category: 'POLYETHYLENE',
  brand: 'TASNEE',
  name: 'TASNEE LD 0725N — LDPE Film Grade',
  stock: '25k',
  price: 50.00,
  originalPrice: index % 3 === 0 ? 65.00 : null,
  discount: index % 3 === 0 ? 25 : null,
  image: '/images/product-mock.png'
}))

// Wishlist products
const wishlistProducts = [
  {
    id: 1,
    badge: '50% OFF',
    materialTag: 'WOOD',
    category: 'WALL PANEL',
    name: 'WS Wood Wall Panel Modern Decorative Panels for Interior Wall Applicati...',
    size: '100cm*100cm',
    price: 50.00,
    originalPrice: 100.00,
    image: '/images/product-mock.png'
  },
  {
    id: 2,
    badge: '30% OFF',
    materialTag: 'METAL',
    category: 'STEEL PLATE',
    name: 'Premium Stainless Steel Plate High-Corrosion Resistance Industrial Grade',
    size: '50cm*50cm',
    price: 75.00,
    originalPrice: 107.00,
    image: '/images/product-mock.png'
  },
  {
    id: 3,
    badge: '25% OFF',
    materialTag: 'PLASTIC',
    category: 'POLYETHYLENE',
    name: 'TASNEE LD 0725N LDPE Film Grade Premium Quality Material',
    size: '100cm*100cm',
    price: 45.00,
    originalPrice: 60.00,
    image: '/images/product-mock.png'
  }
]

const ProductList = () => {
  const router = useRouter()
  const [priceRange, setPriceRange] = useState<number[]>([0, 500])
  const [selectedPriceRange, setSelectedPriceRange] = useState('300-500')
  const [sortBy, setSortBy] = useState('popular')
  const [currentPage, setCurrentPage] = useState(1)
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  const totalResults = 65867
  const totalPages = 6

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

      {/* Category Carousel */}
      <Box sx={{ py: 4, bgcolor: 'white' }}>
        <Container maxWidth="xl">
          <Box sx={{ position: 'relative', px: 5 }}>
            <Swiper
              modules={[Navigation]}
              spaceBetween={24}
              slidesPerView={2}
              navigation={true}
              className="category-carousel-swiper"
              breakpoints={{
                480: { slidesPerView: 3 },
                768: { slidesPerView: 4 },
                1024: { slidesPerView: 5 },
                1280: { slidesPerView: 6 }
              }}
            >
              {categories.map((category) => (
                <SwiperSlide key={category.id}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      cursor: 'pointer',
                      py: 2
                    }}
                  >
                    <Box
                      sx={{
                        width: 130,
                        height: 130,
                        borderRadius: '50%',
                        bgcolor: '#E8E4DC',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 1.5,
                        overflow: 'hidden'
                      }}
                    >
                      <Box
                        component="img"
                        src={category.image}
                        alt={category.name}
                        sx={{ width: '80%', height: '80%', objectFit: 'contain' }}
                      />
                    </Box>
                    <Typography sx={{ fontSize: '0.9rem', color: '#333', textAlign: 'center', fontWeight: 500 }}>
                      {category.name}
                    </Typography>
                  </Box>
                </SwiperSlide>
              ))}
            </Swiper>

            <style jsx global>{`
              .category-carousel-swiper {
                padding: 10px 0;
              }
              .category-carousel-swiper .swiper-button-prev,
              .category-carousel-swiper .swiper-button-next {
                width: 36px;
                height: 36px;
                border-radius: 50%;
                top: 45%;
              }
              .category-carousel-swiper .swiper-button-prev {
                left: 0;
                background: white;
              }
              .category-carousel-swiper .swiper-button-next {
                right: 0;
                background: #E36F3A;
              }
              .category-carousel-swiper .swiper-button-prev:after,
              .category-carousel-swiper .swiper-button-next:after {
                font-size: 14px;
                color: white;
                font-weight: 600;
              }
            `}</style>
          </Box>
        </Container>
      </Box>

      {/* Main Content */}
      <Box sx={{ py: 4 }}>
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', gap: 4 }}>
            {/* Left Sidebar */}
            <Box sx={{ width: 220, flexShrink: 0 }}>
              {/* Sub Category */}
              <Box sx={{ mb: 4 }}>
                <Typography sx={{ fontSize: '0.9rem', fontWeight: 600, color: '#333', mb: 2 }}>
                  SUB CATEGORY
                </Typography>
                {subCategories.map((cat) => (
                  <Typography
                    key={cat.id}
                    sx={{
                      fontSize: '0.85rem',
                      color: cat.active ? '#E36F3A' : '#666',
                      mb: 1.5,
                      cursor: 'pointer',
                      '&:hover': { color: '#E36F3A' }
                    }}
                  >
                    {cat.name}
                  </Typography>
                ))}
              </Box>

              {/* Price Range */}
              <Box sx={{ mb: 4 }}>
                <Typography sx={{ fontSize: '0.9rem', fontWeight: 600, color: '#333', mb: 2 }}>
                  PRICE RANGE
                </Typography>
                
                {/* Slider */}
                <Box sx={{ px: 1, mb: 2 }}>
                  <Slider
                    value={priceRange}
                    onChange={(_, newValue) => setPriceRange(newValue as number[])}
                    valueLabelDisplay="off"
                    min={0}
                    max={10000}
                    sx={{
                      color: '#E36F3A',
                      '& .MuiSlider-thumb': {
                        width: 16,
                        height: 16,
                        bgcolor: '#E36F3A'
                      },
                      '& .MuiSlider-track': {
                        bgcolor: '#E36F3A'
                      },
                      '& .MuiSlider-rail': {
                        bgcolor: '#ddd'
                      }
                    }}
                  />
                </Box>

                {/* Min/Max Inputs */}
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <TextField
                    placeholder="Min price"
                    size="small"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    sx={{
                      flex: 1,
                      '& .MuiOutlinedInput-root': {
                        fontSize: '0.8rem',
                        '& fieldset': { borderColor: '#ddd' }
                      }
                    }}
                  />
                  <TextField
                    placeholder="Max price"
                    size="small"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    sx={{
                      flex: 1,
                      '& .MuiOutlinedInput-root': {
                        fontSize: '0.8rem',
                        '& fieldset': { borderColor: '#ddd' }
                      }
                    }}
                  />
                </Box>

                {/* Price Range Radio */}
                <RadioGroup
                  value={selectedPriceRange}
                  onChange={(e) => setSelectedPriceRange(e.target.value)}
                >
                  {priceRanges.map((range) => (
                    <FormControlLabel
                      key={range.value}
                      value={range.value}
                      control={
                        <Radio
                          size="small"
                          sx={{
                            color: '#ddd',
                            '&.Mui-checked': { color: '#E36F3A' },
                            p: 0.5
                          }}
                        />
                      }
                      label={range.label}
                      sx={{
                        m: 0,
                        mb: 0.5,
                        '& .MuiFormControlLabel-label': {
                          fontSize: '0.8rem',
                          color: '#666'
                        }
                      }}
                    />
                  ))}
                </RadioGroup>
              </Box>

              {/* My Wishlist */}
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Typography sx={{ fontSize: '1rem', fontWeight: 600, color: '#1a1a1a' }}>
                    MY WISHLIST
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    <IconButton
                      className="wishlist-prev"
                      size="small"
                      sx={{
                        border: '1px solid #ddd',
                        borderRadius: 0.5,
                        width: 28,
                        height: 28,
                        '&:hover': { borderColor: '#999' }
                      }}
                    >
                      <Typography sx={{ fontSize: '0.85rem', color: '#666' }}>←</Typography>
                    </IconButton>
                    <IconButton
                      className="wishlist-next"
                      size="small"
                      sx={{
                        border: '1px solid #E36F3A',
                        borderRadius: 0.5,
                        width: 28,
                        height: 28,
                        '&:hover': { bgcolor: 'rgba(227, 111, 58, 0.05)' }
                      }}
                    >
                      <Typography sx={{ fontSize: '0.85rem', color: '#E36F3A' }}>→</Typography>
                    </IconButton>
                  </Box>
                </Box>

                <Swiper
                  modules={[Navigation]}
                  spaceBetween={10}
                  slidesPerView={1}
                  navigation={{
                    prevEl: '.wishlist-prev',
                    nextEl: '.wishlist-next'
                  }}
                  className="wishlist-swiper"
                >
                  {wishlistProducts.map((product) => (
                    <SwiperSlide key={product.id}>
                      <Card
                        onClick={() => router.push(`/en/product/${product.id}`)}
                        sx={{
                          borderRadius: 2,
                          boxShadow: 'none',
                          border: '1px solid #e8e8e8',
                          overflow: 'hidden',
                          cursor: 'pointer'
                        }}
                      >
                        <Box sx={{ position: 'relative' }}>
                          {product.badge && (
                            <Chip
                              label={product.badge}
                              size="small"
                              sx={{
                                position: 'absolute',
                                top: 12,
                                left: 12,
                                bgcolor: '#E36F3A',
                                color: 'white',
                                fontSize: '0.7rem',
                                fontWeight: 700,
                                height: 22,
                                borderRadius: 0.5,
                                zIndex: 1
                              }}
                            />
                          )}
                          {product.materialTag && (
                            <Chip
                              label={product.materialTag}
                              size="small"
                              sx={{
                                position: 'absolute',
                                top: 40,
                                left: 12,
                                bgcolor: '#333',
                                color: 'white',
                                fontSize: '0.65rem',
                                fontWeight: 600,
                                height: 20,
                                borderRadius: 0.5,
                                zIndex: 1
                              }}
                            />
                          )}
                          <CardMedia
                            component="img"
                            image={product.image}
                            alt={product.name}
                            sx={{ height: 200, objectFit: 'cover', bgcolor: '#1a1a1a' }}
                          />
                        </Box>
                        <Box sx={{ p: 2 }}>
                          <Typography sx={{ fontSize: '0.75rem', color: '#888', mb: 0.5, letterSpacing: 0.5 }}>
                            {product.category}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: '0.9rem',
                              fontWeight: 600,
                              color: '#1a1a1a',
                              mb: 0.5,
                              display: '-webkit-box',
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                              lineHeight: 1.4,
                              minHeight: '3.8em'
                            }}
                          >
                            {product.name}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: '0.8rem',
                              color: '#666',
                              mb: 1,
                              borderBottom: '1px solid #ddd',
                              display: 'inline-block',
                              pb: 0.3
                            }}
                          >
                            {product.size}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mt: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.3 }}>
                              <Typography sx={{ fontSize: '0.75rem', color: '#E36F3A', fontWeight: 500 }}>EGP</Typography>
                              <Typography sx={{ fontSize: '1.25rem', fontWeight: 700, color: '#E36F3A' }}>
                                {product.price.toFixed(2)}
                              </Typography>
                            </Box>
                            {product.originalPrice && (
                              <Typography
                                sx={{
                                  fontSize: '0.8rem',
                                  color: '#999',
                                  textDecoration: 'line-through'
                                }}
                              >
                                egp{product.originalPrice.toFixed(2)}
                              </Typography>
                            )}
                          </Box>
                        </Box>
                      </Card>
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* Wishlist Dots */}
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.75, mt: 2 }}>
                  {wishlistProducts.map((_, index) => (
                    <Box
                      key={index}
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        bgcolor: index === wishlistProducts.length - 1 ? '#E36F3A' : '#ddd',
                        transition: 'background-color 0.2s'
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </Box>

            {/* Right Content - Product Grid */}
            <Box sx={{ flex: 1 }}>
              {/* Results Header */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography sx={{ fontSize: '0.9rem', color: '#666' }}>
                  <strong>{totalResults.toLocaleString()}</strong> Results found for "Polyethylene"
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography sx={{ fontSize: '0.85rem', color: '#666' }}>Sort by:</Typography>
                  <Select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    size="small"
                    sx={{
                      minWidth: 140,
                      fontSize: '0.85rem',
                      '& .MuiOutlinedInput-notchedOutline': { borderColor: '#ddd' }
                    }}
                  >
                    <MenuItem value="popular">Most Popular</MenuItem>
                    <MenuItem value="newest">Newest</MenuItem>
                    <MenuItem value="price-low">Price: Low to High</MenuItem>
                    <MenuItem value="price-high">Price: High to Low</MenuItem>
                  </Select>
                </Box>
              </Box>

              {/* Product Grid */}
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: 2
                }}
              >
                {products.map((product) => (
                  <Card
                    key={product.id}
                    onClick={() => router.push(`/en/product/${product.id}`)}
                    sx={{
                      borderRadius: 2,
                      border: '1px solid #eee',
                      boxShadow: 'none',
                      overflow: 'visible',
                      position: 'relative',
                      transition: 'all 0.2s',
                      cursor: 'pointer',
                      '&:hover': {
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                        '& .product-actions': {
                          opacity: 1
                        }
                      }
                    }}
                  >
                    {/* Badges */}
                    <Box sx={{ position: 'absolute', top: 8, left: 8, zIndex: 2, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                      {product.discount && (
                        <Chip
                          label={`${product.discount}% OFF`}
                          size="small"
                          sx={{
                            bgcolor: '#d32f2f',
                            color: 'white',
                            fontWeight: 600,
                            fontSize: '0.65rem',
                            height: 20,
                            borderRadius: 1
                          }}
                        />
                      )}
                    </Box>

                    {/* Product Image */}
                    <Box sx={{ position: 'relative', p: 2, pb: 0 }}>
                      <CardMedia
                        component="img"
                        image={product.image}
                        alt={product.name}
                        sx={{
                          width: '100%',
                          height: 120,
                          objectFit: 'contain',
                          bgcolor: '#fafafa',
                          borderRadius: 1
                        }}
                      />

                      {/* Hover Icons */}
                      <Box
                        className="product-actions"
                        sx={{
                          position: 'absolute',
                          top: 8,
                          right: 8,
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 0.5,
                          opacity: 0,
                          transition: 'opacity 0.2s'
                        }}
                      >
                        <IconButton
                          size="small"
                          sx={{
                            bgcolor: 'white',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                            '&:hover': { bgcolor: '#f5f5f5' }
                          }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <i className="ri-bookmark-line" style={{ fontSize: 16, color: '#666' }} />
                        </IconButton>
                        <IconButton
                          size="small"
                          sx={{
                            bgcolor: 'white',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                            '&:hover': { bgcolor: '#f5f5f5' }
                          }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <i className="ri-stack-line" style={{ fontSize: 16, color: '#666' }} />
                        </IconButton>
                      </Box>

                      {/* Action Buttons overlay on image */}
                      <Box
                        className="product-actions"
                        sx={{
                          position: 'absolute',
                          bottom: 0,
                          left: 16,
                          right: 16,
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 0.75,
                          opacity: 0,
                          transition: 'opacity 0.2s',
                          pb: 1
                        }}
                      >
                        <Button
                          fullWidth
                          variant="contained"
                          size="small"
                          sx={{
                            bgcolor: '#E36F3A',
                            color: 'white',
                            fontWeight: 600,
                            fontSize: '0.75rem',
                            py: 0.5,
                            borderRadius: 1,
                            textTransform: 'none',
                            '&:hover': { bgcolor: '#d55f2a' }
                          }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          Add To Cart
                        </Button>
                        <Button
                          fullWidth
                          variant="outlined"
                          size="small"
                          sx={{
                            borderColor: '#E36F3A',
                            color: '#E36F3A',
                            bgcolor: 'white',
                            fontWeight: 600,
                            fontSize: '0.75rem',
                            py: 0.5,
                            borderRadius: 1,
                            textTransform: 'none',
                            '&:hover': {
                              borderColor: '#d55f2a',
                              bgcolor: 'rgba(255,255,255,0.95)'
                            }
                          }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          Request Offer
                        </Button>
                      </Box>
                    </Box>

                    {/* Product Info */}
                    <Box sx={{ p: 2 }}>
                      <Typography
                        sx={{
                          fontSize: '0.7rem',
                          color: '#888',
                          textTransform: 'uppercase',
                          letterSpacing: 0.5,
                          mb: 0.5
                        }}
                      >
                        {product.brand}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '0.8rem',
                          fontWeight: 500,
                          color: '#333',
                          mb: 0.5,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          minHeight: 36,
                          lineHeight: 1.4
                        }}
                      >
                        {product.name}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '0.7rem',
                          color: '#888',
                          mb: 1
                        }}
                      >
                        {product.stock}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5 }}>
                        <Typography
                          sx={{
                            fontSize: '0.7rem',
                            color: '#E36F3A',
                            fontWeight: 500
                          }}
                        >
                          EGP
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: '1.1rem',
                            fontWeight: 700,
                            color: '#E36F3A'
                          }}
                        >
                          {product.price.toFixed(2)}
                        </Typography>
                        {product.originalPrice && (
                          <Typography
                            sx={{
                              fontSize: '0.75rem',
                              color: '#999',
                              textDecoration: 'line-through'
                            }}
                          >
                            egp{product.originalPrice.toFixed(2)}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </Card>
                ))}
              </Box>

              {/* Pagination */}
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 4, gap: 1 }}>
                <IconButton
                  size="small"
                  sx={{
                    border: '1px solid #ddd',
                    borderRadius: 1,
                    width: 32,
                    height: 32
                  }}
                >
                  <Typography sx={{ fontSize: '0.8rem', color: '#666' }}>←</Typography>
                </IconButton>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    sx={{
                      minWidth: 32,
                      height: 32,
                      p: 0,
                      borderRadius: 1,
                      bgcolor: currentPage === page ? '#E36F3A' : 'transparent',
                      color: currentPage === page ? 'white' : '#666',
                      fontSize: '0.85rem',
                      '&:hover': {
                        bgcolor: currentPage === page ? '#d15f2a' : '#f5f5f5'
                      }
                    }}
                  >
                    {page.toString().padStart(2, '0')}
                  </Button>
                ))}

                <IconButton
                  size="small"
                  sx={{
                    border: '1px solid #E36F3A',
                    borderRadius: 1,
                    width: 32,
                    height: 32,
                    color: '#E36F3A'
                  }}
                >
                  <Typography sx={{ fontSize: '0.8rem' }}>→</Typography>
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  )
}

export default ProductList
