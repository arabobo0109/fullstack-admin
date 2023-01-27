import { Box, useTheme } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import Header from 'components/Header'
import React from 'react'
import { useSelector } from 'react-redux'
import { useGetPerfomanceQuery } from 'state/api'

const Performance = () => {
    const theme = useTheme()
    const userId = useSelector((state) => state.global.userId)
    const { data, isLoading } = useGetPerfomanceQuery(userId)

    const columns = [
        { field: "_id", headerName: 'ID', flex: 1, },
        { field: "userId", headerName: 'UserId', flex: 1, },
        { field: "createdAt", headerName: 'Datetime', flex: 1, },
        { field: "products", headerName: '# of products', flex: 0.5, 
            renderCell: (params) => params.value.length
        },
        { field: "cost", headerName: 'Cost', flex: 1, 
            renderCell: (params) => `$${Number(params.value).toFixed(2)}`
        }, 
    ]
    return (
        <Box m="1.5rem 2.5rem">
            <Header title="Performance" subtitle="Track manager performance" />
            <Box mt="40px" height="75vh" 
                sx={{ 
                    " & .MuiDataGrid-root":{
                        border: "none"
                    },
                    "& .MuiDataGrid-cell":{
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
                    rows={ (data && (data.sales)) || [] }
                    columns={ columns }
                    // components={{
                    //     ColumnMenu: CustomColumnMenu
                    // }}
                />
            </Box>
        </Box>
    )
}

export default Performance