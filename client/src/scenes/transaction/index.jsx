import React, { useState } from 'react'
import { useGetTransactionQuery } from 'state/api'
import Header from 'components/Header'
import { Box, useTheme } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import DataGrideCustomToolbar from 'components/DataGrideCustomToolbar'

const Transaction = () => {
    const theme = useTheme()

    const [page, setPage] = useState(0)
    const [pageSize, setPageSize] = useState(20)
    const [sort, setSort] = useState({})
    const [search, setSearch] = useState("")

    const [searchInput, setSearchInput] = useState("")

    const { data, isLoading } = useGetTransactionQuery({
        page,
        pageSize,
        sort: JSON.stringify(sort),
        search,
    })

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
            <Header title="Transactions" subtitle="transaction" />
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
                    rows={ (data && data.transactions) || [] }
                    columns={ columns }
                    rowCount={(data && data.total) || 0}
                    rowsPerPageOptions={[20, 50, 100]}
                    pagination
                    page={page}
                    paginationMode="server"
                    sortingMode="server"
                    pageSize={pageSize}
                    onPageChange={(newPage) => setPage(newPage)}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    onSortModelChange={(newSortModel) => setSort(newSortModel)}
                    components={{ Toolbar: DataGrideCustomToolbar }}
                    componentsProps={{
                        toolbar: { searchInput, setSearchInput, setSearch }
                    }}
                />
            </Box>
        </Box>
    )
}

export default Transaction