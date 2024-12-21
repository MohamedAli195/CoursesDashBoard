import { Button, Stack, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRowClassNameParams } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useQuery } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import BasicModal from 'components/modal/ShareModal';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import paths from 'routes/path';
import { deleteCourse, fetchCourses } from './coursesFunct';
import { useTranslation } from 'react-i18next';
import {ICourse, ICourseSelect, IFormInputCourses } from 'interfaces';

// Fetch packages function

function CoursesPage() {
  // states
  const navigate = useNavigate();
  const { t,i18n } = useTranslation();
  // update modal
  const [openU, setOpenU] = useState(false);
  const handleOpenU = () => setOpenU(true);
  const handleCloseU = () => setOpenU(false);
  // Define a state to store selected package data
  const [selectedCourse, setSelectedCourse] = useState<null | IFormInputCourses | undefined>(null);

  const handleEditOpen = (packageData: IFormInputCourses) => {
    setSelectedCourse(packageData); // Set selected package data
    handleOpenU(); // Open the update modal
  };

  // fetch from api
  fetchCourses();

  // Columns configuration
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    i18n.language === "ar" ? { field: 'nameAr', headerName: 'اسم الكورس' }: { field: 'nameEn', headerName: 'Name ' },
   
   
    { field: 'price', headerName:i18n.language === "ar" ? 'السعر':"price" },
    i18n.language === "ar" ? { field: 'categoryAr', headerName: 'القسم' }:{ field: 'categoryEn', headerName: 'category ' },

    i18n.language === "ar" ?{ field: 'packageAr', headerName: 'الباقة' } :{ field: 'packageEn', headerName: 'package ' },
    i18n.language === "ar" ? { field: 'descriptionAr', headerName: 'الوصف' } :{ field: 'descriptionEn', headerName: 'description ' },

    {
      field: 'image',
      
      headerName:i18n.language === "ar" ? 'الصورة':"image",

      flex: 1,
      renderCell: (params) =>
        params.value ? (
          <img src={params.value} alt={params.row.name} style={{ width: '100%', height: 'auto' }} />
        ) : (
          <Typography variant="body2" color="textSecondary">
            No Image
          </Typography>
        ),
    },
    { field: 'status',  headerName:i18n.language === "ar" ? 'الحالة':"status", width: 130 },
    {
      field: 'actions',
      headerName:i18n.language === "ar" ? 'العمليات':"actions",
      width: 130,
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            color="error"
            onClick={() => deleteCourse(params.row.id, refetch)}
          >
            {t("delete")}
          </Button>
          <Button
            variant="contained"
            color="info"
            onClick={() => navigate(`${paths.courses}/${params.row.id}`)}
          >
             {t("view")}
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(`${paths.courses}/update/${params.row.id}`)}
          >
             {t("edit")}
          </Button>
          {/* <Button variant="contained" color="primary" onClick={() => handleEditOpen(params.row)}>
          {t("edit")}
          </Button> */}
        </Stack>
      ),
    },
  ];

  // Pagination settings
  const paginationModel = { page: 0, pageSize: 5 };

  // Fetch packages using React Query
  const { data, error, isLoading, isError, refetch } = useQuery({
    queryKey: ['courses'],
    queryFn: () => fetchCourses(),
  });

  console.log(data?.data.data)

  // Prepare rows for DataGrid
  const rows =data?.data?.data.length > 0 ?  data?.data?.data.map(
    (packageItem: ICourse) => ({
      id: packageItem.id,
      nameEn: packageItem.name?.en,
      nameAr: packageItem.name?.ar,
      price: packageItem.price,
      image: packageItem.image,
      status: packageItem.status,
      categoryEn:packageItem.category?.name?.en,
      categoryAr:packageItem.category?.name?.ar,
      packageEn:packageItem.package?.name?.en,
      packageAr:packageItem.package?.name?.ar,
      descriptionEn:packageItem.description.en,
      descriptionAr:packageItem.description.ar,
    }),
  ):"";
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;
  return (
    <>
      <Stack
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        mb={3}
        height={''}
      >
        <Typography variant="h1" color="initial">
     
          {t("courses")}
        </Typography>
        <Button variant="contained" color="info" onClick={() => navigate(`${paths.courses}/add`)}>
        {t("AddCourse")}
        </Button>
      </Stack>

      <Paper sx={{ height: '800px', width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          sx={{ border: 0 }}
          autoHeight
          getRowHeight={() => 200} // Set each row's height to 200px
          getRowClassName={(params: GridRowClassNameParams) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? 'even-row' : 'odd-row'
          }
        />
      </Paper>

      {/* update modal */}
{/*       
      <BasicModal open={openU} handleClose={handleCloseU}>
        <h2>update pacage</h2>
        <UpdateCourseForm
          handleClose={handleCloseU}
          initialData={selectedCourse}
          refetch={refetch}
        />
      </BasicModal> */}
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
}

export default CoursesPage;
