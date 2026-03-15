'use client'

import { useState } from 'react'

import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Popover from '@mui/material/Popover'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

type FilterRange = '7d' | '30d' | 'year' | 'custom'

const DashboardDateFilter = () => {
  const [activeFilter, setActiveFilter] = useState<FilterRange>('30d')
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const handleFilterClick = (filter: FilterRange, event?: React.MouseEvent<HTMLElement>) => {
    if (filter === 'custom' && event) {
      setAnchorEl(event.currentTarget)
    } else {
      setAnchorEl(null)
    }

    setActiveFilter(filter)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const filters: { label: string; value: FilterRange }[] = [
    { label: 'Last 7 Days', value: '7d' },
    { label: 'Last 30 Days', value: '30d' },
    { label: 'Year', value: 'year' },
    { label: 'Custom Range', value: 'custom' }
  ]

  return (
    <Box className='flex items-center gap-4 flex-wrap'>
      <ButtonGroup variant='outlined' size='small'>
        {filters.map(filter => (
          <Button
            key={filter.value}
            variant={activeFilter === filter.value ? 'contained' : 'outlined'}
            onClick={e => handleFilterClick(filter.value, e)}
          >
            {filter.label}
          </Button>
        ))}
      </ButtonGroup>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <Box className='flex items-center gap-3 p-4'>
          <TextField
            type='date'
            label='Start Date'
            size='small'
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            slotProps={{ inputLabel: { shrink: true } }}
          />
          <TextField
            type='date'
            label='End Date'
            size='small'
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            slotProps={{ inputLabel: { shrink: true } }}
          />
          <Button variant='contained' size='small' onClick={handlePopoverClose}>
            Apply
          </Button>
        </Box>
      </Popover>
    </Box>
  )
}

export default DashboardDateFilter
