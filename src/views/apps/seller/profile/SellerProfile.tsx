'use client'

import { useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Button,
  Avatar,
  Divider,
  TextField,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
  Chip,
  Alert,
  Snackbar
} from '@mui/material'
import PageHeader from '@/components/layout/shared/PageHeader'

interface SellerData {
  businessName: string
  ownerName: string
  email: string
  phone: string
  address: string
  city: string
  country: string
  taxId: string
  businessType: string
  registrationDate: string
  status: 'active' | 'inactive'
  avatar: string
  rating: number
  totalSales: number
  activeProducts: number
  completedOrders: number
}

interface SellerProfileProps {
  dictionary?: any
}

export default function SellerProfile({ dictionary }: SellerProfileProps) {
  // Mock seller data - in production, this would come from an API
  const [sellerData, setSellerData] = useState<SellerData>({
    businessName: 'Khamatko Store',
    ownerName: 'Ahmed Hassan',
    email: 'ahmed@khamatko.com',
    phone: '+1 (555) 123-4567',
    address: '123 Business Street',
    city: 'New York',
    country: 'United States',
    taxId: 'TAX-123456789',
    businessType: 'Retail',
    registrationDate: '2023-01-15',
    status: 'active',
    avatar: '',
    rating: 4.8,
    totalSales: 125000,
    activeProducts: 156,
    completedOrders: 1234
  })

  const [editMode, setEditMode] = useState(false)
  const [editedData, setEditedData] = useState<SellerData>(sellerData)
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const handleEditToggle = () => {
    if (editMode) {
      setEditedData(sellerData)
    }
    setEditMode(!editMode)
  }

  const handleSaveProfile = () => {
    setSellerData(editedData)
    setEditMode(false)
    setSnackbarMessage('Profile updated successfully!')
    setSnackbarOpen(true)
  }

  const handleInputChange = (field: keyof SellerData, value: string) => {
    setEditedData(prev => ({ ...prev, [field]: value }))
  }

  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setSnackbarMessage('Passwords do not match!')
      setSnackbarOpen(true)
      return
    }
    if (passwordData.newPassword.length < 8) {
      setSnackbarMessage('Password must be at least 8 characters!')
      setSnackbarOpen(true)
      return
    }
    // In production, make API call to change password
    setPasswordDialogOpen(false)
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
    setSnackbarMessage('Password changed successfully!')
    setSnackbarOpen(true)
  }

  const InfoItem = ({ label, value, icon }: { label: string; value: string | number; icon: string }) => (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 3 }}>
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: 1,
          bgcolor: 'action.hover',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}
      >
        <i className={icon} style={{ fontSize: 20, color: 'text.secondary' }} />
      </Box>
      <Box sx={{ flex: 1 }}>
        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>
          {label}
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 600 }}>
          {value}
        </Typography>
      </Box>
    </Box>
  )

  const StatCard = ({ label, value, icon, color }: { label: string; value: string | number; icon: string; color: string }) => (
    <Card sx={{ height: '100%', border: '1px solid', borderColor: 'divider' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
              {label}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700, color }}>
              {value}
            </Typography>
          </Box>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2,
              bgcolor: 'action.hover',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <i className={icon} style={{ fontSize: 24, color }} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  )

  return (
    <Box>
      <PageHeader
        title={dictionary?.sellerProfile?.title || 'My Profile'}
        description={dictionary?.sellerProfile?.description || 'Manage your seller account and business information'}
        badge={{
          count: 1,
          label: sellerData.status === 'active' ? 'Active' : 'Inactive',
          color: sellerData.status === 'active' ? 'success' : 'error'
        }}
        actions={
          <Box sx={{ display: 'flex', gap: 2 }}>
            {editMode ? (
              <>
                <Button variant="outlined" onClick={handleEditToggle} startIcon={<i className="ri-close-line" />}>
                  {dictionary?.sellerProfile?.cancel || 'Cancel'}
                </Button>
                <Button variant="contained" onClick={handleSaveProfile} startIcon={<i className="ri-save-line" />}>
                  {dictionary?.sellerProfile?.save || 'Save Changes'}
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outlined"
                  onClick={() => setPasswordDialogOpen(true)}
                  startIcon={<i className="ri-lock-password-line" />}
                >
                  {dictionary?.sellerProfile?.changePassword || 'Change Password'}
                </Button>
                <Button variant="contained" onClick={handleEditToggle} startIcon={<i className="ri-edit-line" />}>
                  {dictionary?.sellerProfile?.edit || 'Edit Profile'}
                </Button>
              </>
            )}
          </Box>
        }
      />

  

      <Grid container spacing={3}>
        {/* Profile Information Card */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', border: '1px solid', borderColor: 'divider' }}>
            <CardContent sx={{ textAlign: 'center', py: 4 }}>
              <Box sx={{ position: 'relative', display: 'inline-block', mb: 3 }}>
                <Avatar
                  sx={{
                    width: 100,
                    height: 100,
                    bgcolor: 'primary.main',
                    fontSize: '2.5rem',
                    fontWeight: 700
                  }}
                >
                  {sellerData.ownerName.charAt(0)}
                </Avatar>
                {editMode && (
                  <IconButton
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      bgcolor: 'background.paper',
                      border: '2px solid',
                      borderColor: 'divider',
                      width: 32,
                      height: 32,
                      '&:hover': { bgcolor: 'action.hover' }
                    }}
                  >
                    <i className="ri-camera-line" style={{ fontSize: 16 }} />
                  </IconButton>
                )}
              </Box>

              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                {sellerData.businessName}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                {sellerData.ownerName}
              </Typography>
              <Chip
                label={sellerData.businessType}
                sx={{
                  bgcolor: 'action.hover',
                  fontWeight: 600
                }}
              />

              <Divider sx={{ my: 3 }} />

              <Box sx={{ textAlign: 'left' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <i className="ri-mail-line" style={{ fontSize: 18, color: 'text.secondary' }} />
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {sellerData.email}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <i className="ri-phone-line" style={{ fontSize: 18, color: 'text.secondary' }} />
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {sellerData.phone}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <i className="ri-calendar-line" style={{ fontSize: 18, color: 'text.secondary' }} />
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {dictionary?.sellerProfile?.memberSince || 'Member since'}{' '}
                    {new Date(sellerData.registrationDate).toLocaleDateString()}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Business Information Card */}
        <Grid item xs={12} md={8}>
          <Card sx={{ height: '100%', border: '1px solid', borderColor: 'divider' }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                <i className="ri-building-line" style={{ fontSize: 22 }} />
                {dictionary?.sellerProfile?.businessInfo || 'Business Information'}
              </Typography>

              {editMode ? (
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label={dictionary?.sellerProfile?.businessName || 'Business Name'}
                      value={editedData.businessName}
                      onChange={e => handleInputChange('businessName', e.target.value)}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label={dictionary?.sellerProfile?.ownerName || 'Owner Name'}
                      value={editedData.ownerName}
                      onChange={e => handleInputChange('ownerName', e.target.value)}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label={dictionary?.sellerProfile?.email || 'Email'}
                      value={editedData.email}
                      onChange={e => handleInputChange('email', e.target.value)}
                      variant="outlined"
                      type="email"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label={dictionary?.sellerProfile?.phone || 'Phone'}
                      value={editedData.phone}
                      onChange={e => handleInputChange('phone', e.target.value)}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label={dictionary?.sellerProfile?.address || 'Address'}
                      value={editedData.address}
                      onChange={e => handleInputChange('address', e.target.value)}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label={dictionary?.sellerProfile?.city || 'City'}
                      value={editedData.city}
                      onChange={e => handleInputChange('city', e.target.value)}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label={dictionary?.sellerProfile?.country || 'Country'}
                      value={editedData.country}
                      onChange={e => handleInputChange('country', e.target.value)}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label={dictionary?.sellerProfile?.taxId || 'Tax ID'}
                      value={editedData.taxId}
                      onChange={e => handleInputChange('taxId', e.target.value)}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label={dictionary?.sellerProfile?.businessType || 'Business Type'}
                      value={editedData.businessType}
                      onChange={e => handleInputChange('businessType', e.target.value)}
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
              ) : (
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <InfoItem
                      label={dictionary?.sellerProfile?.businessName || 'Business Name'}
                      value={sellerData.businessName}
                      icon="ri-store-line"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InfoItem
                      label={dictionary?.sellerProfile?.ownerName || 'Owner Name'}
                      value={sellerData.ownerName}
                      icon="ri-user-line"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InfoItem
                      label={dictionary?.sellerProfile?.email || 'Email'}
                      value={sellerData.email}
                      icon="ri-mail-line"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InfoItem
                      label={dictionary?.sellerProfile?.phone || 'Phone'}
                      value={sellerData.phone}
                      icon="ri-phone-line"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InfoItem
                      label={dictionary?.sellerProfile?.address || 'Address'}
                      value={sellerData.address}
                      icon="ri-map-pin-line"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InfoItem label={dictionary?.sellerProfile?.city || 'City'} value={sellerData.city} icon="ri-building-2-line" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InfoItem
                      label={dictionary?.sellerProfile?.country || 'Country'}
                      value={sellerData.country}
                      icon="ri-global-line"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InfoItem label={dictionary?.sellerProfile?.taxId || 'Tax ID'} value={sellerData.taxId} icon="ri-file-text-line" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InfoItem
                      label={dictionary?.sellerProfile?.businessType || 'Business Type'}
                      value={sellerData.businessType}
                      icon="ri-briefcase-line"
                    />
                  </Grid>
                </Grid>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Change Password Dialog */}
      <Dialog open={passwordDialogOpen} onClose={() => setPasswordDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 1,
                bgcolor: 'primary.main',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <i className="ri-lock-password-line" style={{ fontSize: 20, color: 'white' }} />
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {dictionary?.sellerProfile?.changePassword || 'Change Password'}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                {dictionary?.sellerProfile?.passwordHint || 'Enter your current password and new password'}
              </Typography>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <TextField
            fullWidth
            type={showCurrentPassword ? 'text' : 'password'}
            label={dictionary?.sellerProfile?.currentPassword || 'Current Password'}
            value={passwordData.currentPassword}
            onChange={e => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
            sx={{ mb: 3 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowCurrentPassword(!showCurrentPassword)} edge="end">
                    <i className={showCurrentPassword ? 'ri-eye-off-line' : 'ri-eye-line'} />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <TextField
            fullWidth
            type={showNewPassword ? 'text' : 'password'}
            label={dictionary?.sellerProfile?.newPassword || 'New Password'}
            value={passwordData.newPassword}
            onChange={e => setPasswordData({ ...passwordData, newPassword: e.target.value })}
            sx={{ mb: 3 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowNewPassword(!showNewPassword)} edge="end">
                    <i className={showNewPassword ? 'ri-eye-off-line' : 'ri-eye-line'} />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <TextField
            fullWidth
            type={showConfirmPassword ? 'text' : 'password'}
            label={dictionary?.sellerProfile?.confirmPassword || 'Confirm New Password'}
            value={passwordData.confirmPassword}
            onChange={e => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                    <i className={showConfirmPassword ? 'ri-eye-off-line' : 'ri-eye-line'} />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <Alert severity="info" sx={{ mt: 3 }}>
            {dictionary?.sellerProfile?.passwordRequirement || 'Password must be at least 8 characters long'}
          </Alert>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button onClick={() => setPasswordDialogOpen(false)} variant="outlined">
            {dictionary?.sellerProfile?.cancel || 'Cancel'}
          </Button>
          <Button onClick={handlePasswordChange} variant="contained">
            {dictionary?.sellerProfile?.updatePassword || 'Update Password'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Snackbar */}
      <Snackbar open={snackbarOpen} autoHideDuration={4000} onClose={() => setSnackbarOpen(false)}>
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  )
}

