import { Popover } from '@mui/material'
import React from 'react'

export function MemberHoverModal() {
  return (
    <div>
      <Popover
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        The content of the Popover.
      </Popover>
    </div>
  )
}
