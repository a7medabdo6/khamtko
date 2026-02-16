'use client'

import { useRouter } from 'next/navigation'

// MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Chip from '@mui/material/Chip'

export interface ProductCardProps {
  id: number
  category?: string
  brand?: string
  name: string
  stock?: string
  size?: string
  price: number
  originalPrice?: number | null
  discount?: number | null
  image: string
  badge?: string
}

const ProductCard = ({ product, badge }: { product: ProductCardProps; badge?: string }) => {
  const router = useRouter()

  const label = product.category || product.brand || ''
  const subtitle = product.stock || product.size || ''

  return (
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
        {(badge || product.badge) && (
          <Chip
            label={badge || product.badge}
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
        )}
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
            onClick={(e) => e.stopPropagation()}
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
            onClick={(e) => e.stopPropagation()}
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
              fontSize: '0.8rem',
              py: 0.75,
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
          {label}
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
          {subtitle}
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
  )
}

export default ProductCard
