'use client'

import { useState } from 'react'
import {
  Box,
  Container,
  Typography,
  Button,
  IconButton,
  TextField,
  InputAdornment,
  Stack,
  Tooltip,
  Badge,
  AppBar,
  Toolbar,
  Menu,
  MenuItem,
  Grid
} from '@mui/material'
import { useRouter } from 'next/navigation'
import StoreFooter from '@/components/store/StoreFooter'
import StoreHeader from '@/components/store/StoreHeader'

const navItems = ['Home', 'Shop', 'Categories', 'Sale', 'Contact']

export default function AboutPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [cartCount] = useState(3)
  const [wishlist] = useState<string[]>([])
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
    
    if (pathParts[1] === 'en' || pathParts[1] === 'ar' || pathParts[1] === 'fr') {
      pathParts[1] = lang
      router.push(pathParts.join('/'))
    } else {
      router.push(`/${lang}${currentPath}`)
    }
    
    handleLangMenuClose()
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8f9fa' }}>
      {/* Header */}
      <StoreHeader 
        cartCount={cartCount} 
        wishlistCount={wishlist.length}
        onSearch={setSearchQuery}
      />

      {/* Breadcrumb */}
      <Box sx={{ bgcolor: 'white', borderBottom: '1px solid', borderColor: 'divider', py: 2 }}>
        <Container maxWidth="lg">
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            <Box component="span" sx={{ cursor: 'pointer', '&:hover': { color: 'primary.main' } }}>
              HOME
            </Box>
            {' / '}
            <Box component="span" sx={{ fontWeight: 600, color: 'text.primary' }}>
              ABOUT US
            </Box>
          </Typography>
        </Container>
      </Box>

      {/* Content */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={8}>
            <Box>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  mb: 1,
                  color: 'text.primary',
                  fontSize: { xs: '2rem', md: '2.5rem' }
                }}
              >
                COMPANY
              </Typography>
              <Typography variant="h6" sx={{ color: 'text.secondary', mb: 4, fontWeight: 500 }}>
                • About Khamatko
              </Typography>

              <Stack spacing={3}>
                <Typography variant="body1" sx={{ lineHeight: 1.8, color: 'text.secondary', fontSize: '1rem' }}>
                  Proudly born in Egypt, Khamatko is redefining local beauty with thoughtful care, real results, and a commitment to
                  self-love.
                </Typography>

                <Typography variant="body1" sx={{ lineHeight: 1.8, color: 'text.secondary', fontSize: '1rem' }}>
                  We believe beauty begins with how you treat yourself — and that means clean, effective routines that nourish both hair and
                  skin without the fuss.
                </Typography>

                <Typography variant="body1" sx={{ lineHeight: 1.8, color: 'text.secondary', fontSize: '1rem' }}>
                  At Khamatko, every product is crafted with purpose. Our minimalist approach puts your well-being first, making self-care
                  feel natural, effortless, and genuinely yours.
                </Typography>

                <Typography variant="body1" sx={{ lineHeight: 1.8, color: 'text.secondary', fontSize: '1rem' }}>
                  We're here to help you show up for yourself daily — not to transform who you are, but to celebrate it.
                </Typography>
              </Stack>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box
              sx={{
                bgcolor: 'white',
                p: 4,
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'divider',
                position: 'sticky',
                top: 100
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                Our Values
              </Typography>
              <Stack spacing={2.5}>
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        bgcolor: 'primary.lighter',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <i className="ri-plant-line" style={{ color: '#009BFF', fontSize: 16 }} />
                    </Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                      Natural Ingredients
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.85rem', pl: 5 }}>
                    We use only the finest natural ingredients for your skin and hair.
                  </Typography>
                </Box>

                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        bgcolor: 'success.lighter',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <i className="ri-shield-check-line" style={{ color: '#4CAF50', fontSize: 16 }} />
                    </Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                      Quality Assured
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.85rem', pl: 5 }}>
                    Every product is tested and certified for your safety.
                  </Typography>
                </Box>

                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        bgcolor: 'error.lighter',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <i className="ri-heart-line" style={{ color: '#FF6B6B', fontSize: 16 }} />
                    </Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                      Made with Love
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.85rem', pl: 5 }}>
                    Each product is crafted with care and dedication to excellence.
                  </Typography>
                </Box>

                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        bgcolor: 'warning.lighter',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <i className="ri-global-line" style={{ color: '#FFA726', fontSize: 16 }} />
                    </Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                      Locally Made
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.85rem', pl: 5 }}>
                    Proudly Egyptian, supporting local economy and talent.
                  </Typography>
                </Box>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      <StoreFooter />
    </Box>
  )
}

