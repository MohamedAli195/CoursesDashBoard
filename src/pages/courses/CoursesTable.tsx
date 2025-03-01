import { Box, Button, Stack, Typography } from '@mui/material';
import i18n from 'i18n';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import React from 'react';
import imgNotFound from './../../../public/images/No_Image_Available.jpg';
import { Navigate, useNavigate } from 'react-router-dom';
// import { ICompany } from 'interfaces';
import paths from 'routes/path';
import { DataGrid, GridColDef, GridRowClassNameParams } from '@mui/x-data-grid';
import { ICategory, ICustomer, IFormInputCourses } from 'interfaces';
import { checkPermissions, parsedData } from 'functions';
import SwitchStatus from 'components/Shared/switch';
interface IProps {
  handleEditOpen:(val:IFormInputCourses)=>void
  handleOpend:()=>void
  setTempId:(val:number)=>void
  data: IFormInputCourses[];
  isDashBoard:boolean
}
function CustomersTable({data,handleEditOpen,setTempId,handleOpend,isDashBoard}: IProps) {

  console.log(data)
  const navigate = useNavigate();
  const columns: GridColDef[] = !isDashBoard
    ? [
        { field: 'id', headerName: 'ID', width: 30 },
        { field: 'name',   headerName: i18n.language === 'ar' ? 'الاسم':"name",flex: 1, renderCell:(params)=> i18n.language === 'ar' ?  params.row.name.ar : params.row.name.en },

        { field: 'price', headerName: i18n.language === 'ar' ? 'السعر' : 'price' },
        { field: 'category',   headerName: i18n.language === 'ar' ? 'القسم':"category",flex: 1, renderCell:(params)=> i18n.language === 'ar' ? params.row.category.name.ar : params.row.category.name.en },

        {
          field: 'image',
          headerName: i18n.language === 'ar' ? 'الصورة' : 'image',
          flex: 1.5,
          renderCell: (params) =>
            params.value ? (
              <img
                src={params.value}
                alt={params.row.name}
                style={{ width: '100%', height: 'auto' }}
              />
            ) : (
              <Typography variant="body2" color="textSecondary">
                No Image
              </Typography>
            ),
        },
        {
          field: 'status',
          headerName: i18n.language === 'ar' ? 'الحالة' : 'status',
          width: 130,
          renderCell: (params) => (
            <SwitchStatus id={params.row.id} url={'courses'} apiStatus={params.row.status} />
          ),
        },
        {
          field: 'actions',
          headerName: i18n.language === 'ar' ? 'العمليات' : 'actions',
          width: 130,
          flex: 1,
          renderCell: (params) => (
            <Stack direction="row" gap={1}>
              {
                checkPermissions(parsedData,'delete-course') &&  <Button
                variant="contained"
                color="error"
                // onClick={() => deleteCourse(params.row.id, refetch)}
                onClick={() => {
                  handleOpend();
                  setTempId(params.row.id);
                }}
              >
                {/* {t("delete")} */}
                <Trash2 />
              </Button>
              }
              {
                checkPermissions(parsedData,'show-courses') && <Button
                variant="contained"
                color="info"
                onClick={() => navigate(`${paths.courses}/${params.row.id}`)}
              >
                {/* {t("view")} */}
                <Eye />
              </Button>
              }

{
   checkPermissions(parsedData,'edit-course') && <Button
   variant="contained"
   color="primary"
   onClick={() => navigate(`${paths.courses}/update/${params.row.id}`)}
 >
   {/* {t("edit")} */}
   <Pencil />
 </Button>
}

            </Stack>
          ),
        },
      ]
    : [
        { field: 'id', headerName: 'ID', width: 30 },
        { field: 'name',   headerName: i18n.language === 'ar' ? 'الاسم':"name",flex: 1, renderCell:(params)=> i18n.language === 'ar' ?  params.row.name.ar : params.row.name.en },

        { field: 'price', headerName: i18n.language === 'ar' ? 'السعر' : 'price' },
        { field: 'category',   headerName: i18n.language === 'ar' ? 'القسم':"category",flex: 1, renderCell:(params)=> i18n.language === 'ar' ? params.row.category.name.ar : params.row.category.name.en },
      
      ];

  const rows =
    data?.length > 0
      ? data?.map((customer: IFormInputCourses) => ({
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
