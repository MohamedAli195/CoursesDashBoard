import { Box, Button, Stack, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRowClassNameParams } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useQuery } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import BasicModal from 'components/modal/ShareModal';
import AddPackageForm from 'components/addPacageForm';
import UpdatePackageForm from 'components/updatePacageForm';
// import { fetchPackages } from './packagesFunct';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import paths from 'routes/path';
import { useTranslation } from 'react-i18next';
import { IPackage, IPackageSelected } from 'interfaces';
import { Eye, Trash2, Pencil } from 'lucide-react';
import PaginationComponent from 'components/pagination';
import SelectPerPage from 'components/selectPerPAge';
import SearchForm from 'components/searchForm';
import SelectSort from 'components/selectSort';
import SwitchStatus from 'components/switch';
import DeleteModal from 'components/deleteModal';
import { deleteAnyThing, fetchAllData } from 'functions';

// Fetch packages function
interface IProps {
  isDashBoard:boolean
}
function PackagesPage({isDashBoard}:IProps) {
  // states
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('desc');
  const [per, setper] = useState(10);
  const [tempId, setTempId] = useState(1);
  const [tempIdUpdate, setTempIdUpdate] = useState(1);
  const { t, i18n } = useTranslation();

  const navigate = useNavigate();
  // add modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

    // delete modal
    const [opend, setOpend] = useState(false);
    const handleOpend = () => setOpend(true);
    const handleClosed = () => setOpend(false);

  // update modal
  const [openU, setOpenU] = useState(false);
  const handleOpenU = () => setOpenU(true);
  const handleCloseU = () => setOpenU(false);
  // Define a state to store selected package data
  const [selectedPackage, setSelectedPackage] = useState<null | IPackageSelected>(null);

  const handleEditOpen = (packageData: IPackageSelected) => {
    setTempIdUpdate(packageData.id); // Set selected package data
    handleOpenU(); // Open the update modal
  };

  // Columns configuration
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID' },
    i18n.language === 'ar'
      ? { field: 'nameAr', headerName: 'الاسم',flex: 1, }
      : { field: 'nameEn', headerName: 'Name' ,flex: 1,},
    { field: 'price', headerName: i18n.language === 'ar' ? 'السعر' : 'price' },
    {
      field: 'image',
      headerName: i18n.language === 'ar' ? 'الصورة' : 'image',

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
    { field: 'status', headerName: i18n.language === 'ar' ? 'الحالة' : 'status', width: 130 ,renderCell: (params) => (
          <SwitchStatus id={params.row.id} url={"packages"} apiStatus={params.row.status} />
         
        ), },
    {
      field: 'actions',
      headerName: i18n.language === 'ar' ? 'العمليات' : 'actions',
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" gap={1}>
          <Button
            variant="contained"
            color="error"
            
            onClick={
              ()=>{
              handleOpend()
              setTempId(params.row.id)
            }
          }
          >
            {/* {t('delete')} */}
            <Trash2 />
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(`${paths.packages}/${params.row.id}`)}
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

  // Fetch packages using React Query
  const { data, error, isLoading, isError, refetch } = useQuery({
    queryKey: [`packages-${page}-${per}-${search}-${sort}`],
    queryFn: () => fetchAllData(page, per, search, sort,'','packages'),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  // Prepare rows for DataGrid
  const rows =
    data?.data?.data?.length > 0
      ? data.data.data.map((packageItem: IPackage) => ({
          id: packageItem.id,
          nameEn: packageItem.name?.en,
          nameAr: packageItem.name?.ar,
          price: packageItem.price,
          image: packageItem.image,
          status: packageItem.status,
        }))
      : [];
  const totalItems = data.data?.total;
  return (
    <>
    {
      !isDashBoard && <Stack
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      mb={3}
      height={''}
    >
      <Typography variant="h1" color="initial">
        {t('packages')}
      </Typography>
      <Button variant="contained" color="info" onClick={handleOpen}>
        {t('addPackage')}
      </Button>
    </Stack>
    }
      

      <Paper sx={{ width: '100%' }}>
        {
          isDashBoard && <Typography variant="h1" color="initial">
          {t('packages')}
        </Typography>
        }
        <Stack flexDirection={'row'} alignItems={'center'}>
        <SelectSort data={['asc', 'desc']} setSortFun={setSort} sortVal={sort} />
        
          <SearchForm setsearch={setSearch} isDashBoard={isDashBoard} />
          
        </Stack>
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
        </Stack>{' '}
      </Paper>

      {/* add modal */}
      <BasicModal open={open} handleClose={handleClose}>
        <h2>{t('addPackage')}</h2>

        <AddPackageForm handleClose={handleClose} refetch={refetch} />
      </BasicModal>

      {/* delete modal */}
      {/* <BasicModal open={opend} handleClose={handleClosed}>
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
            
            deletePackage(tempId, refetch)
            handleClosed()
            
            }}>
            Delete 
          </Button>
        </Box>
       
      </BasicModal> */}
      <DeleteModal handleClosed={handleClosed}  opend={opend} refetch={refetch} tempId={tempId} deleteFunc={()=>{deleteAnyThing(tempId,refetch,'packages')}}/>

      {/* update modal */}
      <BasicModal open={openU} handleClose={handleCloseU}>
        <h2>{t('editPackage')}</h2>
        <UpdatePackageForm
          handleClose={handleCloseU}
          refetch={refetch}
          id={tempIdUpdate}
        />
      </BasicModal>
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
}

export default PackagesPage;
