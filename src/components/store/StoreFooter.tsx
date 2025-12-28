'use client'

import { Box, Container, Typography, Grid, Stack, TextField, Button, IconButton } from '@mui/material'
import { useRouter } from 'next/navigation'

export default function StoreFooter() {
  const router = useRouter()

  return (
    <Box
      sx={{
        bgcolor: '#1a1a2e',
        color: 'white',
        py: 8,
        mt: 8,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          bgcolor: '#009BFF'
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: -100,
          right: -100,
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,155,255,0.15) 0%, transparent 70%)'
        }
      }}
    >
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={5}>
          {/* Brand Section */}
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: 2.5,
                    bgcolor: '#009BFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 25px rgba(0,155,255,0.3)'
                  }}
                >
                  <i className="ri-shopping-bag-3-fill" style={{ color: 'white', fontSize: 26 }} />
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 900, color: '#009BFF', letterSpacing: -1 }}>
                  Khamatko
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ opacity: 0.85, lineHeight: 1.7, fontSize: '0.95rem', mb: 3 }}>
                Your one-stop destination for quality products and amazing deals. We bring you the best shopping experience with secure
                payments and fast delivery.
              </Typography>

              {/* Newsletter */}
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5, fontSize: '0.9rem' }}>
                  Subscribe to our Newsletter
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <TextField
                    size="small"
                    placeholder="Enter your email"
                    sx={{
                      flex: 1,
                      '& .MuiOutlinedInput-root': {
                        bgcolor: 'rgba(255,255,255,0.1)',
                        backdropFilter: 'blur(10px)',
                        color: 'white',
                        borderRadius: 2,
                        '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                        '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
                        '&.Mui-focused fieldset': { borderColor: '#009BFF' },
                        '& input::placeholder': { color: 'rgba(255,255,255,0.6)' }
                      }
                    }}
                  />
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: '#009BFF',
                      color: 'white',
                      px: 3,
                      borderRadius: 2,
                      fontWeight: 700,
                      boxShadow: '0 4px 15px rgba(0,155,255,0.4)',
                      '&:hover': {
                        bgcolor: '#0088E6',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 20px rgba(0,155,255,0.5)'
                      }
                    }}
                  >
                    Subscribe
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                mb: 3,
                fontSize: '1.1rem',
                position: 'relative',
                display: 'inline-block',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -8,
                  left: 0,
                  width: 30,
                  height: 3,
                  bgcolor: '#009BFF',
                  borderRadius: 2
                }
              }}
            >
              Shop
            </Typography>
            <Stack spacing={1.5} sx={{ mt: 3 }}>
              {['New Arrivals', 'Best Sellers', 'Sale Items', 'Gift Cards', 'Track Order'].map(link => (
                <Box
                  key={link}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    '&:hover': {
                      transform: 'translateX(8px)',
                      '& i': { color: '#009BFF' },
                      '& .MuiTypography-root': { color: '#009BFF' }
                    }
                  }}
                >
                  <i className="ri-arrow-right-s-line" style={{ fontSize: 18, opacity: 0.7, transition: 'color 0.3s' }} />
                  <Typography variant="body2" sx={{ opacity: 0.85, fontSize: '0.9rem', transition: 'color 0.3s' }}>
                    {link}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Grid>

          {/* Customer Service */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                mb: 3,
                fontSize: '1.1rem',
                position: 'relative',
                display: 'inline-block',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -8,
                  left: 0,
                  width: 30,
                  height: 3,
                  bgcolor: '#009BFF',
                  borderRadius: 2
                }
              }}
            >
              Support
            </Typography>
            <Stack spacing={1.5} sx={{ mt: 3 }}>
              {['Help Center', 'Contact Us', 'Shipping Info', 'Returns', 'FAQs'].map(link => (
                <Box
                  key={link}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    '&:hover': {
                      transform: 'translateX(8px)',
                      '& i': { color: '#009BFF' },
                      '& .MuiTypography-root': { color: '#009BFF' }
                    }
                  }}
                >
                  <i className="ri-arrow-right-s-line" style={{ fontSize: 18, opacity: 0.7, transition: 'color 0.3s' }} />
                  <Typography variant="body2" sx={{ opacity: 0.85, fontSize: '0.9rem', transition: 'color 0.3s' }}>
                    {link}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Grid>

          {/* Company */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                mb: 3,
                fontSize: '1.1rem',
                position: 'relative',
                display: 'inline-block',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -8,
                  left: 0,
                  width: 30,
                  height: 3,
                  bgcolor: '#009BFF',
                  borderRadius: 2
                }
              }}
            >
              Company
            </Typography>
            <Stack spacing={1.5} sx={{ mt: 3 }}>
              {[
                { name: 'About Us', path: '/en/about' },
                { name: 'Exchange & Return', path: '/en/exchange-return' },
                { name: 'Shipping & Delivery', path: '/en/shipping-delivery' },
                { name: 'Offers Terms', path: '/en/offers-terms' }
              ].map(link => (
                <Box
                  key={link.name}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    '&:hover': {
                      transform: 'translateX(8px)',
                      '& i': { color: '#009BFF' },
                      '& .MuiTypography-root': { color: '#009BFF' }
                    }
                  }}
                  onClick={() => router.push(link.path)}
                >
                  <i className="ri-arrow-right-s-line" style={{ fontSize: 18, opacity: 0.7, transition: 'color 0.3s' }} />
                  <Typography variant="body2" sx={{ opacity: 0.85, fontSize: '0.9rem', transition: 'color 0.3s' }}>
                    {link.name}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Grid>

          {/* Contact & Social */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                mb: 3,
                fontSize: '1.1rem',
                position: 'relative',
                display: 'inline-block',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -8,
                  left: 0,
                  width: 30,
                  height: 3,
                  bgcolor: '#009BFF',
                  borderRadius: 2
                }
              }}
            >
              Connect
            </Typography>
            <Stack spacing={2} sx={{ mt: 3 }}>
              {/* Contact Info */}
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: 2,
                      bgcolor: 'rgba(0,155,255,0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <i className="ri-phone-line" style={{ color: '#009BFF', fontSize: 18 }} />
                  </Box>
                  <Typography variant="body2" sx={{ opacity: 0.85, fontSize: '0.9rem' }}>
                    +1 234 567 8900
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: 2,
                      bgcolor: 'rgba(0,155,255,0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <i className="ri-mail-line" style={{ color: '#009BFF', fontSize: 18 }} />
                  </Box>
                  <Typography variant="body2" sx={{ opacity: 0.85, fontSize: '0.9rem' }}>
                    hello@Khamatko.com
                  </Typography>
                </Box>
              </Box>

              {/* Social Media */}
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5, fontSize: '0.85rem', opacity: 0.7 }}>
                  FOLLOW US
                </Typography>
                <Stack direction="row" spacing={1}>
                  {[
                    { icon: 'ri-facebook-fill', color: '#1877F2' },
                    { icon: 'ri-instagram-line', color: '#E4405F' },
                    { icon: 'ri-twitter-x-line', color: '#1DA1F2' },
                    { icon: 'ri-linkedin-fill', color: '#0A66C2' }
                  ].map((social, index) => (
                    <IconButton
                      key={index}
                      sx={{
                        color: 'white',
                        bgcolor: 'rgba(255,255,255,0.1)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        transition: 'all 0.3s',
                        '&:hover': {
                          bgcolor: social.color,
                          transform: 'translateY(-4px) rotate(10deg)',
                          boxShadow: `0 8px 20px ${social.color}40`,
                          borderColor: social.color
                        }
                      }}
                    >
                      <i className={social.icon} style={{ fontSize: 20 }} />
                    </IconButton>
                  ))}
                </Stack>
              </Box>
            </Stack>
          </Grid>
        </Grid>

        {/* Bottom Bar */}
        <Box
          sx={{
            mt: 6,
            pt: 4,
            borderTop: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 3
          }}
        >
          <Typography variant="body2" sx={{ opacity: 0.7, fontSize: '0.85rem' }}>
            © 2024 Khamatko. All rights reserved. | Made with{' '}
            <i className="ri-heart-fill" style={{ color: '#FF6B6B', fontSize: 14 }} /> by Khamatko Team
          </Typography>

          <Stack direction="row" spacing={3}>
            {['Privacy Policy', 'Terms of Service', 'Cookies'].map(link => (
              <Typography
                key={link}
                variant="body2"
                sx={{
                  opacity: 0.7,
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  transition: 'all 0.3s',
                  '&:hover': {
                    opacity: 1,
                    color: '#009BFF'
                  }
                }}
              >
                {link}
              </Typography>
            ))}
          </Stack>

          {/* Payment Methods */}
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="caption" sx={{ opacity: 0.6, fontSize: '0.75rem', mr: 1 }}>
              We Accept:
            </Typography>
            {['ri-visa-line', 'ri-mastercard-line', 'ri-paypal-line', 'ri-bank-card-line'].map((icon, index) => (
              <Box
                key={index}
                sx={{
                  width: 40,
                  height: 28,
                  borderRadius: 1,
                  bgcolor: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}
              >
                <i className={icon} style={{ fontSize: 20, color: '#666' }} />
              </Box>
            ))}
          </Stack>
        </Box>
      </Container>

      {/* Floating decoration */}
      <Box
        sx={{
          position: 'absolute',
          top: -50,
          left: -50,
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,212,255,0.15) 0%, transparent 70%)'
        }}
      />
    </Box>
  )
}

