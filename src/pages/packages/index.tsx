import { Button, Stack, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRowClassNameParams } from '@mui/x-data-grid';
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
import { useTranslation } from 'react-i18next';

// Fetch packages function

function PackagesPage() {
  const { t, i18n } = useTranslation();
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
    i18n.language === "ar" ? { field: 'nameAr', headerName: 'الاسم' } : { field: 'nameEn', headerName: 'Name' },
    { field: 'price', headerName:i18n.language === "ar" ? 'السعر':"price" },
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
    { field: 'status', headerName:i18n.language === "ar" ? 'الحالة':"status", width: 130 },
    {
      field: 'actions',
      headerName:i18n.language === "ar" ? 'العمليات':"actions",
      width: 130,
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Button variant="contained" color="error" onClick={() => deletePackage(params.row.id,refetch) }>
          {t("delete")}
          </Button>
          <Button
            variant="contained"
            color="info"
            onClick={() => navigate(`${paths.packages}/${params.row.id}`)}
          >
            {t("view")}
          </Button>
          <Button variant="contained" color="primary" onClick={() => handleEditOpen(params.row)}>
          {t("edit")}
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

  // useEffect(() => {
  //   document.documentElement.lang = i18n.language;
  //   document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  // }, [i18n.language]);

  return (
    <>
      <Stack flexDirection="row" alignItems="center" justifyContent="space-between" mb={3} height={""}>
        <Typography variant="h1" color="initial">
          
          {t("packages")}
        </Typography>
        <Button variant="contained" color="info" onClick={handleOpen}>
          {t("addPackage")}
      
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
          getRowClassName={(params: GridRowClassNameParams) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? 'even-row' : 'odd-row'
          }
        />
      </Paper>

      {/* add modal */}
      <BasicModal open={open} handleClose={handleClose}>
        <h2>{t("addPackage")}</h2>

        <AddPackageForm handleClose={handleClose}  refetch={refetch}/>
      </BasicModal>

      {/* update modal */}
      <BasicModal open={openU} handleClose={handleCloseU}>
        <h2>{t("editPackage")}</h2>
        <UpdatePackageForm handleClose={handleCloseU} initialData={selectedPackage} refetch={refetch} />
      </BasicModal>
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
}

export default PackagesPage;
