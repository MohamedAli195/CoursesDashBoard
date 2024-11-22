import { Button, Stack, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useQuery } from '@tanstack/react-query';
import  { Toaster } from 'react-hot-toast';
import BasicModal from 'components/modal/ShareModal';
import AddPackageForm from 'components/addPacageForm';
import UpdatePackageForm from 'components/updatePacageForm';
import { deletePackage, fetchPackages } from './packagesFunct';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import paths from 'routes/path';
import i18n from 'i18n';

// Fetch packages function

function PackagesPage() {
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
  const [selectedPackage, setSelectedPackage] = useState<null | {
    id: number;
    nameAr: string;
    nameEn: string;
    price: string;
    image: FileList;
    status: string | null;
  }>(null);

  const handleEditOpen = (packageData: any) => {
    setSelectedPackage(packageData); // Set selected package data
    handleOpenU(); // Open the update modal
  };

  // fetch from api 
  fetchPackages()


  // Columns configuration
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'nameEn', headerName: 'Name En' },
    { field: 'nameAr', headerName: 'Name Ar' },
    { field: 'price', headerName: 'Price' },
    {
      field: 'image',
      headerName: 'Image',

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
    { field: 'status', headerName: 'Status', width: 130 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 130,
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Button variant="contained" color="error" onClick={() => deletePackage(params.row.id,refetch) }>
            Delete
          </Button>
          <Button
            variant="contained"
            color="info"
            onClick={() => navigate(`${paths.packages}/${params.row.id}`)}
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
  const { data, error, isLoading, isError,refetch } = useQuery({
    queryKey: ['packages'],
    queryFn:()=> fetchPackages(),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  // Prepare rows for DataGrid
  const rows = data.data.length>0? data.data.map(
    (packageItem: {
      id: number;
      name: { en: string; ar: string };
      price: string;
      image: string;
      status: string | null;
    }) => ({
      id: packageItem.id,
      nameEn: packageItem.name?.en,
      nameAr: packageItem.name?.ar,
      price: packageItem.price,
      image: packageItem.image,
      status: packageItem.status,
    }),
  ):"";

  return (
    <>
      <Stack flexDirection="row" alignItems="center" justifyContent="space-between" mb={3} height={""}>
        <Typography variant="h1" color="initial">
          Packages Page
        </Typography>
        <Button variant="contained" color="info" onClick={handleOpen}>
          Add Package
        </Button>
      </Stack>

      <Paper sx={{ height: "800px", width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          sx={{ border: 0 }}
          autoHeight 
          getRowHeight={() => 200} // Set each row's height to 200px
        />
      </Paper>

      {/* add modal */}
      <BasicModal open={open} handleClose={handleClose}>
        <h2>add pacage</h2>

        <AddPackageForm handleClose={handleClose}  refetch={refetch}/>
      </BasicModal>

      {/* update modal */}
      <BasicModal open={openU} handleClose={handleCloseU}>
        <h2>update pacage</h2>
        <UpdatePackageForm handleClose={handleCloseU} initialData={selectedPackage} refetch={refetch} />
      </BasicModal>
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
}

export default PackagesPage;
