import { Button, Stack, Typography, Box } from '@mui/material';
import { DataGrid, GridColDef, GridRowClassNameParams } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useQuery } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import paths from 'routes/path';
import { deleteCourse, fetchCourses } from './coursesFunct';
import { useTranslation } from 'react-i18next';
import { ICourse, ICourseSelect, IFormInputCourses } from 'interfaces';
import { Eye, Trash2, Pencil } from 'lucide-react';
import PaginationComponent from 'components/pagination';
import SelectPerPage from 'components/selectPerPAge';
import SearchForm from 'components/searchForm';
import SelectSort from 'components/selectSort';
import BasicModal from 'components/modal/ShareModal';

// Fetch packages function

function CoursesPage() {
  // states
  const [page, setPage] = useState(1);
  const [per, setper] = useState(1);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('desc');
  const [tempId, setTempId] = useState(1);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  // update modal
  const [openU, setOpenU] = useState(false);
  const handleOpenU = () => setOpenU(true);
  const handleCloseU = () => setOpenU(false);
  // delete modal
  const [opend, setOpend] = useState(false);
  const handleOpend = () => setOpend(true);
  const handleClosed = () => setOpend(false);
  // Define a state to store selected package data
  const [selectedCourse, setSelectedCourse] = useState<null | IFormInputCourses | undefined>(null);

  const handleEditOpen = (packageData: IFormInputCourses) => {
    setSelectedCourse(packageData); // Set selected package data
    handleOpenU(); // Open the update modal
  };

  // fetch from api
  // fetchCourses();

  // Columns configuration
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 30 },
    i18n.language === 'ar'
      ? { field: 'nameAr', headerName: 'اسم الكورس', flex: 1 }
      : { field: 'nameEn', headerName: 'Name ', flex: 1 },

    { field: 'price', headerName: i18n.language === 'ar' ? 'السعر' : 'price' },
    i18n.language === 'ar'
      ? { field: 'categoryAr', headerName: 'القسم', flex: 1 }
      : { field: 'categoryEn', headerName: 'category ', flex: 1 },

    // i18n.language === 'ar'
    //   ? { field: 'packageAr', headerName: 'الباقة' }
    //   : { field: 'packageEn', headerName: 'package ' },
    // i18n.language === 'ar'
    //   ? { field: 'descriptionAr', headerName: 'الوصف' }
    //   : { field: 'descriptionEn', headerName: 'description ' },

    {
      field: 'image',

      headerName: i18n.language === 'ar' ? 'الصورة' : 'image',

      flex: 1.5,
      renderCell: (params) =>
        params.value ? (
          <img src={params.value} alt={params.row.name} style={{ width: '100%', height: 'auto' }} />
        ) : (
          <Typography variant="body2" color="textSecondary">
            No Image
          </Typography>
        ),
    },
    { field: 'status', headerName: i18n.language === 'ar' ? 'الحالة' : 'status', width: 130 },
    {
      field: 'actions',
      headerName: i18n.language === 'ar' ? 'العمليات' : 'actions',
      width: 130,
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" gap={1}>
          <Button
            variant="contained"
            color="error"
            // onClick={() => deleteCourse(params.row.id, refetch)}
            onClick={
              ()=>{
              handleOpend()
              setTempId(params.row.id)
            }
          }
          >
            {/* {t("delete")} */}
            <Trash2 />
          </Button>
          <Button
            variant="contained"
            color="info"
            onClick={() => navigate(`${paths.courses}/${params.row.id}`)}
          >
            {/* {t("view")} */}
            <Eye />
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(`${paths.courses}/update/${params.row.id}`)}
          >
            {/* {t("edit")} */}
            <Pencil />
          </Button>
          {/* <Button variant="contained" color="primary" onClick={() => handleEditOpen(params.row)}>
          {t("edit")}
          </Button> */}
        </Stack>
      ),
    },
  ];

  // Pagination settings

  // Fetch packages using React Query
  const { data, error, isLoading, isError, refetch } = useQuery({
    queryKey: [`courses-${page}-${per}-${search}-${sort}`],
    queryFn: () => fetchCourses(page, per, search, sort),
  });

  // console.log(data?.data.data)

  // Prepare rows for DataGrid
  const rows =
    data?.data?.data?.length > 0
      ? data?.data?.data.map((packageItem: ICourse) => ({
          id: packageItem.id,
          nameEn: packageItem.name?.en,
          nameAr: packageItem.name?.ar,
          price: packageItem.price,
          image: packageItem.image,
          status: packageItem.status,
          categoryEn: packageItem.category?.name?.en,
          categoryAr: packageItem.category?.name?.ar,
          packageEn: packageItem.package?.name?.en,
          packageAr: packageItem.package?.name?.ar,
          // descriptionEn: packageItem.description.en,
          // descriptionAr: packageItem.description.ar,
        }))
      : [];
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;
  const totalItems = data.data?.total;
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
          {t('courses')}
        </Typography>
        <Button variant="contained" color="info" onClick={() => navigate(`${paths.courses}/add`)}>
          {t('AddCourse')}
        </Button>
      </Stack>

      <Paper sx={{ width: '100%' }}>
        <Stack flexDirection={'row'} alignItems={'center'}>
        <SelectSort setSort={setSort} sort={sort} />
          <SearchForm setsearch={setSearch} />
          
        </Stack>
        <DataGrid
          rows={rows}
          columns={columns}
          // initialState={{ pagination: { paginationModel } }}
          // pageSizeOptions={[5, 10]}
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

        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
          sx={{ marginTop: 2, mx: 2 }}
        >
          <PaginationComponent
            page={page}
            pageCounter={totalItems / per <= 1 ? 1 : Math.round(totalItems / per)}
            setPage={setPage}
          />
          <SelectPerPage perPage={per} setPerPage={setper} />
        </Stack>
      </Paper>
      {/* delete modal */}
            <BasicModal open={opend} handleClose={handleClosed}>
            <Typography variant="h6" component="h2" gutterBottom>
                Delete
              </Typography>
              <Typography variant="body1" gutterBottom>
                Are you sure you want to delete this package?
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
                <Button variant="outlined" onClick={handleClosed}>
                  Close
                </Button>
                <Button variant="contained" color="error" onClick={() => {
                  
                  deleteCourse(tempId, refetch)
                  handleClosed()
                  
                  }}>
                  Delete 
                </Button>
              </Box>
             
            </BasicModal>

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
