import * as React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
export const DisplayTable = ({ data }) => {
  console.log('data in display table', data);
  const columns: GridColDef[] = [
    // { field: 'id', headerName: 'ID', type: 'number', width: 70 },
    { field: 'name', headerName: 'Product', type: 'string', width: 100 },
    {
      field: 'date',
      headerName: 'Date',
      type: 'dateTime',
      width: 200,
      valueGetter: (params: GridValueGetterParams) => new Date(params.row.date),
    },
    { field: 'source', headerName: 'Source', type: 'string', width: 100 },
    {
      field: 'price',
      headerName: 'Price',
      type: 'number',
      width: 150,
    },
  ];

  const rows = [
    { id: 1, name: 'ss1', date: '', source: 'lazada', price: 35.0 },
    { id: 2, name: 'ss1', date: '', source: 'lazada', price: 35.0 },
    { id: 3, name: 'ss1', date: '', source: 'lazada', price: 35.0 },
    { id: 4, name: 'ss1', date: '', source: 'lazada', price: 35.0 },
  ];
  console.log(rows, data);
  const [fetchedData, setData] = useState([]);

  useEffect(() => {
    axios
      .get('https://pricetracker-2ed88b8b3e1f.herokuapp.com/v1/product')
      .then((res) => {
        console.log('Fetch', res);
        setData(res.data.data);
      })
      .catch((err) => {
        console.error(err);
        alert('Can not get data from database');
      });
  }, []);

  return (
    <div style={{ width: 'auto' }}>
      Tableeee
      <DataGrid
        rows={fetchedData}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
      {/* {JSON.stringify(fetchedData)} */}
    </div>
  );
};
