'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

// MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Container from '@mui/material/Container'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Chip from '@mui/material/Chip'

// Component Imports
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ProductCard from '@/components/ProductCard'

// Swiper Imports
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// Hero slides data
const heroSlides = [
  {
    id: 1,
    subtitle: 'Certified Materials Solutions',
    title: 'From Source to Supply',
    title2: 'Quality You Can Trust',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&h=800&fit=crop',
    buttonText: 'SHOP NOW'
  },
  {
    id: 2,
    subtitle: 'Premium Quality Materials',
    title: 'Industrial Grade',
    title2: 'Products You Can Rely On',
    image: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=1600&h=800&fit=crop',
    buttonText: 'SHOP NOW'
  },
  {
    id: 3,
    subtitle: 'Wholesale Supplies',
    title: 'Best Prices',
    title2: 'Direct From Manufacturers',
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1600&h=800&fit=crop',
    buttonText: 'SHOP NOW'
  }
]

// Features data
const features = [
  {
    icon: 'ri-refund-2-line',
    text: '100% money back guarantee'
  },
  {
    icon: 'ri-money-dollar-circle-line',
    text: 'lowest overall order cost'
  },
  {
    icon: 'ri-medal-line',
    text: 'premium quality products'
  },
  {
    icon: 'ri-gift-line',
    text: '300m international products'
  }
]

// Categories data
const categories = [
  { id: 1, name: 'POLYETHYLENE', image: '/images/product-mock.png' },
  { id: 2, name: 'POLYPROPYLENE', image: '/images/product-mock.png' },
  { id: 3, name: 'LDPE', image: '/images/product-mock.png' },
  { id: 4, name: 'HDPE', image: '/images/product-mock.png' },
  { id: 5, name: 'LDPE', image: '/images/product-mock.png' },
  { id: 6, name: 'LDPE', image: '/images/product-mock.png' },
  { id: 7, name: 'HDPE', image: '/images/product-mock.png' },
  { id: 8, name: 'POLYPROPYLENE', image: '/images/product-mock.png' },
  { id: 9, name: 'LDPE', image: '/images/product-mock.png' }
]

// Stainless Steel Plate products data
const steelProducts = [
  {
    id: 1,
    category: 'STAINLESS STEEL PLATE',
    name: '316L Stainless Steel Plate High-Corrosion Resistance.',
    size: '100cm*100cm',
    price: 120.00,
    originalPrice: null,
    discount: null,
    image: '/images/product-mock.png'
  },
  {
    id: 2,
    category: 'STAINLESS STEEL PLATE',
    name: '316L Stainless Steel Plate High-Corrosion Resistance.',
    size: '100cm*100cm',
    price: 120.00,
    originalPrice: null,
    discount: null,
    image: '/images/product-mock.png'
  },
  {
    id: 3,
    category: 'STAINLESS STEEL PLATE',
    name: '316L Stainless Steel Plate High-Corrosion Resistance.',
    size: '100cm*100cm',
    price: 120.00,
    originalPrice: 149.00,
    discount: 25,
    image: '/images/product-mock.png'
  },
  {
    id: 4,
    category: 'STAINLESS STEEL PLATE',
    name: '316L Stainless Steel Plate High-Corrosion Resistance.',
    size: '100cm*100cm',
    price: 120.00,
    originalPrice: null,
    discount: null,
    image: '/images/product-mock.png'
  },
  {
    id: 5,
    category: 'STAINLESS STEEL PLATE',
    name: '316L Stainless Steel Plate High-Corrosion Resistance.',
    size: '100cm*100cm',
    price: 120.00,
    originalPrice: 149.00,
    discount: 25,
    image: '/images/product-mock.png'
  },
  {
    id: 6,
    category: 'STAINLESS STEEL PLATE',
    name: '316L Stainless Steel Plate High-Corrosion Resistance.',
    size: '100cm*100cm',
    price: 120.00,
    originalPrice: null,
    discount: null,
    image: '/images/product-mock.png'
  }
]

// Top Seller products data
const topSellerProducts = [
  {
    id: 1,
    category: 'POLYPROPYLENE',
    brand: 'lyondellbasell',
    name: 'High Quality Low Density LDPE Plastic Virgin Granu...',
    stock: '25k',
    price: 120.00,
    originalPrice: 149.00,
    discount: 25,
    image: '/images/product-mock.png'
  },
  {
    id: 2,
    category: 'STAINLESS STEEL PLATE',
    brand: 'SINOPEC',
    name: 'China Manufacturer LDPE HP2023JN Virgin Resin',
    stock: '25k',
    price: 120.00,
    originalPrice: 149.00,
    discount: 25,
    image: '/images/product-mock.png'
  },
  {
    id: 3,
    category: 'TASNEE',
    brand: 'TASNEE',
    name: 'TASNEE LD 0725N — LDPE Film Grade',
    stock: '25k',
    price: 50.00,
    originalPrice: null,
    discount: null,
    image: '/images/product-mock.png'
  },
  {
    id: 4,
    category: 'STAINLESS STEEL PLATE',
    brand: 'LG Chem',
    name: 'LG Chem HDPE ME2500/ME5000/ME1000/ME80...',
    stock: '50K',
    price: 120.00,
    originalPrice: 149.00,
    discount: 25,
    image: '/images/product-mock.png'
  },
  {
    id: 5,
    category: 'STAINLESS STEEL PLATE',
    brand: 'Lotrene',
    name: 'LDPE Resins Injection Grade Coating Grade LD...',
    stock: '25K',
    price: 120.00,
    originalPrice: 149.00,
    discount: 25,
    image: '/images/product-mock.png'
  },
  {
    id: 6,
    category: 'HDPE',
    brand: 'SABIC',
    name: 'SABIC HDPE Premium Grade Industrial Use',
    stock: '50K',
    price: 95.00,
    originalPrice: 120.00,
    discount: 20,
    image: '/images/product-mock.png'
  }
]

// Banner data with popup info
const bannerItems = [
  {
    id: 1,
    title: 'MACHINERY',
    description: 'Industrial grade machinery for plastic production.',
    price: 150.00
  },
  {
    id: 2,
    title: 'POLYETHYLENE PIPES',
    description: 'High-quality pipes for various applications.',
    price: 75.00
  },
  {
    id: 3,
    title: 'PACKAGING BAGS',
    description: 'Premium packaging solutions for your products.',
    price: 45.00
  },
  {
    id: 4,
    title: 'POLYETHYLENE',
    description: 'High-quality plastic used for beverage bottles.',
    price: 50.00
  }
]

// Waterproof Canvas products data
const waterproofCanvasProducts = [
  {
    id: 1,
    badge: 'BEST SELLER',
    badgeColor: '#E36F3A',
    materialTag: 'FEBRIC',
    category: 'WATERPROOF FEBRIC',
    name: '600 Denier Marine Waterproof Canvas Fabric...',
    size: '100cm*100cm',
    colors: ['#D4C4B0', '#556B2F', '#2F4F4F', '#1C1C1C'],
    price: 120.00,
    originalPrice: null,
    discount: 25,
    priceColor: '#1a1a1a',
    image: '/images/product-mock.png'
  },
  {
    id: 2,
    badge: 'NEW ARRIVAL',
    badgeColor: '#4CAF50',
    materialTag: 'COTTON',
    category: 'WATERPROOF FEBRIC',
    name: '600 Denier Marine Waterproof Canvas Fabric...',
    size: '100cm*100cm',
    colors: ['#D4C4B0', '#8B8B83', '#2F4F4F', '#1C1C1C'],
    price: 120.00,
    originalPrice: null,
    discount: null,
    priceColor: '#1a1a1a',
    image: '/images/product-mock.png'
  },
  {
    id: 3,
    badge: 'LIMITED EDITION',
    badgeColor: '#2196F3',
    materialTag: 'POLYESTER',
    category: 'WATERPROOF FEBRIC',
    name: '600 Denier Marine Waterproof Canvas Fabric...',
    size: '100cm*100cm',
    colors: ['#D4C4B0', '#8B8B83', '#2F4F4F', '#1C1C1C'],
    price: 120.00,
    originalPrice: null,
    discount: null,
    priceColor: '#1a1a1a',
    image: '/images/product-mock.png'
  },
  {
    id: 4,
    badge: 'BEST VALUE',
    badgeColor: '#9C27B0',
    materialTag: 'NYLON',
    category: 'RIPSTOP NYLON',
    name: 'Ripstop Nylon Fabric 60"×50"',
    size: '100cm*100cm',
    colors: ['#D4C4B0', '#8B8B83', '#2F4F4F', '#1C1C1C'],
    price: 95.00,
    originalPrice: null,
    discount: null,
    priceColor: '#1a1a1a',
    image: '/images/product-mock.png'
  },
  {
    id: 5,
    badge: 'TOP RATED',
    badgeColor: '#F5A623',
    materialTag: 'DENIM',
    category: 'HEAVYWEIGHT DENIM',
    name: 'Heavyweight Denim Fabric 58"×45"',
    size: '100cm*100cm',
    colors: ['#D4C4B0', '#8B8B83', '#2F4F4F', '#1C1C1C'],
    price: 110.00,
    originalPrice: 149.99,
    discount: 27,
    priceColor: '#E36F3A',
    image: '/images/product-mock.png'
  },
  {
    id: 6,
    badge: 'BEST SELLER',
    badgeColor: '#E36F3A',
    materialTag: 'FEBRIC',
    category: 'WATERPROOF FEBRIC',
    name: '600 Denier Marine Waterproof Canvas Fabric...',
    size: '100cm*100cm',
    colors: ['#D4C4B0', '#8B8B83', '#2F4F4F', '#1C1C1C'],
    price: 120.00,
    originalPrice: null,
    discount: 25,
    priceColor: '#1a1a1a',
    image: '/images/product-mock.png'
  }
]

// Wood Wall Panel products data
const woodPanelProducts = [
  {
    id: 1,
    badge: 'NEW',
    materialTag: 'WOOD',
    category: 'WALL PANEL',
    name: 'WS Wood Wall Panel Modern Decorative Panels',
    size: '100cm*100cm',
    colors: ['#8B4513', '#654321', '#3D2314', '#1C1008'],
    price: 50.00,
    originalPrice: null,
    image: '/images/product-mock.png'
  },
  {
    id: 2,
    badge: 'NEW',
    materialTag: 'WOOD',
    category: 'WALL PANEL',
    name: 'WS Wood Wall Panel Modern Decorative Panels',
    size: '100cm*100cm',
    colors: ['#8B4513', '#654321', '#3D2314', '#1C1008'],
    price: 50.00,
    originalPrice: null,
    image: '/images/product-mock.png'
  },
  {
    id: 3,
    badge: 'NEW',
    materialTag: 'WOOD',
    category: 'WALL PANEL',
    name: 'WS Wood Wall Panel Modern Decorative Panels',
    size: '100cm*100cm',
    colors: ['#8B4513', '#654321', '#3D2314', '#1C1008'],
    price: 50.00,
    originalPrice: null,
    image: '/images/product-mock.png'
  },
  {
    id: 4,
    badge: 'NEW',
    materialTag: 'WOOD',
    category: 'WALL PANEL',
    name: 'WS Wood Wall Panel Modern Decorative Panels',
    size: '100cm*100cm',
    colors: ['#8B4513', '#654321', '#3D2314', '#1C1008'],
    price: 50.00,
    originalPrice: null,
    image: '/images/product-mock.png'
  },
  {
    id: 5,
    badge: 'NEW',
    materialTag: 'WOOD',
    category: 'WALL PANEL',
    name: 'WS Wood Wall Panel Modern Decorative Panels',
    size: '100cm*100cm',
    colors: ['#8B4513', '#654321', '#3D2314', '#1C1008'],
    price: 50.00,
    originalPrice: null,
    image: '/images/product-mock.png'
  },
  {
    id: 6,
    badge: 'NEW',
    materialTag: 'WOOD',
    category: 'WALL PANEL',
    name: 'WS Wood Wall Panel Modern Decorative Panels',
    size: '100cm*100cm',
    colors: ['#8B4513', '#654321', '#3D2314', '#1C1008'],
    price: 50.00,
    originalPrice: null,
    image: '/images/product-mock.png'
  }
]

const HomePage = () => {
  const router = useRouter()
  const [activeBannerPopup, setActiveBannerPopup] = useState<number | null>(null)

  const handleBannerDotClick = (id: number) => {
    setActiveBannerPopup(activeBannerPopup === id ? null : id)
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#fff' }}>
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <Box sx={{ position: 'relative' }}>
        <Swiper
          spaceBetween={0}
          centeredSlides={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false
          }}
          pagination={{
            clickable: true,
            renderBullet: (index, className) => {
              return `<span class="${className}" style="width: 12px; height: 12px; background: ${className.includes('active') ? '#E36F3A' : 'rgba(255,255,255,0.5)'}; margin: 0 4px;"></span>`
            }
          }}
          modules={[Autoplay, Pagination]}
          style={{ height: '480px' }}
        >
          {heroSlides.map(slide => (
            <SwiperSlide key={slide.id}>
              <Box
                sx={{
                  position: 'relative',
                  height: '100%',
                  backgroundImage: `url(${slide.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                {/* Overlay */}
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to right, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)'
                  }}
                />

                {/* Content */}
                <Container maxWidth="xl" sx={{ height: '100%', position: 'relative', zIndex: 1 }}>
                  <Box
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      maxWidth: 550,
                      pl: { xs: 2, md: 4 }
                    }}
                  >
                    {/* Subtitle */}
                    <Typography
                      sx={{
                        color: 'white',
                        fontSize: '1rem',
                        fontWeight: 400,
                        mb: 1,
                        letterSpacing: 0.5
                      }}
                    >
                      {slide.subtitle}
                    </Typography>

                    {/* Title */}
                    <Typography
                      variant="h2"
                      sx={{
                        color: 'white',
                        fontWeight: 700,
                        fontSize: { xs: '2rem', md: '2.8rem' },
                        lineHeight: 1.2,
                        mb: 0.5,
                        textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                      }}
                    >
                      {slide.title}
                    </Typography>

                    {/* Title Line 2 */}
                    <Typography
                      variant="h2"
                      sx={{
                        color: 'white',
                        fontWeight: 700,
                        fontSize: { xs: '2rem', md: '2.8rem' },
                        lineHeight: 1.2,
                        mb: 3,
                        textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                      }}
                    >
                      {slide.title2}
                    </Typography>

                    {/* CTA Button */}
                    <Box>
                      <Button
                        variant="contained"
                        onClick={() => router.push('/en/store')}
                        sx={{
                          bgcolor: '#E36F3A',
                          color: 'white',
                          px: 4,
                          py: 1.5,
                          fontSize: '0.95rem',
                          fontWeight: 600,
                          borderRadius: '4px',
                          textTransform: 'uppercase',
                          letterSpacing: 1,
                          boxShadow: 'none',
                          '&:hover': {
                            bgcolor: '#B56A4B',
                            boxShadow: '0 4px 12px rgba(198,123,92,0.4)'
                          }
                        }}
                      >
                        {slide.buttonText}
                      </Button>
                    </Box>
                  </Box>
                </Container>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom pagination styling - dashes like in the design */}
        <style jsx global>{`
          .swiper-pagination {
            bottom: 20px !important;
          }
          .swiper-pagination-bullet {
            width: 24px !important;
            height: 4px !important;
            border-radius: 2px !important;
            background: rgba(255, 255, 255, 0.5) !important;
            opacity: 1 !important;
            margin: 0 3px !important;
          }
          .swiper-pagination-bullet-active {
            background: #E36F3A !important;
          }
        `}</style>
      </Box>

      {/* Features Bar */}
      <Box
        sx={{
          bgcolor: 'white',
          py: 2.5
        }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 2
            }}
          >
            {features.map((feature, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  flex: { xs: '1 1 45%', md: '1 1 auto' }
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    border: '1px solid #ddd',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <i className={feature.icon} style={{ fontSize: 20, color: '#666' }} />
                </Box>
                <Typography
                  sx={{
                    fontSize: '0.9rem',
                    color: '#333',
                    fontWeight: 400
                  }}
                >
                  {feature.text}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Shop By Category Section */}
      <Box sx={{ py: 6,  }}>
        <Container maxWidth="xl">
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              textAlign: 'center',
              mb: 5,
              color: '#333',
              fontSize: '1.5rem'
            }}
          >
            Shop By Category
          </Typography>

          {/* Categories Grid */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: 'repeat(3, 1fr)',
                sm: 'repeat(4, 1fr)',
                md: 'repeat(5, 1fr)'
              },
              gap: { xs: 2, md: 4 },
              rowGap: { xs: 3, md: 4 },
              justifyItems: 'center'
            }}
          >
            {categories.map(category => (
              <Box
                key={category.id}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.05)'
                  }
                }}
                onClick={() => router.push(`/en/products?category=${encodeURIComponent(category.name.toLowerCase())}`)}
              >
                <Box
                  component="img"
                  src={category.image}
                  alt={category.name}
                  sx={{
                    width: '100%',
                    maxWidth: 140,
                    height: 'auto',
                    aspectRatio: '1',
                    objectFit: 'contain'
                  }}
                />
                <Typography
                  sx={{
                    mt: 1.5,
                    fontSize: '0.8rem',
                    fontWeight: 400,
                    color: '#333',
                    textAlign: 'center'
                  }}
                >
                  {category.name}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Top Seller Section */}
      <Box sx={{ py: 6, bgcolor: 'white' }}>
        <Container maxWidth="xl">
          {/* Section Header */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 4
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: '#333',
                fontSize: '1.5rem'
              }}
            >
              Top Seller
            </Typography>
            <Typography
              component="a"
              href="/en/store?filter=top-seller"
              sx={{
                color: '#E36F3A',
                fontSize: '0.95rem',
                fontWeight: 500,
                textDecoration: 'none',
                cursor: 'pointer',
                '&:hover': {
                  textDecoration: 'underline'
                }
              }}
            >
              View All
            </Typography>
          </Box>

          {/* Products Carousel */}
          <Box sx={{ position: 'relative' }}>
            <Swiper
              slidesPerView={1}
              spaceBetween={16}
              navigation={true}
              breakpoints={{
                480: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
                1280: { slidesPerView: 5 }
              }}
              modules={[Navigation]}
              className="top-seller-swiper"
            >
              {topSellerProducts.map(product => (
                <SwiperSlide key={product.id}>
                  <ProductCard product={product} badge="BEST SELLER" />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom navigation styling */}
            <style jsx global>{`
              .top-seller-swiper {
                padding: 8px 0;
              }
              .top-seller-swiper .swiper-button-prev {
                display: none;
              }
              .top-seller-swiper .swiper-button-next {
                width: 40px;
                height: 40px;
                background: white;
                border-radius: 50%;
                border: 1px solid #e0e0e0;
                box-shadow: 0 2px 8px rgba(0,0,0,0.08);
                right: 0;
                top: 50%;
                transform: translateY(-50%);
              }
              .top-seller-swiper .swiper-button-next:after {
                font-size: 15px;
                width: 15px;
                height: 30px;
                color: #000;
                font-weight: 400;
              }
              .top-seller-swiper .swiper-button-next:hover {
                border-color: #ccc;
                box-shadow: 0 4px 12px rgba(0,0,0,0.12);
              }
            `}</style>
          </Box>
        </Container>
      </Box>

      {/* Banner Section - 4 Images with Interactive Dots */}
      <Box sx={{ py: 4, bgcolor: 'white' }}>
        <Container maxWidth="xl">
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' },
              gridTemplateRows: { md: '1fr 1fr' },
              gap: 2,
              height: { md: 450 }
            }}
          >
            {/* Left - Industrial Machinery (spans 2 rows) */}
            <Box
              sx={{
                gridRow: { md: 'span 2' },
                overflow: 'visible',
                position: 'relative',
                height: { xs: 300, md: '100%' }
              }}
            >
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=600&h=800&fit=crop"
                alt="Industrial Machinery"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
              {/* Interactive Dot */}
              <Box
                onClick={() => handleBannerDotClick(1)}
                sx={{
                  position: 'absolute',
                  bottom: '30%',
                  right: '20%',
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  bgcolor: activeBannerPopup === 1 ? '#E36F3A' : 'white',
                  border: '2px solid white',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                  cursor: 'pointer',
                  zIndex: 5,
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: -4,
                    borderRadius: '50%',
                    border: activeBannerPopup === 1 ? '2px solid rgba(227,111,58,0.5)' : '2px solid rgba(255,255,255,0.5)'
                  }
                }}
              />
              {/* Popup */}
              {activeBannerPopup === 1 && (
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: '35%',
                    right: '5%',
                    bgcolor: 'white',
                    borderRadius: 2,
                    p: 2,
                    minWidth: 200,
                    textAlign: 'center',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                    zIndex: 10
                  }}
                >
                  <Typography sx={{ color: '#E36F3A', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, mb: 0.5 }}>
                    {bannerItems[0].title}
                  </Typography>
                  <Typography sx={{ fontSize: '0.8rem', color: '#666', mb: 1 }}>
                    {bannerItems[0].description}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 0.5 }}>
                    <Typography sx={{ fontSize: '0.75rem', color: '#333' }}>EGP</Typography>
                    <Typography sx={{ fontSize: '1.5rem', fontWeight: 700, color: '#333' }}>{bannerItems[0].price.toFixed(2)}</Typography>
                  </Box>
                </Box>
              )}
            </Box>

            {/* Middle Top - Plastic Pipes */}
            <Box
              sx={{
                overflow: 'visible',
                position: 'relative',
                height: { xs: 200, md: '100%' }
              }}
            >
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&h=300&fit=crop"
                alt="Plastic Pipes"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
              {/* Interactive Dot */}
              <Box
                onClick={() => handleBannerDotClick(2)}
                sx={{
                  position: 'absolute',
                  top: '40%',
                  right: '25%',
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  bgcolor: activeBannerPopup === 2 ? '#E36F3A' : 'white',
                  border: '2px solid white',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                  cursor: 'pointer',
                  zIndex: 5,
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: -4,
                    borderRadius: '50%',
                    border: activeBannerPopup === 2 ? '2px solid rgba(227,111,58,0.5)' : '2px solid rgba(255,255,255,0.5)'
                  }
                }}
              />
              {/* Popup */}
              {activeBannerPopup === 2 && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    right: '10%',
                    bgcolor: 'white',
                    borderRadius: 2,
                    p: 2,
                    minWidth: 200,
                    textAlign: 'center',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                    zIndex: 10
                  }}
                >
                  <Typography sx={{ color: '#E36F3A', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, mb: 0.5 }}>
                    {bannerItems[1].title}
                  </Typography>
                  <Typography sx={{ fontSize: '0.8rem', color: '#666', mb: 1 }}>
                    {bannerItems[1].description}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 0.5 }}>
                    <Typography sx={{ fontSize: '0.75rem', color: '#333' }}>EGP</Typography>
                    <Typography sx={{ fontSize: '1.5rem', fontWeight: 700, color: '#333' }}>{bannerItems[1].price.toFixed(2)}</Typography>
                  </Box>
                </Box>
              )}
            </Box>

            {/* Right - Product Bags (spans 2 rows) */}
            <Box
              sx={{
                gridRow: { md: 'span 2' },
                overflow: 'visible',
                position: 'relative',
                height: { xs: 300, md: '100%' }
              }}
            >
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=800&fit=crop"
                alt="Product Bags"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
              {/* Interactive Dot */}
              <Box
                onClick={() => handleBannerDotClick(3)}
                sx={{
                  position: 'absolute',
                  top: '35%',
                  left: '30%',
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  bgcolor: activeBannerPopup === 3 ? '#E36F3A' : 'white',
                  border: '2px solid white',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                  cursor: 'pointer',
                  zIndex: 5,
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: -4,
                    borderRadius: '50%',
                    border: activeBannerPopup === 3 ? '2px solid rgba(227,111,58,0.5)' : '2px solid rgba(255,255,255,0.5)'
                  }
                }}
              />
              {/* Popup */}
              {activeBannerPopup === 3 && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: '40%',
                    left: '15%',
                    bgcolor: 'white',
                    borderRadius: 2,
                    p: 2,
                    minWidth: 200,
                    textAlign: 'center',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                    zIndex: 10
                  }}
                >
                  <Typography sx={{ color: '#E36F3A', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, mb: 0.5 }}>
                    {bannerItems[2].title}
                  </Typography>
                  <Typography sx={{ fontSize: '0.8rem', color: '#666', mb: 1 }}>
                    {bannerItems[2].description}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 0.5 }}>
                    <Typography sx={{ fontSize: '0.75rem', color: '#333' }}>EGP</Typography>
                    <Typography sx={{ fontSize: '1.5rem', fontWeight: 700, color: '#333' }}>{bannerItems[2].price.toFixed(2)}</Typography>
                  </Box>
                </Box>
              )}
            </Box>

            {/* Middle Bottom - Bottles */}
            <Box
              sx={{
                overflow: 'visible',
                position: 'relative',
                height: { xs: 200, md: '100%' }
              }}
            >
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1563203369-26f2e4a5ccf7?w=600&h=300&fit=crop"
                alt="Plastic Bottles"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
              {/* Interactive Dot */}
              <Box
                onClick={() => handleBannerDotClick(4)}
                sx={{
                  position: 'absolute',
                  top: '25%',
                  left: '35%',
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  bgcolor: activeBannerPopup === 4 ? '#E36F3A' : 'white',
                  border: '2px solid white',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                  cursor: 'pointer',
                  zIndex: 5,
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: -4,
                    borderRadius: '50%',
                    border: activeBannerPopup === 4 ? '2px solid rgba(227,111,58,0.5)' : '2px solid rgba(255,255,255,0.5)'
                  }
                }}
              />
              {/* Popup */}
              {activeBannerPopup === 4 && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: -70,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    bgcolor: 'white',
                    borderRadius: 2,
                    p: 2,
                    minWidth: 200,
                    textAlign: 'center',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                    zIndex: 10
                  }}
                >
                  <Typography sx={{ color: '#E36F3A', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, mb: 0.5 }}>
                    {bannerItems[3].title}
                  </Typography>
                  <Typography sx={{ fontSize: '0.8rem', color: '#666', mb: 1 }}>
                    {bannerItems[3].description}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 0.5 }}>
                    <Typography sx={{ fontSize: '0.75rem', color: '#333' }}>EGP</Typography>
                    <Typography sx={{ fontSize: '1.5rem', fontWeight: 700, color: '#333' }}>{bannerItems[3].price.toFixed(2)}</Typography>
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Stainless Steel Plate Section */}
      <Box sx={{ py: 6, bgcolor: 'white' }}>
        <Container maxWidth="xl">
          {/* Section Header */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 4
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: '#333',
                fontSize: '1.5rem'
              }}
            >
              Stainless Steel Plate
            </Typography>
            <Typography
              component="a"
              href="/en/store?category=stainless-steel"
              sx={{
                color: '#E36F3A',
                fontSize: '0.95rem',
                fontWeight: 500,
                textDecoration: 'none',
                cursor: 'pointer',
                '&:hover': {
                  textDecoration: 'underline'
                }
              }}
            >
              View All
            </Typography>
          </Box>

          {/* Products Carousel */}
          <Box sx={{ position: 'relative' }}>
            <Swiper
              slidesPerView={1}
              spaceBetween={16}
              navigation={true}
              breakpoints={{
                480: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
                1280: { slidesPerView: 5 }
              }}
              modules={[Navigation]}
              className="steel-swiper"
            >
              {steelProducts.map(product => (
                <SwiperSlide key={product.id}>
                  <Card
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
                      <Chip
                        label="BEST SELLER"
                        size="small"
                        sx={{
                          bgcolor: '#E36F3A',
                          color: 'white',
                          fontWeight: 600,
                          fontSize: '0.65rem',
                          height: 20,
                          borderRadius: 1
                        }}
                      />
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
                          height: 160,
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
                        >
                          <i className="ri-bookmark-line" style={{ fontSize: 18, color: '#666' }} />
                        </IconButton>
                        <IconButton
                          size="small"
                          sx={{
                            bgcolor: 'white',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                            '&:hover': { bgcolor: '#f5f5f5' }
                          }}
                        >
                          <i className="ri-stack-line" style={{ fontSize: 18, color: '#666' }} />
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
                            fontSize: '0.8rem',
                            py: 0.75,
                            borderRadius: 1,
                            textTransform: 'none',
                            '&:hover': { bgcolor: '#d55f2a' }
                          }}
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
                            fontSize: '0.8rem',
                            py: 0.75,
                            borderRadius: 1,
                            textTransform: 'none',
                            '&:hover': {
                              borderColor: '#d55f2a',
                              bgcolor: 'rgba(255,255,255,0.95)'
                            }
                          }}
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
                        {product.category}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '0.85rem',
                          fontWeight: 500,
                          color: '#333',
                          mb: 0.5,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          minHeight: 40,
                          lineHeight: 1.4
                        }}
                      >
                        {product.name}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '0.75rem',
                          color: '#888',
                          mb: 1
                        }}
                      >
                        {product.size}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                        <Typography
                          sx={{
                            fontSize: '0.75rem',
                            color: '#E36F3A',
                            fontWeight: 500
                          }}
                        >
                          EGP
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: '1.25rem',
                            fontWeight: 700,
                            color: '#E36F3A'
                          }}
                        >
                          {product.price.toFixed(2)}
                        </Typography>
                        {product.originalPrice && (
                          <Typography
                            sx={{
                              fontSize: '0.85rem',
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

            {/* Custom navigation styling for steel section */}
            <style jsx global>{`
              .steel-swiper {
                padding: 8px 0;
              }
              .steel-swiper .swiper-button-prev {
                display: none;
              }
              .steel-swiper .swiper-button-next {
                width: 40px;
                height: 40px;
                background: white;
                border-radius: 50%;
                border: 1px solid #e0e0e0;
                box-shadow: 0 2px 8px rgba(0,0,0,0.08);
                right: 0;
                top: 50%;
                transform: translateY(-50%);
              }
              .steel-swiper .swiper-button-next:after {
                font-size: 15px;
                width: 15px;
                height: 30px;
                color: #000;
                font-weight: 400;
              }
              .steel-swiper .swiper-button-next:hover {
                border-color: #ccc;
                box-shadow: 0 4px 12px rgba(0,0,0,0.12);
              }
            `}</style>
          </Box>
        </Container>
      </Box>

      {/* Premium Flexible PVC Sheets Banner */}
      <Box
        sx={{
          py: { xs: 6, md: 8 },
          position: 'relative',
          backgroundImage: 'url(https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=1600&h=600&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'right center',
          bgcolor: '#4a4a4a',
          minHeight: { md: 350 },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: { xs: '100%', md: '55%' },
            height: '100%',
            background: { 
              xs: 'rgba(60, 60, 60, 0.85)',
              md: 'linear-gradient(to right, rgba(60, 60, 60, 0.9) 0%, rgba(60, 60, 60, 0.7) 60%, rgba(60, 60, 60, 0) 100%)'
            },
            zIndex: 1
          }
        }}
      >
        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2 }}>
          <Box sx={{ maxWidth: 480 }}>
            <Typography
              sx={{
                fontSize: { xs: '1.5rem', md: '2rem' },
                fontWeight: 700,
                color: 'white',
                lineHeight: 1.3,
                mb: 2.5
              }}
            >
              Premium Flexible PVC Sheets<br />
              Durable & Weather-Resistant For<br />
              Industrial Use
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box
                  sx={{
                    width: 18,
                    height: 18,
                    borderRadius: '50%',
                    border: '1.5px solid rgba(255,255,255,0.7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Typography sx={{ color: 'white', fontSize: '0.65rem', fontWeight: 600 }}>✓</Typography>
                </Box>
                <Typography sx={{ color: 'white', fontSize: '0.9rem' }}>High Flexibility & Easy Forming</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box
                  sx={{
                    width: 18,
                    height: 18,
                    borderRadius: '50%',
                    border: '1.5px solid rgba(255,255,255,0.7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Typography sx={{ color: 'white', fontSize: '0.65rem', fontWeight: 600 }}>✓</Typography>
                </Box>
                <Typography sx={{ color: 'white', fontSize: '0.9rem' }}>UV & Chemical Resistance</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box
                  sx={{
                    width: 18,
                    height: 18,
                    borderRadius: '50%',
                    border: '1.5px solid rgba(255,255,255,0.7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Typography sx={{ color: 'white', fontSize: '0.65rem', fontWeight: 600 }}>✓</Typography>
                </Box>
                <Typography sx={{ color: 'white', fontSize: '0.9rem' }}>Long-Lasting Performance in Indoor & Outdoor Environments</Typography>
              </Box>
            </Box>

            <Button
              variant="contained"
              sx={{
                color: '#E36F3A',
                bgcolor: 'white',
                borderRadius: 1.5,
                px: 2.5,
                py: 0.75,
                fontSize: '0.85rem',
                fontWeight: 500,
                textTransform: 'none',
                boxShadow: 'none',
                border: 'none',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.9)',
                  boxShadow: 'none'
                }
              }}
            >
              Shop Now
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Waterproof Canvas Section */}
      <Box sx={{ py: 6, bgcolor: 'white' }}>
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography sx={{ fontSize: '1.5rem', fontWeight: 600, color: '#1a1a1a' }}>
              Waterproof Canvas
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
              className="canvas-swiper"
              breakpoints={{
                480: { slidesPerView: 2.2 },
                768: { slidesPerView: 3.2 },
                1024: { slidesPerView: 4.2 },
                1280: { slidesPerView: 5.2 }
              }}
            >
              {waterproofCanvasProducts.map((product) => (
                <SwiperSlide key={product.id}>
                  <Card
                    onClick={() => router.push(`/en/product/${product.id}`)}
                    sx={{
                      borderRadius: 2,
                      boxShadow: 'none',
                      border: '1px solid #f0f0f0',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                      }
                    }}
                  >
                    {/* Image Container */}
                    <Box sx={{ position: 'relative', bgcolor: '#f8f8f8' }}>
                      <CardMedia
                        component="img"
                        image={product.image}
                        alt={product.name}
                        sx={{ height: 180, objectFit: 'cover' }}
                      />
                      {/* Badge */}
                      <Chip
                        label={product.badge}
                        size="small"
                        sx={{
                          position: 'absolute',
                          top: 8,
                          left: 8,
                          bgcolor: product.badgeColor,
                          color: 'white',
                          fontSize: '0.65rem',
                          fontWeight: 600,
                          height: 20,
                          borderRadius: 0.5
                        }}
                      />
                      {/* Material Tag */}
                      <Chip
                        label={product.materialTag}
                        size="small"
                        sx={{
                          position: 'absolute',
                          top: 8,
                          right: 8,
                          bgcolor: 'white',
                          color: '#666',
                          fontSize: '0.65rem',
                          fontWeight: 500,
                          height: 20,
                          borderRadius: 0.5,
                          border: '1px solid #e0e0e0'
                        }}
                      />
                      {/* Discount Badge */}
                      {product.discount && (
                        <Box
                          sx={{
                            position: 'absolute',
                            bottom: 8,
                            left: 8,
                            bgcolor: '#E36F3A',
                            color: 'white',
                            px: 1,
                            py: 0.25,
                            borderRadius: 0.5,
                            fontSize: '0.7rem',
                            fontWeight: 600
                          }}
                        >
                          {product.discount}% Off
                        </Box>
                      )}
                    </Box>

                    {/* Content */}
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
                        {product.category}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '0.85rem',
                          fontWeight: 500,
                          color: '#1a1a1a',
                          mb: 0.5,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {product.name}
                      </Typography>
                      {/* Size and Color Swatches on same line */}
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                        <Typography sx={{ fontSize: '0.75rem', color: '#888', textDecoration: 'underline' }}>
                          {product.size}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 0.5 }}>
                          {product.colors.map((color, idx) => (
                            <Box
                              key={idx}
                              sx={{
                                width: 14,
                                height: 14,
                                borderRadius: 0.5,
                                bgcolor: color,
                                border: '1px solid #e0e0e0'
                              }}
                            />
                          ))}
                        </Box>
                      </Box>

                      {/* Price */}
                      <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5 }}>
                        <Typography sx={{ fontSize: '0.7rem', color: product.priceColor || '#666' }}>EGP</Typography>
                        <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, color: product.priceColor || '#1a1a1a' }}>
                          {product.price.toFixed(2)}
                        </Typography>
                        {product.originalPrice && (
                          <Typography
                            sx={{
                              fontSize: '0.75rem',
                              color: '#999',
                              textDecoration: 'line-through',
                              ml: 0.5
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

            {/* Custom navigation styling for canvas section */}
            <style jsx global>{`
              .canvas-swiper {
                padding: 8px 0;
              }
              .canvas-swiper .swiper-button-prev {
                display: none;
              }
              .canvas-swiper .swiper-button-next {
                width: 40px;
                height: 40px;
                background: white;
                border-radius: 50%;
                border: 1px solid #e0e0e0;
                box-shadow: 0 2px 8px rgba(0,0,0,0.08);
                right: 0;
                top: 50%;
                transform: translateY(-50%);
              }
              .canvas-swiper .swiper-button-next:after {
                font-size: 15px;
                width: 15px;
                height: 30px;
                color: #000;
                font-weight: 400;
              }
              .canvas-swiper .swiper-button-next:hover {
                border-color: #ccc;
                box-shadow: 0 4px 12px rgba(0,0,0,0.12);
              }
            `}</style>
          </Box>
        </Container>
      </Box>

      {/* Elegant Wood Materials Banner */}
      <Box
        sx={{
          py: { xs: 6, md: 8 },
          position: 'relative',
          backgroundImage: 'url(https://images.unsplash.com/photo-1541123603104-512919d6a96c?w=1600&h=600&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center right',
          bgcolor: '#3d2a1f',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '55%',
            height: '100%',
            background: 'linear-gradient(to right, #3d2a1f 0%, #3d2a1f 60%, rgba(61, 42, 31, 0) 100%)',
            zIndex: 1
          }
        }}
      >
        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2 }}>
          <Box sx={{ maxWidth: 480 }}>
            <Typography
              sx={{
                fontSize: { xs: '1.5rem', md: '2rem' },
                fontWeight: 700,
                color: 'white',
                lineHeight: 1.3,
                mb: 2.5,
                fontStyle: 'italic'
              }}
            >
              Elegant Wood Materials<br />
              Natural Strength & Timeless<br />
              Design
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box
                  sx={{
                    width: 18,
                    height: 18,
                    borderRadius: '50%',
                    border: '1.5px solid rgba(255,255,255,0.6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Typography sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.65rem', fontWeight: 600 }}>✓</Typography>
                </Box>
                <Typography sx={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.9rem' }}>High Durability</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box
                  sx={{
                    width: 18,
                    height: 18,
                    borderRadius: '50%',
                    border: '1.5px solid rgba(255,255,255,0.6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Typography sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.65rem', fontWeight: 600 }}>✓</Typography>
                </Box>
                <Typography sx={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.9rem' }}>Natural Texture</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box
                  sx={{
                    width: 18,
                    height: 18,
                    borderRadius: '50%',
                    border: '1.5px solid rgba(255,255,255,0.6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Typography sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.65rem', fontWeight: 600 }}>✓</Typography>
                </Box>
                <Typography sx={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.9rem' }}>Suitable for Interior & Structural Applications</Typography>
              </Box>
            </Box>

            <Button
              variant="contained"
              sx={{
                color: '#E36F3A',
                bgcolor: 'white',
                borderRadius: 1.5,
                px: 2.5,
                py: 0.75,
                fontSize: '0.85rem',
                fontWeight: 500,
                textTransform: 'none',
                boxShadow: 'none',
                border: 'none',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.9)',
                  boxShadow: 'none'
                }
              }}
            >
              Shop Now
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Wood Wall Panel Section */}
      <Box sx={{ py: 6, bgcolor: 'white' }}>
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography sx={{ fontSize: '1.5rem', fontWeight: 600, color: '#1a1a1a' }}>
              Wood Wall Panel
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
              className="wood-swiper"
              breakpoints={{
                480: { slidesPerView: 2.2 },
                768: { slidesPerView: 3.2 },
                1024: { slidesPerView: 4.2 },
                1280: { slidesPerView: 5.2 }
              }}
            >
              {woodPanelProducts.map((product) => (
                <SwiperSlide key={product.id}>
                  <Card
                    onClick={() => router.push(`/en/product/${product.id}`)}
                    sx={{
                      borderRadius: 2,
                      boxShadow: 'none',
                      border: '1px solid #f0f0f0',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                      }
                    }}
                  >
                    {/* Image Container */}
                    <Box sx={{ position: 'relative', bgcolor: '#f8f8f8' }}>
                      <CardMedia
                        component="img"
                        image={product.image}
                        alt={product.name}
                        sx={{ height: 180, objectFit: 'cover' }}
                      />
                      {/* Badge */}
                      <Chip
                        label={product.badge}
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
                      {/* Material Tag */}
                      <Chip
                        label={product.materialTag}
                        size="small"
                        sx={{
                          position: 'absolute',
                          top: 8,
                          right: 8,
                          bgcolor: 'white',
                          color: '#666',
                          fontSize: '0.65rem',
                          fontWeight: 500,
                          height: 20,
                          borderRadius: 0.5,
                          border: '1px solid #e0e0e0'
                        }}
                      />
                    </Box>

                    {/* Content */}
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
                        {product.category}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '0.85rem',
                          fontWeight: 500,
                          color: '#1a1a1a',
                          mb: 0.5,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {product.name}
                      </Typography>
                      {/* Size and Color Swatches on same line */}
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                        <Typography sx={{ fontSize: '0.75rem', color: '#888', textDecoration: 'underline' }}>
                          {product.size}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 0.5 }}>
                          {product.colors.map((color, idx) => (
                            <Box
                              key={idx}
                              sx={{
                                width: 14,
                                height: 14,
                                borderRadius: 0.5,
                                bgcolor: color,
                                border: '1px solid #e0e0e0'
                              }}
                            />
                          ))}
                        </Box>
                      </Box>

                      {/* Price */}
                      <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5 }}>
                        <Typography sx={{ fontSize: '0.7rem', color: '#666' }}>EGP</Typography>
                        <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, color: '#1a1a1a' }}>
                          {product.price.toFixed(2)}
                        </Typography>
                      </Box>
                    </Box>
                  </Card>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom navigation styling for wood section */}
            <style jsx global>{`
              .wood-swiper {
                padding: 8px 0;
              }
              .wood-swiper .swiper-button-prev {
                display: none;
              }
              .wood-swiper .swiper-button-next {
                width: 40px;
                height: 40px;
                background: white;
                border-radius: 50%;
                border: 1px solid #e0e0e0;
                box-shadow: 0 2px 8px rgba(0,0,0,0.08);
                right: 0;
                top: 50%;
                transform: translateY(-50%);
              }
              .wood-swiper .swiper-button-next:after {
                font-size: 15px;
                width: 15px;
                height: 30px;
                color: #000;
                font-weight: 400;
              }
              .wood-swiper .swiper-button-next:hover {
                border-color: #ccc;
                box-shadow: 0 4px 12px rgba(0,0,0,0.12);
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

export default HomePage
