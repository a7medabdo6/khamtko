'use client'

// MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import Container from '@mui/material/Container'

const Footer = () => {
  return (
    <>
      {/* Newsletter Section */}
      <Box sx={{ py: 5, bgcolor: '#E0DED2' }}>
        <Container maxWidth="xl">
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'space-between',
              alignItems: { xs: 'flex-start', md: 'center' },
              gap: 3
            }}
          >
            <Box>
              <Typography sx={{ fontSize: '1.5rem', fontWeight: 600, color: '#2d2d2d', mb: 1 }}>
                Join our newsletter
              </Typography>
              <Typography sx={{ fontSize: '0.9rem', color: '#666' }}>
                Enter your email to subscribe to our newsletter to get discounts & updates
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 0, width: { xs: '100%', md: 'auto' } }}>
              <TextField
                placeholder="Enter your email"
                variant="outlined"
                size="small"
                sx={{
                  bgcolor: 'white',
                  minWidth: { xs: '100%', md: 300 },
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '4px 0 0 4px',
                    '& fieldset': { borderColor: '#ccc', borderRight: 'none' },
                    '&:hover fieldset': { borderColor: '#ccc' },
                    '&.Mui-focused fieldset': { borderColor: '#ccc', borderWidth: 1 }
                  }
                }}
              />
              <Button
                variant="contained"
                sx={{
                  bgcolor: '#E36F3A',
                  color: 'white',
                  borderRadius: '0 4px 4px 0',
                  px: 3,
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  fontSize: '0.8rem',
                  boxShadow: 'none',
                  '&:hover': {
                    bgcolor: '#d15f2a',
                    boxShadow: 'none'
                  }
                }}
              >
                Subscribe
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Main Footer */}
      <Box sx={{ py: 5, bgcolor: '#E0DED2' }}>
        <Container maxWidth="xl">
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '2fr 1fr 1fr' },
              gap: 4
            }}
          >
            {/* Company Info */}
            <Box>
              <Box
                component="img"
                src="/images/khamatko-logo.png"
                alt="Khamatko"
                sx={{
                  height: 28,
                  width: 'auto',
                  mb: 0.5
                }}
              />
              <Typography sx={{ fontSize: '0.65rem', color: '#777', mb: 0 }}>Part of</Typography>
              <Box sx={{ mb: 2.5 }}>
                <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, color: '#3d3d3d', lineHeight: 1.1 }}>
                  TGS
                </Typography>
                <Typography sx={{ fontSize: '0.6rem', color: '#777', fontWeight: 500, letterSpacing: 2 }}>
                  G R O U P
                </Typography>
              </Box>

              <Typography sx={{ fontSize: '0.85rem', color: '#666', mb: 0.5 }}>Customer Supports:</Typography>
              <Typography sx={{ fontSize: '1.25rem', fontWeight: 600, color: '#E36F3A', mb: 2.5 }}>12345</Typography>

              <Typography sx={{ fontSize: '0.9rem', color: '#3d3d3d', lineHeight: 1.6 }}>
                4517 Washington Ave.<br />
                Manchester, Kentucky 39495
              </Typography>
              <Typography sx={{ fontSize: '0.9rem', color: '#3d3d3d', mt: 2, mb: 2.5 }}>
                support@Khamatko.com
              </Typography>

              {/* Social Icons */}
              <Box sx={{ display: 'flex', gap: 1.5 }}>
                <IconButton
                  size="small"
                  sx={{
                    border: '1px solid #E36F3A',
                    borderRadius: 1,
                    width: 34,
                    height: 34,
                    color: '#E36F3A',
                    '&:hover': { bgcolor: 'rgba(227, 111, 58, 0.08)' }
                  }}
                >
                  <Typography sx={{ fontSize: '1rem', fontFamily: 'serif', color: '#E36F3A' }}>♪</Typography>
                </IconButton>
                <IconButton
                  size="small"
                  sx={{
                    border: '1px solid #E36F3A',
                    borderRadius: 1,
                    width: 34,
                    height: 34,
                    color: '#E36F3A',
                    '&:hover': { bgcolor: 'rgba(227, 111, 58, 0.08)' }
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      width: 14,
                      height: 14,
                      border: '1.5px solid #E36F3A',
                      borderRadius: 0.5,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Box sx={{ width: 4, height: 4, bgcolor: '#E36F3A', borderRadius: '50%' }} />
                  </Box>
                </IconButton>
                <IconButton
                  size="small"
                  sx={{
                    border: '1px solid #E36F3A',
                    borderRadius: 1,
                    width: 34,
                    height: 34,
                    color: '#E36F3A',
                    '&:hover': { bgcolor: 'rgba(227, 111, 58, 0.08)' }
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      width: 16,
                      height: 12,
                      border: '1.5px solid #E36F3A',
                      borderRadius: 0.5,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Typography sx={{ fontSize: '0.5rem', color: '#E36F3A' }}>▶</Typography>
                  </Box>
                </IconButton>
                <IconButton
                  size="small"
                  sx={{
                    border: '1px solid #E36F3A',
                    borderRadius: 1,
                    width: 34,
                    height: 34,
                    color: '#E36F3A',
                    '&:hover': { bgcolor: 'rgba(227, 111, 58, 0.08)' }
                  }}
                >
                  <Typography sx={{ fontSize: '0.9rem', fontWeight: 500, color: '#E36F3A' }}>f</Typography>
                </IconButton>
              </Box>
            </Box>

            {/* Categories */}
            <Box>
              <Typography sx={{ fontSize: '1rem', fontWeight: 600, color: '#2d3748', mb: 2 }}>
                Categories
              </Typography>
              {['New Arrivals', 'Best Seller', 'Offers & Deals'].map((item) => (
                <Typography
                  key={item}
                  sx={{
                    fontSize: '0.9rem',
                    color: '#555',
                    mb: 1.5,
                    cursor: 'pointer',
                    '&:hover': { color: '#E36F3A' }
                  }}
                >
                  {item}
                </Typography>
              ))}
            </Box>

            {/* Support */}
            <Box>
              <Typography sx={{ fontSize: '1rem', fontWeight: 600, color: '#2d3748', mb: 2 }}>
                support
              </Typography>
              {['FAQs', 'Contact Us', 'Track Your Order', 'Customer Account', 'Shipping', 'Returns', 'Product Safety'].map((item) => (
                <Typography
                  key={item}
                  sx={{
                    fontSize: '0.9rem',
                    color: '#555',
                    mb: 1.5,
                    cursor: 'pointer',
                    '&:hover': { color: '#E36F3A' }
                  }}
                >
                  {item}
                </Typography>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Copyright Bar */}
      <Box sx={{ py: 3, bgcolor: '#2d3748' }}>
        <Container maxWidth="xl">
          <Typography sx={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', textAlign: 'center' }}>
            © 2025 Khamatko. All Rights Reserved
          </Typography>
        </Container>
      </Box>
    </>
  )
}

export default Footer
