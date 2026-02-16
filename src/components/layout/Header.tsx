'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

// MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import Container from '@mui/material/Container'
import Badge from '@mui/material/Badge'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

// Navigation items
const navItems = [
  { label: 'paper', href: '/en/products?category=paper' },
  { label: 'plastic', href: '/en/products?category=plastic' },
  { label: 'Top Sellers', href: '/en/products?sort=top-sellers' },
  { label: 'New Arrivals', href: '/en/products?sort=new' },
  { label: 'Hot Deals', href: '/en/products?deals=true', isHighlighted: true }
]

const Header = () => {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [cartCount] = useState(2)
  const [wishlistCount] = useState(1)
  const [categoriesAnchor, setCategoriesAnchor] = useState<null | HTMLElement>(null)

  const handleCategoriesClick = (event: React.MouseEvent<HTMLElement>) => {
    setCategoriesAnchor(event.currentTarget)
  }

  const handleCategoriesClose = () => {
    setCategoriesAnchor(null)
  }

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/en/store?search=${encodeURIComponent(searchQuery)}`)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <>
      {/* Top Header - Dark */}
      <Box
        sx={{
          bgcolor: '#31323D',
          py: 1.5,
          px: 2
        }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 3
            }}
          >
            {/* Logo */}
            <Box
              component="img"
              src="/images/khamatko-logo.png"
              alt="Khamatko"
              onClick={() => router.push('/en')}
              sx={{
                height: 24,
                width: 'auto',
                cursor: 'pointer'
              }}
            />

            {/* Search Bar */}
            <Box
              sx={{
                flex: 1,
                maxWidth: 600,
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <TextField
                fullWidth
                placeholder="I'm looking for..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    bgcolor: 'white',
                    borderRadius: '4px 0 0 4px',
                    '& fieldset': {
                      border: 'none'
                    },
                    '& input': {
                      py: 1.25,
                      px: 2,
                      fontSize: '0.95rem',
                      '&::placeholder': {
                        color: '#999',
                        opacity: 1
                      }
                    }
                  }
                }}
              />
              <Button
                variant="contained"
                onClick={handleSearch}
                sx={{
                  bgcolor: '#E36F3A',
                  color: 'white',
                  borderRadius: '0 4px 4px 0',
                  px: 3,
                  py: 1.25,
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  textTransform: 'uppercase',
                  boxShadow: 'none',
                  minWidth: 100,
                  '&:hover': {
                    bgcolor: '#B56A4B',
                    boxShadow: 'none'
                  }
                }}
              >
                Search
              </Button>
            </Box>

            {/* Action Icons */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton sx={{ color: 'white' }} onClick={() => router.push('/en/register')}>
                <i className="ri-user-line" style={{ fontSize: 22 }} />
              </IconButton>

              <IconButton sx={{ color: 'white' }}>
                <Badge
                  badgeContent={cartCount}
                  sx={{
                    '& .MuiBadge-badge': {
                      bgcolor: '#E36F3A',
                      color: 'white',
                      fontSize: '0.65rem',
                      minWidth: 16,
                      height: 16
                    }
                  }}
                >
                  <i className="ri-shopping-cart-line" style={{ fontSize: 22 }} />
                </Badge>
              </IconButton>

              <IconButton sx={{ color: 'white' }}>
                <Badge
                  badgeContent={wishlistCount}
                  sx={{
                    '& .MuiBadge-badge': {
                      bgcolor: '#E36F3A',
                      color: 'white',
                      fontSize: '0.65rem',
                      minWidth: 16,
                      height: 16
                    }
                  }}
                >
                  <i className="ri-bookmark-line" style={{ fontSize: 22 }} />
                </Badge>
              </IconButton>

              <IconButton sx={{ color: 'white' }}>
                <i className="ri-global-line" style={{ fontSize: 22 }} />
              </IconButton>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Navigation Bar - Light Gray */}
      <Box
        sx={{
          bgcolor: '#f5f5f5',
          borderBottom: '1px solid #e0e0e0',
          py: 1,
          px: 2
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              {/* All Categories Dropdown */}
              <Button
                onClick={handleCategoriesClick}
                endIcon={<i className="ri-arrow-down-s-line" style={{ fontSize: 18 }} />}
                sx={{
                  color: '#333',
                  fontWeight: 500,
                  fontSize: '0.95rem',
                  textTransform: 'none',
                  '&:hover': {
                    bgcolor: 'transparent'
                  }
                }}
              >
                All Categories
              </Button>
              <Menu
                anchorEl={categoriesAnchor}
                open={Boolean(categoriesAnchor)}
                onClose={handleCategoriesClose}
                sx={{
                  '& .MuiPaper-root': {
                    mt: 1,
                    minWidth: 200
                  }
                }}
              >
                <MenuItem onClick={handleCategoriesClose}>Paper Products</MenuItem>
                <MenuItem onClick={handleCategoriesClose}>Plastic Products</MenuItem>
                <MenuItem onClick={handleCategoriesClose}>Wood Materials</MenuItem>
                <MenuItem onClick={handleCategoriesClose}>Metal Supplies</MenuItem>
                <MenuItem onClick={handleCategoriesClose}>Packaging</MenuItem>
              </Menu>

              {/* Navigation Links */}
              {navItems.map(item => (
                <Typography
                  key={item.label}
                  component="a"
                  href={item.href}
                  sx={{
                    color: item.isHighlighted ? '#E36F3A' : '#333',
                    fontWeight: item.isHighlighted ? 600 : 400,
                    fontSize: '0.95rem',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    transition: 'color 0.2s',
                    '&:hover': {
                      color: '#E36F3A'
                    }
                  }}
                >
                  {item.label}
                </Typography>
              ))}
            </Box>

            {/* Advanced Search */}
            <Typography
              component="a"
              href="/en/products?advanced=true"
              sx={{
                color: '#333',
                fontSize: '0.9rem',
                textDecoration: 'none',
                cursor: 'pointer',
                '&:hover': {
                  color: '#E36F3A'
                }
              }}
            >
              Advanced search
            </Typography>
          </Box>
        </Container>
      </Box>
    </>
  )
}

export default Header
