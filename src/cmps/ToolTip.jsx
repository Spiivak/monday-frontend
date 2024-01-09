import React from 'react'
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material'

  export const ToolTip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} arrow placement="top" />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: '#323338',
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#323338',
      color: 'white',
      padding: '10px 20px',
      maxWidth: 'max-content',
      font: '400 14px Figtree'
    },
  }));
