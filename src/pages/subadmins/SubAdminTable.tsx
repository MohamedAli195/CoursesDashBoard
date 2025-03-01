import { Box, Button, Stack } from '@mui/material';
import i18n from 'i18n';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import React from 'react';
import imgNotFound from './../../../public/images/No_Image_Available.jpg';
import { Navigate, useNavigate } from 'react-router-dom';
// import { ICompany } from 'interfaces';
import paths from 'routes/path';
import { DataGrid, GridColDef, GridRowClassNameParams } from '@mui/x-data-grid';
import { IREc, ISubADmin, ITempPermissions } from 'interfaces';
import SwitchStatus from 'components/Shared/switch';
interface IProps {
  handleEditOpen:(val:ISubADmin)=>void
  handleOpend:()=>void
  setTempId:(val:number)=>void
  data: ISubADmin[];
}
function SubAdminTable({data,handleEditOpen,setTempId,handleOpend}: IProps) {

  const navigate = useNavigate();
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: i18n.language === 'ar' ? 'الاسم' : 'Name', flex: 0.5 },
    { field: 'email', headerName: i18n.language === 'ar' ? 'الايميل' : 'email', flex: 1 },
    // { field: 'avatar', headerName: i18n.language === 'ar' ? 'الصورة' : 'avatar' ,flex: 1, },
    // { field: 'role', headerName: i18n.language === 'ar' ? 'صلاحية' : 'role',flex: 1,  },
    {
      field: 'roles',
      headerName: i18n.language === 'ar' ? 'الصلاحيات' : 'roles',
      flex: 1,
      renderCell: (params) => (
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            overflowX: 'auto', // Optional: adds horizontal scrolling if content overflows
          }}
        >
          {params.row.role.map((item: string) => {
            return (
              <Box
                component="div"
                key={item}
                sx={{
                  display: 'inline-block',
                  backgroundColor: '#dfdfdf',
                  m: 0.5,
                  borderRadius: 1,
                  p: 0.5,
                }}
              >
                {item}
              </Box>
            );
          })}
        </Box>
      ),
    },
    {
      field: 'status',
      headerName: i18n.language === 'ar' ? 'الحالة' : 'status',
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
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(`${paths.subAdmins}/${params.row.id}`)}
          >
            {/* {t('view')} */}
            <Eye />
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
    data?.length > 0
      ? data?.map((sub: ISubADmin) => ({
          ...sub,
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

export default SubAdminTable;
