'use client'

// React Imports
import { useState, useRef } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import LinearProgress from '@mui/material/LinearProgress'
import Snackbar from '@mui/material/Snackbar'

// Component Imports
import PageHeader from '@components/layout/shared/PageHeader'

const BulkUpload = () => {
  // States
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success')
  const [dragActive, setDragActive] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)

  // Handlers
  const handleDownloadTemplate = () => {
    // Create a sample Excel template data
    const templateData = [
      ['Product Name', 'SKU', 'Category', 'Description', 'Price', 'Quantity', 'Status'],
      [
        'Organic Cotton Raw Material',
        'OCRM-WHT-001',
        'Textiles',
        'Premium organic cotton fiber',
        '12.50',
        '500',
        'Active'
      ],
      ['Oak Wood Lumber', 'OWL-NAT-002', 'Wood', 'High-grade oak wood lumber', '45.00', '150', 'Active']
    ]

    // Convert to CSV
    const csv = templateData.map(row => row.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')

    a.href = url
    a.download = 'product-template.csv'
    a.click()
    window.URL.revokeObjectURL(url)

    setSnackbarMessage('Template downloaded successfully!')
    setSnackbarSeverity('success')
    setSnackbarOpen(true)
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      validateAndSetFile(file)
    }
  }

  const validateAndSetFile = (file: File) => {
    // Validate file type
    const allowedTypes = [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/csv'
    ]

    if (!allowedTypes.includes(file.type) && !file.name.match(/\.(xlsx|xls|csv)$/)) {
      setSnackbarMessage('Please upload a valid Excel or CSV file')
      setSnackbarSeverity('error')
      setSnackbarOpen(true)

      return
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setSnackbarMessage('File size must be less than 10MB')
      setSnackbarSeverity('error')
      setSnackbarOpen(true)

      return
    }

    setSelectedFile(file)
    setSnackbarMessage('File selected successfully!')
    setSnackbarSeverity('success')
    setSnackbarOpen(true)
  }

  const handleSelectFileClick = () => {
    fileInputRef.current?.click()
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0])
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) {
      setSnackbarMessage('Please select a file first')
      setSnackbarSeverity('error')
      setSnackbarOpen(true)

      return
    }

    setUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)

          return 100
        }

        return prev + 10
      })
    }, 200)

    // Simulate API call
    setTimeout(() => {
      setUploading(false)
      setUploadProgress(100)
      setSnackbarMessage('Products uploaded successfully! Processing your data...')
      setSnackbarSeverity('success')
      setSnackbarOpen(true)
      setSelectedFile(null)

      // Reset progress after success message
      setTimeout(() => {
        setUploadProgress(0)
      }, 2000)
    }, 2000)
  }

  return (
    <div className='flex flex-col gap-6' style={{ backgroundColor: 'white', padding: '24px', minHeight: '100vh' }}>
      {/* Header Section */}
      <PageHeader
        title='Daily Bulk Upload'
        description='Streamline your product catalog updates by uploading an Excel sheet with new or updated product information.'
      />

      {/* Download Template Section */}
      <Card>
        <CardContent>
          <Typography variant='h6' className='mbe-2'>
            Download Product Template
          </Typography>
          <Typography variant='body2' color='text.secondary' className='mbe-4'>
            Ensure your data is correctly formatted by downloading the latest Excel template. This helps prevent upload
            errors.
          </Typography>

          <Button
            variant='outlined'
            size='large'
            startIcon={<i className='ri-download-line' />}
            onClick={handleDownloadTemplate}
            fullWidth
            sx={{ justifyContent: 'center' }}
          >
            Download Today's Template
          </Button>
        </CardContent>
      </Card>

      {/* Upload Section */}
      <Card>
        <CardContent>
          <Typography variant='h6' className='mbe-2'>
            Upload Product Data
          </Typography>
          <Typography variant='body2' color='text.secondary' className='mbe-4'>
            Upload your product information using an Excel sheet. Please ensure the file follows the latest template.
          </Typography>

          {/* File Input Hidden */}
          <input
            ref={fileInputRef}
            type='file'
            accept='.xlsx,.xls,.csv'
            style={{ display: 'none' }}
            onChange={handleFileSelect}
          />

          {/* Drag & Drop Area */}
          <Box
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={handleSelectFileClick}
            sx={{
              border: '2px dashed',
              borderColor: dragActive ? 'primary.main' : 'divider',
              borderRadius: 2,
              padding: 6,
              textAlign: 'center',
              backgroundColor: dragActive ? 'action.hover' : 'background.paper',
              cursor: 'pointer',
              transition: 'all 0.3s',
              '&:hover': {
                borderColor: 'primary.main',
                backgroundColor: 'action.hover'
              },
              marginBottom: 3
            }}
          >
            <Box className='flex flex-col items-center gap-3'>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <i className='ri-upload-cloud-2-line' style={{ fontSize: 40, color: 'var(--mui-palette-primary-main)' }} />
              </Box>

              <div>
                <Typography variant='h6'>Drag & drop your file here, or click to select</Typography>
                {selectedFile && (
                  <Typography variant='body2' color='success.main' className='mbs-2'>
                    Selected: {selectedFile.name}
                  </Typography>
                )}
              </div>

              <Typography variant='caption' color='text.secondary'>
                Supported formats: Excel (.xlsx, .xls) or CSV (.csv) | Max size: 10MB
              </Typography>
            </Box>
          </Box>

          {/* Upload Progress */}
          {uploading && (
            <Box className='mbe-4'>
              <Typography variant='body2' color='text.secondary' className='mbe-2'>
                Uploading... {uploadProgress}%
              </Typography>
              <LinearProgress variant='determinate' value={uploadProgress} />
            </Box>
          )}

          {/* Action Buttons */}
          <Box className='flex gap-4'>
            <Button
              variant='outlined'
              size='large'
              fullWidth
              onClick={handleSelectFileClick}
              startIcon={<i className='ri-folder-open-line' />}
            >
              Select File
            </Button>
            <Button
              variant='contained'
              size='large'
              fullWidth
              onClick={handleUpload}
              disabled={!selectedFile || uploading}
              startIcon={<i className='ri-upload-line' />}
              className='text-white'
            >
              Upload
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Instructions */}
      <Alert severity='info' icon={<i className='ri-information-line' />}>
        <Typography variant='body2' className='font-medium mbe-1'>
          Upload Instructions:
        </Typography>
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          <li>Download the template and fill in your product data</li>
          <li>Do not modify the column headers</li>
          <li>Ensure all required fields are filled</li>
          <li>Save the file in Excel or CSV format</li>
          <li>Upload the completed file using the form above</li>
        </ul>
      </Alert>

      {/* Success/Error Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
          variant='filled'
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default BulkUpload

