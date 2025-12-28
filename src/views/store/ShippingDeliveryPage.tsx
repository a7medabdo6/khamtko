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
  Grid,
  Paper
} from '@mui/material'
import { useRouter } from 'next/navigation'
import StoreFooter from '@/components/store/StoreFooter'
import StoreHeader from '@/components/store/StoreHeader'

const navItems = ['Home', 'Shop', 'Categories', 'Sale', 'Contact']

export default function ShippingDeliveryPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [cartCount] = useState(3)
  const [wishlist] = useState<string[]>([])

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8f9fa' }}>
      {/* Header */}
      <StoreHeader cartCount={cartCount} wishlistCount={wishlist.length} onSearch={setSearchQuery} />

      {/* Breadcrumb */}
      <Box sx={{ bgcolor: 'white', borderBottom: '1px solid', borderColor: 'divider', py: 2 }}>
        <Container maxWidth="lg">
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            HOME / <Box component="span" sx={{ fontWeight: 600, color: 'text.primary' }}>SHIPPING EXCHANGE & RETURN POLICY DELIVERY POLICY</Box>
          </Typography>
        </Container>
      </Box>

      {/* Content */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 2, color: 'text.primary' }}>
          Shipping Exchange & Return Policy Delivery Policy
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 6 }}>
          Last updated: December 28, 2024
        </Typography>

        <Stack spacing={4}>
          {/* Section 1 */}
          <Paper elevation={0} sx={{ p: 4, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 2,
                  bgcolor: 'primary.lighter',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <i className="ri-truck-line" style={{ fontSize: 24, color: '#009BFF' }} />
              </Box>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                  Delivery Times
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8, mb: 2 }}>
                  We offer delivery across Egypt with estimated delivery times of <strong>2-5 business days</strong> for Cairo and Giza, and <strong>3-7 business days</strong> for other governorates.
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                  Orders placed before 2 PM are processed the same day. Orders placed after 2 PM will be processed the next business day.
                </Typography>
              </Box>
            </Box>
          </Paper>

          {/* Section 2 */}
          <Paper elevation={0} sx={{ p: 4, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 2,
                  bgcolor: 'success.lighter',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <i className="ri-exchange-line" style={{ fontSize: 24, color: '#4CAF50' }} />
              </Box>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                  Exchange Policy
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8, mb: 2 }}>
                  We offer free exchanges for products of the same value. If you wish to exchange for a different product, the price
                  difference will be charged or refunded accordingly.
                </Typography>
                <Box component="ul" sx={{ pl: 3, mt: 2 }}>
                  <li>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                      Exchange requests must be initiated within 14 days of delivery
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                      Products must be in original condition with tags attached
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Exchange shipping costs are covered by Khamatko
                    </Typography>
                  </li>
                </Box>
              </Box>
            </Box>
          </Paper>

          {/* Section 3 */}
          <Paper elevation={0} sx={{ p: 4, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 2,
                  bgcolor: 'warning.lighter',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <i className="ri-file-list-line" style={{ fontSize: 24, color: '#FFA726' }} />
              </Box>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                  Return Process
                </Typography>
                <Box component="ol" sx={{ pl: 3 }}>
                  <li>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1.5 }}>
                      Contact our customer service via email or phone to initiate a return
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1.5 }}>
                      Pack the product securely in its original packaging
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1.5 }}>
                      Ship the product back using our provided return label
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Refund will be processed within 5-7 business days after receiving the returned item
                    </Typography>
                  </li>
                </Box>
              </Box>
            </Box>
          </Paper>

          {/* Section 4 */}
          <Paper elevation={0} sx={{ p: 4, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 2,
                  bgcolor: 'error.lighter',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <i className="ri-close-circle-line" style={{ fontSize: 24, color: '#FF6B6B' }} />
              </Box>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                  Non-Returnable Items
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8, mb: 2 }}>
                  The following items cannot be returned:
                </Typography>
                <Box component="ul" sx={{ pl: 3 }}>
                  <li>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                      Opened or used beauty and personal care products
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                      Products on sale or clearance (marked as "Final Sale")
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                      Gift cards and promotional items
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Products damaged due to misuse or negligence
                    </Typography>
                  </li>
                </Box>
              </Box>
            </Box>
          </Paper>

          {/* Contact Section */}
          <Paper elevation={0} sx={{ p: 4, bgcolor: 'primary.lighter', borderRadius: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Need Help?
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3 }}>
              If you have any questions about our return or exchange policy, please don't hesitate to contact us:
            </Typography>
            <Stack direction="row" spacing={3} flexWrap="wrap">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <i className="ri-phone-line" style={{ fontSize: 20, color: '#009BFF' }} />
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  +20 123 456 7890
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <i className="ri-mail-line" style={{ fontSize: 20, color: '#009BFF' }} />
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  returns@khamatko.com
                </Typography>
              </Box>
            </Stack>
          </Paper>
        </Stack>
      </Container>

      {/* Footer */}
      <StoreFooter />
    </Box>
  )
}

