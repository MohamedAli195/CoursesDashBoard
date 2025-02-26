import { Box, Button, Stack, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRowClassNameParams } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useQuery } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import BasicModal from 'components/Shared/modal/ShareModal';
import UpdatePackageForm from 'components/Packages/updatePacageForm';
// import { fetchPackages } from './packagesFunct';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import paths from 'routes/path';
import { useTranslation } from 'react-i18next';
import { IPackage, IPackageSelected } from 'interfaces';
import { Eye, Trash2, Pencil } from 'lucide-react';
import PaginationComponent from 'components/Shared/pagination';

import SearchForm from 'components/Shared/searchForm';


import DeleteModal from 'components/deleteModal';
import { checkPermissions, deleteAnyThing, fetchAllData, parsedData } from 'functions';

import PackagesTable from './PackagesTable';
import AddPackageForm from 'components/Packages/addPackageForm';
import SelectSort from 'components/Shared/selectSort';
import SkeletonTables from 'components/Shared/skelton';
import SelectPerPage from 'components/Shared/selectPerPAge';

// Fetch packages function
interface IProps {
  isDashBoard: boolean;
}
function PackagesPage({ isDashBoard }: IProps) {
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

  // Fetch packages using React Query
  const { data, error, isLoading, isError, refetch } = useQuery({
    queryKey: [`packages-${page}-${per}-${search}-${sort}`],
    queryFn: () => fetchAllData(page, per, search, sort, '', 'packages'),
  });

  if (isLoading) return <SkeletonTables />;
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
      {!isDashBoard && (
        <Stack
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          mb={3}
          height={''}
        >
          <Typography variant="h1" color="initial">
            {t('packages')}
          </Typography>

          {checkPermissions(parsedData, 'add-package') && (
            <Button variant="contained" color="info" onClick={handleOpen}>
              {t('addPackage')}
            </Button>
          )}
        </Stack>
      )}

      <Paper sx={{ width: '100%' }}>
        {isDashBoard && (
          <Typography variant="h1" color="initial">
            {t('packages')}
          </Typography>
        )}
        <Stack flexDirection={'row'} alignItems={'center'}>
          <SelectSort data={['asc', 'desc']} setSortFun={setSort} sortVal={sort} />

          <SearchForm setsearch={setSearch} isDashBoard={isDashBoard} />
        </Stack>
        <PackagesTable
          data={data?.data?.data}
          handleEditOpen={handleEditOpen}
          handleOpend={handleOpend}
          setTempId={setTempId}
        />
        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
          sx={{ marginTop: 2, mx: 2 }}
        >
          <PaginationComponent
            page={page}
            pageCounter={totalItems / per <= 1 ? 1 : Math.ceil(totalItems / per)}
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

      <DeleteModal
        handleClosed={handleClosed}
        opend={opend}
        refetch={refetch}
        tempId={tempId}
        deleteFunc={() => {
          deleteAnyThing(tempId, refetch, 'packages');
        }}
      />

      {/* update modal */}
      <BasicModal open={openU} handleClose={handleCloseU}>
        <h2>{t('editPackage')}</h2>
        <UpdatePackageForm handleClose={handleCloseU} refetch={refetch} id={tempIdUpdate} />
      </BasicModal>
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
}

export default PackagesPage;
