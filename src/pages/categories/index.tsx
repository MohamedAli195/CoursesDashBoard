import { Button, Stack, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useQuery } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import BasicModal from 'components/modal/ShareModal';
import { deleteCategory, fetchCategories } from './categoriesFunct';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import paths from 'routes/path';
import i18n from 'i18n';
import AddCategoryForm from 'components/addCategoryForm';
import UpdateCategoryForm from 'components/updateCategoryForm/UpdateCategory';

// Fetch packages function

function CategoriesPage() {
  // states
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
  const [selectedCategory, setSelectedCategory] = useState<null | {
    id: number;
    nameAr: string;
    nameEn: string;
    image: FileList;
    descriptionAr: string;
    descriptionEn: string;
    price: string;
  }>(null);

  const handleEditOpen = (categoryData: any) => {
    setSelectedCategory(categoryData); // Set selected package data
    handleOpenU(); // Open the update modal
  };

  // fetch from api
  fetchCategories();

  // Columns configuration
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'nameEn', headerName: 'Name En' },
    { field: 'nameAr', headerName: 'Name Ar' },
    { field: 'descriptionEn', headerName: 'description En' },
    { field: 'descriptionAr', headerName: 'description Ar' },
    {
      field: 'image',
      headerName: 'Image',

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
      headerName: 'Actions',
      width: 130,
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            color="error"
            onClick={() => deleteCategory(params.row.id, refetch)}
          >
            Delete
          </Button>
          <Button
            variant="contained"
            color="info"
            onClick={() => navigate(`${paths.categories}/${params.row.id}`)}
          >
            View
          </Button>
          <Button variant="contained" color="primary" onClick={() => handleEditOpen(params.row)}>
            Edit
          </Button>
        </Stack>
      ),
    },
  ];

  // Pagination settings
  const paginationModel = { page: 0, pageSize: 5 };

  // Fetch packages using React Query
  const { data, error, isLoading, isError, refetch } = useQuery({
    queryKey: ['packages'],
    queryFn: () => fetchCategories(),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;
  console.log(data.data);
  // Prepare rows for DataGrid
  const rows = data.data.map(
    (packageItem: {
      id: number;
      name: { en: string; ar: string };
      description: { en: string; ar: string };
      price: string;
      image: string;
    }) => ({
      id: packageItem.id,
      nameEn: packageItem.name?.en,
      nameAr: packageItem.name?.ar,
      descriptionEn: packageItem.description?.en,
      descriptionAr: packageItem.description?.ar,

      image: packageItem.image,
    }),
  );

  return (
    <>
      <Stack flexDirection="row" alignItems="center" justifyContent="space-between" mb={3}>
        <Typography variant="h1" color="initial">
          Categories Page
        </Typography>
        <Button variant="contained" color="info" onClick={handleOpen}>
          Add Category
        </Button>
      </Stack>

      <Paper sx={{ height: '800px', width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          sx={{ border: 0, }}
          autoHeight 
          getRowHeight={() => 200} // Set each row's height to 200px
        />
      </Paper>

      {/* add modal */}
      <BasicModal open={open} handleClose={handleClose}>
        <h2>add category</h2>

        <AddCategoryForm handleClose={handleClose} refetch={refetch} />
      </BasicModal>

      {/* update modal */}
      <BasicModal open={openU} handleClose={handleCloseU}>
        <h2>update category</h2>
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
