import { Box, Button, Stack, Typography } from '@mui/material';
import i18n from 'i18n';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import React from 'react';
import imgNotFound from './../../../public/images/No_Image_Available.jpg';
import { Navigate, useNavigate } from 'react-router-dom';
// import { ICompany } from 'interfaces';
import paths from 'routes/path';
import { DataGrid, GridColDef, GridRowClassNameParams } from '@mui/x-data-grid';
import { ICategory } from 'interfaces';
import { checkPermissions, parsedData } from 'functions';
interface IProps {
  handleEditOpen:(val:ICategory)=>void
  handleOpend:()=>void
  setTempId:(val:number)=>void
  data: ICategory[];
}
function CategoriesTable({data,handleEditOpen,setTempId,handleOpend}: IProps) {

  const navigate = useNavigate();
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID'},
    { field: 'name',   headerName: i18n.language === 'ar' ? 'الاسم':"name",flex: 1, renderCell:(params)=> i18n.language === 'ar' ?  params.row.name.ar : params.row.name.en },

    {
      field: 'image',
      headerName: i18n.language === 'ar' ? 'الصورة' : 'image',

      flex: 1,
      renderCell: (params) =>
        params.value ? (
          <img src={params.value} alt={params.row.name} style={{ width: '100%', height: '100%' }} />
        ) : (
          <Typography variant="body2" color="textSecondary">
            No Image
          </Typography>
        ),
    },
    {
      field: 'actions',
      headerName: i18n.language === 'ar' ? 'العمليات' : 'actions',
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" gap={1}>
          {
             checkPermissions(parsedData,'delete-category') && <Button
             variant="contained"
             color="error"
             // onClick={() => deleteCategory(params.row.id, refetch)}
             onClick={
               ()=>{
               handleOpend()
               setTempId(params.row.id)
             }}
           >
             {/* {t("delete")} */}
             <Trash2 />
           </Button>
          }
          {
            checkPermissions(parsedData,'show-categories') && <Button
            variant="contained"
            color="info"
            onClick={() => navigate(`${paths.categories}/${params.row.id}`)}
          >
            {/* {t("view")}  */}
            <Eye />
          </Button>
          }
  {
    checkPermissions(parsedData,'edit-category') && <Button variant="contained" color="primary" onClick={() => handleEditOpen(params.row)}>
    {/* {t("edit")} */}
    <Pencil />
  </Button>
  }

        </Stack>
      ),
    },
  ];


  const rows =
    data.length > 0
      ? data.map((cat: ICategory) => ({
          ...cat,
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

export default CategoriesTable;
