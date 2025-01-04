import { Box, Button, Stack, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRowClassNameParams } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useQuery } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import BasicModal from 'components/modal/ShareModal';
import { deleteCategory, fetchCategories } from './categoriesFunct';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import paths from 'routes/path';
import AddCategoryForm from 'components/addCategoryForm';
import UpdateCategoryForm from 'components/updateCategoryForm/UpdateCategory';
import { useTranslation } from 'react-i18next';
import { ICategory, ISelectCategory } from 'interfaces';
import { Eye, Trash2, Pencil } from 'lucide-react';
import PaginationComponent from 'components/pagination';
import SelectPerPage from 'components/selectPerPAge';
import SearchForm from 'components/searchForm';
import SelectSort from 'components/selectSort';
// import CustomDataGridFooter from 'components/common/table/CustomDataGridFooter';
import Lottie from "lottie-react";
import deleteAnimation from "./../../../src/components/animations/delete.json";
import DeleteModal from 'components/deleteModal';

// Fetch packages function
interface IProps {
  isDashBoard:boolean
}
function CategoriesPage({isDashBoard}:IProps) {
  // states
  const [page, setPage] = useState(1);
  const [per, setper] = useState(10);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('desc');
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [tempId, setTempId] = useState(1);

  // add modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // update modal
  const [openU, setOpenU] = useState(false);
  const handleOpenU = () => setOpenU(true);
  const handleCloseU = () => setOpenU(false);
      // delete modal
      const [opend, setOpend] = useState(false);
      const handleOpend = () => setOpend(true);
      const handleClosed = () => setOpend(false);
  // Define a state to store selected package data
  const [selectedCategory, setSelectedCategory] = useState<null | ISelectCategory>(null);

  const handleEditOpen = (categoryData: ISelectCategory) => {
    setSelectedCategory(categoryData); // Set selected package data
    handleOpenU(); // Open the update modal
  };

  // fetch from api
  // fetchCategories();

  // Columns configuration
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID'},
    i18n.language === 'ar'
      ? { field: 'nameAr', headerName: 'الاسم' , flex: 1,}
      : { field: 'nameEn', headerName: 'Name' , flex: 1,},
    // i18n.language === 'ar'
    //   ? { field: 'descriptionAr', headerName: 'الوصف' }
    //   : { field: 'descriptionEn', headerName: 'description' },

    {
      field: 'image',
      headerName: i18n.language === 'ar' ? 'الصورة' : 'image',

      flex: 2,
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
          <Button
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
          <Button
            variant="contained"
            color="info"
            onClick={() => navigate(`${paths.categories}/${params.row.id}`)}
          >
            {/* {t("view")}  */}
            <Eye />
          </Button>
          <Button variant="contained" color="primary" onClick={() => handleEditOpen(params.row)}>
            {/* {t("edit")} */}
            <Pencil />
          </Button>
        </Stack>
      ),
    },
  ];



  // Fetch packages using React Query
  const { data, error, isLoading, isError, refetch } = useQuery({
    queryKey: [`packages-${page}-${per}-${search}-${sort}`],
    queryFn: () => fetchCategories(page, per, search,sort),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  const rows =
    data?.data?.data?.length > 0
      ? data.data.data.map((packageItem: ICategory) => ({
          id: packageItem.id,
          nameEn: packageItem.name?.en,
          nameAr: packageItem.name?.ar,
          // descriptionEn: packageItem.description?.en,
          // descriptionAr: packageItem.description?.ar,
          image: packageItem.image,
        }))
      : [];
      const totalItems = data.data?.total
  return (
    <>
   {!isDashBoard &&
      <Stack flexDirection="row" alignItems="center" justifyContent="space-between" mb={3}>
        <Typography variant="h1" color="initial">
          {t('categories')}
        </Typography>
        <Button variant="contained" color="info" onClick={handleOpen}>
          {t('AddCategory')}
        </Button>
      </Stack>
}

      <Paper sx={{ width: '100%' }}>
      {isDashBoard &&
        <Typography variant="h1" color="initial" >
          {t('categories')}
        </Typography>}
        <Stack flexDirection={'row'} alignItems={'center'}>
        <SelectSort data={['asc', 'desc']} setSortFun={setSort} sortVal={sort} />
        
          <SearchForm setsearch={setSearch} isDashBoard={isDashBoard} />
          
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
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} sx={{ marginTop: 2,mx:2}}>
          <PaginationComponent
            page={page}
            pageCounter={
              totalItems / per <= 1 ? 1 : Math.round((totalItems / per))
            }
            setPage={setPage}
          />
          <SelectPerPage perPage={per} setPerPage={setper} />
        </Stack>
      </Paper>


      {/* add modal */}
      <BasicModal open={open} handleClose={handleClose}>
        <h2>{t('AddCategory')}</h2>

        <AddCategoryForm handleClose={handleClose} refetch={refetch} />
      </BasicModal>


      {/* delete modal */}
      {/* <BasicModal open={opend} handleClose={handleClosed}>
        <Box>
        <Lottie style={{height:350}}  animationData={deleteAnimation} />
        </Box>
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
            
            deleteCategory(tempId, refetch)
            handleClosed()
            
            }}>
            Delete 
          </Button>
        </Box>
       
      </BasicModal> */}
      <DeleteModal handleClosed={handleClosed}  opend={opend} refetch={refetch} tempId={tempId} deleteFunc={()=>{deleteCategory(tempId,refetch)}}/>
      {/* update modal */}
      <BasicModal open={openU} handleClose={handleCloseU}>
        <h2>{t('updateCategory')}</h2>
        <UpdateCategoryForm
          handleClose={handleCloseU}
          initialData={selectedCategory}
          refetch={refetch}
        />
      </BasicModal>
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
}

export default CategoriesPage;
