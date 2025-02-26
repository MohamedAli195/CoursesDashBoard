import { Box, Button, Stack } from '@mui/material';
import i18n from 'i18n';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import React from 'react';
import imgNotFound from './../../../public/images/No_Image_Available.jpg';
import { Navigate, useNavigate } from 'react-router-dom';
// import { ICompany } from 'interfaces';
import paths from 'routes/path';
import { DataGrid, GridColDef, GridRowClassNameParams } from '@mui/x-data-grid';
import { ITempPermissions } from 'interfaces';
import SwitchStatus from 'components/Shared/switch';
interface IProps {
  handleEditOpen:(val:ITempPermissions)=>void
  handleOpend:()=>void
  setTempId:(val:number)=>void
  data: ITempPermissions[];
}
function PermissionsTable({data,handleEditOpen,setTempId,handleOpend}: IProps) {

  const navigate = useNavigate();
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: i18n.language === 'ar' ? 'الاسم' : 'Name' },
    {
      field: 'permissions',
      headerName: i18n.language === 'ar' ? 'الصلاحيات' : 'permissions',
      flex: 2,
      renderCell: (params) => (
        <Box 
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            overflowX: 'auto', // Optional: adds horizontal scrolling if content overflows
          }}
        >
          {params.row.permissions.map((item: { name: string }) => {
            return (
              <Box 
              key={item.name}
                component="div"
                sx={{
                  display: 'inline-block',
                  backgroundColor: '#dfdfdf',
                  m: 0.5,
                  borderRadius: 1,
                  p: 0.5,
                }}
              >
                {item.name}
              </Box>
            );
          })}
        </Box>
      ),
    },
    i18n.language === 'ar'
      ? { field: 'display_nameAr', headerName: 'الاسم المعروض', flex: 1 }
      : { field: 'display_nameEn', headerName: 'display name En', flex: 1 },

    {
      field: 'status',
      headerName: i18n.language === 'ar' ? 'الحالة' : 'status',
      width: 130,
      renderCell: (params) => (
        <SwitchStatus id={params.row.id} url={'packages'} apiStatus={params.row.status} />
      ),
    },
    {
      field: 'actions',
      headerName: i18n.language === 'ar' ? 'العمليات' : 'actions',
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" gap={1}>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleOpend();
              setTempId(params.row.id);
            }}
          >
            {/* {t('delete')} */}
            <Trash2 />
          </Button>

          <Button variant="contained" color="info" onClick={() => handleEditOpen(params.row)}>
            {/* {t('edit')} */}
            <Pencil />
          </Button>
        </Stack>
      ),
    },
  ];


  const rows =
    data.length > 0
      ? data.map((company: ITempPermissions) => ({
          ...company,
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

export default PermissionsTable;
