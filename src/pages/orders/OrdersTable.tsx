import { Box, Button, Stack, Typography } from '@mui/material';
import i18n from 'i18n';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import React from 'react';
import imgNotFound from './../../../public/images/No_Image_Available.jpg';
import { Navigate, useNavigate } from 'react-router-dom';
// import { ICompany } from 'interfaces';
import paths from 'routes/path';
import { DataGrid, GridColDef, GridRowClassNameParams } from '@mui/x-data-grid';
import { ICategory, IOrder } from 'interfaces';
import { checkPermissions, parsedData } from 'functions';
interface IProps {
  handleEditOpen:(val:IOrder)=>void
  handleOpend:()=>void
  setTempId:(val:number)=>void
  data: IOrder[];
  isDashBoard:boolean
}
function OrdersTable({data,handleEditOpen,setTempId,handleOpend ,isDashBoard}: IProps) {
  console.log(data)
  const navigate = useNavigate();
  const columns: GridColDef[] = 
  !isDashBoard ?
  [
    { field: 'id', headerName: 'ID' },
    { field: 'name',   headerName: i18n.language === 'ar' ? 'الاسم':"name",flex: 1, renderCell:(params)=>  params.row.user.name },
    { field: 'order_type', headerName: i18n.language === 'ar' ? 'نوع الطلب' : 'order type', flex: 0.5},
    { field: 'created_at', headerName: i18n.language === 'ar' ? 'تاريخ الطلب' : 'created at', flex: 0.5 },

    { field: 'total', headerName: i18n.language === 'ar' ? 'الاجمالى' : 'total ' },
    { field: 'status', headerName: i18n.language === 'ar' ? 'الحالة' : 'status ',
      flex: 0.5,

      renderCell: (params) => (
        <span
          style={{
            color: params.value === 'accepted' ? 'green' : params.value === 'canceled' ? '#ffd7d7' :'blue',
            backgroundColor: params.value === 'accepted' ? '#a8f1cd' : params.value === 'canceled' ? '#FF0000' :'#6691e7',
            fontWeight: 'bold',
            padding:10,
            display:'inline-block',
            borderRadius:10
          }}
        >
          {params.value}
        </span>
      ),
     },
    {
      field: 'payment_method',
      headerName: i18n.language === 'ar' ? 'طريقة الدفع' : 'payment method',
    
    },
    {
      field: 'actions',
      headerName: i18n.language === 'ar' ? 'العمليات' : 'actions',
      flex: 0.5,
      renderCell: (params) => (
        <Stack direction="row" gap={1}>
          <Button
            variant="contained"
            color="info"
            // onClick={() => navigate(`${paths.customers}/${params.row.id}`)}
          >
            {/* {t('view')} */}
            <Eye />
          </Button>
          <Button variant="contained" color="primary" onClick={() => handleEditOpen(params.row)}>
            {/* {t('edit')} */}
            <Pencil />
          </Button>
        </Stack>
      ),
    },
  ]:[ { field: 'id', headerName: 'ID' },
    { field: 'name',   headerName: i18n.language === 'ar' ? 'الاسم':"name",flex: 1, renderCell:(params)=>  params.row.user.name },

    { field: 'email', headerName: i18n.language === 'ar' ? 'الايميل' : 'email', flex: 1 },

    { field: 'phone', headerName: i18n.language === 'ar' ? 'الحالة' : 'phone', flex: 1 },];


  const rows =
    data.length > 0
      ? data.map((order: IOrder) => ({
          ...order,
        }))
      : [];
  return (
<DataGrid
    rows={rows}
    columns={columns}
    sx={{ border: 0 }}
    autoHeight
    getRowHeight={() => 200} // Set each row's height to 200px
    getRowClassName={(params: GridRowClassNameParams) =>
      params.indexRelativeToCurrentPage % 2 === 0 ? 'even-row' : 'odd-row'
    }
    disableRowSelectionOnClick
    disableMultipleRowSelection
    hideFooterPagination={true}
  />
  );
}

export default OrdersTable;
