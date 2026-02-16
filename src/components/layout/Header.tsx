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
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import Collapse from '@mui/material/Collapse'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

// Navigation items
const navItems = [
  { label: 'paper', href: '/en/products?category=paper' },
  { label: 'plastic', href: '/en/products?category=plastic' },
  { label: 'Top Sellers', href: '/en/products?sort=top-sellers' },
  { label: 'New Arrivals', href: '/en/products?sort=new' },
  { label: 'Hot Deals', href: '/en/products?deals=true', isHighlighted: true }
]

const categoryItems = [
  { label: 'Paper Products', href: '/en/products?category=paper' },
  { label: 'Plastic Products', href: '/en/products?category=plastic' },
  { label: 'Wood Materials', href: '/en/products?category=wood' },
  { label: 'Metal Supplies', href: '/en/products?category=metal' },
  { label: 'Packaging', href: '/en/products?category=packaging' }
]

const Header = () => {
  const router = useRouter()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const [searchQuery, setSearchQuery] = useState('')
  const [cartCount] = useState(2)
  const [wishlistCount] = useState(1)
  const [categoriesAnchor, setCategoriesAnchor] = useState<null | HTMLElement>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [drawerCategoriesOpen, setDrawerCategoriesOpen] = useState(false)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)

  const handleCategoriesClick = (event: React.MouseEvent<HTMLElement>) => {
    setCategoriesAnchor(event.currentTarget)
  }

  const handleCategoriesClose = () => {
    setCategoriesAnchor(null)
  }

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/en/store?search=${encodeURIComponent(searchQuery)}`)
      setMobileSearchOpen(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const handleDrawerNav = (href: string) => {
    setDrawerOpen(false)
    router.push(href)
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
              gap: { xs: 1, md: 3 }
            }}
          >
            {/* Hamburger - mobile only */}
            {isMobile && (
              <IconButton sx={{ color: 'white', mr: 0.5 }} onClick={() => setDrawerOpen(true)}>
                <i className="ri-menu-line" style={{ fontSize: 24 }} />
              </IconButton>
            )}

            {/* Logo */}
            <Box
              component="img"
              src="/images/khamatko-logo.png"
              alt="Khamatko"
              onClick={() => router.push('/en')}
              sx={{
                height: 24,
                width: 'auto',
                cursor: 'pointer',
                flexShrink: 0
              }}
            />

            {/* Search Bar - desktop */}
            <Box
              sx={{
                flex: 1,
                maxWidth: 600,
                display: { xs: 'none', md: 'flex' },
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
            <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, md: 1 }, ml: 'auto' }}>
              {/* Search icon - mobile only */}
              {isMobile && (
                <IconButton sx={{ color: 'white' }} onClick={() => setMobileSearchOpen(!mobileSearchOpen)}>
                  <i className="ri-search-line" style={{ fontSize: 22 }} />
                </IconButton>
              )}

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

              <IconButton sx={{ color: 'white', display: { xs: 'none', sm: 'flex' } }}>
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

              <IconButton sx={{ color: 'white', display: { xs: 'none', sm: 'flex' } }}>
                <i className="ri-global-line" style={{ fontSize: 22 }} />
              </IconButton>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Mobile Search Bar - slides down */}
      {isMobile && (
        <Collapse in={mobileSearchOpen}>
          <Box sx={{ bgcolor: '#31323D', px: 2, pb: 1.5 }}>
            <Container maxWidth="xl">
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                  fullWidth
                  placeholder="I'm looking for..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  autoFocus
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: 'white',
                      borderRadius: '4px 0 0 4px',
                      '& fieldset': { border: 'none' },
                      '& input': {
                        py: 1,
                        px: 2,
                        fontSize: '0.9rem',
                        '&::placeholder': { color: '#999', opacity: 1 }
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
                    px: 2.5,
                    py: 1,
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    textTransform: 'uppercase',
                    boxShadow: 'none',
                    minWidth: 80,
                    '&:hover': { bgcolor: '#B56A4B', boxShadow: 'none' }
                  }}
                >
                  Search
                </Button>
              </Box>
            </Container>
          </Box>
        </Collapse>
      )}

      {/* Navigation Bar - desktop only */}
      <Box
        sx={{
          bgcolor: '#f5f5f5',
          borderBottom: '1px solid #e0e0e0',
          py: 1,
          px: 2,
          display: { xs: 'none', md: 'block' }
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
                {categoryItems.map(cat => (
                  <MenuItem
                    key={cat.label}
                    onClick={() => {
                      handleCategoriesClose()
                      router.push(cat.href)
                    }}
                  >
                    {cat.label}
                  </MenuItem>
                ))}
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

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: 300,
            bgcolor: '#fff'
          }
        }}
      >
        {/* Drawer Header */}
        <Box
          sx={{
            bgcolor: '#31323D',
            px: 2,
            py: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Box
            component="img"
            src="/images/khamatko-logo.png"
            alt="Khamatko"
            sx={{ height: 22, width: 'auto' }}
          />
          <IconButton sx={{ color: 'white' }} onClick={() => setDrawerOpen(false)}>
            <i className="ri-close-line" style={{ fontSize: 22 }} />
          </IconButton>
        </Box>

        {/* Drawer Content */}
        <List disablePadding>
          {/* All Categories - collapsible */}
          <ListItem disablePadding>
            <ListItemButton onClick={() => setDrawerCategoriesOpen(!drawerCategoriesOpen)}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <i className="ri-grid-line" style={{ fontSize: 20, color: '#555' }} />
              </ListItemIcon>
              <ListItemText
                primary="All Categories"
                primaryTypographyProps={{ fontWeight: 500, fontSize: '0.95rem' }}
              />
              <i
                className={drawerCategoriesOpen ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'}
                style={{ fontSize: 20, color: '#888' }}
              />
            </ListItemButton>
          </ListItem>

          <Collapse in={drawerCategoriesOpen} timeout="auto">
            <List disablePadding sx={{ pl: 2 }}>
              {categoryItems.map(cat => (
                <ListItem key={cat.label} disablePadding>
                  <ListItemButton
                    onClick={() => handleDrawerNav(cat.href)}
                    sx={{ py: 1 }}
                  >
                    <ListItemText
                      primary={cat.label}
                      primaryTypographyProps={{ fontSize: '0.9rem', color: '#555' }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Collapse>

          <Divider />

          {/* Nav Items */}
          {navItems.map(item => (
            <ListItem key={item.label} disablePadding>
              <ListItemButton onClick={() => handleDrawerNav(item.href)}>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontWeight: item.isHighlighted ? 600 : 400,
                    fontSize: '0.95rem',
                    color: item.isHighlighted ? '#E36F3A' : '#333',
                    textTransform: 'capitalize'
                  }}
                />
                {item.isHighlighted && (
                  <Box
                    sx={{
                      bgcolor: '#E36F3A',
                      color: 'white',
                      fontSize: '0.6rem',
                      fontWeight: 700,
                      px: 1,
                      py: 0.25,
                      borderRadius: 1,
                      lineHeight: 1.4
                    }}
                  >
                    HOT
                  </Box>
                )}
              </ListItemButton>
            </ListItem>
          ))}

          <Divider />

          {/* Advanced Search */}
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleDrawerNav('/en/products?advanced=true')}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <i className="ri-search-2-line" style={{ fontSize: 20, color: '#555' }} />
              </ListItemIcon>
              <ListItemText
                primary="Advanced Search"
                primaryTypographyProps={{ fontSize: '0.95rem' }}
              />
            </ListItemButton>
          </ListItem>

          <Divider />

          {/* Account Links */}
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleDrawerNav('/en/register')}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <i className="ri-user-line" style={{ fontSize: 20, color: '#555' }} />
              </ListItemIcon>
              <ListItemText
                primary="Register / Login"
                primaryTypographyProps={{ fontSize: '0.95rem' }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <i className="ri-bookmark-line" style={{ fontSize: 20, color: '#555' }} />
              </ListItemIcon>
              <ListItemText
                primary="Wishlist"
                primaryTypographyProps={{ fontSize: '0.95rem' }}
              />
              {wishlistCount > 0 && (
                <Box
                  sx={{
                    bgcolor: '#E36F3A',
                    color: 'white',
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {wishlistCount}
                </Box>
              )}
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <i className="ri-global-line" style={{ fontSize: 20, color: '#555' }} />
              </ListItemIcon>
              <ListItemText
                primary="Language"
                primaryTypographyProps={{ fontSize: '0.95rem' }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </>
  )
}

export default Header
