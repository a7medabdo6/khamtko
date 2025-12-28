// React Imports
import type { ReactNode } from 'react'

// MUI Imports
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Badge from '@mui/material/Badge'
import Chip from '@mui/material/Chip'

type PageHeaderProps = {
  title: string
  description?: string | ReactNode
  showBackButton?: boolean
  onBackClick?: () => void
  badge?: {
    count: number
    label: string
    color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'
    icon?: string
  }
  actions?: ReactNode
  rightContent?: ReactNode
}

const PageHeader = ({
  title,
  description,
  showBackButton = false,
  onBackClick,
  badge,
  actions,
  rightContent
}: PageHeaderProps) => {
  return (
    <div className='flex justify-between items-start'>
      <div>
        {showBackButton && onBackClick && (
          <Button
            variant='text'
            startIcon={<i className='ri-arrow-left-line' />}
            onClick={onBackClick}
            className='mbe-2'
          >
            Back
          </Button>
        )}
        <Typography variant='h4' className='mbe-1'>
          {title}
        </Typography>
        {description && (
          <div>
            {typeof description === 'string' ? (
              <Typography color='text.secondary'>{description}</Typography>
            ) : (
              description
            )}
          </div>
        )}
      </div>

      {/* Right side content */}
      {(badge || actions || rightContent) && (
        <Box className='flex gap-2 items-center'>
          {badge && (
            // <Badge badgeContent={badge.count} color={badge.color || 'primary'}>
              <Chip
                label={badge.label}
                color={badge.color || 'primary'}
                variant='tonal'
                icon={badge.icon ? <i className={badge.icon} /> : undefined}
              />
            // </Badge>
          )}
          {actions}
          {rightContent}
        </Box>
      )}
    </div>
  )
}

export default PageHeader

