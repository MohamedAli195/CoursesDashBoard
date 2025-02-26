import { Box, Button, Stack, Typography } from '@mui/material';
import i18n from 'i18n';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import React from 'react';
import imgNotFound from './../../../public/images/No_Image_Available.jpg';
import { Navigate, useNavigate } from 'react-router-dom';
// import { ICompany } from 'interfaces';
import paths from 'routes/path';
import { DataGrid, GridColDef, GridRowClassNameParams } from '@mui/x-data-grid';
import { ICategory, ICustomer } from 'interfaces';
import { checkPermissions, parsedData } from 'functions';
interface IProps {
  handleEditOpen:(val:ICustomer)=>void
  handleOpend:()=>void
  setTempId:(val:number)=>void
  data: ICustomer[];
  isDashBoard:boolean
}
function CustomersTable({data,handleEditOpen,setTempId,handleOpend,isDashBoard}: IProps) {

  const navigate = useNavigate();
  const columns: GridColDef[] = 
  !isDashBoard ?
  [
    { field: 'id', headerName: 'ID' },
    i18n.language === 'ar'
      ? { field: 'name', headerName: 'الاسم', flex: 1 }
      : { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'email', headerName: i18n.language === 'ar' ? 'الايميل' : 'email', flex: 1 },

    { field: 'phone', headerName: i18n.language === 'ar' ? 'رقم الموبايل' : 'phone', flex: 1 },
    {
      field: 'partner_code',
      headerName: i18n.language === 'ar' ? 'رقم الشريك' : 'partner_code',
      flex: 1,
    },
    {
      field: 'actions',
      headerName: i18n.language === 'ar' ? 'العمليات' : 'actions',
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" gap={1}>

          {
            checkPermissions(parsedData,'delete-customer') &&           <Button
            variant="contained"
            color="error"
            // onClick={() => deleteCustomer(params.row.id, refetch)}
            onClick={
              ()=>{
              handleOpend()
              setTempId(params.row.id)
            }
          }
          >
            {/* {t('delete')} */}
            <Trash2 />
          </Button>
          }
          {
            checkPermissions(parsedData,'show-customers') && <Button
            variant="contained"
            color="info"
            onClick={() => navigate(`${paths.customers}/${params.row.id}`)}
          >
            {/* {t('view')} */}
            <Eye />
          </Button>
          }
      {
        checkPermissions(parsedData,'edit-customer') && <Button variant="contained" color="primary" onClick={() => handleEditOpen(params.row)}>
        {/* {t('edit')} */}
        <Pencil />
      </Button>
      }

        </Stack>
      ),
    },
  ]:[ { field: 'id', headerName: 'ID' },
    i18n.language === 'ar'
      ? { field: 'name', headerName: 'الاسم', flex: 1 }
      : { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'email', headerName: i18n.language === 'ar' ? 'الايميل' : 'email', flex: 1 },

    { field: 'phone', headerName: i18n.language === 'ar' ? 'الحالة' : 'phone', flex: 1 },];


  const rows =
    data.length > 0
      ? data.map((customer: ICustomer) => ({
          ...customer,
        }))
      : [];
  return (
<DataGrid
    rows={rows}
    columns={columns}
    sx={{ border: 0 }}
    autoHeight
    getRowHeight={() => !isDashBoard ? 200: 'auto'} 
    // getRowHeight={() => 200} // Set each row's height to 200px
    getRowClassName={(params: GridRowClassNameParams) =>
      params.indexRelativeToCurrentPage % 2 === 0 ? 'even-row' : 'odd-row'
    }
    disableRowSelectionOnClick
    disableMultipleRowSelection
    hideFooterPagination={true}
  />
  );
}

export default CustomersTable;
