import * as React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  GridRowSelectionModel,
  useGridApiRef,
} from '@mui/x-data-grid';
import { getRowEl } from '@mui/x-data-grid/utils/domUtils';
import { getRowIdFromRowModel } from '@mui/x-data-grid/internals';
export const DisplayTable = ({ data, filterFocusProduct }) => {
  // console.log('data in display table', data);
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
  const [fetchedData, setData] = useState([]);
  const [rowSelectionModel, setRowSelectionModel] =
    useState<GridRowSelectionModel>([]);
  const apiRef = useGridApiRef();

  useEffect(() => {
    axios
      .get('https://pricetracker-2ed88b8b3e1f.herokuapp.com/v1/product')
      .then((res) => {
        // console.log('Fetch', res);
        setData(res.data.data);
      })
      .catch((err) => {
        console.error(err);
        alert('Can not get data from database');
      });
  }, []);

  return (
    <div style={{ width: 'auto', height: 'auto' }}>
      <DataGrid
        apiRef={apiRef}
        rows={fetchedData}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 15, 20]}
        // checkboxSelection
        onRowSelectionModelChange={(newRowSelectionModel) => {
          setRowSelectionModel(newRowSelectionModel);
          // console.log(
          //   'selected!!!',
          //   apiRef.current.getRow(newRowSelectionModel[0])
          // );
          filterFocusProduct(apiRef.current.getRow(newRowSelectionModel[0]).name);
        }}
        rowSelectionModel={rowSelectionModel}
      />
      {/* {JSON.stringify(fetchedData)} */}
      {rowSelectionModel}
    </div>
  );
};
