import React from 'react'
import BreakdownChart from 'components/BreakdownChart'
import Header from 'components/Header'
import { Box } from '@mui/material'

const Breakdown = () => {
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Total yearly sales" subtitle="For each product category" />
      <Box mt="40px" height="75vh">
        <BreakdownChart />
      </Box>
    </Box>
  )
}

export default Breakdown