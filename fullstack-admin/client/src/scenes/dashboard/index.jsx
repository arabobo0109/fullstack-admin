import React from 'react'
import Header from 'components/Header'
import { useGetDashboardQuery } from 'state/api'
import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material'
import FlexBetween from 'components/flexBetween'
import { DownloadOutlined, Email, PersonAdd, PointOfSale, Traffic } from '@mui/icons-material'
import StatBox from 'components/statBox'
import OverviewChart from 'components/OverviewChart'
import { DataGrid } from '@mui/x-data-grid'
import BreakdownChart from 'components/BreakdownChart'

const Dashboard = () => {
  const theme = useTheme()
  const isNonMediumScreen = useMediaQuery("(min-width: 1200px)")
  const { data, isLoading } = useGetDashboardQuery()
  console.log(data)
  const columns = [
    {
        field: "_id",
        headerName: "ID",
        flex: 1,
    },
    {
        field: "userId",
        headerName: "USER ID",
        flex: 1,
    },
    {
        field: "createdAt",
        headerName: "CreateAt",
        flex: 1,
    },
    {
        field: "products",
        headerName: "# of Products",
        flex: 0.5,
        sortable: false,
        renderCell: (params) => params.value.length
    },
    {
        field: "cost",
        headerName: "Cost",
        flex: 0.5,
        renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    },
  ]

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="Dashboard" subtitle="Welcom totyour dashboard" />

        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlined sx={{ mr: "10px" }} />
            Download Report
          </Button>
        </Box>
      </FlexBetween>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreen ? undefined : "span 12" },
        }}
      >
        <StatBox 
          title="Total customers"
          value={data && data.totalCustomers}
          increase="14%"
          description="Sinc last month"
          icon={ <Email sx={{ color: theme.palette.secondary[200], fontSize:"26px" }} /> }
        />

        <StatBox 
          title="Sales Today"
          value={data && data.todayStats.totalSales}
          increase="21%"
          description="Sinc yesterday"
          icon={ <PointOfSale sx={{ color: theme.palette.secondary[200], fontSize:"26px" }} /> }
        />
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={ theme.palette.background.alt }
          p="1rem"
          borderRadius="0.55rem"
        >
          <OverviewChart view="sales" isDashboard={true} />
        </Box>
        <StatBox 
          title="Monthly Sales"
          value={data && data.thisMonthStats.totalSales}
          increase="43%"
          description="This"
          icon={ <PersonAdd sx={{ color: theme.palette.secondary[200], fontSize:"26px" }} /> }
        />

        <StatBox 
          title="Yearly Sales"
          value={data && data.yearlySalesTotal}
          increase="67%"
          description="Total sales 2021"
          icon={ <Traffic sx={{ color: theme.palette.secondary[200], fontSize:"26px" }} /> }
        />

        <Box
          gridColumn="span 8"
          gridRow="span 3"
          sx={{ 
            " & .MuiDataGrid-root":{
                border: "none",
                borderRadius: "5rem"
            },
            "& .MuiDataGrid-cell":{
                backgroundColor: theme.palette.background.alt,
                color: theme.palette.secondary[100],
                borderBottom: "none"
            },
            "& .MuiDataGrid-columnHeader": {
                backgroundColor: theme.palette.background.alt,
                color: theme.palette.secondary[100],
                borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller":{
                backgroundColor: theme.palette.primary.light,
            },
            "& .MuiDataGrid-footerContainer": {
                backgroundColor: theme.palette.background.alt,
                color: theme.palette.secondary[100],
                borderTop: "none",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `${theme.palette.secondary[200]} !important`
            },

          }}
        >
          <DataGrid
            loading={ isLoading || !data }
            getRowId={ (row) => row._id }
            rows={ (data && data.transactions) || [] }
            columns={ columns }
          />
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={ theme.palette.background.alt }
          p="1.5rem"
          borderRadius="0.55rem"
        >
          <Typography variant='h6' sx={{ color: theme.palette.secondary[100] }}>
            Sales By Category
          </Typography>
          <BreakdownChart isDashboard={true} />
          <Typography p="0 0.6rem" fontSize="0.8rem" sx={{ color: theme.palette.secondary[200] }}>
            Breakdown chart of real stats and information via category for revenue of this year.
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default Dashboard