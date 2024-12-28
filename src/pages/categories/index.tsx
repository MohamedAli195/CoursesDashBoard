import { Button, Stack, Typography } from '@mui/material';
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
// import CustomDataGridFooter from 'components/common/table/CustomDataGridFooter';

// Fetch packages function

function CategoriesPage() {
  // states
  const [page, setPage] = useState(1);
  const [per, setper] = useState(1);
  const [search, setSearch] = useState('');
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  // add modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // update modal
  const [openU, setOpenU] = useState(false);
  const handleOpenU = () => setOpenU(true);
  const handleCloseU = () => setOpenU(false);
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
            onClick={() => deleteCategory(params.row.id, refetch)}
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
    queryKey: [`packages-${page}-${per}-${search}`],
    queryFn: () => fetchCategories(page, per, search),
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
      <Stack flexDirection="row" alignItems="center" justifyContent="space-between" mb={3}>
        <Typography variant="h1" color="initial">
          {t('categories')}
        </Typography>
        <Button variant="contained" color="info" onClick={handleOpen}>
          {t('AddCategory')}
        </Button>
      </Stack>

      <Paper sx={{ height: '800px', width: '100%' }}>
        <Stack flexDirection={'row'} alignItems={'center'}>
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
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
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
