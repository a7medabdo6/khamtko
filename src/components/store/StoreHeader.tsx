'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  TextField,
  Badge,
  Stack,
  Tooltip,
  Box,
  Container,
  Menu,
  MenuItem
} from '@mui/material'

const navItems = ['Home', 'Shop', 'Categories', 'Deals', 'New Arrivals', 'Contact']

type StoreHeaderProps = {
  cartCount?: number
  wishlistCount?: number
  onSearch?: (query: string) => void
}

export default function StoreHeader({ cartCount = 0, wishlistCount = 0, onSearch }: StoreHeaderProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
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

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    if (onSearch) {
      onSearch(value)
    }
  }

  return (
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
            onClick={() => router.push('/en/store')}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                bgcolor: '#009BFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 15px rgba(0,155,255,0.3)'
              }}
            >
              <i className="ri-shopping-bag-3-fill" style={{ color: 'white', fontSize: 22 }} />
            </Box>
            <Typography
              variant="h5"
              component="div"
              sx={{
                fontWeight: 800,
                color: '#009BFF',
                letterSpacing: -0.5,
                fontSize: '1.5rem'
              }}
            >
              Khamatko
            </Typography>
          </Box>

          {/* Navigation */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 0.5, ml: 4 }}>
            {navItems.map(item => (
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
                    transform: 'translateX(-50%)'
                  },
                  '&:hover': {
                    color: 'primary.main',
                    bgcolor: 'rgba(0,155,255,0.08)',
                    '&::before': {
                      width: '70%'
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
              onChange={e => handleSearchChange(e.target.value)}
              InputProps={{
                startAdornment: <i className="ri-search-line" style={{ marginRight: 8, color: '#999', fontSize: 20 }} />,
                sx: {
                  borderRadius: 3,
                  bgcolor: '#F8F9FA',
                  transition: 'all 0.3s',
                  '& fieldset': { border: 'none' },
                  '&:hover': {
                    bgcolor: '#F0F1F3'
                  },
                  '&.Mui-focused': {
                    bgcolor: 'white',
                    boxShadow: '0 0 0 2px rgba(0,155,255,0.2)'
                  }
                }
              }}
            />
          </Box>

          {/* Action Buttons */}
          <Stack direction="row" spacing={1} alignItems="center">
            <Tooltip title="Wishlist" arrow>
              <IconButton
                sx={{
                  transition: 'all 0.3s',
                  '&:hover': {
                    bgcolor: 'primary.lighter',
                    transform: 'scale(1.1)',
                    '& i': { color: 'primary.main' }
                  }
                }}
              >
                <Badge badgeContent={wishlistCount} color="error" max={99}>
                  <i className="ri-heart-line" style={{ fontSize: 22, transition: 'color 0.3s' }} />
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
                  <i className="ri-shopping-cart-line" style={{ fontSize: 22, transition: 'color 0.3s' }} />
                </Badge>
              </IconButton>
            </Tooltip>

            {/* Language Selector */}
            <Tooltip title="Language" arrow>
              <IconButton
                onClick={handleLangMenuOpen}
                sx={{
                  transition: 'all 0.3s',
                  '&:hover': {
                    bgcolor: 'primary.lighter',
                    transform: 'scale(1.1)',
                    '& i': { color: 'primary.main' }
                  }
                }}
              >
                <i className="ri-global-line" style={{ fontSize: 22, transition: 'color 0.3s' }} />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={langAnchorEl}
              open={Boolean(langAnchorEl)}
              onClose={handleLangMenuClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              sx={{
                '& .MuiPaper-root': {
                  borderRadius: 2,
                  mt: 1,
                  minWidth: 150,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                }
              }}
            >
              <MenuItem
                onClick={() => handleLanguageChange('en')}
                selected={currentLang === 'en'}
                sx={{
                  gap: 2,
                  '&.Mui-selected': {
                    bgcolor: 'rgba(0,155,255,0.1)',
                    '&:hover': {
                      bgcolor: 'rgba(0,155,255,0.15)'
                    }
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Box sx={{ fontSize: '1.5rem' }}>🇬🇧</Box>
                  <Typography>English</Typography>
                </Box>
              </MenuItem>
              <MenuItem
                onClick={() => handleLanguageChange('ar')}
                selected={currentLang === 'ar'}
                sx={{
                  gap: 2,
                  '&.Mui-selected': {
                    bgcolor: 'rgba(0,155,255,0.1)',
                    '&:hover': {
                      bgcolor: 'rgba(0,155,255,0.15)'
                    }
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Box sx={{ fontSize: '1.5rem' }}>🇸🇦</Box>
                  <Typography>العربية</Typography>
                </Box>
              </MenuItem>
            </Menu>

            <Button
              variant="contained"
              startIcon={<i className="ri-login-box-line" />}
              sx={{
                ml: 1,
                px: 3,
                py: 1,
                borderRadius: 3,
                fontWeight: 700,
                fontSize: '0.9rem',
                textTransform: 'none',
                bgcolor: '#009BFF',
                color: 'white',
                boxShadow: '0 4px 15px rgba(0,155,255,0.3)',
                transition: 'all 0.3s',
                '&:hover': {
                  bgcolor: '#0088E6',
                  boxShadow: '0 6px 20px rgba(0,155,255,0.4)',
                  transform: 'translateY(-2px)'
                }
              }}
            >
              Login
            </Button>
          </Stack>

          {/* Mobile Menu Button */}
          <IconButton sx={{ display: { xs: 'flex', md: 'none' }, ml: 'auto' }}>
            <i className="ri-menu-line" style={{ fontSize: 24 }} />
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

